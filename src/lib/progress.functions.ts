import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
const attempt = z.object({
  id: z.string().uuid(),
  question_id: z.string().max(100),
  category: z.number().int().min(0).max(7),
  correct: z.boolean(),
  created_at: z.string().datetime(),
});
const test = z.object({
  id: z.string().uuid(),
  mode: z.string().max(30),
  results: z.record(z.unknown()),
  created_at: z.string().datetime(),
});
export const syncProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ attempts: z.array(attempt).max(500), tests: z.array(test).max(50) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    if (data.attempts.length) {
      const { error } = await context.supabase.from("question_attempts").upsert(
        data.attempts.map((a) => ({ ...a, user_id: context.userId })),
        { onConflict: "id", ignoreDuplicates: true },
      );
      if (error) throw new Error("Could not sync answers");
    }
    if (data.tests.length) {
      const { error } = await context.supabase.from("test_attempts").upsert(
        data.tests.map((t) => ({ ...t, user_id: context.userId, results: t.results as never })),
        { onConflict: "id", ignoreDuplicates: true },
      );
      if (error) throw new Error("Could not sync tests");
    }
    return { saved: true };
  });
export const loadProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [{ data: attempts, error: a }, { data: tests, error: t }, { data: profile }] =
      await Promise.all([
        context.supabase
          .from("question_attempts")
          .select("id,question_id,category,correct,created_at")
          .eq("user_id", context.userId)
          .order("created_at"),
        context.supabase
          .from("test_attempts")
          .select("id,mode,results,created_at")
          .eq("user_id", context.userId)
          .order("created_at"),
        context.supabase
          .from("profiles")
          .select("display_name,vehicle")
          .eq("id", context.userId)
          .maybeSingle(),
      ]);
    if (a || t) throw new Error("Could not read saved progress");
    return { attempts: attempts ?? [], tests: tests ?? [], profile };
  });

import { z } from "zod";

const attempt = z
  .object({
    id: z.string().uuid(),
    question_id: z.string().max(100),
    category: z.number().int().min(0).max(7),
    correct: z.boolean(),
    created_at: z.string().datetime(),
  })
  .strict();

const practiceResults = z
  .object({
    correct: z.number().int().min(0).max(500),
    total: z.number().int().min(1).max(500),
  })
  .strict();

const mockResults = z
  .object({
    passed: z.boolean(),
    sections: z
      .array(
        z
          .object({
            key: z.enum(["rules", "signs", "controls"]),
            name: z.string().max(100),
            count: z.number().int().min(0).max(64),
            pass: z.number().int().min(0).max(64),
            total: z.number().int().min(0).max(64),
            correct: z.number().int().min(0).max(64),
            passed: z.boolean(),
          })
          .strict(),
      )
      .length(3),
  })
  .strict();

const test = z.discriminatedUnion("mode", [
  z
    .object({
      id: z.string().uuid(),
      mode: z.literal("practice"),
      results: practiceResults,
      created_at: z.string().datetime(),
    })
    .strict(),
  z
    .object({
      id: z.string().uuid(),
      mode: z.literal("mock"),
      results: mockResults,
      created_at: z.string().datetime(),
    })
    .strict(),
]);

export const syncProgressSchema = z
  .object({
    attempts: z.array(attempt).max(500),
    tests: z.array(test).max(50),
  })
  .strict();

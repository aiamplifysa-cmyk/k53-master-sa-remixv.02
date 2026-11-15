import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getAdminRole } from "@/lib/admin-role";

export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ context, next }) => {
    const role = getAdminRole(context.claims);
    if (!role) throw new Error("Forbidden: Admin access is required");

    return next({ context: { adminRole: role } });
  });

export const getAdminAccess = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(({ context }) => ({ role: context.adminRole }));

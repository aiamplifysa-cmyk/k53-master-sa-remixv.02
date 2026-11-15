export type AdminRole = "owner" | "admin";

type ClaimsWithAppMetadata = {
  app_metadata?: {
    role?: unknown;
    roles?: unknown;
  };
};

export function getAdminRole(claims: unknown): AdminRole | null {
  if (!claims || typeof claims !== "object") return null;

  const appMetadata = (claims as ClaimsWithAppMetadata).app_metadata;
  if (!appMetadata || typeof appMetadata !== "object") return null;

  const roles = Array.isArray(appMetadata.roles) ? appMetadata.roles : [];
  const role = appMetadata.role;
  if (role === "owner" || roles.includes("owner")) return "owner";
  if (role === "admin" || roles.includes("admin")) return "admin";
  return null;
}

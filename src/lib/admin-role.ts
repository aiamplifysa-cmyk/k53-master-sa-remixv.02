export type AdminRole = "owner" | "admin";

export const ADMIN_OWNER_EMAIL = "info@aiamplifysa.com";

type ClaimsWithAppMetadata = {
  email?: unknown;
  amr?: unknown;
  app_metadata?: {
    role?: unknown;
    roles?: unknown;
  };
};

function hasEmailOtp(claims: ClaimsWithAppMetadata): boolean {
  return (
    Array.isArray(claims.amr) &&
    claims.amr.some(
      (method) =>
        method !== null &&
        typeof method === "object" &&
        "method" in method &&
        method.method === "otp",
    )
  );
}

export function getAdminRole(claims: unknown): AdminRole | null {
  if (!claims || typeof claims !== "object") return null;

  const trustedClaims = claims as ClaimsWithAppMetadata;
  if (!hasEmailOtp(trustedClaims)) return null;

  const email =
    typeof trustedClaims.email === "string" ? trustedClaims.email.trim().toLowerCase() : "";
  if (email === ADMIN_OWNER_EMAIL) return "owner";

  const appMetadata = trustedClaims.app_metadata;
  if (!appMetadata || typeof appMetadata !== "object") return null;

  const roles = Array.isArray(appMetadata.roles) ? appMetadata.roles : [];
  const role = appMetadata.role;
  if (role === "owner" || roles.includes("owner")) return "owner";
  if (role === "admin" || roles.includes("admin")) return "admin";
  return null;
}

export function mayRequestAdminAccess(claims: unknown): boolean {
  if (!claims || typeof claims !== "object") return false;

  const candidate = claims as ClaimsWithAppMetadata;
  const email = typeof candidate.email === "string" ? candidate.email.trim().toLowerCase() : "";
  if (email === ADMIN_OWNER_EMAIL) return true;

  const appMetadata = candidate.app_metadata;
  if (!appMetadata || typeof appMetadata !== "object") return false;

  const roles = Array.isArray(appMetadata.roles) ? appMetadata.roles : [];
  return (
    appMetadata.role === "owner" ||
    appMetadata.role === "admin" ||
    roles.includes("owner") ||
    roles.includes("admin")
  );
}

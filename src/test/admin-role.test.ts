import { describe, expect, it } from "vitest";
import { getAdminRole } from "@/lib/admin-role";

describe("admin role resolution", () => {
  it("recognizes roles from trusted app metadata", () => {
    expect(getAdminRole({ app_metadata: { role: "owner" } })).toBe("owner");
    expect(getAdminRole({ app_metadata: { roles: ["admin"] } })).toBe("admin");
  });

  it("does not grant access from user-editable metadata or malformed claims", () => {
    expect(getAdminRole({ user_metadata: { role: "owner" } })).toBeNull();
    expect(getAdminRole({ app_metadata: { role: "support" } })).toBeNull();
    expect(getAdminRole(null)).toBeNull();
  });
});

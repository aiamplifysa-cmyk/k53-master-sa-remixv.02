import { describe, expect, it } from "vitest";
import { ADMIN_OWNER_EMAIL, getAdminRole, mayRequestAdminAccess } from "@/lib/admin-role";

describe("admin role resolution", () => {
  it("recognizes the verified bootstrap email only after an OTP sign-in", () => {
    expect(
      getAdminRole({
        email: ADMIN_OWNER_EMAIL.toUpperCase(),
        amr: [{ method: "otp" }],
      }),
    ).toBe("owner");
    expect(getAdminRole({ email: ADMIN_OWNER_EMAIL, amr: [{ method: "password" }] })).toBeNull();
  });

  it("recognizes granted roles only after an OTP sign-in", () => {
    expect(getAdminRole({ app_metadata: { roles: ["admin"] }, amr: [{ method: "otp" }] })).toBe(
      "admin",
    );
    expect(
      getAdminRole({ app_metadata: { roles: ["admin"] }, amr: [{ method: "password" }] }),
    ).toBe(null);
  });

  it("does not trust user-editable metadata or non-OTP sessions", () => {
    expect(getAdminRole({ user_metadata: { role: "owner" }, amr: [{ method: "otp" }] })).toBeNull();
    expect(
      getAdminRole({ app_metadata: { role: "support" }, amr: [{ method: "otp" }] }),
    ).toBeNull();
    expect(getAdminRole(null)).toBeNull();
  });

  it("shows a navigation entry only for the owner email or a trusted role", () => {
    expect(mayRequestAdminAccess({ email: ADMIN_OWNER_EMAIL })).toBe(true);
    expect(mayRequestAdminAccess({ user_metadata: { role: "admin" } })).toBe(false);
    expect(mayRequestAdminAccess({ app_metadata: { role: "admin" } })).toBe(true);
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Auth } from "@/routes/auth";

const mocks = vi.hoisted(() => ({
  signInWithOAuth: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => options,
  useNavigate: () => vi.fn(),
  useRouter: () => ({ invalidate: vi.fn() }),
}));
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ cancelQueries: vi.fn(), clear: vi.fn() }),
}));
vi.mock("@/components/study-provider", () => ({
  useStudy: () => ({
    user: null,
    name: "Learner",
    progress: { vehicle: "light" },
    refresh: vi.fn(),
  }),
}));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: {} } }));
vi.mock("@/integrations/lovable", () => ({
  lovable: { auth: { signInWithOAuth: mocks.signInWithOAuth } },
}));

describe("account sign-in", () => {
  afterEach(() => vi.clearAllMocks());

  it("shows OAuth failures and re-enables sign-in controls", async () => {
    mocks.signInWithOAuth.mockRejectedValue(new Error("network unavailable"));

    render(<Auth />);
    const googleButton = screen.getByRole("button", { name: "Continue with Google" });
    fireEvent.click(googleButton);

    expect(await screen.findByRole("status")).toHaveTextContent("network unavailable");
    await waitFor(() => expect(googleButton).toBeEnabled());
  });
});

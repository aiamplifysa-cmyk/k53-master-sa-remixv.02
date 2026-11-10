import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, LogOut, UserRound, CloudCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useStudy } from "@/components/study-provider";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/auth")({
  head: () =>
    pageHead(
      "Your learner account",
      "Sign in to save your K53 learner profile and study progress across devices.",
    ),
  component: Auth,
});
function Auth() {
  const { user, name, refresh, progress } = useStudy();
  const navigate = useNavigate(),
    router = useRouter(),
    queryClient = useQueryClient();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin"),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [display, setDisplay] = useState(""),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage("Check your email for a password reset link.");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { display_name: display } },
        });
        if (error) throw error;
        setMessage("Check your email to confirm your account before signing in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await router.invalidate();
        await navigate({ to: "/" });
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  async function social(provider: "google" | "lovable") {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) setMessage(result.error.message);
    setBusy(false);
  }
  if (user)
    return (
      <>
        <div className="page-heading">
          <div>
            <span className="eyebrow">YOUR LEARNER PROFILE</span>
            <h1>Hi, {name}.</h1>
            <p>Your learning journey, wherever you go.</p>
          </div>
        </div>
        <div className="auth-panel">
          <UserRound size={32} />
          <label>
            Display name
            <Input defaultValue={name} onChange={(e) => setDisplay(e.target.value)} />
          </label>
          <Button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              const { error } = await supabase
                .from("profiles")
                .upsert({ id: user.id, display_name: display || name, vehicle: progress.vehicle });
              setMessage(error ? "Could not save your profile." : "Profile saved.");
              await refresh();
              setBusy(false);
            }}
          >
            Save profile
          </Button>
          <Button variant="outline" onClick={() => void refresh()}>
            <CloudCheck />
            Sync progress
          </Button>
          <p role="status">{message}</p>
          <Button
            variant="ghost"
            onClick={async () => {
              await queryClient.cancelQueries();
              queryClient.clear();
              await supabase.auth.signOut();
              await router.invalidate();
              await navigate({ to: "/auth", replace: true });
            }}
          >
            <LogOut />
            Sign out
          </Button>
        </div>
      </>
    );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">TAKE YOUR PROGRESS WITH YOU</span>
          <h1>
            {mode === "signup"
              ? "Your journey. Your account."
              : mode === "forgot"
                ? "Let’s get you back on the road."
                : "Welcome to your learning space."}
          </h1>
          <p>Study without an account, or sign in to keep your progress across devices.</p>
        </div>
      </div>
      <div className="auth-panel">
        {mode !== "forgot" ? (
          <>
            <Button variant="outline" disabled={busy} onClick={() => void social("google")}>
              Continue with Google
            </Button>
            <Button variant="outline" disabled={busy} onClick={() => void social("lovable")}>
              Continue with Lovable
            </Button>
            <div className="auth-divider">or with email</div>
          </>
        ) : null}
        <form onSubmit={submit}>
          {mode === "signup" ? (
            <label>
              Display name
              <Input
                required
                value={display}
                onChange={(e) => setDisplay(e.target.value)}
                autoComplete="nickname"
              />
            </label>
          ) : null}
          <label>
            Email address
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          {mode !== "forgot" ? (
            <label>
              Password
              <Input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </label>
          ) : null}
          <Button type="submit" disabled={busy}>
            {busy
              ? "Please wait…"
              : mode === "signup"
                ? "Create account"
                : mode === "forgot"
                  ? "Send reset link"
                  : "Sign in"}
            <ArrowRight />
          </Button>
        </form>
        <p role="status">{message}</p>
        <Button
          variant="link"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setMessage("");
          }}
        >
          {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
        </Button>
        {mode === "signin" ? (
          <Button variant="link" onClick={() => setMode("forgot")}>
            Forgot your password?
          </Button>
        ) : null}
      </div>
    </>
  );
}

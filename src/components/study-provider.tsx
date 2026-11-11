import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { openDB } from "idb";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { syncProgress, loadProgress } from "@/lib/progress.functions";
import { retryIds, type Vehicle } from "@/lib/quiz";
export interface Attempt {
  id: string;
  question_id: string;
  category: number;
  correct: boolean;
  created_at: string;
}
export interface TestRecord {
  id: string;
  mode: string;
  results: Record<string, unknown>;
  created_at: string;
}
interface Progress {
  attempts: Attempt[];
  tests: TestRecord[];
  learned: number[];
  vehicle: Vehicle;
}
const initial: Progress = { attempts: [], tests: [], learned: [], vehicle: "light" };
const Context = createContext<{
  progress: Progress;
  user: User | null;
  online: boolean;
  syncState: string;
  name: string;
  retry: string[];
  record: (a: Attempt[], t?: TestRecord) => void;
  learn: (cat: number) => void;
  setVehicle: (v: Vehicle) => void;
  refresh: () => Promise<void>;
}>({
  progress: initial,
  user: null,
  online: true,
  syncState: "On this device",
  name: "Learner",
  retry: [],
  record: () => {},
  learn: () => {},
  setVehicle: () => {},
  refresh: async () => {},
});
const db = () =>
  openDB("k53-study", 1, {
    upgrade(d) {
      d.createObjectStore("progress");
    },
  });
export function StudyProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(initial),
    [user, setUser] = useState<User | null>(null),
    [online, setOnline] = useState(true),
    [syncState, setSyncState] = useState("On this device"),
    [name, setName] = useState("Learner"),
    [ready, setReady] = useState(false);
  const current = useRef(progress),
    identity = useRef<User | null>(null),
    key = useRef("guest"),
    busy = useRef(false),
    generation = useRef(0);
  current.current = progress;
  const send = useServerFn(syncProgress),
    read = useServerFn(loadProgress);
  const persist = (p: Progress) => {
    current.current = p;
    setProgress(p);
    void db().then((d) => d.put("progress", p, key.current));
  };
  const refresh = async () => {
    const account = identity.current;
    if (!account || !navigator.onLine || busy.current || !ready) return;
    busy.current = true;
    const g = generation.current;
    setSyncState("Syncing…");
    try {
      const d = await db();
      const saved = (await d.get("progress", `synced:${account.id}`)) ?? {
        attempts: [],
        tests: [],
      };
      const snapshot = current.current;
      const attempts = snapshot.attempts.filter((a) => !saved.attempts.includes(a.id)),
        tests = snapshot.tests.filter((t) => !saved.tests.includes(t.id));
      for (let i = 0; i < attempts.length; i += 500)
        await send({ data: { attempts: attempts.slice(i, i + 500), tests: [] } });
      for (let i = 0; i < tests.length; i += 50)
        await send({ data: { attempts: [], tests: tests.slice(i, i + 50) } });
      const remote = await read();
      if (g !== generation.current) return;
      const latest = current.current;
      const mergedA = Array.from(
        new Map([...remote.attempts, ...latest.attempts].map((a) => [a.id, a])).values(),
      ).sort((a, b) => a.created_at.localeCompare(b.created_at));
      const mergedT = Array.from(
        new Map([...remote.tests, ...latest.tests].map((t) => [t.id, t as TestRecord])).values(),
      );
      persist({ ...latest, attempts: mergedA, tests: mergedT });
      setName(remote.profile?.display_name || account.user_metadata?.["display_name"] || "Learner");
      await d.put(
        "progress",
        { attempts: remote.attempts.map((a) => a.id), tests: remote.tests.map((t) => t.id) },
        `synced:${account.id}`,
      );
      setSyncState("All progress saved");
    } catch {
      if (g === generation.current) setSyncState("Saved here · sync pending");
    } finally {
      busy.current = false;
    }
  };
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    const switchUser = async (next: User | null) => {
      const g = ++generation.current;
      identity.current = next;
      setReady(false);
      setProgress(initial);
      setName("Learner");
      key.current = next ? `user:${next.id}` : "guest";
      const d = await db();
      const saved = await d.get("progress", key.current);
      if (g !== generation.current) return;
      current.current = saved ?? initial;
      setProgress(saved ?? initial);
      setUser(next);
      setReady(true);
    };
    void supabase.auth.getUser().then(({ data }) => switchUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) return;
      if (event === "SIGNED_OUT") void switchUser(null);
      else void supabase.auth.getUser().then(({ data }) => switchUser(data.user));
    });
    return () => {
      data.subscription.unsubscribe();
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  useEffect(() => {
    if (ready && user && online) void refresh();
    else setSyncState("On this device");
  }, [ready, user?.id, online]);
  useEffect(() => {
    if (!user || !online) return;
    const timer = setInterval(() => void refresh(), 30000);
    return () => clearInterval(timer);
  }, [user?.id, online, ready]);
  const record = (a: Attempt[], t?: TestRecord) => {
    persist({
      ...current.current,
      attempts: [...current.current.attempts, ...a],
      tests: t ? [...current.current.tests, t] : current.current.tests,
    });
    if (user && online) void refresh();
  };
  return (
    <Context.Provider
      value={{
        progress,
        user,
        online,
        syncState,
        name,
        retry: retryIds(progress.attempts),
        record,
        learn: (cat) =>
          persist({ ...current.current, learned: [...new Set([...current.current.learned, cat])] }),
        setVehicle: (vehicle) => persist({ ...current.current, vehicle }),
        refresh,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStudy = () => useContext(Context);

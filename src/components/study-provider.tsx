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
export function StudyProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(initial);
  const [user, setUser] = useState<User | null>(null);
  const [online, setOnline] = useState(true);
  const [syncState, setSyncState] = useState("On this device");
  const [name, setName] = useState("Learner");
  const loaded = useRef(false);
  const busy = useRef(false);
  const current = useRef(progress);
  current.current = progress;
  const send = useServerFn(syncProgress),
    read = useServerFn(loadProgress);
  const db = () =>
    openDB("k53-study", 1, {
      upgrade(d) {
        d.createObjectStore("progress");
      },
    });
  const refresh = async () => {
    if (!user || !navigator.onLine || busy.current) return;
    busy.current = true;
    setSyncState("Syncing…");
    try {
      const d = await db();
      const saved = (await d.get("progress", `synced:${user.id}`)) ?? { attempts: [], tests: [] };
      const p = current.current;
      const attempts = p.attempts.filter((a) => !saved.attempts.includes(a.id));
      const tests = p.tests.filter((t) => !saved.tests.includes(t.id));
      for (let i = 0; i < attempts.length; i += 500)
        await send({ data: { attempts: attempts.slice(i, i + 500), tests: [] } });
      for (let i = 0; i < tests.length; i += 50)
        await send({ data: { attempts: [], tests: tests.slice(i, i + 50) } });
      const remote = await read();
      const mergedA = Array.from(
        new Map([...remote.attempts, ...p.attempts].map((a) => [a.id, a])).values(),
      ).sort((a, b) => a.created_at.localeCompare(b.created_at));
      const mergedT = Array.from(
        new Map([...remote.tests, ...p.tests].map((t) => [t.id, t as TestRecord])).values(),
      );
      setProgress({ ...p, attempts: mergedA, tests: mergedT });
      setName(remote.profile?.display_name || user.user_metadata?.["display_name"] || "Learner");
      await d.put(
        "progress",
        { attempts: mergedA.map((a) => a.id), tests: mergedT.map((t) => t.id) },
        `synced:${user.id}`,
      );
      setSyncState("All progress saved");
    } catch {
      setSyncState("Saved here · sync pending");
    } finally {
      busy.current = false;
    }
  };
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    void db()
      .then((d) => d.get("progress", "guest"))
      .then((p) => {
        if (p) setProgress(p);
        loaded.current = true;
      });
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) return;
      void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    });
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (loaded.current) void db().then((d) => d.put("progress", progress, "guest"));
  }, [progress]);
  useEffect(() => {
    if (user && online) void refresh();
    else setSyncState("On this device");
  }, [user?.id, online]);
  const record = (a: Attempt[], t?: TestRecord) => {
    const p = {
      ...current.current,
      attempts: [...current.current.attempts, ...a],
      tests: t ? [...current.current.tests, t] : current.current.tests,
    };
    current.current = p;
    setProgress(p);
    void db().then((d) => d.put("progress", p, "guest"));
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
        learn: (cat) => setProgress((p) => ({ ...p, learned: [...new Set([...p.learned, cat])] })),
        setVehicle: (vehicle) => setProgress((p) => ({ ...p, vehicle })),
        refresh,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStudy = () => useContext(Context);

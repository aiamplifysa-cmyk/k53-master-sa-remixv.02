import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  ready: boolean;
  loadError: string | null;
  cloudError: string | null;
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
  ready: false,
  loadError: null,
  cloudError: null,
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
    [ready, setReady] = useState(false),
    [loadError, setLoadError] = useState<string | null>(null),
    [cloudError, setCloudError] = useState<string | null>(null);
  const current = useRef(progress),
    identity = useRef<User | null>(null),
    key = useRef("guest"),
    busy = useRef<number | null>(null),
    generation = useRef(0);
  current.current = progress;
  const send = useServerFn(syncProgress),
    read = useServerFn(loadProgress);
  const retry = useMemo(() => retryIds(progress.attempts), [progress.attempts]);
  const persist = (p: Progress) => {
    const storageKey = key.current;
    current.current = p;
    setProgress(p);
    void db().then((d) => d.put("progress", p, storageKey));
  };
  const refresh = async () => {
    const account = identity.current;
    if (!account || !navigator.onLine || busy.current === generation.current || !ready) return;
    const g = generation.current;
    busy.current = g;
    const isCurrentAccount = () => generation.current === g && identity.current?.id === account.id;
    setSyncState("Syncing…");
    try {
      const d = await db();
      const saved = (await d.get("progress", `synced:${account.id}`)) ?? {
        attempts: [],
        tests: [],
      };
      if (!isCurrentAccount()) return;
      const snapshot = current.current;
      const savedAttemptIds = new Set((saved.attempts ?? []) as string[]);
      const savedTestIds = new Set((saved.tests ?? []) as string[]);
      const attempts = snapshot.attempts.filter((a) => !savedAttemptIds.has(a.id)),
        tests = snapshot.tests.filter((t) => !savedTestIds.has(t.id));
      for (let i = 0; i < attempts.length; i += 500) {
        if (!isCurrentAccount()) return;
        await send({ data: { attempts: attempts.slice(i, i + 500), tests: [] } });
        if (!isCurrentAccount()) return;
      }
      for (let i = 0; i < tests.length; i += 50) {
        if (!isCurrentAccount()) return;
        await send({ data: { attempts: [], tests: tests.slice(i, i + 50) } });
        if (!isCurrentAccount()) return;
      }
      const remote = await read();
      if (!isCurrentAccount()) return;
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
      if (isCurrentAccount()) setSyncState("Saved here · sync pending");
    } finally {
      if (busy.current === g) busy.current = null;
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
      current.current = initial;
      setReady(false);
      setLoadError(null);
      setUser(null);
      setProgress(initial);
      setName("Learner");
      const storageKey = next ? `user:${next.id}` : "guest";
      key.current = storageKey;
      try {
        const d = await db();
        const saved = await d.get("progress", storageKey);
        if (g !== generation.current) return;
        current.current = saved ?? initial;
        setProgress(saved ?? initial);
        setUser(next);
        setReady(true);
      } catch (error) {
        if (g !== generation.current) return;
        console.error("Could not restore study progress", error);
        setLoadError("Saved progress could not be loaded. Reload the app to try again.");
      }
    };
    const initialGeneration = generation.current;
    const reportCloudError = (error: unknown) => {
      if (generation.current !== initialGeneration) return;
      console.error("Could not initialize cloud sync", error);
      setCloudError("Account sync is unavailable. You can still study on this device.");
      void switchUser(null);
    };
    let unsubscribe = () => {};
    try {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) return;
        setCloudError(null);
        void switchUser(session?.user ?? null);
      });
      unsubscribe = () => data.subscription.unsubscribe();
      void supabase.auth
        .getSession()
        .then(({ data: sessionData, error }) => {
          if (generation.current !== initialGeneration) return;
          if (error) {
            reportCloudError(error);
            return;
          }
          setCloudError(null);
          void switchUser(sessionData.session?.user ?? null);
        })
        .catch(reportCloudError);
    } catch (error) {
      reportCloudError(error);
    }
    return () => {
      unsubscribe();
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
    if (!ready) return;
    persist({
      ...current.current,
      attempts: [...current.current.attempts, ...a],
      tests: t ? [...current.current.tests, t] : current.current.tests,
    });
    if (user && online) void refresh();
  };
  const value = useMemo(
    () => ({
      progress,
      user,
      ready,
      loadError,
      cloudError,
      online,
      syncState,
      name,
      retry,
      record,
      learn: (cat) => {
        if (!ready) return;
        persist({ ...current.current, learned: [...new Set([...current.current.learned, cat])] });
      },
      setVehicle: (vehicle) => {
        if (!ready) return;
        persist({ ...current.current, vehicle });
      },
      refresh,
    }),
    [cloudError, loadError, name, online, progress, ready, retry, syncState, user],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useStudy = () => useContext(Context);





































after fix





















































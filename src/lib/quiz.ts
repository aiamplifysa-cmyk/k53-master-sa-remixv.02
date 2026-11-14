import { useMemo } from "react";

export function retryIds(attempts: { question_id: string; correct: boolean }[]) {
  const state: Record<string, number> = {};
  for (const a of attempts) {
    if (!a.correct) state[a.question_id] = 0;
    else if (a.question_id in state) state[a.question_id] = (state[a.question_id] ?? 0) + 1;
  }
  return Object.keys(state).filter((id) => (state[id] ?? 0) < 2);
}





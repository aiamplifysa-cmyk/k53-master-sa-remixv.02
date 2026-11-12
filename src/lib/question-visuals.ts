import { artworkFor } from "@/components/sign-graphic";
import { GROUP_INFO, signByCode } from "@/data/signs";
import type { Question } from "@/lib/quiz";

export type Visual =
  | { kind: "sign"; code: string; label: string }
  | { kind: "image"; url: string; cap: string };

const CODE_RE = /\(?\b(R|W|GE|IN|TW|TR|RM|RTM|WM|GM|S|GD)\)?\s?(\d+(?:\.\d+)?)\b/g;

/** Official sign codes named in the question text that have verified chart artwork. */
export function signCodesIn(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(CODE_RE)) {
    const code = `${m[1]}${m[2]}`;
    if (artworkFor(code) && !out.includes(code)) out.push(code);
  }
  return out;
}

const packCode = (url: string) => url.match(/k53_sign_([A-Z]+\d+(?:_\d+)?)\.png$/)?.[1]?.replace("_", ".");

export function labelFor(code: string) {
  const s = signByCode(code);
  return s ? `${GROUP_INFO[s.group].family} sign · ${code} · ${s.name}` : `Sign ${code}`;
}

/** Pictures to show for a question: official chart artwork first, then supporting pack images.
 *  Vehicle-control component tables are hidden because they list the answer. */
export function questionVisuals(q: Question): Visual[] {
  const codes = signCodesIn(q.q);
  const visuals: Visual[] = [];
  for (const img of q.images ?? []) {
    if (/numbered vehicle controls/i.test(img.cap)) continue;
    const c = packCode(img.url);
    if (c && artworkFor(c)) {
      if (!codes.includes(c)) codes.push(c);
      continue;
    }
    visuals.push({ kind: "image", url: img.url, cap: img.cap });
  }
  return [...codes.map((code) => ({ kind: "sign" as const, code, label: labelFor(code) })), ...visuals];
}

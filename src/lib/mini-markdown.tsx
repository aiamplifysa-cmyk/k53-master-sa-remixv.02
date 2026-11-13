import type { ReactNode } from "react";
/** Small renderer for the trusted About & Legal text: headings, rules, nested bullets, bold, italic, links. */
function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s)]+)/g;
  let last = 0, i = key;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={i++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("*")) out.push(<em key={i++}>{t.slice(1, -1)}</em>);
    else out.push(<a key={i++} href={t} target="_blank" rel="noreferrer">{t}</a>);
    last = m.index! + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
export function MiniMarkdown({ source }: { source: string }) {
  const blocks: ReactNode[] = [];
  let list: { text: string; children: string[] }[] | null = null;
  const flush = () => {
    if (!list) return;
    blocks.push(
      <ul key={blocks.length}>
        {list.map((li, n) => (
          <li key={n}>
            {inline(li.text)}
            {li.children.length ? <ul>{li.children.map((c, k) => <li key={k}>{inline(c)}</li>)}</ul> : null}
          </li>
        ))}
      </ul>,
    );
    list = null;
  };
  for (const raw of source.split("\n")) {
    const line = raw.replace(/\s+$/, "");
    const bullet = line.match(/^(\s*)\* (.*)$/);
    if (bullet) {
      const text = bullet[2] ?? "";
      if ((bullet[1] ?? "").length >= 2 && list?.length) list[list.length - 1]!.children.push(text);
      else (list ??= []).push({ text, children: [] });
      continue;
    }
    flush();
    if (!line.trim()) continue;
    const k = blocks.length;
    if (line === "---") blocks.push(<hr key={k} />);
    else if (line.startsWith("### ")) blocks.push(<h3 key={k}>{inline(line.slice(4))}</h3>);
    else if (line.startsWith("## ")) blocks.push(<h2 key={k}>{inline(line.slice(3))}</h2>);
    else if (line.startsWith("# ")) blocks.push(<h1 key={k}>{inline(line.slice(2))}</h1>);
    else blocks.push(<p key={k}>{inline(line)}</p>);
  }
  flush();
  return <>{blocks}</>;
}

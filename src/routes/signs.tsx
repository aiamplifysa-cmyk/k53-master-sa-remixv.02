import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignGraphic, artworkFor } from "@/components/sign-graphic";
import { SIGNS, GROUP_INFO, SIGN_GROUPS, type SignGroup } from "@/data/signs";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/signs")({
  head: () =>
    pageHead(
      "Road signs library",
      "Explore South African regulatory, warning, guidance, temporary signs, road markings and signals.",
    ),
  component: Signs,
});
function Signs() {
  const [search, setSearch] = useState(""),
    [group, setGroup] = useState("all"),
    [flash, setFlash] = useState(false),
    [index, setIndex] = useState(0),
    [revealed, setRevealed] = useState(false),
    [expanded, setExpanded] = useState<string | null>(null);
  const signs = SIGNS.filter(
    (s) =>
      (group === "all" || s.group === group) &&
      `${s.code} ${s.name} ${s.meaning}`.toLowerCase().includes(search.toLowerCase()),
  );
  const active = signs[index % Math.max(1, signs.length)];
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE LANGUAGE OF SOUTH AFRICAN ROADS</span>
          <h1>Road signs library</h1>
          <p>{SIGNS.length} master entries · regulatory, warning, guidance, markings and signals</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setFlash(!flash);
            setRevealed(false);
          }}
        >
          <RotateCcw />
          {flash ? "Browse library" : "Flashcards"}
        </Button>
      </div>
      <div className="sign-toolbar">
        <div className="search-field">
          <Search size={18} />
          <Input
            aria-label="Search road signs"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIndex(0);
            }}
            placeholder="Search a sign, code or meaning…"
          />
        </div>
        <select
          aria-label="Sign group"
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
            setIndex(0);
          }}
        >
          <option value="all">All sign groups</option>
          {SIGN_GROUPS.map((g) => (
            <option key={g} value={g}>
              {GROUP_INFO[g].label}
            </option>
          ))}
        </select>
        <span>{signs.length} signs</span>
      </div>
      {flash && active ? (
        <div className="flashcard">
          <span className="eyebrow">
            {(index % signs.length) + 1} / {signs.length} · {active.code}
          </span>
          <SignGraphic sign={active} />
          {revealed ? (
            <>
              <h2>{active.name}</h2>
              <p>{active.meaning}</p>
            </>
          ) : (
            <Button onClick={() => setRevealed(true)}>Reveal meaning</Button>
          )}
          <div className="lesson-actions">
            <Button
              variant="outline"
              aria-label="Previous flashcard"
              onClick={() => {
                setIndex((i) => (i + signs.length - 1) % signs.length);
                setRevealed(false);
              }}
            >
              <ArrowLeft />
            </Button>
            <Button
              aria-label="Next flashcard"
              onClick={() => {
                setIndex((i) => i + 1);
                setRevealed(false);
              }}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      ) : (
        <div className="sign-grid">
          {signs.map((s) => (
            <article className="sign-card" key={s.code}>
              <div className="sign-card-image">
                <SignGraphic sign={s} />
              </div>
              <div className="sign-code">
                {s.code}
                <span>{GROUP_INFO[s.group as SignGroup].family}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.meaning}</p>
              {s.variants.length ? (
                <>
                  <Button
                    variant="link"
                    onClick={() => setExpanded(expanded === s.code ? null : s.code)}
                  >
                    {expanded === s.code ? "Hide" : "View"} {s.variants.length} variants
                  </Button>
                  {expanded === s.code ? (
                    <div className="sign-variants">
                      {s.variants.map((v) => {
                        const code = v.split(" ")[0] ?? v;
                        return (
                          <div key={v}>
                            {artworkFor(code) ? <SignGraphic sign={{ ...s, code }} /> : null}
                            <span>{v}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              ) : null}
            </article>
          ))}
        </div>
      )}
      {!signs.length ? (
        <div className="empty-state">
          <h2>No matching signs.</h2>
          <p>Try a different code or keyword.</p>
        </div>
      ) : null}
    </>
  );
}

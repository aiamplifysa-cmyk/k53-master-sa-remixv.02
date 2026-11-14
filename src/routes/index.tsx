import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  ClipboardCheck,
  Signpost,
  Target,
  TrendingUp,
  ChevronRight,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudy } from "@/components/study-provider";
import { CATEGORIES } from "@/data/categories";
import { QUESTIONS } from "@/lib/quiz";
import { SIGNS } from "@/data/signs";
import { pageHead } from "@/lib/metadata";
import road from "@/assets/study-road.jpg";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "My learning",
      "Your South African K53 study journey: eight categories, road signs, practice and mock tests.",
    ),
  component: Dashboard,
});
function Dashboard() {
  const { progress, name } = useStudy();
  const { answered, accuracy } = useMemo(() => {
    const answered = new Set(progress.attempts.map((a) => a.question_id)).size;
    const accuracy = progress.attempts.length
      ? Math.round(
          (progress.attempts.filter((a) => a.correct).length / progress.attempts.length) * 100,
        )
      : 0;
    return { answered, accuracy };
  }, [progress.attempts]);
  const next = useMemo(
    () => CATEGORIES.findIndex((_, i) => !progress.learned.includes(i)),
    [progress.learned],
  );
  const allCategoriesExplored = next === -1;
  const questionCountByCat = useMemo(() => {
    const counts = new Map<number, number>();
    for (const question of QUESTIONS) {
      counts.set(question.cat, (counts.get(question.cat) ?? 0) + 1);
    }
    return counts;
  }, []);
  const attemptsByCat = useMemo(() => {
    const counts = new Map<number, number>();
    for (const attempt of progress.attempts) {
      counts.set(attempt.category, (counts.get(attempt.category) ?? 0) + 1);
    }
    return counts;
  }, [progress.attempts]);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">LET’S KEEP MOVING</span>
          <h1>
            {allCategoriesExplored
              ? "You’ve explored every category."
              : progress.attempts.length
                ? `Welcome back, ${name}.`
                : "Your road to ready starts here."}
          </h1>
          <p>A little learning today. A lot more confidence tomorrow.</p>
        </div>
        <span className="journey-label">
          <RouteIcon size={16} />
          Your learner’s journey
        </span>
      </div>
      <section className="road-feature">
        <img
          src={road}
          alt="An open South African road winding through green mountains"
          width={1408}
          height={704}
        />
        <div className="road-shade" />
        <div className="road-copy">
          <span className="feature-label">
            <span />
            LEARN. PRACTISE. PASS.
          </span>
          <h2>K53 Master SA</h2>
          <p>
            Know the signs. Understand the rules.
            <br />
            Take the next turn with confidence.
          </p>
          <Button asChild size="lg">
            {allCategoriesExplored ? (
              <Link to="/practice">
                Practise all categories
                <ArrowRight />
              </Link>
            ) : (
              <Link to="/learn" search={{ category: next }}>
                {progress.learned.length ? "Continue learning" : "Start your learning journey"}
                <ArrowRight />
              </Link>
            )}
          </Button>
        </div>
        <div className="road-caption">
          <MapPinIcon /> SOUTH AFRICAN ROADS. YOUR NEXT CHAPTER.
        </div>
      </section>
      <section className="stats-row">
        <Stat
          icon={BookOpen}
          label="Categories explored"
          value={`${progress.learned.length} / 8`}
          sub="Build a strong foundation"
        />
        <Stat
          icon={ClipboardCheck}
          label="Questions practised"
          value={String(answered)}
          sub={`${QUESTIONS.length} questions to explore`}
        />
        <Stat
          icon={Target}
          label="Practice accuracy"
          value={progress.attempts.length ? `${accuracy}%` : "—"}
          sub="Every answer is a step forward"
        />
        <Stat
          icon={ShieldCheck}
          label="Learning progress"
          value={`${Math.round((progress.learned.length / 8) * 100)}%`}
          sub="Your own pace. Your own path."
        />
      </section>
      <div className="learning-layout">
        <section className="learning-section">
          <div className="section-heading">
            <div>
              <h2>Your learning path</h2>
              <p>Eight essentials. One confident driver.</p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/learn">
                View all
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="path-steps">
            {["Learn", "Practise", "Review", "Mock test", "Ready"].map((s, i) => (
              <span key={s} className={i === 0 ? "step-active" : ""}>
                <b>{i + 1}</b>
                {s}
                {i < 4 ? <ChevronRight size={14} /> : null}
              </span>
            ))}
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat, i) => {
              const learned = progress.learned.includes(i);
              const attempts = attemptsByCat.get(i) ?? 0;
              return (
                <Link
                  to="/learn"
                  search={{ category: i }}
                  key={cat.name}
                  className={`category-card category-tone-${i % 4}`}
                >
                  <div className="category-top">
                    <span className="category-number">{String(i + 1).padStart(2, "0")}</span>
                    {learned ? (
                      <span className="category-status">
                        <Check size={12} />
                        Explored
                      </span>
                    ) : i === next ? (
                      <span className="category-status next-status">Start here</span>
                    ) : null}
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                  <div className="category-bottom">
                    <span>{questionCountByCat.get(i) ?? 0} questions</span>
                    <span>
                      {attempts ? "In progress" : "Explore"}
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <aside className="study-aside">
          <div className="section-heading">
            <h2>A little every day</h2>
          </div>
          <div className="daily-note">
            <div className="daily-icon">
              <TrendingUp />
            </div>
            <h3>
              Small steps.
              <br />
              Lasting confidence.
            </h3>
            <p>Make time for a few questions. Come back tomorrow and keep your momentum.</p>
            <span>
              <Clock size={14} /> A 10-question check-in
            </span>
            <Button asChild>
              <Link to="/practice">
                Let’s practise
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <Link to="/signs" className="signs-preview">
            <div className="preview-signs">
              <svg viewBox="0 0 100 100" aria-label="Stop sign">
                <polygon
                  points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
                  fill="var(--sign-red)"
                  stroke="var(--sign-paper)"
                  strokeWidth="3"
                />
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  fill="var(--sign-paper)"
                  fontSize="25"
                  fontWeight="800"
                >
                  STOP
                </text>
              </svg>
              <svg viewBox="0 0 100 100" aria-label="Maximum speed 60">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="var(--sign-paper)"
                  stroke="var(--sign-red)"
                  strokeWidth="9"
                />
                <text
                  x="50"
                  y="64"
                  textAnchor="middle"
                  fontSize="41"
                  fontWeight="700"
                  fill="var(--sign-ink)"
                >
                  60
                </text>
              </svg>
            </div>
            <span className="eyebrow">READ THE ROAD</span>
            <h3>Every sign has a story.</h3>
            <p>Explore {SIGNS.length} road-sign entries and what they mean.</p>
            <span className="text-link">
              Open the sign library
              <ArrowRight size={16} />
            </span>
          </Link>
          <div className="study-tip">
            <span>THE K53 MINDSET</span>
            <p>
              “Look ahead. Think ahead.
              <br />
              Leave yourself a way out.”
            </p>
            <small>Defensive driving starts with observation.</small>
          </div>
        </aside>
      </div>
    </>
  );
}
function MapPinIcon() {
  return <Signpost size={13} />;
}
function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="stat">
      <div>
        <span>{label}</span>
        <Icon size={19} />
      </div>
      <strong>{value}</strong>
      <small>{sub}</small>
    </div>
  );
}
































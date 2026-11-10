import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudy } from "@/components/study-provider";
import { QuizPlayer } from "@/components/quiz-player";
import { QUESTIONS, shuffle, type Question } from "@/lib/quiz";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/review")({
  head: () =>
    pageHead("Review mistakes", "Revisit missed K53 questions and strengthen your weak spots."),
  component: Review,
});
function Review() {
  const { retry } = useStudy();
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const pool = QUESTIONS.filter((q) => retry.includes(q.id));
  if (quiz) return <QuizPlayer questions={quiz} onClose={() => setQuiz(null)} />;
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR RETRY PILE</span>
          <h1>Turn mistakes into mastery.</h1>
          <p>{pool.length} questions to revisit. Two correct attempts clear each one.</p>
        </div>
      </div>
      {pool.length ? (
        <>
          <Button onClick={() => setQuiz(shuffle(pool))}>
            Review {pool.length} questions
            <ArrowRight />
          </Button>
          <div className="review-list">
            {pool.map((q) => (
              <div className="answer-review" key={q.id}>
                <span>{q.id}</span>
                <strong>{q.q}</strong>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <CheckCircle2 size={44} />
          <h2>A clear road ahead.</h2>
          <p>Your missed questions will appear here after practice.</p>
          <Button asChild>
            <Link to="/practice">
              Start practising
              <ArrowRight />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}

import { describe, expect, it } from "vitest";
import { syncProgressSchema } from "@/lib/progress.schemas";

const created_at = "2026-01-01T00:00:00.000Z";
const id = "00000000-0000-4000-8000-000000000001";

describe("progress sync payload", () => {
  it("accepts bounded practice and mock results produced by the app", () => {
    const result = syncProgressSchema.safeParse({
      attempts: [
        {
          id,
          question_id: "question-1",
          category: 0,
          correct: true,
          created_at,
        },
      ],
      tests: [
        { id, mode: "practice", results: { correct: 2, total: 3 }, created_at },
        {
          id: "00000000-0000-4000-8000-000000000002",
          mode: "mock",
          results: {
            passed: false,
            sections: [
              {
                key: "rules",
                name: "Rules of the road",
                count: 28,
                pass: 22,
                total: 28,
                correct: 20,
                passed: false,
              },
              {
                key: "signs",
                name: "Signs, markings & signals",
                count: 28,
                pass: 23,
                total: 28,
                correct: 25,
                passed: true,
              },
              {
                key: "controls",
                name: "Vehicle controls",
                count: 8,
                pass: 6,
                total: 8,
                correct: 7,
                passed: true,
              },
            ],
          },
          created_at,
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("rejects unbounded result data and oversized sync batches", () => {
    expect(
      syncProgressSchema.safeParse({
        attempts: [],
        tests: [
          {
            id,
            mode: "practice",
            results: { correct: 1, total: 1, arbitrary: "not part of the result contract" },
            created_at,
          },
        ],
      }).success,
    ).toBe(false);
    expect(syncProgressSchema.safeParse({ attempts: Array(501).fill({}), tests: [] }).success).toBe(
      false,
    );
  });
});

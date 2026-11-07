# K53 Master SA — Learn, Practise, Pass

A South African K53 learner app built from all your uploads: the 373-question bank with sign images, the Tests A/B/C papers, the K53 learner manual, road sign charts, signage catalogue, vehicle controls manual, practical test manuals and DLTC guide. No licence-code split — everything is organised by your categories.

## Categories (used everywhere)
1. Sign categories
2. Regulatory and warning signs
3. Road markings
4. Traffic signals and traffic officers
5. Driving rules, safety and vehicle loads
6. K53 defensive-driving system and steering
7. Vehicle controls and licensing documents
8. Learner licensing, vehicle standards and road safety

Every question gets one of these. About 100 questions already have one; the remaining ~270 are sorted into the same 8 by matching their wording and source section. Duplicates across Tests A/B/C are merged; the 2 questions with unclear answers are held back and shown to you for checking.

## Learning path (the logical order)
```text
Learn  ->  Practise  ->  Review mistakes  ->  Mock test  ->  Ready
```
- **Learn**: each category is a short lesson (from the learner manual and charts) followed by the signs/rules it covers.
- **Practise**: questions for that category, instant feedback with the correct answer explained.
- **Review**: every missed question goes into a "Retry" pile; answering it right twice clears it (spaced repetition).
- **Mock test**: unlocks once you've practised all categories; built like the real learner's test.
- **Readiness meter**: per-category mastery % on the dashboard so you see what to study next.

## Road signs library
- Every sign listed, each with its code (e.g. R1, W201), name, group, and plain-language explanation.
- Groups follow the sign charts: Regulatory (control, command, prohibition, reservation, comprehensive), Warning, Guidance, Information, Road markings, Traffic signals, Temporary/roadworks.
- All signs render: drawn as crisp scalable images built from the signage catalogue and sign charts, with the question-pack images used where they exist. A check runs to confirm no sign is missing a picture or explanation.
- Search, filter by group, and flashcard mode (see sign, guess meaning).

## How tests are compiled
- Real learner's test structure: 3 sections — Rules of the road, Road signs/markings/signals, Vehicle controls — mapped from the 8 categories.
- Question counts and pass marks follow the official format (e.g. 30/68 questions with section-by-section pass marks; fail one section = fail the test).
- Questions are picked randomly but balanced across categories, no repeats in one test, answer order shuffled, timer shown.
- Results show pass/fail per section, each wrong answer with explanation, and feed your Retry pile.
- Extra modes: quick 10-question quiz, category test, "weak spots" test from your mistakes.

## Pages
Home, Sign in/up, Dashboard (progress + what to study next), Learn (8 categories), Road Signs, Practise, Mock Test + Results, Practical Driving Guide (yard and road test checklists from the K53 manuals, plus vehicle controls), DLTC Guide, original PDFs to download.

## Accounts
Learners sign in; their answers, mastery, Retry pile and test history are saved privately.

## Technical details
- Lovable Cloud: profiles, question attempts, test attempts — private per user.
- Questions, categories, signs and guide content shipped as structured app data; sign images as generated SVGs plus hosted pack images; PDFs hosted for download.
- Tests for: category mapping completeness, every sign has image + explanation, test builder section counts / pass marks / no duplicates.

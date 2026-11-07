# K53 Master SA — Learn, Practise, Pass

A South African K53 learner app built from your uploads: the 373-question bank with sign images, Tests A/B/C papers, K53 learner manual, road sign charts, road signs catalogue (pages 2–49 only), vehicle controls manual, practical test manuals and DLTC guide. Organised only by your 8 categories — no licence-code split.

## Categories (used everywhere)
1. Sign categories
2. Regulatory and warning signs
3. Road markings
4. Traffic signals and traffic officers
5. Driving rules, safety and vehicle loads
6. K53 defensive-driving system and steering
7. Vehicle controls and licensing documents
8. Learner licensing, vehicle standards and road safety

Every question gets one category. Duplicates across Tests A/B/C are merged; questions with unclear answers are held back for your review.

## Learning path
```text
Learn  ->  Practise  ->  Review mistakes  ->  Mock test  ->  Ready
```
- **Learn**: short lesson per category, then the signs/rules it covers.
- **Practise**: instant feedback with explanation.
- **Review**: missed questions go to a Retry pile; two correct answers clear it.
- **Mock test**: unlocks after practising all categories.
- **Readiness meter**: per-category mastery % and "study next" suggestion.

## Road signs library (road signs only)
- Scope: Road Traffic Signs from catalogue pages 2–49 plus the 5 DoT sign chart sheets. Workplace/OHS signs (pages 50–72) excluded.
- ~350 master sign cards, each with code (R1, W201…), name, group, plain-language explanation.
- Variants (e.g. speed limits 60/80/100/120, temporary TR versions) shown as expandable chips on the parent card, so all ~650 catalogue variants are covered without clutter.
- Groups: Regulatory (control, command, prohibition, reservation, comprehensive), Warning, Guidance, Information, Road markings, Traffic signals, Temporary/roadworks.
- Every sign renders: crisp drawn SVGs, using the question-pack images where they exist. An automated check fails if any sign lacks an image or explanation.
- Search, group filter, flashcard mode.

## Diagram questions (vehicle controls)
- The 81 vehicle-control questions without A/B/C/D options are turned into "identify the control" questions: labelled diagram + numbered parts, with options built from the manual's control list.
- Vehicle type toggle (motorcycle / light / heavy) inside Category 7 only.

## How tests are compiled
- Real learner's test: 3 sections — Rules of the road, Signs/markings/signals, Vehicle controls — mapped from the 8 categories.
- Official question counts and per-section pass marks; failing any section fails the test.
- Random but balanced picks, no repeats, shuffled answers, timer.
- Results: pass/fail per section, wrong answers explained, fed into Retry pile.
- Extra modes: quick 10-question quiz, category test, weak-spots test.

## Pages
Home, Sign in/up, Dashboard, Learn, Road Signs, Practise, Mock Test + Results, Practical Driving Guide (yard/road checklists, pre-trip inspection), DLTC Guide, PDF downloads.

## Offline vs online
| On device (works offline) | Online (Lovable Cloud) |
| --- | --- |
| All questions, signs, lessons, guides | Sign in (email + Google) |
| Practice, mock tests, Retry pile | Progress sync across devices |
| Progress saved locally first | Test history, mastery, Retry pile backup |
| | PDF downloads |

Installable on the phone home screen; offline mode works in the published app (not the editor preview).

## Handling 500+ users at once
- Study content is shipped with the app and served from the global edge — studying puts no load on the database.
- Answers are saved locally and synced in batches (end of a quiz/test), not on every tap.
- Sign images cached long-term; failed syncs retry automatically.

## Technical details
- Lovable Cloud: profiles, question_attempts, test_attempts, retry_items — RLS private per user; batched upserts via server functions.
- Content as typed static data modules (questions, categories, signs, variants, guides); signs as SVG components plus pack images.
- PWA via vite-plugin-pwa (generateSW, guarded registration, NetworkFirst navigations); local queue in IndexedDB for sync.
- Tests: category mapping completeness, every sign has image + explanation, test builder section counts / pass marks / no duplicates, diagram questions all have options.

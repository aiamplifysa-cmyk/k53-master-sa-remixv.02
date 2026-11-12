# Sign library audit against the SA Road Signs Catalogue

Current library: 389 master signs in 18 groups, no repeated codes. This audit checks it against the catalogue (road-sign pages 2–49) and the 5 DoT chart sheets.

## What you get
- An audit report (PDF + spreadsheet in Files) listing every sign with status:
  - Missing: in the catalogue/charts but not in the app
  - Duplicated: same sign under two codes, or a variant listed as a separate master sign
  - Miscategorized: wrong group (e.g. warning listed as regulatory) or wrong K53 category
  - Name/meaning mismatch against the official label
  - Artwork mismatch: the chart crop shows a different sign than the code
- A summary with counts per group and a short list of fixes needing your decision.
- No app changes in this step; fixes follow after you review the report.

## Steps
1. Read catalogue pages 2–49 (image-only) page by page with text recognition plus visual checks, recording each sign code, name and section heading.
2. Pull codes and labels from the chart sheets' text layer.
3. Merge into one official list, normalising codes (e.g. (R)520 vs R520, variant suffixes).
4. Compare with the app library: missing, extra, duplicate (by code, alias and near-identical name), group vs code prefix and catalogue section.
5. Spot-check every sign's artwork crop by rendering contact sheets and reviewing them.
6. Write the report; mark low-confidence items "needs manual check" rather than guessing.

## Technical details
- Sources: Signage-Catalogue.pdf pp. 2–49, RTSigns_charts PDF; app data src/data/signs.ts, sign-aliases.ts, sign-artwork.json.
- Prefix rules: R=regulatory, W=warning, G/GD/IN/T=guidance/info/tourism, RM/RTM/WM/GM=markings, TR/TW/TG=temporary.
- Output: /mnt/documents/sign-audit.pdf and sign-audit.xlsx.

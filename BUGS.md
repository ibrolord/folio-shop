# Planted bug (operator notes)

The store ships with one deliberately planted bug, sitting in a path the
existing test suite does not cover, so `npm test` is green on `main` and
AnnotateQA has to write the reproduction itself. Report it through the widget
(or the bottom-right launcher) to drive the demo.

## The bug

Clicking **"Apply newsletter discount (SAVE10)"** in the cart crashes. The total
stays $50.00, a "couldn't apply that code" message appears, and the console
logs a `TypeError`.

`savingsLabel()` in `public/src/pricing.js` builds the "you saved $X" line from
`promo.amount`, but the promo's discount field is named `value`, so
`promo.amount` is undefined and `.toFixed(2)` throws the moment a promo is
applied. `summarize()` itself is correct, which is why the unit suite stays
green: the bug only lives on the untested `savingsLabel` path.

## Why this bug fits the live loop

AnnotateQA reproduces bugs by driving the running app with Playwright and
asserting the console stays clean. This bug throws a console error from a single
click, with no typing required, so the generated reproduction catches it and the
fix clears it. The fix-run clones the repo, runs `npm ci`, confirms the
reproduction fails, patches `savingsLabel`, then re-runs the reproduction plus
the existing 13 unit tests before opening the PR.

See [PR #4](https://github.com/ibrolord/folio-shop/pull/4).

## Honesty

The bug is planted; the reproduction, the model-generated patch, and the pull
request are real. The reproduction is written by AnnotateQA from the captured
report, not from this file.

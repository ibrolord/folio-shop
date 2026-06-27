# Planted bugs (operator notes)

This store ships with three deliberately planted bugs. Each is a small, real
defect sitting in a path the existing test suite does **not** cover — so
`npm test` is green on `main`, and AnnotateQA has to write the reproduction
itself. File these as bug reports through the widget to drive the demo.

| # | Report a customer would file | Where it lives | Has regression? |
|---|------------------------------|----------------|-----------------|
| 1 | "I added code **SAVE10** but my total still shows $50 — the 10% never came off." | `src/pricing.js` (`summarize`) | **Yes** |
| 2 | "Your newsletter form won't accept my email (**priya+deals@folio.com**)." | `src/email.js` (`isValidEmail`) | No |
| 3 | "Searching **NOTEBOOK** finds nothing, but **Notebook** works." | `src/catalog.js` (`searchProducts`) | No |

### Why bug #1 is the showpiece
`summarize` reads the wrong field for the discount, so it's always `0`. Shipping
is keyed off the **discounted total**, which is fine today only because the
discount is always 0. The naive fix (apply the discount) drops a $50 cart to
$45 and re-breaks the existing **"keeps free shipping when a promo is applied"**
test. AnnotateQA's verify step catches that regression and revises. That's the
"it caught its own mistake" beat — and it's real here, not staged.

### Honesty
The bugs are planted; the fix-runs and PRs are real. The reproductions are
written by AnnotateQA from the captured report, not from this file.

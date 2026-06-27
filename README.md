# Folio — a demo store that ships with bugs on purpose

Folio is a tiny storefront we use to show [AnnotateQA](https://annotateqa.com)
doing the thing it's for: turning a customer's bug report into a reviewed pull
request.

It has three known bugs baked in (a promo code that doesn't apply, a form that
rejects valid emails, and a case-sensitive product search). A user reports one
through the widget; AnnotateQA reproduces it as a failing test, fixes it, checks
the fix against this repo's existing test suite, and opens a **draft PR** you
review and merge.

**The bugs are planted. The pull requests are real** — open them and read the
reproduction, the diff, and the test output:

- SAVE10 promo not applied → [PR #_](#)
- Newsletter rejects valid emails → [PR #_](#)
- Search is case-sensitive → [PR #_](#)

## Run it

```bash
npm install
npm test        # the existing suite — green, because the bugs sit in untested paths
npm run dev     # serve the store at http://localhost:3000
```

## Layout

```
src/pricing.js   cart + promo + shipping math
src/email.js     newsletter / checkout email validation
src/catalog.js   product catalog + search
src/format.js    currency formatting
test/            the existing suite AnnotateQA verifies fixes against
```

The bugs and the demo script are in [BUGS.md](./BUGS.md).

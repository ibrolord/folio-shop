# Wiring up the Show HN demo

The repo and the replay page are built. These are the steps that need the live
AnnotateQA product — once they're done you have a no-signup page where anyone
can pick a real bug, watch the real run, and open the real PR.

## 1. Push this repo public
```bash
cd demo-shop
git init && git add -A && git commit -m "Folio demo store"
gh repo create folio-shop --public --source=. --push   # or push to a repo you made
```

## 2. Connect it to AnnotateQA
In the dashboard:
- Create a project (e.g. "Folio demo").
- Install the GitHub App on the `folio-shop` repo and set the repo URL.
- Turn on **Auto-Fix** for the project (it's opt-in).
- Build the code index for the repo.

## 3. Deploy the store + drop in the widget
- Deploy `demo-shop/` to any static host (Vercel / Cloudflare Pages / Netlify).
  The store is at `/`, the replay page at `/show/`.
- Paste your project's widget loader into `index.html` (the marked comment near
  the bottom), so reports filed on the store land in this project.

## 4. File the three bugs → three draft PRs
Open the live store and file each report from [BUGS.md](./BUGS.md) through the
widget (or trigger the fix-runs from the dashboard):

1. "Tried SAVE10 but my total still shows $50 — the 10% never came off."
2. "Your signup won't accept my email, priya+deals@folio.com."
3. "The bundle price shows as $1099.00 — no comma."

Let each run finish. You should get **3 draft PRs**. Eyeball each against
BUGS.md — the SAVE10 one should show the regression-and-revise.

## 5. Pull the real runs into the replay page
Grab each run's fix-run id from the Auto-Fix tab, then:
```bash
ANNOTATE_TOKEN=<your dashboard token> \
  node scripts/export-runs.mjs save10=<id> email=<id> format=<id>
```
This writes the real **PR links, PR numbers, diffs, and cost/time** into
`show/runs.json`. The script prints each real diff — if the model fixed
something differently than the sample steps, tweak that bug's
"Proposing the smallest fix" step in `runs.json` so the replay matches reality.

Commit and redeploy. The replay page now links real PRs.

## 6. Ship the post
Drop the three PR links and the `/show/` URL into the HN post.

---

### Notes
- **Honesty:** the replay says "you're watching a replay, not a live run" — keep
  that. Never present it as executing live.
- **If a run opens no PR:** that's the real product behaving (it declines when it
  can't verify a fix). Re-file with a sharper report, or pick a different bug —
  don't fake a PR.
- **Optional, later:** a rate-limited "run a fresh one" button (a real run on
  demand) is the live "A-tier" upgrade. Skip it for day one.

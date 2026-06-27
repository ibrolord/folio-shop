#!/usr/bin/env node
// Pulls real Auto-Fix runs from AnnotateQA and writes the real PR links + diffs
// + cost/time into show/runs.json, so the replay page shows the genuine article.
//
// Usage:
//   ANNOTATE_TOKEN=... node scripts/export-runs.mjs save10=<fixRunId> email=<fixRunId> format=<fixRunId>
//
// Get a fix-run id from the Auto-Fix tab (it's in the run's URL / the API).
// ANNOTATE_API defaults to the hosted API; override for self-hosted.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RUNS = path.resolve(__dirname, '../show/runs.json');
const API = (process.env.ANNOTATE_API || 'https://annotate-api-production.up.railway.app').replace(/\/+$/, '');
const TOKEN = process.env.ANNOTATE_TOKEN;

if (!TOKEN) {
  console.error('Set ANNOTATE_TOKEN (your dashboard bearer token).');
  process.exit(1);
}

const map = {};
for (const arg of process.argv.slice(2)) {
  const i = arg.indexOf('=');
  if (i > 0) map[arg.slice(0, i)] = arg.slice(i + 1);
}
if (Object.keys(map).length === 0) {
  console.error('Pass at least one bugId=fixRunId, e.g. save10=abc123');
  process.exit(1);
}

async function getRun(id) {
  const res = await fetch(`${API}/fix-runs/${id}`, { headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`fix-run ${id}: ${res.status} ${await res.text().catch(() => '')}`);
  return res.json();
}

function diffLines(run) {
  const edits = run.patch_edits?.edits || [];
  const lines = [];
  for (const e of edits) {
    for (const l of String(e.old_str ?? '').split('\n')) if (l.trim()) lines.push({ del: l });
    for (const l of String(e.new_str ?? '').split('\n')) if (l.trim()) lines.push({ add: l });
  }
  return { lines, files: new Set(edits.map((e) => e.file_path)).size };
}

function statsFor(run, diff) {
  const added = diff.lines.filter((l) => 'add' in l).length;
  const removed = diff.lines.filter((l) => 'del' in l).length;
  const cents = run.cost_breakdown?.total_cost_cents;
  const ms = Object.values(run.phase_timings || {}).reduce((s, p) => s + (p?.duration_ms || 0), 0);
  const parts = [`+${added} −${removed}`, `${diff.files || 1} file${diff.files === 1 ? '' : 's'}`];
  if (ms) parts.push(`~${Math.round(ms / 1000)}s`);
  if (typeof cents === 'number') parts.push(`$${(cents / 100).toFixed(2)}`);
  return parts.join(' · ');
}

const data = JSON.parse(fs.readFileSync(RUNS, 'utf8'));
const byId = Object.fromEntries(data.bugs.map((b) => [b.id, b]));

for (const [bugId, fixRunId] of Object.entries(map)) {
  const bug = byId[bugId];
  if (!bug) { console.warn(`! no bug "${bugId}" in runs.json — skipping`); continue; }
  const run = await getRun(fixRunId);
  const diff = diffLines(run);

  bug.pr_url = run.pr_url || '';
  bug.pr_number = run.pr_number ?? bug.pr_number;
  bug.stats = statsFor(run, diff);

  console.log(`\n■ ${bugId}  (fix-run ${fixRunId})`);
  console.log(`  status   : ${run.status}`);
  console.log(`  PR       : ${run.pr_url || '(none — run did not open a PR)'}`);
  console.log(`  stats    : ${bug.stats}`);
  console.log(`  real diff:`);
  for (const l of diff.lines) console.log(`    ${'add' in l ? '+ ' + l.add : '- ' + l.del}`);
  console.log(`  → If the diff above differs from the sample steps in runs.json, update that bug's`);
  console.log(`    "Proposing the smallest fix" step so the replay matches your actual run.`);
}

fs.writeFileSync(RUNS, JSON.stringify(data, null, 2) + '\n');
console.log(`\n✓ wrote ${path.relative(process.cwd(), RUNS)} — PR links, numbers and stats are now real.`);

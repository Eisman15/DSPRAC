#!/usr/bin/env node
/* Regenerates QUESTIONS.md and NOTES.md from the data files and bumps the ?v= cache-busting
   version in index.html. Run from the repo root:  node tools/build.js
   Options:  --no-bump   regenerate the Markdown only */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const LETTERS = 'ABCDEFGH';

// Load the data files exactly as the browser does: qb.js defines window.QB, data files call it.
const ctx = { window: {} };
vm.createContext(ctx);
const load = (rel) => vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });
load('js/qb.js');
ctx.QB = ctx.window.QB;
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataFiles = [...index.matchAll(/<script src="(data\/[^"?]+)/g)].map(m => m[1]);
dataFiles.forEach(load);
const QB = ctx.QB;

/* Minimal HTML → Markdown for the tags the data uses (b, i, br, p, ul/ol/li, table, h4, code, sub, sup, div). */
function md(html) {
  if (!html) return '';
  let s = html.replace(/\r/g, '');
  s = s.replace(/<table>([\s\S]*?)<\/table>/g, (_, t) => '\n\n' + table(t) + '\n\n');
  s = s.replace(/<h4>([\s\S]*?)<\/h4>/g, '\n\n#### $1\n\n');
  s = s.replace(/<ol>([\s\S]*?)<\/ol>/g, (_, l) => '\n\n' + list(l, true) + '\n\n');
  s = s.replace(/<ul>([\s\S]*?)<\/ul>/g, (_, l) => '\n\n' + list(l, false) + '\n\n');
  s = s.replace(/<p>/g, '\n\n').replace(/<\/p>/g, '\n\n');
  s = s.replace(/<br\s*\/?>/g, '  \n');
  s = s.replace(/<\/?div[^>]*>/g, '\n');
  s = inline(s);
  return s.replace(/[ \t]+\n/g, m => (m.startsWith('  ') ? '  \n' : '\n')).replace(/\n{3,}/g, '\n\n').trim();
}
function inline(s) {
  return s
    .replace(/<b>([\s\S]*?)<\/b>/g, '**$1**')
    .replace(/<i>([\s\S]*?)<\/i>/g, '*$1*')
    .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
    .replace(/<sub>([\s\S]*?)<\/sub>/g, '_$1')
    .replace(/<sup>([\s\S]*?)<\/sup>/g, '^$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
}
function list(inner, ordered) {
  const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => inline(m[1]).replace(/\s*\n\s*/g, ' ').trim());
  return items.map((t, i) => (ordered ? `${i + 1}. ` : '- ') + t).join('\n');
}
function table(inner) {
  const rows = [...inner.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(r =>
    [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(c => inline(c[1].replace(/<br\s*\/?>/g, ' ')).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()));
  if (!rows.length) return '';
  const width = Math.max(...rows.map(r => r.length));
  const line = (r) => '| ' + Array.from({ length: width }, (_, i) => r[i] || '').join(' | ') + ' |';
  return [line(rows[0]), '|' + ' --- |'.repeat(width), ...rows.slice(1).map(line)].join('\n');
}

function questionMd(q, heading) {
  const out = [];
  out.push(`### ${heading}`, '');
  const tags = [`Week ${q.week}`, q.t];
  if (q.official !== undefined || q.src) tags.push(q.official ? '**Official**' : 'New');
  out.push(`*${tags.join(' · ')}*`, '');
  out.push(md(q.q), '');
  if (q.img) out.push(`![${q.imgAlt || 'figure'}](${q.img})`, '');
  if (q.note) out.push(`> ${md(q.note)}`, '');
  q.o.forEach((o, i) => out.push(`${LETTERS[i]}. ${md(o)}`));
  out.push('');
  out.push(`<details><summary>Answer: ${LETTERS[q.a]}</summary>`, '');
  out.push(`**Answer: ${LETTERS[q.a]}.** ${md(q.s)}`, '');
  out.push(`**Concept.** ${md(q.c)}`, '');
  out.push('**Why each option is right or wrong:**', '');
  q.w.forEach((w, i) => out.push(`- **${LETTERS[i]}.** ${md(w)}`));
  out.push('');
  if (q.steps) {
    out.push('**Worked steps:**', '');
    q.steps.forEach((s, i) => out.push(`${i + 1}. ${md(s)}`));
    out.push('');
  }
  if (q.src) out.push(`*Source: ${q.src}*`, '');
  out.push('</details>', '');
  return out.join('\n');
}

// Same rules GitHub uses for heading anchors.
const slug = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s/g, '-');

// QUESTIONS.md
{
  const nOff = QB.mock.filter(q => q.official).length;
  const nWeek = QB.weeks.reduce((n, w) => n + w.questions.length, 0);
  const out = ['# IFN509 exam practice: all questions', '',
    `Generated from \`data/*.js\` by \`node tools/build.js\`. Don't edit by hand; edit the data files and rebuild.`, '',
    `${QB.mock.length} Mock Quiz questions (${nOff} official, ${QB.mock.length - nOff} new) and ${nWeek} weekly questions. Answers are in the collapsible blocks.`, '',
    '## Contents', '', '- [Mock Quiz](#mock-quiz)'];
  QB.weeks.forEach(w => out.push(`- [Week ${w.week}: ${w.title}](#${slug(`week ${w.week} ${w.title}`)})`));
  out.push('', '## Mock Quiz', '');
  QB.mock.forEach((q, i) => out.push(questionMd(q, `Mock Q${i + 1}`)));
  QB.weeks.forEach(w => {
    out.push(`## Week ${w.week}: ${w.title}`, '');
    w.questions.forEach((q, i) => out.push(questionMd(Object.assign({ week: w.week }, q), `W${w.week} Q${i + 1}`)));
  });
  fs.writeFileSync(path.join(root, 'QUESTIONS.md'), out.join('\n').replace(/\n{3,}/g, '\n\n'));
}

// NOTES.md
{
  const out = ['# IFN509 study notes', '',
    `Generated from \`data/*.js\` by \`node tools/build.js\`. Don't edit by hand; edit the data files and rebuild.`, '', '## Contents', ''];
  QB.weeks.forEach(w => out.push(`- [Week ${w.week}: ${w.title}](#${slug(`week ${w.week} ${w.title}`)})`));
  out.push('');
  QB.weeks.forEach(w => {
    out.push(`## Week ${w.week}: ${w.title}`, '');
    w.notes.forEach(n => out.push(`### ${n.h}`, '', md(n.html), ''));
  });
  fs.writeFileSync(path.join(root, 'NOTES.md'), out.join('\n').replace(/\n{3,}/g, '\n\n'));
}

// Cache-busting version
if (!process.argv.includes('--no-bump')) {
  const d = new Date();
  const v = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}` +
    `${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`;
  fs.writeFileSync(path.join(root, 'index.html'), index.replace(/\?v=[0-9a-z]+/g, `?v=${v}`));
  console.log(`index.html asset version -> ${v}`);
}
console.log('Wrote QUESTIONS.md and NOTES.md');

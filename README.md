# IFN509 Exam Practice

A mobile-first multiple choice practice site for **IFN509 Introduction to Data Science** (QUT, Semester 2 2026). It's plain HTML, CSS and JavaScript with no build tools, hosted on GitHub Pages.

- **Mock Quiz:** all 41 official sample questions from the Week 13 Unit Review (word for word, marked *Official*), plus 21 new questions in the same style. Where an official question was short-answer, multiple choice options were added and a note says so.
- **By Week:** 194 questions across weeks 1–12. Filter by week and show them in week order or at random.
- **Exam:** 50 random questions spread evenly across the weeks, with a 60-minute timer. Answers and explanations appear only after you submit, along with a score per week.
- **Study Notes:** one chapter per week with key topics, formulas, worked examples and exam traps. Week 12 ends with a one-page formula sheet.

Practice modes give instant feedback: a short explanation, then an in-depth one covering the concept, why each option is right or wrong, and worked steps for calculations. Options are shuffled, except where they refer to each other (e.g. "A and C").

The same content is in [QUESTIONS.md](QUESTIONS.md) and [NOTES.md](NOTES.md) for reading on GitHub.

## Files

```
index.html          page shell; loads every script with a ?v= version
css/style.css       styles (light/dark tokens at the top)
js/qb.js            QB registry that the data files call
js/app.js           the app (tabs, practice, exam, notes)
data/mock.js        Mock Quiz questions
data/w01.js … w12.js  one file per week: notes + questions
img/                figures used by official questions
tools/build.js      regenerates QUESTIONS.md / NOTES.md and bumps ?v=
```

## Editing questions

Each week file calls `QB.addWeek({ week, title, notes: [...], questions: [...] })`. A question looks like this:

```js
{ t: "Topic",                       // shown as a chip
  q: "Question stem (HTML allowed)",
  o: ["Option A", "Option B", "Option C", "Option D"],
  a: 2,                             // index of the correct option (0 = A)
  s: "Short explanation",
  c: "Underlying concept",
  w: ["Why A is wrong", "Why B is wrong", "Why C is right", "Why D is wrong"],  // same order as o
  steps: ["Step 1", "Step 2"] }     // optional worked steps
```

Mock Quiz entries in `data/mock.js` also take `week`, plus optional `official: true`, `src`, `note`, `img` and `imgAlt`. Add `fix: true` to any question whose options must stay in order. Options that mention other options are detected automatically.

Notes are `{ h: "Heading", html: "..." }`. Give a section an `id` to link to it (the formula sheet uses `id: "formula-sheet"`).

## Preview locally

```sh
python -m http.server 8000
# open http://localhost:8000
```

## Publish a change

```sh
node tools/build.js          # regenerate QUESTIONS.md and NOTES.md, bump ?v= in index.html
git add -A
git commit -m "Update questions"
git push
```

GitHub Pages redeploys within a minute or two. The `?v=` bump makes browsers fetch the new scripts instead of serving stale cached ones. If you skip the build, bump the version in `index.html` by hand.

The lecture slides are not in this repository. Only the figures needed by the official questions are included.

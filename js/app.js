/* IFN509 exam practice app. Plain JS, no build step.
   Views: Mock Quiz and By Week (practice, instant feedback), Exam (timed, feedback after submit),
   Study Notes. State that should survive a reload lives in localStorage (wrapped in try/catch). */
(() => {
  'use strict';

  const EXAM_SIZE = 50;
  const EXAM_MINUTES = 60;
  const LETTERS = 'ABCDEFGH';

  const $ = (sel, el = document) => el.querySelector(sel);
  const view = $('#view');
  const bar = $('#bottombar');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const barInfo = $('#barInfo');

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('ifn509.' + key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('ifn509.' + key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
    },
    del(key) {
      try { localStorage.removeItem('ifn509.' + key); } catch (e) { /* storage unavailable */ }
    }
  };

  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* ───────── Question bank ───────── */

  // Options that refer to other options ("A and C", "1-(ii)", "Both", "Statement A ...") keep their order.
  const ORDER_BOUND_OPT = /(above|both|neither|all of|none of|statement|\b(only )?\(?[ivx]+\)? and \(?[ivx]+\)?|^[A-E]( and |, ?)[A-E]|^\(?[A-E]\)?$|^[a-d]?\(?[ivx]+\)?$|\d-\([ivx]+\)|[A-D]-\([ivx]+\))/i;
  const LETTER_REF = /\b(option|options) [A-E]\b|\(([a-e])\)|\b[A-E] and [A-E]\b|\b[A-E] is\b/;

  const weekTitle = {};
  QB.weeks.forEach(w => { weekTitle[w.week] = w.title; });

  const byId = {};
  const weekQs = {};
  const mockQs = [];

  function register(q) {
    q.fixed = !!(q.official || q.fix || q.o.some(o => ORDER_BOUND_OPT.test(o)) ||
      q.w.some(x => LETTER_REF.test(x)) || LETTER_REF.test(q.s) || /statement|[ivx]+\)/i.test(q.q));
    byId[q.id] = q;
  }
  QB.weeks.forEach(w => {
    weekQs[w.week] = w.questions.map((q, i) => {
      const item = Object.assign({}, q, { id: `w${w.week}-${i + 1}`, week: w.week, num: i + 1 });
      register(item);
      return item;
    });
  });
  QB.mock.forEach((q, i) => {
    const item = Object.assign({}, q, { id: `m${i + 1}`, num: i + 1, mock: true });
    register(item);
    mockQs.push(item);
  });
  const WEEKS = QB.weeks.map(w => w.week);

  const permFor = (q) => q.fixed ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i));

  /* ───────── Rendering helpers ───────── */

  function questionCard(q, { label, chosen, perm, mode }) {
    // mode: 'practice' (feedback once answered), 'exam' (selection only), 'review' (always feedback)
    const answered = chosen !== undefined && chosen !== null;
    const reveal = mode === 'review' || (mode === 'practice' && answered);
    const chips = [
      `<span class="chip num">${label}</span>`,
      `<span class="chip">Week ${q.week}</span>`,
      `<span class="chip">${q.t}</span>`
    ];
    if (q.mock) chips.push(q.official ? '<span class="chip official">Official</span>' : '<span class="chip new">New</span>');

    const opts = perm.map((orig, pos) => {
      let cls = 'opt';
      if (reveal) {
        if (orig === q.a) cls += ' correct';
        else if (orig === chosen) cls += ' wrong';
      } else if (orig === chosen) cls += ' selected';
      const disabled = reveal ? ' disabled' : '';
      return `<li><button type="button" class="${cls}" data-orig="${orig}"${disabled}>` +
        `<span class="letter">${LETTERS[pos]}</span><span>${q.o[orig]}</span></button></li>`;
    }).join('');

    const fig = q.img ? `<figure class="qfig"><a href="${q.img}" target="_blank" rel="noopener"><img src="${q.img}" alt="${q.imgAlt || 'Figure for this question'}" loading="lazy"></a><figcaption>Tap the figure to enlarge</figcaption></figure>` : '';
    const note = q.note ? `<p class="qnote">${q.note}</p>` : '';

    return `<article class="qcard" data-id="${q.id}">
      <div class="qmeta">${chips.join('')}</div>
      <div class="stem">${q.q}</div>${fig}${note}
      <ol class="opts" aria-label="Options">${opts}</ol>
      ${reveal ? feedback(q, perm, chosen) : ''}
    </article>`;
  }

  function feedback(q, perm, chosen) {
    const answered = chosen !== undefined && chosen !== null;
    const correctLetter = LETTERS[perm.indexOf(q.a)];
    let cls, verdict;
    if (!answered) { cls = 'skip'; verdict = `Not answered. The answer is ${correctLetter}.`; }
    else if (chosen === q.a) { cls = 'good'; verdict = '✓ Correct'; }
    else { cls = 'bad'; verdict = `✗ Incorrect. The answer is ${correctLetter}.`; }

    const why = perm.map((orig, pos) =>
      `<li class="${orig === q.a ? 'is-correct' : ''}"><b class="l">${LETTERS[pos]}.</b> ${q.w[orig]}</li>`).join('');
    const steps = q.steps ? `<h4>Worked steps</h4><ol class="steps">${q.steps.map(s => `<li>${s}</li>`).join('')}</ol>` : '';
    const src = q.src ? `<p class="src">Source: ${q.src}</p>` : '';

    return `<div class="feedback ${cls}" role="status">
      <p class="verdict">${verdict}</p>
      <p>${q.s}</p>
      <details class="explain">
        <summary>In-depth explanation</summary>
        <h4>Concept</h4><p>${q.c}</p>
        <h4>Why each option is right or wrong</h4><ul class="why">${why}</ul>
        ${steps}${src}
      </details>
    </div>`;
  }

  function showBar(show) { bar.hidden = !show; }

  function scrollTop() { window.scrollTo({ top: 0, behavior: 'auto' }); }

  /* ───────── Practice (Mock Quiz and By Week) ───────── */

  const practiceDefaults = {
    mock: { filter: 'all', order: 'seq' },
    week: { filter: 'all', order: 'seq' }
  };

  function practiceIds(mode, filter, order) {
    let list;
    if (mode === 'mock') {
      list = mockQs.filter(q => filter === 'all' || (filter === 'official' ? q.official : !q.official));
    } else {
      const weeks = filter === 'all' ? WEEKS : [Number(filter)];
      list = weeks.flatMap(w => weekQs[w] || []);
    }
    const ids = list.map(q => q.id);
    return order === 'rand' ? shuffle(ids) : ids;
  }

  function loadSession(mode) {
    let s = store.get('sess.' + mode, null);
    if (!s || !Array.isArray(s.ids) || s.ids.some(id => !byId[id])) {
      const d = practiceDefaults[mode];
      s = { filter: d.filter, order: d.order, ids: practiceIds(mode, d.filter, d.order), idx: 0, ans: {}, ord: {} };
    }
    return s;
  }

  function newSession(mode, filter, order) {
    return { filter, order, ids: practiceIds(mode, filter, order), idx: 0, ans: {}, ord: {} };
  }

  function sessionPerm(s, q) {
    const p = s.ord[q.id];
    if (Array.isArray(p) && p.length === q.o.length) return p;
    return (s.ord[q.id] = permFor(q));
  }

  let current = null; // { mode, s }

  function renderPractice(mode) {
    const s = loadSession(mode);
    current = { mode, s };
    const total = s.ids.length;
    s.idx = Math.min(Math.max(s.idx, 0), Math.max(total - 1, 0));

    let controls;
    if (mode === 'mock') {
      const nOff = mockQs.filter(q => q.official).length;
      controls = `<div class="controls">
        <div class="seg" role="group" aria-label="Which questions">
          ${segBtn('filter', 'all', `All ${mockQs.length}`, s.filter)}
          ${segBtn('filter', 'official', `Official ${nOff}`, s.filter)}
          ${segBtn('filter', 'new', `New ${mockQs.length - nOff}`, s.filter)}
        </div>
        <div class="seg" role="group" aria-label="Order">
          ${segBtn('order', 'seq', 'In order', s.order)}
          ${segBtn('order', 'rand', 'Random', s.order)}
        </div>
      </div>`;
    } else {
      const optsHtml = ['<option value="all">All weeks</option>']
        .concat(QB.weeks.map(w => `<option value="${w.week}"${String(s.filter) === String(w.week) ? ' selected' : ''}>Week ${w.week}: ${w.title}</option>`))
        .join('');
      controls = `<div class="controls">
        <select id="weekSel" aria-label="Week">${optsHtml}</select>
        <div class="seg" role="group" aria-label="Order">
          ${segBtn('order', 'seq', 'By week', s.order)}
          ${segBtn('order', 'rand', 'Random', s.order)}
        </div>
      </div>`;
    }

    const answered = s.ids.filter(id => s.ans[id] !== undefined);
    const right = answered.filter(id => s.ans[id] === byId[id].a).length;
    const pct = answered.length ? Math.round(100 * right / answered.length) : 0;
    const stats = `<p class="stats">Answered ${answered.length} of ${total} · ${right} correct${answered.length ? ` (${pct}%)` : ''}
      · <button type="button" class="linkish" data-act="reset">Start over</button></p>`;

    let body = '<p class="empty">No questions match this filter.</p>';
    if (total) {
      const q = byId[s.ids[s.idx]];
      body = questionCard(q, { label: `Q${q.num}`, chosen: s.ans[q.id], perm: sessionPerm(s, q), mode: 'practice' });
    }
    view.innerHTML = controls + stats + body;
    store.set('sess.' + mode, s);

    showBar(total > 0);
    prevBtn.disabled = s.idx === 0;
    nextBtn.disabled = s.idx >= total - 1;
    nextBtn.textContent = 'Next ›';
    barInfo.innerHTML = total ? `<b>${s.idx + 1}</b> / ${total}` : '';
  }

  function segBtn(kind, value, text, currentValue) {
    return `<button type="button" data-${kind}="${value}" aria-pressed="${String(currentValue) === value}">${text}</button>`;
  }

  function practiceClick(e) {
    const { mode, s } = current;
    const opt = e.target.closest('.opt');
    if (opt && !opt.disabled) {
      const id = opt.closest('.qcard').dataset.id;
      if (s.ans[id] !== undefined) return;
      s.ans[id] = Number(opt.dataset.orig);
      store.set('sess.' + mode, s);
      renderPractice(mode);
      const fb = $('.feedback', view);
      if (fb) fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    const f = e.target.closest('[data-filter]');
    if (f) { store.set('sess.' + mode, newSession(mode, f.dataset.filter, s.order)); renderPractice(mode); return; }
    const o = e.target.closest('[data-order]');
    if (o) { store.set('sess.' + mode, newSession(mode, s.filter, o.dataset.order)); renderPractice(mode); return; }
    if (e.target.closest('[data-act="reset"]')) {
      store.set('sess.' + mode, newSession(mode, s.filter, s.order)); renderPractice(mode); scrollTop();
    }
  }

  function practiceChange(e) {
    if (e.target.id === 'weekSel') {
      const { mode, s } = current;
      store.set('sess.' + mode, newSession(mode, e.target.value, s.order));
      renderPractice(mode);
    }
  }

  function practiceMove(delta) {
    const { mode, s } = current;
    const next = s.idx + delta;
    if (next < 0 || next >= s.ids.length) return;
    s.idx = next;
    store.set('sess.' + mode, s);
    renderPractice(mode);
    scrollTop();
  }

  /* ───────── Exam simulation ───────── */

  let exam = null;
  let examUi = { palette: false, confirm: false, review: 'all' };
  let timerId = null;

  function buildExam() {
    // Round-robin across weeks so every week is represented, then shuffle the final order.
    const pools = shuffle(WEEKS).map(w => shuffle((weekQs[w] || []).concat(mockQs.filter(q => q.week === w))));
    const picked = [];
    const seen = new Set();
    let i = 0;
    while (picked.length < EXAM_SIZE && pools.some(p => p.length)) {
      const pool = pools[i % pools.length];
      const q = pool.pop();
      if (q && !seen.has(q.id)) { picked.push(q.id); seen.add(q.id); }
      i++;
    }
    const ids = shuffle(picked);
    const ord = {};
    ids.forEach(id => { ord[id] = permFor(byId[id]); });
    const now = Date.now();
    return { ids, ord, ans: {}, idx: 0, start: now, end: now + EXAM_MINUTES * 60000, submitted: null };
  }

  function loadExam() {
    const e = store.get('exam', null);
    if (e && Array.isArray(e.ids) && e.ids.every(id => byId[id])) return e;
    return null;
  }

  function saveExam() { store.set('exam', exam); }

  function fmtTime(ms) {
    const t = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(t / 60), sec = t % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  function tick() {
    if (!exam || exam.submitted) { stopTimer(); return; }
    const left = exam.end - Date.now();
    const el = $('#timer');
    if (el) {
      el.textContent = fmtTime(left);
      el.classList.toggle('low', left < 5 * 60000);
    }
    if (left <= 0) submitExam(true);
  }

  function submitExam(timeUp) {
    exam.submitted = Math.min(Date.now(), exam.end);
    exam.timeUp = !!timeUp;
    saveExam();
    stopTimer();
    examUi = { palette: false, confirm: false, review: 'all' };
    renderExam();
    scrollTop();
  }

  function renderExam() {
    stopTimer();
    exam = loadExam();
    if (exam && !exam.submitted && Date.now() >= exam.end) { submitExam(true); return; }

    if (!exam) return renderExamStart();
    if (exam.submitted) return renderExamResults();

    const total = exam.ids.length;
    const q = byId[exam.ids[exam.idx]];
    const done = exam.ids.filter(id => exam.ans[id] !== undefined).length;

    const head = `<div class="exam-head">
      <span class="timer" id="timer" aria-label="Time left">${fmtTime(exam.end - Date.now())}</span>
      <div class="row" style="flex:0 1 auto">
        <button type="button" class="btn" data-act="palette" aria-expanded="${examUi.palette}">Questions</button>
        <button type="button" class="btn primary" data-act="finish">Submit</button>
      </div>
    </div>`;

    const palette = examUi.palette ? `<div class="palette" role="group" aria-label="Jump to question">${
      exam.ids.map((id, i) => `<button type="button" data-jump="${i}" class="${exam.ans[id] !== undefined ? 'done' : ''}${i === exam.idx ? ' current' : ''}">${i + 1}</button>`).join('')
    }</div>` : '';

    const confirm = examUi.confirm ? `<div class="panel confirm" role="alertdialog" aria-labelledby="cfh">
      <h2 id="cfh">Submit the exam?</h2>
      <p>You have answered ${done} of ${total} questions.${done < total ? ` ${total - done} unanswered will be marked wrong.` : ''}</p>
      <div class="row">
        <button type="button" class="btn" data-act="cancel">Keep going</button>
        <button type="button" class="btn primary" data-act="submit">Submit now</button>
      </div>
    </div>` : '';

    view.innerHTML = head + confirm + palette +
      questionCard(q, { label: `Q${exam.idx + 1}`, chosen: exam.ans[q.id], perm: exam.ord[q.id], mode: 'exam' });

    showBar(true);
    prevBtn.disabled = exam.idx === 0;
    nextBtn.disabled = false;
    nextBtn.textContent = exam.idx >= total - 1 ? 'Finish' : 'Next ›';
    barInfo.innerHTML = `<b>${exam.idx + 1}</b> / ${total}<br>${done} answered`;

    timerId = setInterval(tick, 1000);
  }

  function renderExamStart() {
    const poolSize = Object.keys(byId).length;
    view.innerHTML = `<div class="panel">
      <h2>Exam simulation</h2>
      <ul>
        <li>${EXAM_SIZE} random questions drawn from all ${WEEKS.length} weeks (pool of ${poolSize}), spread evenly across weeks.</li>
        <li>${EXAM_MINUTES}-minute timer. The exam submits itself when time runs out.</li>
        <li>No feedback until you submit. You can change answers and jump between questions.</li>
        <li>At the end you get your score, a per-week breakdown and full explanations.</li>
        <li>Progress is saved in this browser, so a reload won't lose your place.</li>
      </ul>
      <p class="score-sub">The real exam has 22 one-mark MCQs plus 10 short-answer questions in 2 h 40 min.</p>
      <button type="button" class="btn primary block" data-act="start">Start exam</button>
    </div>`;
    showBar(false);
  }

  function renderExamResults() {
    const total = exam.ids.length;
    const right = exam.ids.filter(id => exam.ans[id] === byId[id].a).length;
    const pct = Math.round(100 * right / total);
    const used = fmtTime(exam.submitted - exam.start);

    const perWeek = {};
    exam.ids.forEach(id => {
      const q = byId[id];
      const w = (perWeek[q.week] = perWeek[q.week] || { n: 0, r: 0 });
      w.n++;
      if (exam.ans[id] === q.a) w.r++;
    });
    const rows = Object.keys(perWeek).map(Number).sort((a, b) => a - b).map(wk => {
      const { n, r } = perWeek[wk];
      const p = Math.round(100 * r / n);
      const tone = p >= 75 ? 'good' : p < 50 ? 'bad' : '';
      return `<tr><td>W${wk}</td><td>${weekTitle[wk]}</td><td class="n">${r}/${n}</td>
        <td style="width:28%"><div class="meter ${tone}"><span style="width:${p}%"></span></div></td></tr>`;
    }).join('');

    const filt = examUi.review;
    const reviewIdx = exam.ids.map((id, i) => i).filter(i => {
      const id = exam.ids[i];
      if (filt === 'wrong') return exam.ans[id] !== undefined && exam.ans[id] !== byId[id].a;
      if (filt === 'skipped') return exam.ans[id] === undefined;
      return true;
    });
    const cards = reviewIdx.map(i => {
      const id = exam.ids[i];
      return questionCard(byId[id], { label: `Q${i + 1}`, chosen: exam.ans[id], perm: exam.ord[id], mode: 'review' });
    }).join('') || '<p class="empty">Nothing to show for this filter.</p>';

    const nWrong = exam.ids.filter(id => exam.ans[id] !== undefined && exam.ans[id] !== byId[id].a).length;
    const nSkip = exam.ids.filter(id => exam.ans[id] === undefined).length;

    view.innerHTML = `<div class="panel">
      <h2>${exam.timeUp ? 'Time is up' : 'Exam submitted'}</h2>
      <p class="score-big">${pct}%</p>
      <p class="score-sub">${right} of ${total} correct · time used ${used}</p>
      <table class="weektable"><thead><tr><th>Week</th><th>Topic</th><th class="n">Score</th><th></th></tr></thead><tbody>${rows}</tbody></table>
      <div class="row" style="margin-top:12px">
        <button type="button" class="btn primary" data-act="new">New exam</button>
      </div>
    </div>
    <div class="controls">
      <div class="seg" role="group" aria-label="Review filter">
        ${segBtn('review', 'all', `All ${total}`, filt)}
        ${segBtn('review', 'wrong', `Wrong ${nWrong}`, filt)}
        ${segBtn('review', 'skipped', `Skipped ${nSkip}`, filt)}
      </div>
    </div>${cards}`;
    showBar(false);
  }

  function examClick(e) {
    const act = e.target.closest('[data-act]');
    if (act) {
      switch (act.dataset.act) {
        case 'start': exam = buildExam(); saveExam(); examUi = { palette: false, confirm: false, review: 'all' }; renderExam(); scrollTop(); return;
        case 'new': store.del('exam'); exam = null; renderExam(); scrollTop(); return;
        case 'palette': examUi.palette = !examUi.palette; renderExam(); return;
        case 'finish': examUi.confirm = true; renderExam(); scrollTop(); return;
        case 'cancel': examUi.confirm = false; renderExam(); return;
        case 'submit': submitExam(false); return;
      }
    }
    const rv = e.target.closest('[data-review]');
    if (rv) { examUi.review = rv.dataset.review; renderExam(); return; }
    const jump = e.target.closest('[data-jump]');
    if (jump) { exam.idx = Number(jump.dataset.jump); examUi.palette = false; saveExam(); renderExam(); scrollTop(); return; }
    const opt = e.target.closest('.opt');
    if (opt && !opt.disabled && exam && !exam.submitted) {
      const id = opt.closest('.qcard').dataset.id;
      exam.ans[id] = Number(opt.dataset.orig);
      saveExam();
      renderExam();
    }
  }

  function examMove(delta) {
    if (!exam || exam.submitted) return;
    const next = exam.idx + delta;
    if (next >= exam.ids.length) { examUi.confirm = true; renderExam(); scrollTop(); return; }
    if (next < 0) return;
    exam.idx = next;
    saveExam();
    renderExam();
    scrollTop();
  }

  /* ───────── Study notes ───────── */

  function renderNotes(arg) {
    const wantSheet = arg === 'formula';
    const wk = wantSheet ? WEEKS[WEEKS.length - 1] : (WEEKS.includes(Number(arg)) ? Number(arg) : store.get('notesWeek', WEEKS[0]));
    store.set('notesWeek', wk);
    const w = QB.weeks.find(x => x.week === wk);

    const picker = `<div class="weekpick" role="group" aria-label="Week">${
      QB.weeks.map(x => `<button type="button" data-nweek="${x.week}" aria-pressed="${x.week === wk && !wantSheet}">W${x.week}</button>`).join('')
    }<button type="button" data-nweek="formula" aria-pressed="${wantSheet}">Formula sheet</button></div>`;

    const secId = (n, i) => n.id || `w${wk}-n${i + 1}`;
    const toc = `<nav class="toc" aria-label="Contents"><b>Contents</b><ol>${
      w.notes.map((n, i) => `<li><a href="#notes/${wk}" data-goto="${secId(n, i)}">${n.h}</a></li>`).join('')
    }</ol></nav>`;
    const sections = w.notes.map((n, i) => `<section id="${secId(n, i)}"><h3>${n.h}</h3>${n.html}</section>`).join('');

    view.innerHTML = picker + `<div class="notes"><h2>Week ${wk}: ${w.title}</h2>${toc}${sections}</div>`;
    showBar(false);

    const active = $('.weekpick [aria-pressed="true"]', view);
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center' });
    if (wantSheet) {
      const el = document.getElementById('formula-sheet');
      if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 0);
    }
  }

  function notesClick(e) {
    const b = e.target.closest('[data-nweek]');
    if (b) { location.hash = '#notes/' + b.dataset.nweek; return; }
    const g = e.target.closest('[data-goto]');
    if (g) {
      e.preventDefault();
      const el = document.getElementById(g.dataset.goto);
      if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  /* ───────── Routing, theme, keyboard ───────── */

  let tab = 'mock';

  function route() {
    const [name, arg] = (location.hash.replace(/^#/, '') || 'mock').split('/');
    tab = ['mock', 'week', 'exam', 'notes'].includes(name) ? name : 'mock';
    document.querySelectorAll('.tabs a').forEach(a => a.setAttribute('aria-selected', String(a.dataset.tab === tab)));
    stopTimer();
    if (tab === 'mock' || tab === 'week') renderPractice(tab);
    else if (tab === 'exam') renderExam();
    else renderNotes(arg);
  }

  view.addEventListener('click', (e) => {
    if (tab === 'mock' || tab === 'week') practiceClick(e);
    else if (tab === 'exam') examClick(e);
    else notesClick(e);
  });
  view.addEventListener('change', (e) => { if (tab === 'week') practiceChange(e); });

  prevBtn.addEventListener('click', () => (tab === 'exam' ? examMove(-1) : practiceMove(-1)));
  nextBtn.addEventListener('click', () => (tab === 'exam' ? examMove(1) : practiceMove(1)));

  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest('select, input, textarea')) return;
    if (bar.hidden) return;
    if (e.key === 'ArrowRight') { nextBtn.click(); e.preventDefault(); return; }
    if (e.key === 'ArrowLeft') { prevBtn.click(); e.preventDefault(); return; }
    const k = e.key.toUpperCase();
    let pos = '12345678'.indexOf(k);
    if (pos < 0) pos = LETTERS.indexOf(k);
    if (pos >= 0) {
      const btn = view.querySelectorAll('.qcard .opt')[pos];
      if (btn && !btn.disabled) btn.click();
    }
  });

  const THEMES = ['auto', 'light', 'dark'];
  const THEME_ICON = { auto: '◐', light: '☀', dark: '☾' };
  const themeBtn = $('#themeBtn');
  function applyTheme(t) {
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    themeBtn.firstElementChild.textContent = THEME_ICON[t];
    themeBtn.setAttribute('aria-label', `Theme: ${t}. Tap to change.`);
    themeBtn.title = `Theme: ${t}`;
  }
  let theme = store.get('theme', 'auto');
  if (!THEMES.includes(theme)) theme = 'auto';
  applyTheme(theme);
  themeBtn.addEventListener('click', () => {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    store.set('theme', theme);
    applyTheme(theme);
  });

  window.addEventListener('hashchange', route);
  route();
})();

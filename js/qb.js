/* Question bank registry. Data files call QB.addWeek(...) and QB.addMock([...]).
   Loaded before the data files; app.js reads QB.weeks and QB.mock. */
window.QB = {
  weeks: [],
  mock: [],
  addWeek(w) { this.weeks.push(w); this.weeks.sort((x, y) => x.week - y.week); },
  addMock(list) { this.mock.push(...list); }
};

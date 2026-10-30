/* Password screen. Loaded in <head> so the site is hidden before it paints. This only keeps
   casual visitors out: the repository is public, so the content is readable on GitHub anyway.
   Only a SHA-256 hash of the password is stored here. Unlocking is remembered in localStorage. */
(() => {
  'use strict';

  const HASH = '677f84fb42642c956c48cb11aeb8fa1100d30e7adfccb5d304e2695b31eda0f5';
  const KEY = 'ifn509.unlocked';
  const root = document.documentElement;

  const remembered = () => {
    try { return localStorage.getItem(KEY) === HASH; } catch (e) { return false; }
  };
  if (remembered()) return;
  root.classList.add('locked');

  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function show() {
    const gate = document.createElement('form');
    gate.className = 'gate panel';
    gate.innerHTML = `
      <h2>IFN509 Exam Practice</h2>
      <p>Enter the password to continue.</p>
      <label for="gatePw" class="sr-only">Password</label>
      <input id="gatePw" type="password" autocomplete="current-password" autocapitalize="off"
        autocorrect="off" spellcheck="false" placeholder="Password" required>
      <p class="gate-err" role="alert" hidden>Wrong password. Try again.</p>
      <button class="btn primary block" type="submit">Unlock</button>`;
    document.body.prepend(gate);
    const input = gate.querySelector('input');
    const err = gate.querySelector('.gate-err');
    input.focus();

    gate.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (await sha256(input.value.trim().toLowerCase()) !== HASH) {
        err.hidden = false;
        input.select();
        return;
      }
      try { localStorage.setItem(KEY, HASH); } catch (e2) { /* storage unavailable: ask again next visit */ }
      gate.remove();
      root.classList.remove('locked');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
  else show();
})();

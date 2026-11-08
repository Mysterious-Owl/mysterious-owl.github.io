// ── Portfolio Interactivity & Theme Management ──

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollReveal();
  initYear();
});

// ── Safe localStorage (can throw in some private-browsing modes) ──
function readStoredTheme() {
  try { return localStorage.getItem('portfolio-theme'); } catch (e) { return null; }
}

function storeTheme(theme) {
  try { localStorage.setItem('portfolio-theme', theme); } catch (e) { /* ignore */ }
}

// ── Theme Management (Light / Dark mode) ──
// The initial theme is set by an inline script in <head> to avoid a flash;
// this only syncs the button and handles toggling.
function initTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = readStoredTheme() || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      storeTheme(newTheme); // persist only explicit user choices
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }
}

// ── Scroll Reveal IntersectionObserver ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Dynamic Copyright Year ──
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

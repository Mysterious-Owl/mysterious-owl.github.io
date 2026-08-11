// ── Portfolio Interactivity & Theme Management ──

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollReveal();
  initYear();
});

// ── Theme Management (Light / Dark mode) ──
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = theme === 'dark'
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
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

// ── Contact Form Handler (Client-side feedback) ──
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const statusEl = document.getElementById('form-status');
  if (statusEl) {
    statusEl.style.display = 'block';
    statusEl.innerHTML = '<span style="color:var(--green);font-weight:600;">✓ Message sent successfully! Thank you for getting in touch.</span>';
  }
  form.reset();
  return false;
}

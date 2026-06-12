const root = document.documentElement;
root.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Mobile navigation --- */

const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const header = document.querySelector('.site-header');

mobileToggle?.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', String(!expanded));
  if (mobileNav) mobileNav.hidden = expanded;
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    mobileToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* --- Header elevation on scroll --- */

const onScroll = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* --- Scroll-spy: highlight active section link in the desktop nav --- */

const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const spyTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (spyTargets.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  spyTargets.forEach((target) => spyObserver.observe(target));
}

/* --- Animated counters for the stats band --- */

const formatStat = (value, decimals) => {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString('en-IN');
};

const animateCounter = (el) => {
  const target = parseFloat(el.dataset.counter);
  if (Number.isNaN(target)) return;
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatStat(target * eased, decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

/* --- Scroll reveal with staggered children --- */

const revealEls = document.querySelectorAll('.reveal');

const activate = (el) => {
  el.classList.add('is-visible');
  if (el.hasAttribute('data-reveal-group')) {
    Array.from(el.children).forEach((child, i) => {
      child.style.setProperty('--stagger', String(i));
    });
  }
  if (!prefersReducedMotion) {
    el.querySelectorAll('[data-counter]').forEach(animateCounter);
  }
};

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activate(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* --- Footer year --- */

const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

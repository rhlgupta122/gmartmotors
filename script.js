const root = document.documentElement;
root.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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

/* --- Header elevation, scroll progress bar, hero parallax --- */

const progressBar = document.querySelector('[data-progress]');
const heroPhoto = document.querySelector('.hero-photo');
let scrollScheduled = false;

const onScroll = () => {
  scrollScheduled = false;
  const y = window.scrollY;

  if (header) header.classList.toggle('is-scrolled', y > 10);

  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  }

  if (heroPhoto && !prefersReducedMotion && y < window.innerHeight * 1.5) {
    heroPhoto.style.setProperty('--parallax', `${y * 0.22}px`);
  }
};

window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
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
  const duration = 1700;
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
const REVEAL_MS = 850;
const STAGGER_MS = 90;

const activate = (el) => {
  el.classList.add('is-visible');
  if (el.hasAttribute('data-reveal-group')) {
    const children = Array.from(el.children);
    children.forEach((child, i) => {
      child.style.setProperty('--stagger', String(i));
    });
    // Once the entrance finishes, swap to a snappy transform transition
    // so pointer-tilt feels immediate.
    window.setTimeout(() => {
      el.classList.add('motion-done');
    }, REVEAL_MS + children.length * STAGGER_MS + 120);
  }
  if (!prefersReducedMotion) {
    el.querySelectorAll('[data-counter]').forEach(animateCounter);
  }
};

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => {
    el.classList.add('is-visible');
    if (el.hasAttribute('data-reveal-group')) el.classList.add('motion-done');
  });
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activate(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* --- Pointer tilt + glow tracking on cards --- */

if (finePointer && !prefersReducedMotion) {
  const tiltCards = document.querySelectorAll('.service-card, .review-card, .faq-card, .team-card, .advantage-card');
  const MAX_TILT = 5;

  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * 2 * MAX_TILT;
      const rx = (0.5 - py) * 2 * MAX_TILT;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-5px)`;
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

/* --- Footer year --- */

const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());


/* ==========================================================================
   Reveal / Motion Engine
   Shared across the whole site: scroll-reveal for any [data-reveal] element,
   animated counters for any [data-counter], and a navbar scroll-progress
   hairline. Kept dependency-free and reduced-motion aware.
   ========================================================================== */

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      // Assign a stagger index within each reveal group so children
      // animate in sequence rather than all at once.
      document.querySelectorAll('[data-reveal-group]').forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          child.style.setProperty('--reveal-index', i);
        });
      });

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );

      revealEls.forEach((el) => observer.observe(el));
    }
  }

  /* ---------- Animated counters ---------- */
  const counterEls = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.counterSuffix || '';
    const decimals = el.dataset.counterDecimals ? parseInt(el.dataset.counterDecimals, 10) : 0;
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = target * eased;
      el.textContent = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString('en-US') + suffix;
    } else {
      requestAnimationFrame(tick);
    }
  }

  if (counterEls.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));
  } else {
    counterEls.forEach(animateCounter);
  }

  /* ---------- Navbar scroll-progress hairline ---------- */
  const progressBar = document.querySelector('[data-scroll-progress]');

  if (progressBar && !prefersReducedMotion) {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }
})();

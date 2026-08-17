/* ==========================================================================
   Hero interactions
   Subtle mouse-follow parallax on the signature route motif. Desktop only,
   disabled for touch devices and reduced-motion users.
   ========================================================================== */

(function () {
  const hero = document.querySelector('[data-hero]');
  const motif = document.querySelector('[data-hero-motif]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!hero || !motif || prefersReducedMotion || isTouch) return;

  const MAX_SHIFT = 14; // px

  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    motif.style.transform = `translate(${x * MAX_SHIFT}px, ${y * MAX_SHIFT}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    motif.style.transform = 'translate(0, 0)';
  });
})();
/* ==========================================================
   HERO TRUST PANEL ANIMATION
   ========================================================== */

(function () {

  const trustBox = document.querySelector('.hero__trust');

  if (!trustBox) return;

  const number = trustBox.querySelector('.hero__stat-value');
  const stats = trustBox.querySelectorAll('.hero__stat');

  let animated = false;

  function animateTrustPanel() {

    if (animated) return;

    animated = true;

    /* Box appears */
    trustBox.classList.add('trust-visible');

    /* Stats appear one after another */
    stats.forEach(function (stat, index) {

      setTimeout(function () {
        stat.classList.add('stat-visible');
      }, index * 180);

    });

    /* 45,000 counter */
    if (number) {

      const target = 45000;
      const duration = 900;
      const startTime = performance.now();

      function updateNumber(currentTime) {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        /* Smooth ease-out */
        const eased = 1 - Math.pow(1 - progress, 3);

        const current = Math.floor(target * eased);

        number.textContent =
          current.toLocaleString() + '+';

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          number.textContent = '45,000+';
        }
      }

      requestAnimationFrame(updateNumber);
    }
  }


  /* Start when the stats panel enters the viewport */

  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          animateTrustPanel();

          observer.disconnect();

        }

      });

    },
    {
      threshold: 0.35
    }
  );

  observer.observe(trustBox);

})();
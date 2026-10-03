/* ==========================================================================
   Global Reach Animation
   India → Worldwide Export Network

   Animation sequence:

   1. Section enters viewport
   2. India origin becomes active
   3. Routes draw sequentially
   4. Every route finishes
   5. Traveling particles begin
   6. Particles continue looping

   Lightweight:
   - IntersectionObserver
   - Native SVG animation
   - No external libraries
   - Respects prefers-reduced-motion
   ========================================================================== */

(function () {
  const stage = document.querySelector(".reach__stage");

  if (!stage) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==========================================================
     REDUCED MOTION
     ========================================================== */

  if (reduceMotion) {
    stage.classList.add("is-visible");
    return;
  }


  /* ==========================================================
     ANIMATION TIMING

     Route duration = 1.7 seconds

     Route delays:
     0
     0.3
     0.6
     0.9
     1.2
     1.5

     Final route finishes:
     1.5 + 1.7 = 3.2 seconds

     Particles start:
     3.3 seconds
     ========================================================== */

  const ROUTE_DURATION = 500;
  const ROUTE_STAGGER = 100;

  const ROUTE_COUNT = stage.querySelectorAll(
    ".reach__route"
  ).length;

  const LAST_ROUTE_DELAY =
    (ROUTE_COUNT - 1) * ROUTE_STAGGER;

  const PARTICLE_START =
    LAST_ROUTE_DELAY + ROUTE_DURATION + 100;


  /* ==========================================================
     START ANIMATION
     ========================================================== */

  function startAnimation() {

    /*
     * Adding this class allows CSS to start the visual sequence
     * only when the section actually enters the viewport.
     */
    stage.classList.add("is-visible");


    /* ----------------------------------------------------------
       Traveling particles
       ---------------------------------------------------------- */

    const particles = stage.querySelectorAll(
      ".reach__particle"
    );

    particles.forEach(function (particle) {

      /*
       * Override the CSS animation delay dynamically.
       *
       * This keeps JS and the number of routes synchronized.
       */
      particle.style.animationDelay =
        `${PARTICLE_START}ms`;

    });


    /*
     * Native SVG animateMotion already begins at 3.3s
     * from the HTML.
     *
     * We don't recreate or manipulate the SVG animation here.
     * The browser handles the continuous particle movement.
     */
  }


  /* ==========================================================
     INTERSECTION OBSERVER
     ========================================================== */

  if (!("IntersectionObserver" in window)) {

    startAnimation();

    return;
  }


  const observer = new IntersectionObserver(
    function (entries, obs) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) return;

        startAnimation();

        /*
         * Run only once.
         */
        obs.unobserve(stage);

      });

    },
    {
      threshold: 0.2
    }
  );


  observer.observe(stage);

})();
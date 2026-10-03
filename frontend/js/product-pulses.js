(function () {
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    group
      .querySelectorAll(".pulse-card")
      .forEach((card, i) => {
        card.style.setProperty("--reveal-index", i);
      });
  });
})();
(function () {
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    group.querySelectorAll('.herb-card').forEach((card, i) => {
      card.style.setProperty('--reveal-index', i);
    });
  });
})();
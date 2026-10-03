(function(){
  document.querySelectorAll('[data-reveal-group]').forEach(group=>{
    group.querySelectorAll('.spice-card').forEach((card,i)=>card.style.setProperty('--reveal-index',i));
  });
})();

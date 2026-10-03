/* ==========================================================================
   Navbar interactions
   - Toggles solid background once the page scrolls past the hero
   - Handles the mobile slide-in menu
   - Handles the mobile "Products" accordion (desktop uses hover/dropdown)
   ========================================================================== */

(function () {
  const navbar = document.querySelector('[data-navbar]');
  const toggle = document.querySelector('[data-navbar-toggle]');
  const links = document.querySelector('[data-navbar-links]');
  const dropdownItem = document.querySelector('[data-navbar-dropdown-item]');
  const dropdownTrigger = document.querySelector('[data-navbar-dropdown-trigger]');

  if (!navbar) return;

  const SCROLL_THRESHOLD = 40;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  function closeMenu() {
    toggle.classList.remove('is-open');
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('is-open');
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close the mobile menu whenever a plain nav link is followed
    links.querySelectorAll('a:not([data-navbar-dropdown-trigger])').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape for keyboard users
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // On mobile, tapping "Products" expands the category list instead of
  // navigating away. On desktop this is inert — hover handles it in CSS.
  if (dropdownTrigger && dropdownItem) {
    dropdownTrigger.addEventListener('click', (event) => {
      if (window.innerWidth > 960) return; // desktop uses hover
      event.preventDefault();
      dropdownItem.classList.toggle('is-expanded');
    });
  }
})();

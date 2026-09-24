/* ==========================================================
   Far Overseas — Blog
   ----------------------------------------------------------
   1. POSTS ........ temporary data (client's existing articles)
   2. api .......... the ONLY thing the pages call for data
   3. helpers ...... card renderer shared by blogs + blog-detail
   4. listing ...... featured / filters / search (blogs.html only)

   Backend hand-off: replace the body of api.list() with a
   fetch() to your endpoint and keep the returned shape (see
   normalize()). Nothing else in the UI needs to change.
   ========================================================== */
(function () {
  'use strict';

  /* ---------- Config ---------- */

  // Follows the site's existing convention (assets/images/...).
  // Change this one line if the images live somewhere else.
  const IMAGE_BASE = 'assets/images/blog/';
  const DETAIL_PAGE = 'blog-detail.html';
  const ALL = 'all';

  // Filter chip order. Categories with no posts are never shown;
  // categories not listed here are appended alphabetically.
  const CATEGORY_ORDER = [
    'Farming & Cultivation',
    'Organic Products',
    'Sustainability',
    'Global Trade',
    'Our People',
    'Health & Wellness'
  ];

  const img = (file) => IMAGE_BASE + file;

  /* ---------- 1. Data ----------
     Titles/excerpts are the client's extracted wording, untouched.
     date / author are null on purpose — nothing was extracted, so
     nothing is shown. Categories come from the labels in the design.

     content: ""  means the FULL article is not available yet. The
     excerpt is never used as a substitute for it; the detail page
     shows the excerpt as a summary only. Put the full text in
     `content` (blank line = new paragraph) once it exists.
  ------------------------------------------------------------ */
  const POSTS = [
    {
      id: 1,
      title: 'Healthy Soil and Its Impact on Export Quality Organic Food for Global Importers',
      slug: 'healthy-soil-export-quality-organic-food',
      excerpt: 'Healthy soil is the base of export-quality organic food. For organic food for global importers, soil health controls crop nutrition, safety, and market quality. Residue-free organic food export depends on strong soil biology. In healthy soil in organic farming…',
      image: img('soil.png'),
      category: 'Farming & Cultivation',
      date: null,
      author: null,
      featured: true,
      featuredTagline: 'Healthy Soil\nHealthier Lives',
      content: ""
    },
    {
      id: 2,
      title: 'Organic Herbs for Wellness: Pure, Certified, and Naturally Effective',
      slug: 'organic-herbs-for-wellness',
      excerpt: 'More people are realizing what traditional medicine has known for centuries, that organic herbs offer something synthetic pills can’t. Instead of isolated compounds, they combine all the natural plant elements that work in harmony, boosting effectiveness while minimizing side effects.',
      image: img('organic-herbs.png'),
      category: 'Health & Wellness',
      date: null,
      author: null,
      content: ""
    },
    {
      id: 3,
      title: 'From Cultivation to Packaging: The People Who Make It Possible',
      slug: 'from-cultivation-to-packaging',
      excerpt: 'Our foods are more than just products; they are the result of honest labor, careful processes, and a shared vision for better living. Farmers who plant and harvest. Workers who clean and check.',
      image: img('cultivation-packaging.png'),
      category: 'Our People',
      date: null,
      author: null,
      content: ""
    },
    {
      id: 4,
      title: 'Organic Food: The Health and Environmental Advantages',
      slug: 'organic-food-health-and-environmental-advantages',
      excerpt: 'Organic food means crops grown without chemical fertilizers, harsh pesticides, or GMOs. It comes from farming that puts nature first with healthy soil, natural inputs, and no artificial shortcuts.',
      image: img('organic-food.png'),
      category: 'Health & Wellness',
      date: null,
      author: null,
      content: ""
    },
    {
      id: 5,
      title: 'Organic Spices You Can Trust, Straight from Indian Farms',
      slug: 'organic-spices-you-can-trust',
      excerpt: 'Around the globe, people are choosing food that’s natural, free of chemicals, and sustainably grown. Organic spices are no longer just a premium choice; they’re becoming part of everyday cooking.',
      image: img('organic-spices.png'),
      category: 'Organic Products',
      date: null,
      author: null,
      content: ""
    },
    {
      id: 6,
      title: 'Organic Oils vs Refined Oils: What You Need to Know',
      slug: 'organic-oils-vs-refined-oils',
      excerpt: 'Have you ever wondered why oils are central to Indian culture? Traditional oils, such as castor, coconut (both virgin and extra virgin), groundnut, mustard, and sunflower, are valued for cooking. For generations, they’ve powered cooking, beauty, and Ayurveda…',
      image: img('organic-oils.png'),
      category: 'Organic Products',
      date: null,
      author: null,
      content: ""
    },
    {
      id: 7,
      title: 'Sustainability In Practice',
      slug: 'sustainability-in-practice',
      excerpt: 'Sustainability focuses on meeting the needs of the present without compromising the ability of future generations to meet their own needs. It encompasses the overall health of the society at large and it is our duty to keep assessing the long-term repercussions of our actions.',
      image: img('sustainability.png'),
      category: 'Sustainability',
      date: null,
      author: null,
      // Section headings from the source article (body text not extracted yet).
      sections: [
        'Think before you shop: Lessening the excess',
        'Go Plastic Free',
        'Food Waste',
        'Be Water Wise',
        'Reduce Textile Waste',
        'Pay Attention to Labels!',
        'Curtailing Corporate Overheads',
        'The Role of Government'
      ],
      content: ""
    },
    {
      id: 8,
      title: 'Embracing Social Responsibility at Faroverseas',
      slug: 'embracing-social-responsibility-at-faroverseas',
      excerpt: 'As part of our social responsibility, Agronic Food teamed up with Seva Mandir, an NGO from Udaipur, Rajasthan which operates chiefly in tribal areas to ensure the education of children between the ages of 6 to 14 years…',
      image: img('social-responsibility.png'),
      category: 'Social Responsibility',
      date: null,
      author: null,
      content: ""
    },
    {
      id: 9,
      title: 'Why buy organic spices?',
      slug: 'why-buy-organic-spices',
      excerpt: 'What is organic food and why is it beneficial? Organic foods are grown without pesticides or artificial growth inhibitors or hormones without using synthetic chemicals. Switching to organic food can be a little costly but then after we know its perks its certainly worth the expense.',
      image: img('why-organic-spices.png'),
      category: 'Organic Products',
      date: null,
      author: null,
      content: ""
    }
  ];

  /* ---------- 2. Data access (swap for fetch() later) ---------- */

  // The shape every post has, whatever the source.
  function normalize(post) {
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      image: post.image || '',
      imageAlt: post.imageAlt || '',
      category: post.category || '',
      date: post.date || null,          // ISO string, e.g. "2026-01-31"
      author: post.author || null,
      featured: Boolean(post.featured),
      featuredTagline: post.featuredTagline || '',
      sections: Array.isArray(post.sections) ? post.sections : [],
      content: (post.content || '').trim()   // '' = full article unavailable
    };
  }

  // Every card links by slug, so slugs must be unique.
  (function warnOnDuplicateSlugs() {
    const seen = new Set();
    POSTS.forEach((p) => {
      if (!p.slug || seen.has(p.slug)) console.warn('[blog] missing or duplicate slug:', p.slug, p.title);
      seen.add(p.slug);
    });
  })();

  const api = {
    list() {
      return Promise.resolve(POSTS.map(normalize));
    },

    getBySlug(slug) {
      const wanted = (slug || '').trim();
      return api.list().then((posts) => posts.find((p) => p.slug === wanted) || null);
    },

    // Same-category posts first, then the rest, never the current one.
    getRelated(slug, limit) {
      return api.list().then((posts) => {
        const current = posts.find((p) => p.slug === slug);
        const others = posts.filter((p) => p.slug !== slug);
        const same = others.filter((p) => current && p.category === current.category);
        const rest = others.filter((p) => !same.includes(p));
        return same.concat(rest).slice(0, limit || 3);
      });
    }
  };

  /* ---------- 3. Shared helpers ---------- */

  const ARROW_SVG =
    '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function detailUrl(slug) {
    return DETAIL_PAGE + '?slug=' + encodeURIComponent(slug);
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Sets an <img>; if the file is missing, its wrapper gets .is-missing
  // so CSS can show a branded placeholder instead of a broken icon.
  function bindImage(image, src, alt) {
    image.alt = alt || '';
    image.addEventListener('error', () => {
      if (image.parentElement) image.parentElement.classList.add('is-missing');
    });
    if (src) {
      image.src = src;
    } else if (image.parentElement) {
      image.parentElement.classList.add('is-missing');
    }
  }

  function createCard(post, index) {
    const card = el('article', 'blog-card');
    card.style.setProperty('--i', index || 0);

    const media = el('div', 'blog-card__media');
    const image = el('img', 'blog-card__img');
    image.decoding = 'async';
    image.loading = 'lazy';
    media.appendChild(image);
    bindImage(image, post.image, post.imageAlt);

    const meta = el('p', 'blog-card__meta');
    meta.appendChild(el('span', 'blog-card__category', post.category));
    const dateText = formatDate(post.date);
    if (dateText) {
      const time = el('time', 'blog-card__date', dateText);
      time.dateTime = post.date;
      meta.appendChild(time);
    }

    // One link per card; its ::after stretches over the whole card.
    const link = el('a', 'blog-card__link');
    link.href = detailUrl(post.slug);
    link.append('Read More');
    link.appendChild(el('span', 'blog-sr-only', ': ' + post.title));
    link.insertAdjacentHTML('beforeend', ARROW_SVG);

    const body = el('div', 'blog-card__body');
    body.append(meta, el('h3', 'blog-card__title', post.title), el('p', 'blog-card__excerpt', post.excerpt), link);

    card.append(media, body);
    return card;
  }

  // Keeps content clear of a fixed/absolute navbar. Does nothing if
  // the navbar is in normal flow or sticky.
  function syncNavOffset() {
    const nav = document.querySelector('[data-navbar]');
    if (!nav) return;
    const position = window.getComputedStyle(nav).position;
    const overlays = position === 'fixed' || position === 'absolute';
    document.documentElement.style.setProperty('--blog-nav-offset', overlays ? nav.offsetHeight + 'px' : '0px');
  }
  syncNavOffset();
  window.addEventListener('resize', syncNavOffset);
  window.addEventListener('load', syncNavOffset);

  // Public surface used by blog-detail.js
  window.FarOverseasBlog = { api, createCard, bindImage, detailUrl, formatDate, el };

  /* ---------- 4. Listing page ---------- */

  function initListing() {
    const grid = document.querySelector('[data-blog-grid]');
    if (!grid) return; // not the listing page

    const featuredSection = document.querySelector('[data-blog-featured]');
    const filtersEl = document.querySelector('[data-blog-filters]');
    const searchEl = document.querySelector('[data-blog-search]');
    const emptyEl = document.querySelector('[data-blog-empty]');
    const statusEl = document.querySelector('[data-blog-status]');
    const promoTpl = document.getElementById('blog-promo-template');

    const state = { category: ALL, query: '' };
    let posts = [];
    let featured = null;

    function renderFeatured(post) {
      if (!featuredSection || !post) return;
      const q = (name) => featuredSection.querySelector('[data-featured-' + name + ']');
      q('title').textContent = post.title;
      q('excerpt').textContent = post.excerpt;
      q('link').href = detailUrl(post.slug);
      q('tagline').textContent = post.featuredTagline;
      bindImage(q('img'), post.image, post.imageAlt);
      featuredSection.hidden = false;
    }

    function buildFilters() {
      const present = new Set(posts.map((p) => p.category).filter(Boolean));
      const ordered = CATEGORY_ORDER.filter((c) => present.has(c)).concat(
        Array.from(present).filter((c) => !CATEGORY_ORDER.includes(c)).sort()
      );

      [{ value: ALL, label: 'All Posts' }]
        .concat(ordered.map((c) => ({ value: c, label: c })))
        .forEach((item) => {
          const chip = el('button', 'blog-chip', item.label);
          chip.type = 'button';
          chip.dataset.category = item.value;
          chip.setAttribute('aria-pressed', String(item.value === state.category));
          filtersEl.appendChild(chip);
        });

      filtersEl.addEventListener('click', (event) => {
        const chip = event.target.closest('.blog-chip');
        if (!chip) return;
        state.category = chip.dataset.category;
        filtersEl.querySelectorAll('.blog-chip').forEach((c) => {
          c.setAttribute('aria-pressed', String(c === chip));
        });
        render();
      });
    }

    function matches(post, query) {
      if (state.category !== ALL && post.category !== state.category) return false;
      if (!query) return true;
      return (post.title + ' ' + post.excerpt + ' ' + post.category).toLowerCase().includes(query);
    }

    function render() {
      const query = state.query.trim().toLowerCase();
      const isDefaultView = state.category === ALL && !query;

      let items = posts.filter((p) => matches(p, query));
      // The featured post is already shown above the grid in the default view.
      if (isDefaultView && featured) items = items.filter((p) => p !== featured);

      const nodes = items.map((p, i) => createCard(p, i));
      if (nodes.length && promoTpl) {
        nodes.push(promoTpl.content.firstElementChild.cloneNode(true));
      }
      grid.replaceChildren(...nodes);

      grid.hidden = items.length === 0;
      emptyEl.hidden = items.length > 0;
      statusEl.textContent = items.length + (items.length === 1 ? ' article shown' : ' articles shown');
    }

    api.list().then((list) => {
      posts = list;
      featured = posts.find((p) => p.featured) || null;
      renderFeatured(featured);
      buildFilters();
      render();
    });

    searchEl.addEventListener('input', () => {
      state.query = searchEl.value;
      render();
    });

    emptyEl.querySelector('[data-blog-reset]').addEventListener('click', () => {
      state.category = ALL;
      state.query = '';
      searchEl.value = '';
      filtersEl.querySelectorAll('.blog-chip').forEach((c) => {
        c.setAttribute('aria-pressed', String(c.dataset.category === ALL));
      });
      render();
    });
  }

  initListing();
})();

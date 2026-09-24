/* ==========================================================
   Far Overseas — Blog article page
   ----------------------------------------------------------
   blog-detail.html?slug=<slug>
     -> api.getBySlug(slug)  (js/blogs.js)
     -> fills the hooks in blog-detail.html

   content  -> full article (shown as the body)
   excerpt  -> summary only, when content is "" (article unavailable)
   nothing is ever generated to fill the gap.

   Text is written with textContent, never innerHTML. When the
   backend arrives and articles contain rich HTML, sanitise it
   server-side (or with DOMPurify) before adding an HTML path.
   ========================================================== */

(function () {
  'use strict';

  const blog = window.FarOverseasBlog;
  const article = document.querySelector('[data-article]');

  if (!blog || !article) return;

  const {
    api,
    createCard,
    bindImage,
    formatDate,
    el
  } = blog;

  const $ = (selector) => document.querySelector(selector);
  const SITE = 'Far Overseas';


  /* ==========================================================
     META TAG HELPERS
     ========================================================== */

  function setMeta(attr, key, value) {
    let node = document.head.querySelector(
      'meta[' + attr + '="' + key + '"]'
    );

    if (!value) {
      if (node) node.remove();
      return;
    }

    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attr, key);
      document.head.appendChild(node);
    }

    node.setAttribute('content', value);
  }


  function updateHead(post) {
    document.title = post.title + ' | ' + SITE;

    // Only the client's own text is ever used.
    // Empty excerpt -> no description tag.
    setMeta(
      'name',
      'description',
      post.excerpt
    );

    setMeta(
      'property',
      'og:title',
      post.title + ' | ' + SITE
    );

    setMeta(
      'property',
      'og:description',
      post.excerpt
    );
  }


  /* ==========================================================
     ARTICLE META
     ========================================================== */

  function renderMeta(post) {
    const meta = $('[data-article-meta]');
    const dateText = formatDate(post.date);

    if (!meta) return;

    // Prevent duplicate meta if renderMeta is ever called again.
    meta.replaceChildren();

    if (dateText) {
      const time = el(
        'time',
        null,
        dateText
      );

      time.dateTime = post.date;

      meta.appendChild(time);
    }

    if (post.author) {
      meta.appendChild(
        el(
          'span',
          null,
          post.author
        )
      );
    }

    meta.hidden = !meta.childElementCount;
  }


  /* ==========================================================
     ARTICLE BODY
     ========================================================== */

  function renderBody(post) {
    const body = $('[data-article-body]');
    const summary = $('[data-article-summary]');

    if (!body || !summary) return;

    // Clear old content before rendering.
    body.replaceChildren();
    summary.textContent = '';
    summary.hidden = true;

    if (post.content) {
      article.dataset.content = 'full';

      post.content
        .split(/\n{2,}/)
        .map((text) => text.trim())
        .filter(Boolean)
        .forEach((text) => {
          body.appendChild(
            el(
              'p',
              null,
              text
            )
          );
        });

      body.hidden = false;
      return;
    }

    article.dataset.content =
      post.excerpt ? 'excerpt' : 'none';

    body.hidden = true;

    if (post.excerpt) {
      summary.textContent = post.excerpt;
      summary.hidden = false;
    }
  }


  /* ==========================================================
     ARTICLE SECTIONS
     ========================================================== */

  function renderSections(post) {
    const sectionContainer =
      $('[data-article-sections]');

    const list =
      $('[data-article-section-list]');

    if (!sectionContainer || !list) return;

    // Clear previous sections.
    list.replaceChildren();

    sectionContainer.hidden = true;

    if (!post.sections || !post.sections.length) {
      return;
    }

    post.sections.forEach((title) => {
      list.appendChild(
        el(
          'li',
          null,
          title
        )
      );
    });

    sectionContainer.hidden = false;
  }


  /* ==========================================================
     RELATED ARTICLES
     ========================================================== */

  function renderRelated(post) {
    const relatedSection = $('[data-related]');
    const relatedGrid = $('[data-related-grid]');

    if (!relatedSection || !relatedGrid) return;

    api
      .getRelated(post.slug, 3)
      .then((related) => {

        if (!related || !related.length) {
          relatedGrid.replaceChildren();
          relatedSection.hidden = true;
          return;
        }

        relatedGrid.replaceChildren(
          ...related.map((p, i) =>
            createCard(p, i)
          )
        );

        relatedSection.hidden = false;
      })
      .catch(() => {
        relatedGrid.replaceChildren();
        relatedSection.hidden = true;
      });
  }


  /* ==========================================================
     HERO BACKGROUND
     ----------------------------------------------------------
     Uses the SAME featured image as the article image.
     The CSS handles blur / opacity / overlay.
     ========================================================== */

  function renderHeroBackground(post) {
    const heroBg =
      $('[data-article-bg]');

    if (!heroBg) return;

    // Reset first.
    heroBg.removeAttribute('src');
    heroBg.removeAttribute('srcset');
    heroBg.removeAttribute('sizes');

    if (!post.image) {
      return;
    }

    // IMPORTANT:
    // Do NOT use bindImage() here.
    // The hero image is intentionally handled separately.
    heroBg.src = post.image;

    // Decorative image — no alt text required.
    heroBg.alt = '';

    heroBg.setAttribute(
      'aria-hidden',
      'true'
    );

    // If image fails, simply remove it.
    heroBg.onerror = function () {
      heroBg.removeAttribute('src');
    };
  }


  /* ==========================================================
     SHOW ARTICLE
     ========================================================== */

  function showArticle(post) {
    updateHead(post);


    /* --------------------------------------------------------
       Breadcrumb
       -------------------------------------------------------- */

    const crumb =
      $('[data-article-crumb]');

    if (crumb) {
      crumb.textContent =
        post.category || post.title;
    }


    /* --------------------------------------------------------
       Category
       -------------------------------------------------------- */

    const category =
      $('[data-article-category]');

    if (category) {
      category.textContent =
        post.category || '';

      category.hidden =
        !post.category;
    }


    /* --------------------------------------------------------
       Title
       -------------------------------------------------------- */

    const title =
      $('[data-article-title]');

    if (title) {
      title.textContent =
        post.title || '';
    }


    /* --------------------------------------------------------
       Main sharp article image
       -------------------------------------------------------- */

    const articleImg =
      $('[data-article-img]');

    if (articleImg) {
      bindImage(
        articleImg,
        post.image,
        post.imageAlt
      );
    }


    /* --------------------------------------------------------
       Blurred hero background
       -------------------------------------------------------- */

    renderHeroBackground(post);


    /* --------------------------------------------------------
       Remaining article content
       -------------------------------------------------------- */

    renderMeta(post);
    renderBody(post);
    renderSections(post);


    /* --------------------------------------------------------
       Show article
       -------------------------------------------------------- */

    article.hidden = false;


    /* --------------------------------------------------------
       Related articles
       -------------------------------------------------------- */

    renderRelated(post);
  }


  /* ==========================================================
     ARTICLE NOT FOUND
     ========================================================== */

  function showMissing() {
    const missing =
      $('[data-article-missing]');

    if (missing) {
      missing.hidden = false;
    }

    article.hidden = true;

    document.title =
      'Article not found | ' + SITE;
  }


  /* ==========================================================
     READ SLUG
     ========================================================== */

  const slug =
    new URLSearchParams(
      window.location.search
    ).get('slug');


  if (!slug) {
    showMissing();
    return;
  }


  /* ==========================================================
     LOAD ARTICLE
     ========================================================== */

  api
    .getBySlug(slug)
    .then((post) => {
      if (post) {
        showArticle(post);
      } else {
        showMissing();
      }
    })
    .catch((error) => {
      console.error(
        'Failed to load article:',
        error
      );

      showMissing();
    });

})();
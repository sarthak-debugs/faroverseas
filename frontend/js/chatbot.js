/* FarOverseas guided product assistant — rule-based, no AI API required. */
(() => {
  'use strict';

  if (window.__farOverseasChatbotInitialized) return;
  window.__farOverseasChatbotInitialized = true;

const EMAILJS_PUBLIC_KEY = 'yg-8QBsc4G2hA-B_r';
const EMAILJS_SERVICE_ID = 'service_xxt1q4n';
const EMAILJS_TEMPLATE_ID = 'template_05xkvmu';

// Copy the production Site Key from your working contact.html.
const RECAPTCHA_SITE_KEY = '6LcWNPgtAAAAAPWrBKURpIxcQGw-ztJnwWeI1PYj';

const EMAILJS_SDK_URL =
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

const RECAPTCHA_SDK_URL =
  'https://www.google.com/recaptcha/api.js?render=explicit';

  const PRODUCTS_BY_CATEGORY = {
    "Spices": [
      "Black Pepper", "Cardamom Green", "Cassia Cinnamon", "Clove",
      "Coriander", "Cumin", "Fenugreek", "Fennel", "Turmeric",
      "White Pepper", "Ginger", "Onion", "Nutmeg", "Saffron",
      "Tamarind", "Garlic", "Sesame Seeds", "Mustard Seed",
      "Red Chilli", "Curry Leaves", "Bay Leaf", "Amchur Powder",
      "Chana Masala", "Chaat Masala", "Chicken Masala", "Meat Masala",
      "Tandoori Masala", "Nigella Sativa (Kalonji)",
      "Red Pepper – Crushed", "Ajwain", "Allspice", "Aniseed",
      "Asafoetida (Hing)", "Black Cardamom", "Caraway", "Celery Seeds",
      "Dill", "Green Peppercorns", "Juniper Berries", "Kokum",
      "Long Pepper", "Mace", "Poppy Seeds", "Star Anise", "Vanilla",
      "Italian Seasoning", "Mixed Herbs", "BBQ Seasoning",
      "Peri-Peri Seasoning", "Garam Masala", "Curry Powder",
      "Pav Bhaji Masala", "Biryani Masala", "Fish Curry Masala",
      "Sambar Masala", "Rasam Powder", "Kitchen King Masala",
      "Sabzi Masala", "Dal Tadka Masala", "Tea Masala", "Pickle Masala",
      "Jaljeera Masala", "Pani Puri Masala", "Chinese Five-Spice",
      "Taco Seasoning"
    ],

    "Herbs": [
      "Azadirachta Indica (Neem)", "Beetroot",
      "Cymbopogon flexuosus (Lemongrass)", "Rosemary", "Thyme",
      "Oregano", "Mint", "Tulsi", "Sage", "Aloe Vera", "Amla",
      "Anantmool", "Anise", "Arjuna", "Ashwagandha", "Basil",
      "Bay Leaves", "Bhringraj", "Bibhitaki", "Boswellia", "Brahmi",
      "Butterfly Pea", "Calendula", "Chamomile", "Chirata / Chirayta",
      "Dandelion", "Dill", "Eucalyptus", "Flaxseed", "Garcinia",
      "Giloy / Guduchi", "Ginkgo Biloba", "Ginseng",
      "Gokshura / Gokhru", "Gotu Kola / Mandukaparni", "Haritaki",
      "Hibiscus", "Jatamansi", "Kalmegh", "Lavender",
      "Licorice / Mulethi", "Manjistha", "Marshmallow", "Milk Thistle",
      "Moringa", "Parsley", "Psyllium / Isabgol", "Punarnava", "Rose",
      "Safed Musli", "Senna", "Shankhpushpi", "Shatavari", "Stevia",
      "Turmeric", "Valerian", "Vasaka / Adulsa", "Vidarikand"
    ],

    "Pulses, Lentils & Beans": [
      "Chickpea", "Chana Dal", "Masoor Dal", "Mung Bean", "Wheat",
      "Basmati Rice", "Maize", "Soyabean", "Black Gram / Urad",
      "Cluster Beans / Guar", "Cowpea / Lobia", "Field Beans / Val",
      "Horse Gram", "Kidney Beans / Rajma", "Lathyrus / Khesari",
      "Moth Beans", "Peas", "Pigeon Peas / Toor"
    ],

    "Oil Seeds": [
      "Castor Oil", "Coconut Oil - Extra Virgin",
      "Coconut Oil - Virgin", "Groundnut Oil", "Sunflower Oil",
      "Mustard Oil", "Creamed Coconut", "Field Mint / Shivalik Oil",
      "Peppermint Oil", "Spearmint Oil", "Davana Oil",
      "Indian Basil Oil", "Krishna / Shyama Basil Oil", "Rama Basil Oil",
      "Lemongrass Oil", "Bergamot Mint Oil", "Palmarosa Oil",
      "German Chamomile Oil", "Khas / Vetiver Oil", "Tagetes Oil",
      "Eucalyptus Oil"
    ],

    "Cereals & Millets": [
      "Barley", "Maize", "Ragi Flour", "Pearl Millet (Bajra)",
      "Browntop Millets", "Quinoa", "Kudo Millets", "Little Millets",
      "Barnyard Millets", "Sorghum (Jowar) Millets", "Proso Millets",
      "Foxtail Millets", "Amaranth", "Buckwheat", "Fonio", "Job's Tears",
      "Millet Products", "Oats", "Rice", "Rye", "Triticale", "Wheat"
    ],

    "Dehydrated Products": [
      "Onion Minced (White, Pink & Red)",
      "Onion Chopped (White, Pink & Red)",
      "Onion Granules (White, Pink & Red)", "Dry Rose Petals",
      "Garlic Powder", "Garlic Granules", "Garlic Flakes",
      "Garlic Minced", "Garlic Chopped", "Fried Onion", "Amla",
      "Apple", "Banana", "Basil", "Beetroot", "Cabbage",
      "Capsicum / Bell Pepper", "Carrot", "Cauliflower", "Coconut",
      "Coriander Leaves", "Curry Leaves", "Fenugreek Leaves",
      "Ginger", "Grapes", "Green Chilli", "Green Peas", "Guava",
      "Jackfruit", "Lemon", "Lemongrass", "Mango", "Mint",
      "Moringa Leaves", "Mushroom", "Okra", "Orange", "Oregano",
      "Papaya", "Parsley", "Pineapple", "Pomegranate", "Potato",
      "Pumpkin", "Red Chilli", "Rosemary", "Spinach", "Strawberry",
      "Thyme", "Tomato"
    ],

    "Dry Fruits": [
      "Raisins", "Almonds", "Walnut", "Apricot", "Anjeer", "Foxnuts",
      "Cashews", "Amla", "Apple", "Bael", "Banana", "Blueberries",
      "Brazil Nuts", "Cherries", "Chestnuts", "Cranberries", "Dates",
      "Goji Berries", "Hazelnuts", "Jackfruit", "Kiwi",
      "Macadamia Nuts", "Mango", "Mixed Dry Fruits & Nuts", "Mulberries",
      "Papaya", "Pear", "Pecans", "Pine Nuts / Chilgoza",
      "Pineapple", "Pistachios", "Prunes / Dried Plums"
    ],

    "Sweeteners": [
      "Jaggery", "Amla Candy - Sweet", "Amla Candy - Spicy",
      "Acesulfame Potassium", "Advantame", "Agave Sweeteners",
      "Allulose", "Aspartame", "Brazzein", "Cane Sugar",
      "Coconut Sugar", "Corn Syrup", "Cyclamate", "Date Sweeteners",
      "Erythritol", "Fructose", "Fruit Juice Concentrates",
      "Glucose / Dextrose", "Honey", "Invert Sugar", "Isomalt",
      "Isomaltulose / Palatinose", "Khandsari / Khand", "Lactitol",
      "Lactose", "Malt Sweeteners", "Maltitol", "Maltose", "Mannitol",
      "Maple Sweeteners", "Molasses", "Monk Fruit", "Neotame",
      "Palm Sweeteners", "Prebiotic / Functional Fibres", "Rice Syrup",
      "Rock Sugar / Mishri", "Saccharin", "Sorbitol", "Stevia",
      "Sucralose", "Sweetener Blends", "Tagatose", "Tapioca Syrup",
      "Thaumatin", "Trehalose", "Xylitol", "Yacon Sweetener"
    ]
  };

  const CATEGORIES = [
    'Spices',
    'Herbs',
    'Pulses, Lentils & Beans',
    'Oil Seeds',
    'Cereals & Millets',
    'Dehydrated Products',
    'Dry Fruits',
    'Sweeteners'
  ];

  const CATEGORY_LINKS = {
    'Spices': 'products-spices.html',
    'Herbs': 'products-herbs.html',
    'Pulses, Lentils & Beans': 'products-pulses.html',
    'Oil Seeds': 'products-oil-seeds.html',
    'Cereals & Millets': 'products-cereals-millets.html',
    'Dehydrated Products': 'products-dehydrated.html',
    'Dry Fruits': 'products-dry-fruits.html',
    'Sweeteners': 'products-sweeteners.html'
  };

  const state = {};

  function resetState() {
    Object.assign(state, {
      step: 'main',
      intent: 'Product inquiry',
      category: '',
      product: '',
      requirements: '',
      quantity: '',
      country: '',
      timeline: '',
      name: '',
      company: '',
      email: '',
      phone: '',
      productPage: 0
    });
  }

  resetState();

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function init() {
    if (!document.body || document.getElementById('fo-chat-widget')) return;

    const root = element('div', 'fo-chat-widget');
    root.id = 'fo-chat-widget';

    root.innerHTML = `
      <button class="fo-chat-launcher"
        type="button"
        aria-label="Open FarOverseas product assistant"
        aria-expanded="false"
        aria-controls="fo-chat-window"
        title="Tara — FarOverseas Virtual Assistant">

        <svg
  class="fo-chat-launcher-icon"
  viewBox="0 0 24 24"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M3 13v-2a9 9 0 0 1 18 0v2"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
  />
  <rect
    x="3"
    y="12"
    width="4"
    height="7"
    rx="2"
    stroke="currentColor"
    stroke-width="1.8"
  />
  <rect
    x="17"
    y="12"
    width="4"
    height="7"
    rx="2"
    stroke="currentColor"
    stroke-width="1.8"
  />
  <path
    d="M19 19a4 4 0 0 1-4 3h-2"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
  />
</svg>

        <svg class="fo-chat-launcher-close" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18"/>
        </svg>
      </button>

      <section class="fo-chat-window"
        id="fo-chat-window"
        aria-label="Tara, FarOverseas Virtual Assistant"
        hidden>

        <header class="fo-chat-header">
          <div class="fo-chat-brand-mark" aria-hidden="true">
  <img
    src="assets/images/chatbot-logo.png"
    class="fo-chat-brand-logo"
    alt=""
  >
</div>

         <div class="fo-chat-heading">
  <strong>Tara</strong>
  <span><i></i> Your FarOverseas Assistant</span>
</div>

          <button class="fo-chat-reset" type="button"
            aria-label="Restart conversation"
            title="Restart conversation">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 7v5h-5M4.8 9a7.5 7.5 0 0 1 12.7-2L20 12M4 17v-5h5M19.2 15a7.5 7.5 0 0 1-12.7 2L4 12"/>
            </svg>
          </button>

          <button class="fo-chat-minimize" type="button"
            aria-label="Minimize chat"
            title="Minimize chat">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14"/>
            </svg>
          </button>
        </header>

        <div class="fo-chat-log" id="fo-chat-log"
          role="log" aria-live="polite" aria-relevant="additions text"></div>

        <form class="fo-chat-composer" id="fo-chat-composer" hidden>
          <input id="fo-chat-input" type="text" autocomplete="off"
            aria-label="Your answer" placeholder="Type your answer..." />
          <button type="submit" aria-label="Send answer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h15M13 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <div class="fo-chat-footnote">
           Tara · Here to help with your export enquiries
        </div>
      </section>`;

    document.body.appendChild(root);

    const launcher = root.querySelector('.fo-chat-launcher');
    const windowEl = root.querySelector('.fo-chat-window');
    const log = root.querySelector('.fo-chat-log');
    const composer = root.querySelector('.fo-chat-composer');
    const input = root.querySelector('#fo-chat-input');
    const resetButton = root.querySelector('.fo-chat-reset');
    const minimizeButton = root.querySelector('.fo-chat-minimize');

    let activeOptions = null;
    let inputHandler = null;
    let busy = false;
    let captchaWidgetId = null;
let captchaCard = null;
let captchaToken = '';

const scriptLoadPromises = new Map();

function ensureScript(src, readyCheck) {
  if (readyCheck()) return Promise.resolve();

  if (scriptLoadPromises.has(src)) {
    return scriptLoadPromises.get(src);
  }

  const promise = new Promise((resolve, reject) => {
    const baseUrl = src.split('?')[0];

    let script = Array.from(document.scripts).find(
      item => item.src && item.src.split('?')[0] === baseUrl
    );

    let settled = false;
    const startedAt = Date.now();

    function finish(error) {
      if (settled) return;
      settled = true;

      if (error) reject(error);
      else resolve();
    }

    function checkReady() {
      if (settled) return;

      if (readyCheck()) {
        finish();
      } else if (Date.now() - startedAt > 20000) {
        finish(new Error('Timed out loading ' + src));
      } else {
        setTimeout(checkReady, 100);
      }
    }

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener(
      'error',
      () => finish(new Error('Could not load ' + src)),
      { once: true }
    );

    checkReady();
  });

  scriptLoadPromises.set(src, promise);

  promise.catch(() => scriptLoadPromises.delete(src));

  return promise;
}

async function ensureSubmissionServices() {
  await Promise.all([
    ensureScript(
      EMAILJS_SDK_URL,
      () => window.emailjs &&
        typeof window.emailjs.send === 'function'
    ),
    ensureScript(
      RECAPTCHA_SDK_URL,
      () => window.grecaptcha &&
        typeof window.grecaptcha.render === 'function'
    )
  ]);

  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });

  await new Promise(resolve => window.grecaptcha.ready(resolve));
}

function clearCaptchaUI() {
  if (
    captchaWidgetId !== null &&
    window.grecaptcha &&
    typeof window.grecaptcha.reset === 'function'
  ) {
    try {
      window.grecaptcha.reset(captchaWidgetId);
    } catch (error) {
      console.warn('Could not reset chatbot CAPTCHA:', error);
    }
  }

  if (captchaCard && captchaCard.parentNode) {
    captchaCard.parentNode.removeChild(captchaCard);
  }

  captchaCard = null;
  captchaWidgetId = null;
  captchaToken = '';
}

    function scrollLog() {
      requestAnimationFrame(() => {
        log.scrollTop = log.scrollHeight;
      });
    }

    function botMessage(text) {
      const line = element('div', 'fo-chat-line fo-chat-line--bot');
      line.appendChild(element('span', 'fo-chat-avatar', 'T'));
      line.appendChild(element('div', 'fo-chat-bubble', text));
      log.appendChild(line);
      scrollLog();
    }

    function userMessage(text) {
      const line = element('div', 'fo-chat-line fo-chat-line--user');
      line.appendChild(element('div', 'fo-chat-bubble', text));
      log.appendChild(line);
      scrollLog();
    }

    function clearOptions() {
      if (activeOptions && activeOptions.parentNode) {
        activeOptions.parentNode.removeChild(activeOptions);
      }
      activeOptions = null;
    }

    function setInput(placeholder, handler, type = 'text') {
      inputHandler = handler;
      composer.hidden = !handler;
      input.placeholder = placeholder || 'Type your answer...';
      input.type = type;
      input.value = '';

      if (handler) scrollLog();
    }

    function hideInput() {
      setInput('', null);
    }

    function showOptions(items) {
      clearOptions();

      const wrap = element('div', 'fo-chat-options');

      items.forEach(item => {
        if (item.href) {
          const link = element('a', 'fo-chat-option', item.label);
          link.href = item.href;

          if (item.external) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }

          wrap.appendChild(link);
          return;
        }

        const button = element('button', 'fo-chat-option', item.label);
        button.type = 'button';

        button.addEventListener('click', () => {
          if (busy) return;

          userMessage(item.label);
          clearOptions();

          if (typeof item.run === 'function') item.run();
        });

        wrap.appendChild(button);
      });

      activeOptions = wrap;
      log.appendChild(wrap);
      scrollLog();
    }

    function openChat() {
      windowEl.hidden = false;
      launcher.classList.add('is-open');
      launcher.setAttribute('aria-expanded', 'true');
      launcher.setAttribute(
        'aria-label',
        'Close FarOverseas product assistant'
      );
      scrollLog();
    }

    function closeChat() {
      windowEl.hidden = true;
      launcher.classList.remove('is-open');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.setAttribute(
        'aria-label',
        'Open FarOverseas product assistant'
      );
    }

    launcher.addEventListener('click', () => {
      windowEl.hidden ? openChat() : closeChat();
    });

    minimizeButton.addEventListener('click', closeChat);

    resetButton.addEventListener('click', () => {
      startConversation(true);
    });

    function startConversation(clear = false) {
      if (clear) {
        clearCaptchaUI();
        log.innerHTML = '';
        clearOptions();
        resetState();
      }

      hideInput();
      state.step = 'main';

      botMessage(
        "Hi! I'm Tara, your FarOverseas assistant. I can help you explore our  products, understand export requirements, or request a quotation. What can I help you with today?"
      );

      showOptions([
        {
          label: 'Explore products',
          run: () => startProductFlow('Product inquiry')
        },
        {
          label: 'Request a quotation',
          run: () => startProductFlow('Quotation request')
        },
        {
          label: 'Export & shipping',
          run: () => showSupportMenu()
        },
        {
          label: 'Talk to our team',
          run: () => showContactOptions()
        }
      ]);
    }

    function startProductFlow(intent) {
      state.intent = intent;
      state.category = '';
      state.product = '';
      state.productPage = 0;
      state.step = 'category';

      hideInput();

      botMessage(
        intent === 'Quotation request'
          ? 'Certainly. Which product category would you like a quotation for?'
          : 'Which product category would you like to explore?'
      );

      showOptions(
        CATEGORIES.map(category => ({
          label: category,
          run: () => chooseCategory(category)
        })).concat([
          {
            label: 'Main menu',
            run: () => startConversation(true)
          }
        ])
      );
    }

    function chooseCategory(category) {
      state.category = category;
      state.productPage = 0;
      showProducts(true);
    }

    function showProducts(intro = false) {
      state.step = 'product';

      const products = PRODUCTS_BY_CATEGORY[state.category] || [];
      const pageSize = 7;
      const pages = Math.max(1, Math.ceil(products.length / pageSize));

      if (intro) {
        botMessage(
          `You selected ${state.category}. Which product are you interested in? Choose an item below or type a product name.`
        );
      } else {
        botMessage(`More products in ${state.category}:`);
      }

      const start = state.productPage * pageSize;
      const pageItems = products.slice(start, start + pageSize);

      const choices = pageItems.map(product => ({
        label: product,
        run: () => chooseProduct(product)
      }));

      if (state.productPage > 0) {
        choices.push({
          label: '← Previous products',
          run: () => {
            state.productPage--;
            showProducts(false);
          }
        });
      }

      if (state.productPage < pages - 1) {
        choices.push({
          label: 'More products →',
          run: () => {
            state.productPage++;
            showProducts(false);
          }
        });
      }

      choices.push({
        label: 'Back to categories',
        run: () => startProductFlow(state.intent)
      });

      showOptions(choices);

      setInput(
        'Or type a product name...',
        value => chooseProduct(value)
      );
    }

    function chooseProduct(product) {
      state.product = product.trim();

      if (!state.product) return;

      state.productPage = 0;
      state.step = 'requirements';

      botMessage(
        `What details should our team know about ${state.product}? You can mention the form, grade, packaging, certifications, or specifications you need. This is optional.`
      );

      setInput(
        'e.g. whole, powder, grade, packaging...',
        value => {
          state.requirements = value.trim();
          askQuantity();
        }
      );

      showOptions([
        {
          label: 'Continue without details',
          run: () => {
            state.requirements = '';
            askQuantity();
          }
        }
      ]);
    }

    function askQuantity() {
      state.step = 'quantity';

      botMessage('What quantity are you looking for?');

      setInput(
        'Enter quantity and unit (optional custom amount)...',
        value => {
          state.quantity = value.trim();
          askCountry();
        }
      );

      showOptions([
        {
          label: 'Sample / trial quantity',
          run: () => {
            state.quantity = 'Sample / trial quantity';
            askCountry();
          }
        },
        {
          label: 'Under 1 metric ton',
          run: () => {
            state.quantity = 'Under 1 metric ton';
            askCountry();
          }
        },
        {
          label: '1–5 metric tons',
          run: () => {
            state.quantity = '1–5 metric tons';
            askCountry();
          }
        },
        {
          label: '5–20 metric tons',
          run: () => {
            state.quantity = '5–20 metric tons';
            askCountry();
          }
        },
        {
          label: '20+ metric tons',
          run: () => {
            state.quantity = '20+ metric tons';
            askCountry();
          }
        },
        {
          label: 'Not sure yet',
          run: () => {
            state.quantity = 'Not sure yet';
            askCountry();
          }
        }
      ]);
    }

    function askCountry() {
      state.step = 'country';

      botMessage(
        'Which country or market should the order be delivered to? Choose a common destination or type any country below.'
      );

      setInput(
        'Type any destination country / market...',
        value => {
          const country = value.trim();

          if (!country) {
            botMessage(
              'Please enter a destination country, or choose a country from the options.'
            );
            askCountry();
            return;
          }

          state.country = country;
          askTimeline();
        }
      );

      const commonMarkets = [
        'United States',
        'United Arab Emirates',
        'United Kingdom',
        'Germany',
        'Canada',
        'Australia',
        'Netherlands',
        'France',
        'Saudi Arabia',
        'Singapore',
        'Malaysia',
        'South Africa',
        'India'
      ];

      showOptions(
        commonMarkets.map(country => ({
          label: country,
          run: () => {
            state.country = country;
            askTimeline();
          }
        })).concat([
          {
            label: 'Other — type a country',
            run: () => {
              botMessage(
                'No problem. Type the destination country or market in the box below.'
              );

              setInput(
                'Enter any country or market...',
                value => {
                  const country = value.trim();

                  if (!country) {
                    botMessage(
                      'Please enter a destination country to continue.'
                    );
                    askCountry();
                    return;
                  }

                  state.country = country;
                  askTimeline();
                }
              );
            }
          }
        ])
      );
    }

    function askTimeline() {
      state.step = 'timeline';

      botMessage('What is your preferred delivery timeline?');

      setInput(
        'Or type a preferred timeline...',
        value => {
          state.timeline = value.trim();
          askName();
        }
      );

      showOptions([
        {
          label: 'Within 2 weeks',
          run: () => {
            state.timeline = 'Within 2 weeks';
            askName();
          }
        },
        {
          label: '2–4 weeks',
          run: () => {
            state.timeline = '2–4 weeks';
            askName();
          }
        },
        {
          label: '1–3 months',
          run: () => {
            state.timeline = '1–3 months';
            askName();
          }
        },
        {
          label: 'Flexible',
          run: () => {
            state.timeline = 'Flexible';
            askName();
          }
        }
      ]);
    }

    function askName() {
      state.step = 'name';

      botMessage('Great. What is your full name?');

      setInput(
        'Full name (required)...',
        value => {
          if (value.trim().length < 2) {
            botMessage(
              'Please enter your name so our team knows who to contact.'
            );
            askName();
            return;
          }

          state.name = value.trim();
          askCompany();
        }
      );
    }

    function askCompany() {
      state.step = 'company';

      botMessage('What is your company name? This is optional.');

      setInput(
        'Company name (optional)...',
        value => {
          state.company = value.trim();
          askEmail();
        }
      );

      showOptions([
        {
          label: 'Skip company name',
          run: () => {
            state.company = '';
            askEmail();
          }
        }
      ]);
    }

    function askEmail() {
      state.step = 'email';

      botMessage(
        'What business email address should our team use to contact you?'
      );

      setInput(
        'Business email (required)...',
        value => {
          const email = value.trim();

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            botMessage(
              'That email address does not look quite right. Please enter a valid business email.'
            );
            askEmail();
            return;
          }

          state.email = email;
          askPhone();
        },
        'email'
      );
    }

    function askPhone() {
      state.step = 'phone';

      botMessage(
        'What phone or WhatsApp number can our export team use?'
      );

      setInput(
        'Phone number with country code...',
        value => {
          if (value.trim().length < 5) {
            botMessage(
              'Please enter a phone number with its country code, or choose to skip.'
            );
            askPhone();
            return;
          }

          state.phone = value.trim();
          reviewInquiry();
        }
      );

      showOptions([
        {
          label: 'Skip phone number',
          run: () => {
            state.phone = 'Not provided';
            reviewInquiry();
          }
        }
      ]);
    }

    function makeSummary() {
      return [
        `Request type: ${state.intent}`,
        `Product category: ${state.category}`,
        `Product: ${state.product}`,
        `Specifications / requirements: ${state.requirements || 'Not specified'}`,
        `Quantity: ${state.quantity || 'Not specified'}`,
        `Destination market: ${state.country || 'Not specified'}`,
        `Preferred timeline: ${state.timeline || 'Not specified'}`
      ].join('\n');
    }

    function reviewInquiry() {
      clearCaptchaUI();
      state.step = 'review';
      hideInput();

      botMessage(
        `Please review your enquiry before submitting:\n\n${makeSummary()}\n\nContact: ${state.name}${state.company ? ' · ' + state.company : ''}\nEmail: ${state.email}\nPhone: ${state.phone || 'Not provided'}`
      );

      showOptions([
        {
          label: 'Submit enquiry',
          run: () => submitInquiry()
        },
        {
          label: 'Start over',
          run: () => startConversation(true)
        },
        {
          label: 'Explore this category on the website',
          run: () => {
            const url = CATEGORY_LINKS[state.category];
            if (url) window.location.href = url;
          }
        }
      ]);
    }

    function submitInquiry() {
  if (busy) return;

  clearOptions();
  hideInput();
  clearCaptchaUI();

  botMessage(
    'Before sending your enquiry, please complete this security check.'
  );

  const card = element('div', 'fo-chat-captcha-card');
  const caption = element(
    'p',
    'fo-chat-captcha-message',
    'Verify that you are human to continue.'
  );
  const widget = element('div', 'fo-chat-captcha-widget');

  card.appendChild(caption);
  card.appendChild(widget);

  captchaCard = card;
  log.appendChild(card);
  scrollLog();

  ensureSubmissionServices()
    .then(() => {
      window.grecaptcha.ready(() => {
        if (!captchaCard || !captchaCard.isConnected) return;

        captchaWidgetId = window.grecaptcha.render(widget, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: 'light',
          
          callback: token => {
            captchaToken = token;

            clearOptions();

            botMessage(
              'Verification complete. Confirm below to send your enquiry.'
            );

            showOptions([
              { 
                label: 'Confirm & send enquiry',
                run: () => sendInquiryWithCaptcha()
              },
              {
                label: 'Review enquiry',
                run: () => reviewInquiry()
              }
            ]);
          },

          'expired-callback': () => {
            captchaToken = '';
            clearOptions();

            botMessage(
              'Your verification expired. Please complete it again.'
            );

            showOptions([
              {
                label: 'Verify again',
                run: () => submitInquiry()
              },
              {
                label: 'Review enquiry',
                run: () => reviewInquiry()
              }
            ]);
          },

          'error-callback': () => {
  captchaToken = '';
  clearOptions();

  botMessage(
    'The security check encountered an error. Please try verification again or review your enquiry.'
  );

  showOptions([
    {
      label: 'Retry verification',
      run: () => submitInquiry()
    },
    {
      label: 'Review enquiry',
      run: () => reviewInquiry()
    }
  ]);
}
              });

        // Scroll after Google inserts the CAPTCHA widget.
        requestAnimationFrame(() => {
          scrollLog();
          setTimeout(scrollLog, 300);
        });
      });
    })
    .catch(error => {  
      console.error('Chatbot security setup failed:', error);

      botMessage(
        'We could not load the security check. Please try again.'
      );

      showOptions([
        {
          label: 'Try again',
          run: () => submitInquiry()
        },
        {
          label: 'Review enquiry',
          run: () => reviewInquiry()
        }
      ]);
    });
}

async function sendInquiryWithCaptcha() {
  if (busy) return;

  const token =
    captchaWidgetId !== null &&
    window.grecaptcha
      ? window.grecaptcha.getResponse(captchaWidgetId)
      : captchaToken;

  if (!token) {
    botMessage('Please complete the CAPTCHA before submitting.');
    return;
  }

  busy = true;
  clearOptions();
  hideInput();

  botMessage('Sending your enquiry securely to the FarOverseas team...');

  const details =
    `${makeSummary()}\n` +
    `Additional requirements: ${state.requirements || 'Not specified'}\n` +
    'Submitted through: FarOverseas website chatbot';

  const templateParams = {
    name: state.name,
    company: state.company || 'Not provided',
    email: state.email,
    phone: state.phone || 'Not provided',
    country: state.country || 'Not specified',
    category: state.category,
    quantity: state.quantity || 'Not specified',
    timeline: state.timeline || 'Not specified',
    details,
    'g-recaptcha-response': token
  };

  let succeeded = false;

  try {
    await ensureSubmissionServices();

    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    succeeded = true;

    botMessage(
      'Thank you! Your enquiry has been sent successfully. Our export team will get back to you.'
    );
  } catch (error) {
    console.error('FarOverseas chatbot EmailJS submission failed:', error);

    botMessage(
      'We could not send your enquiry right now. Please try the security check again.'
    );
  } finally {
    busy = false;
    clearCaptchaUI();

    if (succeeded) {
      showOptions([
        {
          label: 'Start a new enquiry',
          run: () => startConversation(true)
        },
        {
          label: 'Contact our team',
          run: () => showContactOptions()
        }
      ]);
    } else {
      showOptions([
        {
          label: 'Retry submission',
          run: () => submitInquiry()
        },
        {
          label: 'Review enquiry',
          run: () => reviewInquiry()
        }
      ]);
    }
  }
}

    function showSupportMenu() {
      state.step = 'support';
      hideInput();

      botMessage(
        'What would you like to know about our export process? Choose a topic below.'
      );

      showOptions([
        {
          label: 'Certifications & quality',
          run: () => answerFaq('quality')
        },
        {
          label: 'Packaging & specifications',
          run: () => answerFaq('packaging')
        },
        {
          label: 'Shipping & destinations',
          run: () => answerFaq('shipping')
        },
        {
          label: 'MOQ & samples',
          run: () => answerFaq('samples')
        },
        {
          label: 'Request a quotation',
          run: () => startProductFlow('Quotation request')
        },
        {
          label: 'Main menu',
          run: () => startConversation(true)
        }
      ]);
    }

    function answerFaq(topic) {
      const answers = {
        quality:
          'FarOverseas shares quality and certification information on its website. The documents and certifications available for a specific product and shipment need to be confirmed by the export team.',

        packaging:
          'Packaging, labeling, grade and product form can vary by item and destination. Tell our team your preferred specifications so availability can be confirmed for your order.',

        shipping:
          'FarOverseas works with international buyers. Freight options, timelines and shipping terms depend on the product, shipment size and destination; the export team can confirm the details for your requirement.',

        samples:
          'Minimum order quantities and sample availability depend on the product, form and destination. Submit an enquiry with your requirement and our team can advise on the next steps.'
      };

      botMessage(
        answers[topic] || 'Please contact our export team for details.'
      );

      showOptions([
        {
          label: 'Request a quotation',
          run: () => startProductFlow('Quotation request')
        },
        {
          label: 'Talk to our team',
          run: () => showContactOptions()
        },
        {
          label: 'Main menu',
          run: () => startConversation(true)
        }
      ]);
    }

    function showContactOptions() {
      state.step = 'contact';
      hideInput();

      botMessage(
        'You can reach the FarOverseas team directly, or submit your requirements through this guided enquiry.'
      );

      showOptions([
        {
          label: 'Open Contact Us page',
          href: 'contact.html'
        },
        {
          label: 'Email Info@faroverseas.com',
          href: 'mailto:Info@faroverseas.com'
        },
        {
          label: 'Call +91 70899 37031',
          href: 'tel:+917089937031'
        },
        {
          label: 'Request a quotation',
          run: () => startProductFlow('Quotation request')
        },
        {
          label: 'Main menu',
          run: () => startConversation(true)
        }
      ]);
    }

    composer.addEventListener('submit', event => {
      event.preventDefault();

      if (busy || typeof inputHandler !== 'function') return;

      const value = input.value.trim();

      if (!value) {
        input.focus();
        return;
      }

      const handler = inputHandler;

      userMessage(value);
      input.value = '';
      handler(value);
    });

    startConversation(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
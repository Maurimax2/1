const site = require('./data/site.js');
const { esc, icon } = require('./lib/html.js');

/** Link helpers for a given language. */
function links(lang) {
  const dir = site.languages.find((l) => l.code === lang).dir; // '' | 'fr/' | 'it/'
  const base = dir ? '../' : ''; // path back to the site root from this page
  // Relative hrefs name index.html explicitly so the site also works when the
  // folder is opened straight from disk (file://), not only over HTTP.
  const url = (key) => site.pages[key];
  const abs = (key) => `${site.domain}/${dir}${key === 'home' ? '' : site.pages[key]}`;
  const other = (key, code) => {
    const d = site.languages.find((l) => l.code === code).dir;
    return `${base}${d}${site.pages[key]}`;
  };
  return { dir, base, url, abs, other };
}

function head(t, page, lang, extra = '') {
  const L = links(lang);
  const meta = t.meta[page];
  const ogImage = `${site.domain}/assets/img/train-riders-1440.webp`;

  const alternates = site.languages
    .map((l) => `<link rel="alternate" hreflang="${l.code}" href="${links(l.code).abs(page)}">`)
    .join('\n');

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: site.name,
    url: site.domain,
    image: ogImage,
    email: site.email,
    telephone: '+' + site.whatsapp,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'MR' },
    areaServed: 'Mauritania',
    knowsLanguage: ['en', 'fr', 'it', 'ar'],
    sameAs: [site.facebook, site.instagram],
    description: t.meta.home.desc,
  };

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}">
<link rel="canonical" href="${L.abs(page)}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${links('en').abs(page)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${L.abs(page)}">
<meta property="og:locale" content="${site.languages.find((l) => l.code === lang).locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A0908">
<link rel="icon" href="${L.base}assets/img/logo.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${L.base}assets/img/logo.svg">
<link rel="preload" as="font" type="font/woff2" crossorigin href="${L.base}assets/fonts/cormorant-garamond-300-normal-latin.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin href="${L.base}assets/fonts/inter-400-normal-latin.woff2">
<link rel="stylesheet" href="${L.base}assets/css/fonts.css">
<link rel="stylesheet" href="${L.base}assets/css/main.css">
<noscript><style>
.reveal,.hero__sub,.hero__cta,.hero__scroll{opacity:1!important;transform:none!important}
[data-split] .w>i,.hero__line .w>i{opacity:1!important;transform:none!important}
.pic img{opacity:1!important;transform:none!important}
</style></noscript>
${extra}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="page-${page}" data-lang="${lang}" data-base="${L.base}">
<a class="skip" href="#main">${t.a11y.skip}</a>`;
}

function nav(t, page, lang) {
  const L = links(lang);
  const items = ['home', 'experiences', 'destinations', 'gallery', 'reviews', 'about', 'guide', 'contact'];

  const navLinks = (cls) =>
    items
      .map(
        (k) =>
          `<li><a class="${cls}${k === page ? ' is-active' : ''}" href="${L.url(k)}">${t.nav[k]}</a></li>`
      )
      .join('');

  const langOptions = site.languages
    .map(
      (l) =>
        `<li><a href="${L.other(page, l.code)}" hreflang="${l.code}" class="${l.code === lang ? 'is-active' : ''}"><span>${l.short}</span>${l.label}</a></li>`
    )
    .join('');

  return `<header class="nav" id="nav">
  <div class="nav__inner">
    <a class="nav__logo" href="${L.url('home')}" aria-label="${esc(site.name)}">
      <img src="${L.base}assets/img/logo.svg" alt="" width="48" height="48">
      <span class="nav__logo-txt"><b>Travel and Trips</b><i>in Mauritania</i></span>
    </a>

    <nav class="nav__links" aria-label="${t.a11y.menu}"><ul>${navLinks('nav__link')}</ul></nav>

    <div class="nav__actions">
      <div class="lang" data-lang-switch>
        <button class="lang__btn" aria-expanded="false" aria-haspopup="true">
          ${icon('globe')}<span>${site.languages.find((l) => l.code === lang).short}</span>
          ${icon('chevron', 'lang__chev')}
        </button>
        <ul class="lang__menu">${langOptions}</ul>
      </div>
      <a class="nav__wa" href="${site.wa(t.footer.waMsg)}" target="_blank" rel="noopener">
        ${icon('whatsapp')}<span>${t.nav.cta}</span>
      </a>
      <button class="burger" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t.nav.menu}">
        <span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mnav" id="mobile-menu" hidden>
  <nav class="mnav__links" aria-label="${t.a11y.menu}"><ul>${navLinks('mnav__link')}</ul></nav>
  <div class="mnav__foot">
    <ul class="mnav__lang">${langOptions}</ul>
    <a class="btn btn--solid" href="${site.wa(t.footer.waMsg)}" target="_blank" rel="noopener">
      <span>${t.ui.talkToUs}</span>${icon('whatsapp')}
    </a>
  </div>
</div>`;
}

function footer(t, lang) {
  const L = links(lang);
  const year = new Date().getFullYear();

  return `<footer class="foot">
  <div class="foot__top">
    <div class="foot__brand">
      <img src="${L.base}assets/img/logo.svg" alt="" width="64" height="64">
      <p class="foot__tag">${t.footer.tagline}</p>
    </div>

    <div class="foot__cols">
      <div class="foot__col">
        <h3>${t.footer.explore}</h3>
        <ul>
          <li><a href="${L.url('experiences')}">${t.nav.experiences}</a></li>
          <li><a href="${L.url('destinations')}">${t.nav.destinations}</a></li>
          <li><a href="${L.url('gallery')}">${t.nav.gallery}</a></li>
          <li><a href="${L.url('reviews')}">${t.nav.reviews}</a></li>
          <li><a href="${L.url('guide')}">${t.nav.guide}</a></li>
        </ul>
      </div>
      <div class="foot__col">
        <h3>${t.footer.company}</h3>
        <ul>
          <li><a href="${L.url('about')}">${t.nav.about}</a></li>
          <li><a href="${L.url('contact')}">${t.nav.contact}</a></li>
          <li><a href="${site.maps}" target="_blank" rel="noopener">${site.city}, ${site.country}</a></li>
        </ul>
      </div>
      <div class="foot__col">
        <h3>${t.footer.contact}</h3>
        <ul>
          <li><a href="${site.wa(t.footer.waMsg)}" target="_blank" rel="noopener">WhatsApp ${site.phoneDisplay}</a></li>
          <li><a href="mailto:${site.email}">${site.email}</a></li>
        </ul>
        <div class="foot__social">
          <a href="${site.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
          <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
          <a href="${site.wa(t.footer.waMsg)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
        </div>
      </div>
    </div>
  </div>

  <div class="foot__bar">
    <p>© ${year} ${esc(site.name)}. ${t.footer.rights}</p>
    <p class="foot__note">${t.footer.built}</p>
  </div>
</footer>

<a class="wa-float" href="${site.wa(t.footer.waMsg)}" target="_blank" rel="noopener" aria-label="WhatsApp">
  ${icon('whatsapp')}
</a>`;
}

const scripts = (lang) => {
  const L = links(lang);
  return `<script src="${L.base}assets/js/app.js" defer></script>
</body>
</html>`;
};

module.exports = { head, nav, footer, scripts, links };

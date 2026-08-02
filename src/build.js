#!/usr/bin/env node
/**
 * Static site generator.
 *
 *   node src/build.js
 *
 * Renders every page in every language into the repository root
 * (English at /, French at /fr/, Italian at /it/) plus sitemap + robots.
 */
const fs = require('fs');
const path = require('path');

const site = require('./data/site.js');
const { head, nav, footer, scripts, links } = require('./layout.js');

const ROOT = path.join(__dirname, '..');

const CONTENT = {
  en: require('./content/en.js'),
  fr: require('./content/fr.js'),
  it: require('./content/it.js'),
};

const PAGES = {
  home: require('./pages/home.js'),
  experiences: require('./pages/experiences.js'),
  destinations: require('./pages/destinations.js'),
  gallery: require('./pages/gallery.js'),
  about: require('./pages/about.js'),
  guide: require('./pages/guide.js'),
  contact: require('./pages/contact.js'),
};

/* ── Translation completeness check ─────────────────────────────────── */
function shape(obj, prefix = '', out = []) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => (typeof v === 'object' && v !== null ? shape(v, `${prefix}[${i}]`, out) : out.push(`${prefix}[${i}]`)));
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((k) =>
      typeof obj[k] === 'object' && obj[k] !== null ? shape(obj[k], `${prefix}.${k}`, out) : out.push(`${prefix}.${k}`)
    );
  }
  return out;
}

function verifyTranslations() {
  const base = shape(CONTENT.en);
  let ok = true;
  for (const code of ['fr', 'it']) {
    const other = new Set(shape(CONTENT[code]));
    const missing = base.filter((k) => !other.has(k));
    if (missing.length) {
      ok = false;
      console.error(`  ✗ ${code}: ${missing.length} missing key(s)\n    ${missing.slice(0, 12).join('\n    ')}`);
    }
  }
  if (!ok) process.exit(1);
  console.log(`  ✓ translations aligned (${base.length} strings × 3 languages)`);
}

/* ── Render ─────────────────────────────────────────────────────────── */
function render(pageKey, lang) {
  const t = CONTENT[lang];
  const L = links(lang);
  const extra =
    pageKey === 'home'
      ? `<link rel="preload" as="image" fetchpriority="high" imagesrcset="${['480', '960', '1440', '1500']
          .map((w) => `${L.base}assets/img/train-riders-${w}.webp ${w}w`)
          .join(', ')}" imagesizes="100vw">`
      : '';

  return [head(t, pageKey, lang, extra), nav(t, pageKey, lang), PAGES[pageKey](t, L), footer(t, lang), scripts(lang)].join('\n');
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function build() {
  console.log('\nBuilding Travel and Trips in Mauritania\n');
  verifyTranslations();

  let count = 0;
  const urls = [];

  for (const lang of Object.keys(CONTENT)) {
    const dir = site.languages.find((l) => l.code === lang).dir;
    for (const pageKey of Object.keys(PAGES)) {
      const out = path.join(ROOT, dir, site.pages[pageKey]);
      write(out, render(pageKey, lang));
      urls.push({ loc: links(lang).abs(pageKey), lang, pageKey });
      count++;
    }
  }
  console.log(`  ✓ ${count} pages written`);

  /* sitemap with hreflang alternates */
  const body = urls
    .map(({ loc, pageKey }) => {
      const alts = site.languages
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${links(l.code).abs(pageKey)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${loc}</loc>\n${alts}\n    <changefreq>monthly</changefreq>\n    <priority>${pageKey === 'home' ? '1.0' : '0.8'}</priority>\n  </url>`;
    })
    .join('\n');

  write(
    path.join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`
  );

  write(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`);
  write(path.join(ROOT, '.nojekyll'), '');

  /* 404 */
  const t = CONTENT.en;
  write(
    path.join(ROOT, '404.html'),
    [
      head(t, 'home', 'en'),
      nav(t, 'home', 'en'),
      `<main id="main"><section class="outro" style="min-height:70vh;display:grid;place-items:center">
  <div class="outro__inner">
    <p class="eyebrow">404</p>
    <h1 class="outro__title">This page has drifted into the sand.</h1>
    <p class="outro__sub">The page you are looking for does not exist — but Mauritania still does.</p>
    <a class="btn btn--solid" href="${site.domain}/"><span>Back to the beginning</span></a>
  </div>
</section></main>`,
      footer(t, 'en'),
      scripts('en'),
    ].join('\n')
  );

  console.log('  ✓ sitemap.xml, robots.txt, 404.html\n');
}

build();

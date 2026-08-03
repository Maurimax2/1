const site = require('../data/site.js');
const { pic, icon, esc } = require('./html.js');
const { photo } = require('../data/photos.js');

const sectionHead = ({ eyebrow, title, sub, cls = '', align = '' }) => `
<header class="shead ${cls} ${align}">
  ${eyebrow ? `<p class="eyebrow reveal">${eyebrow}</p>` : ''}
  <h2 class="shead__title reveal" data-split>${title}</h2>
  ${sub ? `<p class="shead__sub reveal">${sub}</p>` : ''}
</header>`;

/** Card used on the home page grid and the experiences index. */
function expCard(exp, t, L, { feature = false, index = 0 } = {}) {
  return `<article class="expcard ${feature ? 'expcard--feature' : ''} reveal" style="--d:${index * 90}ms">
  <a class="expcard__link" href="${L.url('experiences')}#${exp.id}" aria-label="${esc(exp.title)}">
    <div class="expcard__media">
      ${pic({
        slug: exp.hero,
        alt: exp.title,
        base: L.base,
        pos: photo(exp.hero, t.code).pos,
        sizes: feature ? '(max-width:900px) 100vw, 62vw' : '(max-width:900px) 100vw, 33vw',
        cls: 'pic--fill',
      })}
      <span class="expcard__num">${String(index + 1).padStart(2, '0')}</span>
      ${exp.price ? `<span class="expcard__price">${exp.price}</span>` : ''}
    </div>
    <div class="expcard__body">
      <p class="expcard__meta"><span>${exp.location}</span>${exp.duration ? `<i></i><span>${exp.duration}</span>` : ''}</p>
      <h3 class="expcard__title">${exp.title}</h3>
      <p class="expcard__txt">${exp.short}</p>
      <span class="link">${t.ui.exploreExperience}${icon('arrow')}</span>
    </div>
  </a>
</article>`;
}

/** A photograph tile that can open the lightbox. */
function photoTile(slug, t, L, { sizes = '(max-width:900px) 50vw, 25vw', cls = '', span = '', index = 0 } = {}) {
  const p = photo(slug, t.code);
  return `<button class="tile ${cls} reveal" style="--d:${(index % 6) * 70}ms;${span}"
  data-photo="${slug}" aria-label="${esc(p.title)}">
  ${pic({ slug, alt: p.title, base: L.base, pos: p.pos, sizes, cls: 'pic--fill' })}
  <span class="tile__cap">
    <span class="tile__loc">${p.location}</span>
    <span class="tile__title">${p.title}</span>
  </span>
  <span class="tile__zoom">${icon('expand')}</span>
</button>`;
}

/** Client-side lightbox shell + the data it needs. */
function lightbox(t, slugs) {
  const data = slugs.map((s) => {
    const p = photo(s, t.code);
    return { s, l: p.location, t: p.title, d: p.desc, st: p.story, w: require('../data/images.json')[s].w, h: require('../data/images.json')[s].h, ws: require('../data/images.json')[s].widths };
  });

  return `<div class="lb" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="${t.a11y.lightbox}">
  <button class="lb__close" aria-label="${t.ui.close}">${icon('close')}</button>
  <button class="lb__nav lb__nav--prev" aria-label="${t.ui.prev}">${icon('chevron')}</button>
  <button class="lb__nav lb__nav--next" aria-label="${t.ui.next}">${icon('chevron')}</button>
  <div class="lb__stage"><img class="lb__img" alt=""
   src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div>
  <div class="lb__meta">
    <p class="lb__loc"></p>
    <h3 class="lb__title"></h3>
    <p class="lb__desc"></p>
    <p class="lb__story"></p>
    <p class="lb__count"><span class="lb__i"></span> ${t.galleryPage.ui.of} <span class="lb__n"></span></p>
  </div>
</div>
<script id="lb-data" type="application/json">${JSON.stringify(data)}</script>`;
}

/** WhatsApp booking button. */
const bookBtn = (label, msg, cls = 'btn--solid') =>
  `<a class="btn ${cls}" href="${site.wa(msg)}" target="_blank" rel="noopener"><span>${label}</span>${icon('whatsapp')}</a>`;

const ghostBtn = (href, label) =>
  `<a class="btn btn--ghost" href="${href}"><span>${label}</span>${icon('arrow')}</a>`;

/** Very small markdown subset used in the travel guide copy. */
const md = (s) =>
  s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

module.exports = { sectionHead, expCard, photoTile, lightbox, bookBtn, ghostBtn, md };

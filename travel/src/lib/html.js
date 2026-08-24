const images = require('../data/images.json');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Responsive <picture> built from the generated manifest.
 * Renders an intrinsic-ratio box with an inlined blur placeholder so nothing
 * ever reflows and every image fades in from its own colours.
 */
function pic(opts) {
  const {
    slug,
    alt = '',
    sizes = '100vw',
    cls = '',
    pos,
    priority = false,
    ratio,
    base = '',
    defer = false, // hold the download until the page has finished loading
  } = opts;

  const m = images[slug];
  if (!m) throw new Error('Unknown image: ' + slug);

  const srcset = m.widths.map((w) => `${base}assets/img/${slug}-${w}.webp ${w}w`).join(', ');
  const style = [
    `background-image:url(${m.lqip})`,
    pos ? `--pos:${pos}` : '',
    ratio ? `--ratio:${ratio}` : `--ratio:${(m.w / m.h).toFixed(4)}`,
  ].filter(Boolean).join(';');

  const onload = `onload="this.closest('.pic').classList.add('is-loaded')"`;

  if (defer) {
    return `<figure class="pic ${cls}" style="${style}">
<picture>
<source type="image/webp" data-srcset="${srcset}" sizes="${sizes}">
<img data-src="${base}assets/img/${slug}.jpg" alt="${esc(alt)}" width="${m.w}" height="${m.h}"
 decoding="async" ${onload}>
</picture>
</figure>`;
  }

  return `<figure class="pic ${cls}" style="${style}">
<picture>
<source type="image/webp" srcset="${srcset}" sizes="${sizes}">
<img src="${base}assets/img/${slug}.jpg" alt="${esc(alt)}" width="${m.w}" height="${m.h}"
 ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${onload}>
</picture>
</figure>`;
}

const ICONS = {
  whatsapp: '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/>',
  arrow: '<path d="M4 12h15m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  mail: '<path d="M3 6.5h18v11H3z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m3.5 7 8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  phone: '<path d="M5 3.5h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6v3c0 .9-.7 1.6-1.6 1.5C9.2 18.9 5.1 14.8 3.5 5.1 3.4 4.2 4.1 3.5 5 3.5Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 7v5.4l3.4 2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  close: '<path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  chevron: '<path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18Z" fill="none" stroke="currentColor" stroke-width="1.3"/>',
  facebook: '<path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.47-.13-2.45 0-4.13 1.5-4.13 4.24V9.9H7.4V13h2.7v8z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="17.2" cy="6.8" r="1.2"/>',
  quote: '<path d="M9.6 5.5C6.2 7 4.4 9.7 4.4 13.4c0 3.2 1.7 5.1 4.2 5.1 2.1 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.4 0-.8.1-1 .2.4-1.7 1.9-3.3 3.9-4.3Zm9.9 0C16.1 7 14.3 9.7 14.3 13.4c0 3.2 1.7 5.1 4.2 5.1 2.1 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.4 0-.8.1-1 .2.4-1.7 1.9-3.3 3.9-4.3Z"/>',
  plus: '<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  expand: '<path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
};

const icon = (name, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

/** Primary / ghost buttons. */
const btn = (href, label, { kind = 'solid', wa = false, attrs = '' } = {}) =>
  `<a class="btn btn--${kind}" href="${href}"${wa ? ' target="_blank" rel="noopener"' : ''} ${attrs}>
<span>${label}</span>${wa ? icon('whatsapp', 'btn__wa') : icon('arrow', 'btn__arrow')}</a>`;

const eyebrow = (text) => `<p class="eyebrow reveal">${text}</p>`;

module.exports = { esc, pic, icon, btn, eyebrow, images };

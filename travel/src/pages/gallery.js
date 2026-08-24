const { pic, icon } = require('../lib/html.js');
const { photo, bySlug, CATEGORIES, P } = require('../data/photos.js');
const { lightbox, photoTile } = require('../lib/components.js');

module.exports = function gallery(t, L) {
  const all = [];

  const chapters = CATEGORIES.map((cat, ci) => {
    const c = t.galleryPage.chapters[cat];
    const slugs = bySlug(cat);
    const opener = slugs.find((s) => P[s].hero) || slugs[0];
    const rest = slugs.filter((s) => s !== opener);
    slugs.forEach((s) => all.includes(s) || all.push(s));

    const tiles = rest
      .map((slug, i) =>
        photoTile(slug, t, L, {
          index: i,
          cls: `tile--g${i % 6}`,
          sizes: '(max-width:700px) 92vw, (max-width:1100px) 46vw, 32vw',
        })
      )
      .join('');

    return `<section class="chap" id="chapter-${cat}" data-chapter="${cat}">
  <div class="chap__open">
    <div class="chap__media" data-parallax="0.22">
      ${pic({
        slug: opener,
        alt: photo(opener, t.code).title,
        base: L.base,
        pos: photo(opener, t.code).pos,
        sizes: '100vw',
        priority: ci === 0,
        cls: 'pic--fill',
      })}
    </div>
    <div class="chap__veil"></div>
    <div class="chap__txt">
      <span class="chap__n">${c.n}</span>
      <h2 class="chap__title reveal" data-split>${c.t}</h2>
      <p class="chap__d reveal">${c.d}</p>
      <button class="chap__open-btn reveal" data-photo="${opener}">
        <span>${t.galleryPage.ui.openImage}</span>${icon('expand')}
      </button>
    </div>
  </div>

  <div class="chap__grid">${tiles}</div>
</section>`;
  }).join('');

  const nav = CATEGORIES.map(
    (cat, i) => `<a href="#chapter-${cat}" class="gnav__item${i === 0 ? ' is-active' : ''}" data-gnav="${cat}">
    <span class="gnav__n">${t.galleryPage.chapters[cat].n}</span>
    <span class="gnav__t">${t.galleryPage.chapters[cat].t}</span>
  </a>`
  ).join('');

  return `
<main id="main">

<section class="ghero">
  <div class="ghero__media" data-parallax="0.28">
    ${pic({ slug: 'dune-joy', alt: t.galleryPage.hero.title, base: L.base, pos: '50% 62%', sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="ghero__veil"></div>
  <div class="ghero__inner">
    <p class="eyebrow">${t.galleryPage.hero.eyebrow}</p>
    <h1 class="ghero__title">${t.galleryPage.hero.title}</h1>
    <p class="ghero__sub">${t.galleryPage.hero.sub}</p>
  </div>
  <a class="hero__scroll" href="#chapter-train"><span>${t.galleryPage.hero.scroll}</span><i></i></a>
</section>

<nav class="gnav" aria-label="${t.galleryPage.ui.jump}"><div class="gnav__inner">${nav}</div></nav>

${chapters}

</main>
${lightbox(t, all)}`;
};

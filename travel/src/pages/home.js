const site = require('../data/site.js');
const { reviews, reviewCard, aggregate } = require('../lib/reviews.js');
const { pic, icon } = require('../lib/html.js');
const { photo } = require('../data/photos.js');
const { sectionHead, expCard, photoTile, lightbox } = require('../lib/components.js');

const HERO_SLIDES = ['train-riders', 'golden-dunes', 'camel-silhouette', 'chinguetti-minaret', 'camels-atlantic'];
const MOMENTS = ['dune-summit-people', 'desert-tea', 'train-arms-open', 'oasis-rest-cliff', 'milky-way-acacia', 'nouakchott-fish-market', 'camp-sunrise', 'dune-meets-ocean'];

const split = (text) =>
  text
    .split(' ')
    .map((w, i) => `<span class="w" style="--i:${i}"><i>${w}</i></span>`)
    .join(' ');

module.exports = function home(t, L) {
  const slides = HERO_SLIDES.map(
    (slug, i) => `<div class="hero__slide${i === 0 ? ' is-active' : ''}" data-slide="${i}">
      ${pic({
        slug,
        alt: photo(slug, t.code).title,
        base: L.base,
        pos: photo(slug, t.code).pos,
        sizes: '100vw',
        priority: i === 0,
        defer: i > 0, // only the first frame competes with the fold
        cls: 'pic--fill',
      })}
    </div>`
  ).join('');

  const dots = HERO_SLIDES.map(
    (s, i) => `<button class="hero__dot${i === 0 ? ' is-active' : ''}" data-dot="${i}"
      aria-label="${photo(s, t.code).title}"><span></span></button>`
  ).join('');

  /* ── 4. Featured experiences ─────────────────────────────────────── */
  const cards = t.experiences
    .map((e, i) => expCard(e, t, L, { feature: i === 0, index: i }))
    .join('');

  /* ── 5. Destination preview ──────────────────────────────────────── */
  const destCards = t.destinations
    .map(
      (d, i) => `<a class="dcard reveal" style="--d:${i * 60}ms" href="${L.url('destinations')}#${d.id}">
      <div class="dcard__media">
        ${pic({ slug: d.img, alt: d.name, base: L.base, pos: photo(d.img, t.code).pos, sizes: '(max-width:700px) 76vw, 30vw', cls: 'pic--fill' })}
      </div>
      <div class="dcard__body">
        <span class="dcard__n">${String(i + 1).padStart(2, '0')}</span>
        <h3>${d.name}</h3>
        <p>${d.sub}</p>
      </div>
    </a>`
    )
    .join('');

  /* ── 6. Traveller moments ────────────────────────────────────────── */
  const mosaic = MOMENTS.map((slug, i) =>
    photoTile(slug, t, L, {
      index: i,
      cls: `tile--m${i}`,
      sizes: '(max-width:700px) 50vw, 25vw',
    })
  ).join('');

  /* ── 7. Reviews — a swipeable rail of the real Google cards ───────── */
  const reviewsSection = !reviews.items.length
    ? ''
    : `<section class="rsec">
  <div class="rsec__head">
    <div>
      <p class="eyebrow reveal">${t.home.reviews.eyebrow}</p>
      <h2 class="rsec__title reveal" data-split>${t.home.reviews.title}</h2>
    </div>
    ${aggregate(t, L)}
  </div>

  <div class="rsec__rail" data-rrail data-drag>
    ${reviews.items.map((r, i) => reviewCard(r, t, L, { index: i })).join('')}
  </div>

  <div class="rsec__ctrl">
    <button class="rnav" data-rprev aria-label="${t.reviewsUi.prev}">${icon('chevron')}</button>
    <button class="rnav" data-rnext aria-label="${t.reviewsUi.next}">${icon('chevron')}</button>
    <a class="link link--lg" href="${L.url('reviews')}">${t.home.reviews.cta}${icon('arrow')}</a>
  </div>
</section>`;

  return `
<main id="main">

<!-- ══ HERO ══ -->
<section class="hero" data-hero>
  <div class="hero__media" data-parallax="0.25" aria-label="${t.a11y.heroSlides}">${slides}</div>
  <div class="hero__veil"></div>

  <div class="hero__inner">
    <h1 class="hero__title">
      <span class="hero__line">${split(t.hero.line1)}</span>
      <span class="hero__line hero__line--alt">${split(t.hero.line2)}</span>
    </h1>
    <p class="hero__sub">${t.hero.sub}</p>
    <div class="hero__cta">
      <a class="btn btn--solid" href="${L.url('experiences')}"><span>${t.hero.cta1}</span>${icon('arrow')}</a>
      <a class="btn btn--glass" href="${site.wa(t.hero.waMsg)}" target="_blank" rel="noopener"><span>${t.hero.cta2}</span>${icon('whatsapp')}</a>
    </div>
  </div>

  <div class="hero__dots">${dots}</div>
  <a class="hero__scroll" href="#intro"><span>${t.hero.scroll}</span><i></i></a>
</section>

<!-- ══ INTRO ══ -->
<section class="intro" id="intro">
  <div class="intro__grid">
    <div class="intro__text">
      <p class="eyebrow reveal">${t.home.intro.eyebrow}</p>
      <h2 class="intro__title reveal" data-split>${t.home.intro.title}</h2>
      ${t.home.intro.body.map((p, i) => `<p class="intro__p reveal" style="--d:${i * 80}ms">${p}</p>`).join('')}
    </div>
    <div class="intro__media reveal" data-parallax="0.08">
      ${pic({ slug: 'ouadane-archway', alt: photo('ouadane-archway', t.code).title, base: L.base, sizes: '(max-width:900px) 90vw, 38vw' })}
      <p class="intro__cap">${photo('ouadane-archway', t.code).location}</p>
    </div>
  </div>

  <ul class="stats">
    ${t.home.intro.stats
      .map(
        (s, i) => `<li class="stats__item reveal" style="--d:${i * 90}ms">
      <span class="stats__n">${s.n}</span><span class="stats__l">${s.l}</span></li>`
      )
      .join('')}
  </ul>
</section>

<!-- ══ WHY US ══ -->
${!t.home.why.items.length ? '' : `<section class="why">
  ${sectionHead({ eyebrow: t.home.why.eyebrow, title: t.home.why.title })}
  <div class="why__list" data-hoverimg>
    ${t.home.why.items
      .map(
        (it, i) => `<article class="why__row reveal" style="--d:${i * 70}ms" data-img="${it.img}">
      <span class="why__n">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="why__t">${it.t}</h3>
      <p class="why__d">${it.d}</p>
      <div class="why__thumb">
        ${pic({ slug: it.img, alt: it.t, base: L.base, pos: photo(it.img, t.code).pos, sizes: '320px', cls: 'pic--fill' })}
      </div>
    </article>`
      )
      .join('')}
    <div class="why__float" aria-hidden="true"></div>
  </div>
</section>`}

<!-- ══ FEATURED EXPERIENCES ══ -->
<section class="feat">
  ${sectionHead({ eyebrow: t.home.featured.eyebrow, title: t.home.featured.title, sub: t.home.featured.sub })}
  <div class="feat__grid">${cards}</div>
  <div class="feat__more reveal">
    <a class="btn btn--ghost" href="${L.url('experiences')}"><span>${t.ui.viewAll}</span>${icon('arrow')}</a>
  </div>
</section>

<!-- ══ DESTINATIONS PREVIEW ══ -->
<section class="dprev">
  <div class="dprev__head">
    ${sectionHead({ eyebrow: t.home.destPreview.eyebrow, title: t.home.destPreview.title })}
    <a class="link link--lg reveal" href="${L.url('destinations')}">${t.home.destPreview.cta}${icon('arrow')}</a>
  </div>
  <div class="dprev__rail" data-drag>${destCards}</div>
</section>

<!-- ══ TRAVELLER MOMENTS ══ -->
<section class="moments">
  ${sectionHead({ eyebrow: t.home.moments.eyebrow, title: t.home.moments.title, sub: t.home.moments.sub })}
  <div class="moments__grid">${mosaic}</div>
  <div class="moments__more reveal">
    <a class="btn btn--ghost" href="${L.url('gallery')}"><span>${t.home.moments.cta}</span>${icon('arrow')}</a>
  </div>
</section>

<!-- ══ REVIEWS ══ -->
${reviewsSection}

<!-- ══ FINAL CTA ══ -->
<section class="fcta">
  <div class="fcta__media" data-parallax="0.15">
    ${pic({ slug: 'camels-atlantic', alt: photo('camels-atlantic', t.code).title, base: L.base, pos: '50% 60%', sizes: '100vw', cls: 'pic--fill' })}
  </div>
  <div class="fcta__inner">
    <h2 class="fcta__title reveal" data-split>${t.home.finalCta.title}</h2>
    <p class="fcta__sub reveal">${t.home.finalCta.sub}</p>
    <div class="fcta__btns reveal">
      <a class="btn btn--solid" href="${site.wa(t.home.finalCta.waMsg)}" target="_blank" rel="noopener"><span>${t.home.finalCta.cta1}</span>${icon('whatsapp')}</a>
      <a class="btn btn--glass" href="${L.url('experiences')}"><span>${t.home.finalCta.cta2}</span>${icon('arrow')}</a>
    </div>
  </div>
</section>

</main>
${lightbox(t, MOMENTS)}`;
};

const { pic, icon } = require('../lib/html.js');
const { photo } = require('../data/photos.js');
const { reviews, reviewCard, aggregate } = require('../lib/reviews.js');
const { bookBtn } = require('../lib/components.js');

module.exports = function reviewsPage(t, L) {
  const r = t.reviewsPage;

  // Alternate the drift direction so the column reads as floating, not stacked.
  const cards = reviews.items
    .map((rv, i) => reviewCard(rv, t, L, { size: 'lg', index: i }))
    .map((html, i) => `<div class="rfloat rfloat--${i % 3}">${html}</div>`)
    .join('');

  return `
<main id="main">

<section class="phero phero--xs">
  <div class="phero__media" data-parallax="0.18">
    ${pic({ slug: r.hero.img, alt: r.hero.title, base: L.base, pos: photo(r.hero.img, t.code).pos, sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="phero__veil"></div>
  <div class="phero__inner">
    <p class="eyebrow">${r.hero.eyebrow}</p>
    <h1 class="phero__title">${r.hero.title}</h1>
    <p class="phero__sub">${r.hero.sub}</p>
  </div>
</section>

<section class="rwall">
  ${aggregate(t, L)}
  <div class="rwall__grid">${cards}</div>
</section>

<section class="outro outro--slim">
  <div class="outro__inner">
    <h2 class="outro__title reveal" data-split>${r.cta.title}</h2>
    <p class="outro__sub reveal">${r.cta.sub}</p>
    <div class="reveal">${bookBtn(r.cta.cta, r.cta.waMsg)}</div>
  </div>
</section>

</main>`;
};

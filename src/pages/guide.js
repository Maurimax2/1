const { pic, icon } = require('../lib/html.js');
const { md, bookBtn } = require('../lib/components.js');
const { photo } = require('../data/photos.js');

module.exports = function guide(t, L) {
  const g = t.guidePage;

  const sideNav = g.sections
    .map((s, i) => `<a href="#${s.id}" class="gsnav__item${i === 0 ? ' is-active' : ''}" data-gsnav="${s.id}">
    <span>${String(i + 1).padStart(2, '0')}</span>${s.t}</a>`)
    .join('') + `<a href="#faq" class="gsnav__item" data-gsnav="faq"><span>${String(g.sections.length + 1).padStart(2, '0')}</span>${g.faqTitle}</a>`;

  const sections = g.sections
    .map(
      (s, i) => `<article class="gsec" id="${s.id}">
    <div class="gsec__n reveal">${String(i + 1).padStart(2, '0')}</div>
    <div class="gsec__body">
      <h2 class="gsec__t reveal" data-split>${s.t}</h2>
      ${s.body.map((p, k) => `<p class="reveal" style="--d:${k * 60}ms">${md(p)}</p>`).join('')}
    </div>
  </article>`
    )
    .join('');

  const faq = g.faq
    .map(
      (f, i) => `<details class="faq__item reveal" style="--d:${(i % 5) * 50}ms">
    <summary><span>${f.q}</span>${icon('plus', 'faq__ico')}</summary>
    <div class="faq__a"><p>${f.a}</p></div>
  </details>`
    )
    .join('');

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: g.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return `
<main id="main">

<section class="phero phero--sm">
  <div class="phero__media" data-parallax="0.2">
    ${pic({ slug: g.hero.img, alt: g.hero.title, base: L.base, pos: photo(g.hero.img, t.code).pos, sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="phero__veil"></div>
  <div class="phero__inner">
    <p class="eyebrow">${g.hero.eyebrow}</p>
    <h1 class="phero__title">${g.hero.title}</h1>
    <p class="phero__sub">${g.hero.sub}</p>
  </div>
</section>

<div class="guidewrap">
  <aside class="gsnav" aria-label="${g.hero.title}">
    <div class="gsnav__inner">${sideNav}</div>
  </aside>

  <div class="guidebody">
    ${sections}

    <article class="gsec gsec--faq" id="faq">
      <div class="gsec__n reveal">${String(g.sections.length + 1).padStart(2, '0')}</div>
      <div class="gsec__body">
        <h2 class="gsec__t reveal" data-split>${g.faqTitle}</h2>
        <div class="faq">${faq}</div>
      </div>
    </article>
  </div>
</div>

<section class="outro outro--slim">
  <div class="outro__inner">
    <h2 class="outro__title reveal" data-split>${g.cta.title}</h2>
    <p class="outro__sub reveal">${g.cta.sub}</p>
    <div class="reveal">${bookBtn(g.cta.cta, g.cta.waMsg)}</div>
  </div>
</section>

</main>
<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
};

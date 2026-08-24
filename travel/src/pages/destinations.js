const { pic, icon } = require('../lib/html.js');
const { photo } = require('../data/photos.js');
const { lightbox, bookBtn } = require('../lib/components.js');

module.exports = function destinations(t, L) {
  const all = [];

  const blocks = t.destinations
    .map((d, i) => {
      [d.img, ...d.photos].forEach((s) => all.includes(s) || all.push(s));

      const photos = d.photos
        .map(
          (slug, j) => `<button class="strip__item reveal" style="--d:${j * 60}ms" data-photo="${slug}" aria-label="${photo(slug, t.code).title}">
        ${pic({ slug, alt: photo(slug, t.code).title, base: L.base, pos: photo(slug, t.code).pos, sizes: '(max-width:800px) 45vw, 24vw', cls: 'pic--fill' })}
        <span class="strip__zoom">${icon('expand')}</span>
      </button>`
        )
        .join('');

      return `<article class="dest ${i % 2 ? 'dest--flip' : ''}" id="${d.id}">
  <div class="dest__media" data-parallax="0.1">
    ${pic({
      slug: d.img,
      alt: d.name,
      base: L.base,
      pos: photo(d.img, t.code).pos,
      sizes: '(max-width:900px) 100vw, 52vw',
      cls: 'pic--fill',
    })}
    <span class="dest__index">${String(i + 1).padStart(2, '0')} / ${String(t.destinations.length).padStart(2, '0')}</span>
  </div>

  <div class="dest__text">
    <p class="eyebrow reveal">${d.sub}</p>
    <h2 class="dest__title reveal" data-split>${d.name}</h2>
    <p class="dest__story reveal">${d.story}</p>

    <div class="dest__block reveal">
      <h3 class="minihead">${t.ui.history}</h3>
      <p>${d.history}</p>
    </div>

    <div class="dest__two">
      <div class="dest__block reveal">
        <h3 class="minihead">${t.ui.whyVisit}</h3>
        <ul class="ticks">${d.why.map((w) => `<li>${w}</li>`).join('')}</ul>
      </div>
      <div class="dest__block reveal">
        <h3 class="minihead">${t.ui.moments}</h3>
        <ul class="dots">${d.moments.map((m) => `<li>${m}</li>`).join('')}</ul>
      </div>
    </div>

    <div class="dest__block reveal">
      <h3 class="minihead">${t.ui.info}</h3>
      <dl class="infolist">
        ${d.info.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
      </dl>
    </div>

    <div class="dest__photos">${photos}</div>
  </div>
</article>`;
    })
    .join('');

  return `
<main id="main">

<section class="phero phero--sm">
  <div class="phero__media" data-parallax="0.2">
    ${pic({ slug: 'guide-and-traveller-ridge', alt: t.destinationsPage.hero.title, base: L.base, pos: '50% 62%', sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="phero__veil"></div>
  <div class="phero__inner">
    <p class="eyebrow">${t.destinationsPage.hero.eyebrow}</p>
    <h1 class="phero__title">${t.destinationsPage.hero.title}</h1>
    <p class="phero__sub">${t.destinationsPage.hero.sub}</p>
  </div>
</section>

<nav class="destnav" aria-label="${t.destinationsPage.hero.title}">
  ${t.destinations.map((d) => `<a href="#${d.id}">${d.name}</a>`).join('')}
</nav>

${blocks}

<section class="outro outro--slim">
  <div class="outro__inner">
    <h2 class="outro__title reveal" data-split>${t.home.finalCta.title}</h2>
    <p class="outro__sub reveal">${t.home.finalCta.sub}</p>
    <div class="reveal">${bookBtn(t.ui.plan, t.home.finalCta.waMsg)}</div>
  </div>
</section>

</main>
${lightbox(t, all)}`;
};

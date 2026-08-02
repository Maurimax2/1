const { pic, icon } = require('../lib/html.js');
const { photo } = require('../data/photos.js');
const { sectionHead, bookBtn, lightbox } = require('../lib/components.js');

module.exports = function about(t, L) {
  const a = t.aboutPage;
  const shots = ['ruins-gathering', 'acacia-lunch', 'dune-sunset-crew', 'beach-arrival'];

  return `
<main id="main">

<section class="phero phero--sm">
  <div class="phero__media" data-parallax="0.2">
    ${pic({ slug: a.hero.img, alt: a.hero.title, base: L.base, pos: photo(a.hero.img, t.code).pos, sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="phero__veil"></div>
  <div class="phero__inner">
    <p class="eyebrow">${a.hero.eyebrow}</p>
    <h1 class="phero__title">${a.hero.title}</h1>
    <p class="phero__sub">${a.hero.sub}</p>
  </div>
</section>

<section class="story">
  <div class="story__media reveal" data-parallax="0.06">
    ${pic({ slug: a.story.img, alt: a.story.title, base: L.base, pos: photo(a.story.img, t.code).pos, sizes: '(max-width:900px) 92vw, 44vw' })}
  </div>
  <div class="story__text">
    <p class="eyebrow reveal">${a.story.eyebrow}</p>
    <h2 class="story__title reveal" data-split>${a.story.title}</h2>
    ${a.story.body.map((p, i) => `<p class="reveal" style="--d:${i * 80}ms">${p}</p>`).join('')}
  </div>
</section>

<section class="pillars">
  ${sectionHead({ eyebrow: a.pillars.eyebrow, title: a.pillars.title })}
  <div class="pillars__grid">
    ${a.pillars.items
      .map(
        (p, i) => `<article class="pillar reveal" style="--d:${i * 80}ms">
      <span class="pillar__n">${String(i + 1).padStart(2, '0')}</span>
      <h3>${p.t}</h3>
      <p>${p.d}</p>
    </article>`
      )
      .join('')}
  </div>
</section>

<section class="guides">
  <div class="guides__media reveal" data-parallax="0.08">
    ${pic({ slug: a.guides.img, alt: a.guides.title, base: L.base, pos: photo(a.guides.img, t.code).pos, sizes: '(max-width:900px) 92vw, 42vw' })}
  </div>
  <div class="guides__text">
    <p class="eyebrow reveal">${a.guides.eyebrow}</p>
    <h2 class="guides__title reveal" data-split>${a.guides.title}</h2>
    ${a.guides.body.map((p, i) => `<p class="reveal" style="--d:${i * 80}ms">${p}</p>`).join('')}
    <ul class="stats stats--inline">
      ${a.guides.stats
        .map(
          (s, i) => `<li class="stats__item reveal" style="--d:${i * 90}ms">
        <span class="stats__n">${s.n}</span><span class="stats__l">${s.l}</span></li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="safety">
  <div class="safety__text">
    <p class="eyebrow reveal">${a.safety.eyebrow}</p>
    <h2 class="safety__title reveal" data-split>${a.safety.title}</h2>
    <ul class="ticks ticks--lg">
      ${a.safety.items.map((s, i) => `<li class="reveal" style="--d:${i * 60}ms">${s}</li>`).join('')}
    </ul>
  </div>
  <div class="safety__media reveal" data-parallax="0.06">
    ${pic({ slug: a.safety.img, alt: a.safety.title, base: L.base, pos: photo(a.safety.img, t.code).pos, sizes: '(max-width:900px) 92vw, 42vw' })}
  </div>
</section>

<section class="mission">
  <div class="mission__inner">
    <p class="eyebrow reveal">${a.mission.eyebrow}</p>
    <blockquote class="mission__q reveal" data-split>${a.mission.quote}</blockquote>
    <p class="mission__b reveal">${a.mission.body}</p>
    <div class="reveal">${bookBtn(a.mission.cta, a.mission.waMsg)}</div>
  </div>
</section>

<section class="aboutstrip">
  <div class="strip">
    ${shots
      .map(
        (slug, i) => `<button class="strip__item reveal" style="--d:${i * 60}ms" data-photo="${slug}" aria-label="${photo(slug, t.code).title}">
      ${pic({ slug, alt: photo(slug, t.code).title, base: L.base, pos: photo(slug, t.code).pos, sizes: '(max-width:800px) 45vw, 24vw', cls: 'pic--fill' })}
      <span class="strip__zoom">${icon('expand')}</span>
    </button>`
      )
      .join('')}
  </div>
</section>

</main>
${lightbox(t, shots)}`;
};

const { pic, icon } = require('../lib/html.js');
const { photo } = require('../data/photos.js');
const { lightbox, bookBtn, ghostBtn } = require('../lib/components.js');
const site = require('../data/site.js');

/** Facts panel: only rows the client has actually confirmed are rendered. */
function metaBlock(e, t) {
  const rows = [
    [t.ui.location, e.location],
    [t.ui.duration, e.duration],
    [t.ui.season, e.season],
    [t.ui.group, e.group],
  ].filter(([, v]) => v);

  if (!rows.length) return '';
  return `<aside class="exp__meta reveal"><dl>
      ${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl></aside>`;
}

/** Highlights + itinerary, each shown only when there is something to show. */
function colsBlock(e, t) {
  const hl = e.highlights.length
    ? `<div class="exp__hl reveal">
      <h3 class="minihead">${t.ui.highlights}</h3>
      <ul class="ticks">${e.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
    </div>`
    : '';

  const jr = e.journey.length
    ? `<div class="exp__journey reveal">
      <h3 class="minihead">${t.ui.journey}</h3>
      <ol class="steps">
        ${e.journey
          .map(
            (s, k) => `<li class="steps__item" style="--d:${k * 70}ms">
          <span class="steps__n">${String(k + 1).padStart(2, '0')}</span>
          <div><h4>${s.t}</h4><p>${s.d}</p></div>
        </li>`
          )
          .join('')}
      </ol>
    </div>`
    : '';

  if (!hl && !jr) return '';
  return `<div class="exp__cols${hl && jr ? '' : ' exp__cols--one'}">${hl}${jr}</div>`;
}

module.exports = function experiences(t, L) {
  const all = [];

  const sections = t.experiences
    .map((e, i) => {
      e.gallery.forEach((s) => all.includes(s) || all.push(s));

      const strip = e.gallery
        .map(
          (slug, j) => `<button class="strip__item reveal" style="--d:${j * 60}ms" data-photo="${slug}" aria-label="${photo(slug, t.code).title}">
        ${pic({ slug, alt: photo(slug, t.code).title, base: L.base, pos: photo(slug, t.code).pos, sizes: '(max-width:800px) 45vw, 22vw', cls: 'pic--fill' })}
        <span class="strip__zoom">${icon('expand')}</span>
      </button>`
        )
        .join('');

      return `<article class="exp" id="${e.id}">
  <div class="exp__hero" data-parallax="0.12">
    ${pic({
      slug: e.hero,
      alt: e.title,
      base: L.base,
      pos: photo(e.hero, t.code).pos,
      sizes: '100vw',
      priority: i === 0,
      cls: 'pic--fill',
    })}
    <div class="exp__hero-veil"></div>
    <div class="exp__hero-txt">
      <span class="exp__num">${String(i + 1).padStart(2, '0')}</span>
      <h2 class="exp__title reveal" data-split>${e.title}</h2>
      <p class="exp__tag reveal">${e.tagline}</p>
    </div>
  </div>

  <div class="exp__body">
    <div class="exp__story">
      ${e.story.map((p, k) => `<p class="reveal" style="--d:${k * 70}ms">${p}</p>`).join('')}
      <div class="exp__cta reveal">
        ${bookBtn(t.ui.book, e.waMsg)}
      </div>
    </div>

    ${metaBlock(e, t)}
  </div>

  ${colsBlock(e, t)}

  <div class="exp__strip">
    <h3 class="minihead reveal">${t.ui.photos}</h3>
    <div class="strip">${strip}</div>
  </div>
</article>`;
    })
    .join('');

  const index = t.experiences
    .map(
      (e, i) => `<a class="expnav__item reveal" style="--d:${i * 60}ms" href="#${e.id}">
    <span class="expnav__n">${String(i + 1).padStart(2, '0')}</span>
    <span class="expnav__t">${e.title}</span>
    ${e.duration ? `<span class="expnav__d">${e.duration}</span>` : ''}
  </a>`
    )
    .join('');

  return `
<main id="main">

<section class="phero phero--sm">
  <div class="phero__media" data-parallax="0.2">
    ${pic({ slug: 'train-riders', alt: t.experiencesPage.hero.title, base: L.base, pos: '50% 42%', sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="phero__veil"></div>
  <div class="phero__inner">
    <p class="eyebrow">${t.experiencesPage.hero.eyebrow}</p>
    <h1 class="phero__title">${t.experiencesPage.hero.title}</h1>
    <p class="phero__sub">${t.experiencesPage.hero.sub}</p>
  </div>
</section>

<nav class="expnav" aria-label="${t.experiencesPage.hero.title}">${index}</nav>

${sections}

<section class="outro">
  <div class="outro__inner">
    <h2 class="outro__title reveal" data-split>${t.experiencesPage.outro.title}</h2>
    <p class="outro__sub reveal">${t.experiencesPage.outro.sub}</p>
    <div class="reveal">${bookBtn(t.experiencesPage.outro.cta, t.experiencesPage.outro.waMsg)}</div>
    <p class="outro__alt reveal">${ghostBtn(L.url('contact'), t.nav.contact)}</p>
  </div>
</section>

</main>
${lightbox(t, all)}`;
};

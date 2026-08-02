const site = require('../data/site.js');
const { pic, icon, esc } = require('../lib/html.js');
const { photo } = require('../data/photos.js');

module.exports = function contact(t, L) {
  const c = t.contactPage;
  const m = c.methods;

  const method = (key, href, label, ico, external = true) => `
  <a class="cmethod reveal" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>
    <span class="cmethod__ico">${icon(ico)}</span>
    <h3>${m[key].t}</h3>
    <p>${m[key].d}</p>
    <span class="link">${m[key].a}${icon('arrow')}</span>
    ${label ? `<span class="cmethod__val">${label}</span>` : ''}
  </a>`;

  const options = c.form.interestOptions
    .map((o) => `<option value="${esc(o)}">${o}</option>`)
    .join('');

  return `
<main id="main">

<section class="phero phero--xs">
  <div class="phero__media" data-parallax="0.18">
    ${pic({ slug: c.hero.img, alt: c.hero.title, base: L.base, pos: photo(c.hero.img, t.code).pos, sizes: '100vw', priority: true, cls: 'pic--fill' })}
  </div>
  <div class="phero__veil"></div>
  <div class="phero__inner">
    <p class="eyebrow">${c.hero.eyebrow}</p>
    <h1 class="phero__title">${c.hero.title}</h1>
    <p class="phero__sub">${c.hero.sub}</p>
  </div>
</section>

<section class="cmethods">
  ${method('whatsapp', site.wa(t.footer.waMsg), site.phoneDisplay, 'whatsapp')}
  ${method('email', 'mailto:' + site.email, site.email, 'mail', false)}
  ${method('phone', 'tel:+' + site.whatsapp, site.phoneDisplay, 'phone', false)}
  ${method('location', site.maps, site.city + ', ' + site.country, 'pin')}
</section>

<section class="cform">
  <div class="cform__aside">
    <p class="eyebrow reveal">${c.form.eyebrow}</p>
    <h2 class="cform__title reveal" data-split>${c.form.title}</h2>
    <p class="cform__sub reveal">${c.form.sub}</p>

    <div class="promise reveal">
      <h3 class="minihead">${c.promise.t}</h3>
      <ol class="promise__list">
        ${c.promise.items.map((p) => `<li>${p}</li>`).join('')}
      </ol>
    </div>
  </div>

  <form class="cform__form reveal" data-wa-form
        data-number="${site.whatsapp}"
        data-email="${site.email}"
        data-intro="${esc(c.form.intro)}"
        data-required="${esc(c.form.required)}"
        novalidate>
    <div class="field">
      <label for="f-name">${c.form.name}</label>
      <input id="f-name" name="name" type="text" placeholder="${esc(c.form.namePh)}" data-label="${esc(c.form.name)}" required>
    </div>
    <div class="field">
      <label for="f-email">${c.form.email}</label>
      <input id="f-email" name="email" type="email" placeholder="${esc(c.form.emailPh)}" data-label="${esc(c.form.email)}">
    </div>
    <div class="field field--half">
      <label for="f-country">${c.form.country}</label>
      <input id="f-country" name="country" type="text" placeholder="${esc(c.form.countryPh)}" data-label="${esc(c.form.country)}">
    </div>
    <div class="field field--half">
      <label for="f-people">${c.form.people}</label>
      <input id="f-people" name="people" type="number" min="1" max="40" placeholder="2" data-label="${esc(c.form.people)}">
    </div>
    <div class="field">
      <label for="f-dates">${c.form.dates}</label>
      <input id="f-dates" name="dates" type="text" placeholder="${esc(c.form.datesPh)}" data-label="${esc(c.form.dates)}">
    </div>
    <div class="field">
      <label for="f-interest">${c.form.interest}</label>
      <div class="select">
        <select id="f-interest" name="interest" data-label="${esc(c.form.interest)}" required>${options}</select>
        ${icon('chevron', 'select__chev')}
      </div>
    </div>
    <div class="field">
      <label for="f-message">${c.form.message}</label>
      <textarea id="f-message" name="message" rows="4" placeholder="${esc(c.form.messagePh)}" data-label="${esc(c.form.message)}"></textarea>
    </div>

    <p class="cform__err" data-form-error hidden></p>

    <div class="cform__actions">
      <button class="btn btn--solid" type="submit"><span>${c.form.submit}</span>${icon('whatsapp')}</button>
      <button class="link" type="button" data-mailto>${c.form.submitAlt}${icon('arrow')}</button>
    </div>
  </form>
</section>

<section class="cmap">
  <a class="cmap__link" href="${site.maps}" target="_blank" rel="noopener">
    ${pic({ slug: 'nouakchott-fish-market', alt: site.city, base: L.base, pos: '50% 62%', sizes: '100vw', cls: 'pic--fill' })}
    <span class="cmap__veil"></span>
    <span class="cmap__txt">
      ${icon('pin')}
      <strong>${site.city}, ${site.country}</strong>
      <em>${m.location.a}</em>
    </span>
  </a>
</section>

</main>`;
};

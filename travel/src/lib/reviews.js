const reviews = require('../data/reviews.js');
const { esc, icon } = require('./html.js');

/** The four-colour Google mark, drawn rather than fetched. */
const googleG = (cls = '') => `<svg class="gmark ${cls}" viewBox="0 0 48 48" aria-hidden="true">
<path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
<path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
<path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
<path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
</svg>`;

const STAR = 'M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95z';

const stars = (n) =>
  `<span class="rstars" role="img" aria-label="${n} / 5">${Array.from({ length: 5 }, (_, i) =>
    `<svg viewBox="0 0 24 24" class="${i < n ? 'is-on' : ''}"><path d="${STAR}"/></svg>`
  ).join('')}</span>`;

/** Google's verified-reviewer tick. */
const localGuideBadge = `<span class="lguide" title="Local Guide"><svg viewBox="0 0 24 24" aria-hidden="true">
<path fill="#f9ab00" d="m12 2 2.6 2.1 3.3-.4 1 3.2 2.8 1.8-1.4 3 1.4 3-2.8 1.8-1 3.2-3.3-.4L12 22l-2.6-2.1-3.3.4-1-3.2L2.3 15.3l1.4-3-1.4-3 2.8-1.8 1-3.2 3.3.4z"/>
<path fill="#fff" d="m10.8 15.4-2.9-2.9 1.3-1.3 1.6 1.6 4-4 1.3 1.3z"/></svg></span>`;

function avatar(r) {
  if (r.avatar) {
    return `<img class="ravatar" src="{{BASE}}assets/img/reviewers/${r.avatar}.webp"
      alt="" width="160" height="160" loading="lazy" decoding="async">`;
  }
  return `<span class="ravatar ravatar--letter" style="--c:${r.color}" aria-hidden="true">${r.initial}</span>`;
}

/**
 * One review card. `size` switches between the home carousel and the
 * full-height cards on the reviews page.
 */
function reviewCard(r, t, L, { size = 'md', index = 0 } = {}) {
  const body = r.truncated
    ? `${esc(r.text)}<span class="rmore">…</span>`
    : esc(r.text);

  return `<article class="rcard rcard--${size} reveal" style="--d:${(index % 4) * 90}ms" data-tilt>
  <div class="rcard__inner">
    <header class="rcard__head">
      ${avatar(r).replace('{{BASE}}', L.base)}
      <div class="rcard__who">
        <h3>${esc(r.name)}${r.localGuide ? localGuideBadge : ''}</h3>
        <p>${esc(r.meta)}</p>
      </div>
      ${googleG('rcard__g')}
    </header>

    <div class="rcard__rating">
      ${r.rating ? stars(r.rating) : ''}
      <span class="rcard__date">${esc(r.date)}</span>
    </div>

    <blockquote class="rcard__text" lang="${r.lang}">${body}</blockquote>

    ${r.photos ? `<p class="rcard__photos">${icon('expand')}${r.photos} ${r.photos === 1 ? t.reviewsUi.photo : t.reviewsUi.photos}</p>` : ''}

    ${
      r.reply
        ? `<div class="rcard__reply">
        <p class="rcard__reply-who">${esc(t.reviewsUi.ownerReply)}</p>
        <p>${esc(r.reply)}</p>
      </div>`
        : ''
    }

    <a class="rcard__src" href="${reviews.source}" target="_blank" rel="noopener nofollow">
      ${t.reviewsUi.onGoogle}${icon('arrow')}
    </a>
  </div>
</article>`;
}

/** The 4.1 / 19 summary panel, exactly as Google reports it. */
function aggregate(t, L) {
  const a = reviews.aggregate;
  const full = Math.round(parseFloat(a.rating));
  return `<div class="ragg reveal">
  <div class="ragg__score">
    <span class="ragg__n">${a.rating}</span>
    ${stars(full)}
    <span class="ragg__c">${a.count} ${t.reviewsUi.reviewsOnGoogle}</span>
  </div>
  <a class="ragg__link" href="${reviews.source}" target="_blank" rel="noopener nofollow">
    ${googleG('ragg__g')}<span>${t.reviewsUi.viewProfile}</span>${icon('arrow')}
  </a>
</div>`;
}

module.exports = { reviews, reviewCard, aggregate, googleG, stars };

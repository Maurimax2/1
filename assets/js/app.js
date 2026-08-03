/* ==========================================================================
   Travel and Trips in Mauritania — interactions
   No dependencies. Everything degrades to a perfectly usable static page.
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const BASE = document.body.dataset.base || '';
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Split headings into animatable words ─────────────────────────── */
  function splitText() {
    $$('[data-split]').forEach((el) => {
      if (el.dataset.splitDone) return;
      const text = el.textContent.trim();
      el.innerHTML = text
        .split(/\s+/)
        .map((w, i) => `<span class="w" style="--i:${i}"><i>${w}</i></span>`)
        .join(' ');
      el.dataset.splitDone = '1';
    });
  }

  /* ── Reveal on scroll ─────────────────────────────────────────────── */
  function reveals() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ── Navigation ───────────────────────────────────────────────────── */
  function navigation() {
    const nav = $('#nav');
    const burger = $('.burger');
    const menu = $('#mobile-menu');
    let last = 0;

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-stuck', y > 40);
      nav.classList.toggle('is-hidden', y > 400 && y > last && !menu.classList.contains('is-open'));
      last = y;
      $('.wa-float')?.classList.toggle('is-on', y > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // mobile menu
    const setMenu = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => {
          menu.classList.add('is-open');
          $$('.mnav__link', menu).forEach((l, i) => l.style.setProperty('--d', i * 55 + 90 + 'ms'));
        });
      } else {
        menu.classList.remove('is-open');
        setTimeout(() => (menu.hidden = true), 450);
      }
    };
    burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('.mnav__link', menu).forEach((l) => l.addEventListener('click', () => setMenu(false)));

    // language dropdown
    const lang = $('[data-lang-switch]');
    const btn = $('.lang__btn', lang);
    const close = () => {
      lang.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    };
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !lang.classList.contains('is-open');
      lang.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', close);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  }

  /* ── Parallax ─────────────────────────────────────────────────────── */
  function parallax() {
    if (REDUCED) return;
    const items = $$('[data-parallax]');
    if (!items.length) return;
    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -240 || r.top > vh + 240) return;
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const centre = r.top + r.height / 2 - vh / 2;
        const max = r.height * 0.07;
        const y = Math.max(-max, Math.min(max, -centre * speed));
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ── Deferred images (hero frames 2…n) ───────────────────────────── */
  function promoteDeferred() {
    $$('source[data-srcset]').forEach((s) => {
      s.srcset = s.dataset.srcset;
      s.removeAttribute('data-srcset');
    });
    $$('img[data-src]').forEach((i) => {
      i.src = i.dataset.src;
      i.removeAttribute('data-src');
    });
  }

  /* ── Hero slideshow ───────────────────────────────────────────────── */
  function hero() {
    const root = $('[data-hero]');
    if (!root) return;
    const slides = $$('.hero__slide', root);
    const dots = $$('.hero__dot', root);
    if (slides.length < 2) return;
    let i = 0;
    let timer;

    const go = (n) => {
      slides[i].classList.remove('is-active');
      dots[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      // restart the dot timing animation
      const span = dots[i].querySelector('span');
      span.style.animation = 'none';
      void span.offsetWidth;
      span.style.animation = '';
      dots[i].classList.add('is-active');
      // re-trigger the Ken Burns pan on the incoming image
      const img = slides[i].querySelector('img');
      if (img && !REDUCED) {
        img.style.animation = 'none';
        void img.offsetWidth;
        img.style.animation = '';
      }
    };

    const play = () => {
      clearInterval(timer);
      timer = setInterval(() => go(i + 1), 7000);
    };

    dots.forEach((d, n) =>
      d.addEventListener('click', () => {
        go(n);
        play();
      })
    );
    document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : play()));
    play();
  }

  /* ── "Why us" cursor-following image ──────────────────────────────── */
  function hoverImage() {
    const wrap = $('[data-hoverimg]');
    if (!wrap || window.matchMedia('(max-width: 900px)').matches || REDUCED) return;
    const float = $('.why__float', wrap);
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      float.style.left = cx + 'px';
      float.style.top = cy + 'px';
      raf = requestAnimationFrame(loop);
    };

    $$('.why__row', wrap).forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const slug = row.dataset.img;
        float.style.backgroundImage = `url(${BASE}assets/img/${slug}-480.webp)`;
        float.classList.add('is-on');
        cancelAnimationFrame(raf);
        loop();
      });
      row.addEventListener('mouseleave', () => {
        float.classList.remove('is-on');
        cancelAnimationFrame(raf);
      });
      row.addEventListener('mousemove', (e) => {
        const r = wrap.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
        if (!cx && !cy) {
          cx = tx;
          cy = ty;
        }
      });
    });
  }

  /* ── Drag-to-scroll rail ──────────────────────────────────────────── */
  function dragRail() {
    $$('[data-drag]').forEach((rail) => {
      let down = false, startX = 0, startLeft = 0, moved = 0;
      rail.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return;
        down = true;
        moved = 0;
        startX = e.clientX;
        startLeft = rail.scrollLeft;
        rail.classList.add('is-dragging');
      });
      const end = () => {
        down = false;
        rail.classList.remove('is-dragging');
      };
      rail.addEventListener('pointerup', end);
      rail.addEventListener('pointerleave', end);
      rail.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        moved = Math.abs(dx);
        rail.scrollLeft = startLeft - dx;
      });
      rail.addEventListener('click', (e) => moved > 8 && e.preventDefault(), true);
    });
  }

  /* ── Review rail: arrows + pointer tilt ──────────────────────────── */
  function reviewRail() {
    const rail = $('[data-rrail]');
    if (rail) {
      const step = () => {
        const card = $('.rcard', rail);
        return card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
      };
      $('[data-rnext]')?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
      $('[data-rprev]')?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    }

    if (REDUCED || window.matchMedia('(hover: none)').matches) return;

    $$('[data-tilt]').forEach((card) => {
      const inner = $('.rcard__inner', card);
      if (!inner) return;
      let raf;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          inner.style.transform =
            `rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg) translateZ(14px)`;
        });
      });
      card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        inner.style.transform = '';
      });
    });
  }

  /* ── Reviews page: gentle float as the column scrolls ────────────── */
  function floatCards() {
    if (REDUCED) return;
    const cards = $$('.rfloat');
    if (!cards.length) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
        const drift = (i % 2 === 0 ? -1 : 1) * p * 16;
        c.style.transform = `translate3d(0, ${drift.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ── Testimonials ─────────────────────────────────────────────────── */
  function testimonials() {
    const stage = $('[data-quotes]');
    if (!stage) return;
    const items = $$('.quote', stage);
    const dots = $$('.quote__dot');
    if (items.length < 2) return;
    let i = 0, timer;

    const go = (n) => {
      items[i].classList.remove('is-active');
      dots[i]?.classList.remove('is-active');
      i = (n + items.length) % items.length;
      items[i].classList.add('is-active');
      dots[i]?.classList.add('is-active');
    };
    const play = () => {
      clearInterval(timer);
      timer = setInterval(() => go(i + 1), 8000);
    };
    dots.forEach((d, n) =>
      d.addEventListener('click', () => {
        go(n);
        play();
      })
    );
    play();
  }

  /* ── Scroll-spy for in-page navigations ───────────────────────────── */
  function scrollSpy(navSelector, attr, sectionSelector) {
    const links = $$(navSelector);
    if (!links.length) return;
    const sections = $$(sectionSelector);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id.replace('chapter-', '');
          links.forEach((l) => l.classList.toggle('is-active', l.dataset[attr] === id));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ── Lightbox ─────────────────────────────────────────────────────── */
  function lightbox() {
    const el = $('#lightbox');
    const dataEl = $('#lb-data');
    if (!el || !dataEl) return;

    let data;
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (err) {
      return;
    }
    const bySlug = new Map(data.map((d, i) => [d.s, i]));

    const img = $('.lb__img', el);
    const fields = {
      loc: $('.lb__loc', el),
      title: $('.lb__title', el),
      desc: $('.lb__desc', el),
      story: $('.lb__story', el),
      i: $('.lb__i', el),
      n: $('.lb__n', el),
    };
    let idx = 0;
    let lastFocus = null;

    const bestWidth = (d) => d.ws[d.ws.length - 1];

    const show = (n) => {
      idx = (n + data.length) % data.length;
      const d = data[idx];
      img.classList.remove('is-in');
      const next = new Image();
      next.onload = () => {
        img.src = next.src;
        img.alt = d.t;
        img.classList.add('is-in');
      };
      next.src = `${BASE}assets/img/${d.s}-${bestWidth(d)}.webp`;
      fields.loc.textContent = d.l;
      fields.title.textContent = d.t;
      fields.desc.textContent = d.d;
      fields.story.textContent = d.st;
      fields.i.textContent = idx + 1;
      fields.n.textContent = data.length;
    };

    const open = (slug, trigger) => {
      if (!bySlug.has(slug)) return;
      lastFocus = trigger || null;
      el.hidden = false;
      document.body.classList.add('lb-open');
      requestAnimationFrame(() => el.classList.add('is-open'));
      show(bySlug.get(slug));
      $('.lb__close', el).focus();
    };

    const blank = img.src; // the inlined transparent pixel it ships with
    const close = () => {
      el.classList.remove('is-open');
      document.body.classList.remove('lb-open');
      setTimeout(() => {
        el.hidden = true;
        img.src = blank;
        img.classList.remove('is-in');
      }, 420);
      lastFocus?.focus();
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-photo]');
      if (trigger) {
        e.preventDefault();
        open(trigger.dataset.photo, trigger);
      }
    });

    $('.lb__close', el).addEventListener('click', close);
    $('.lb__nav--prev', el).addEventListener('click', () => show(idx - 1));
    $('.lb__nav--next', el).addEventListener('click', () => show(idx + 1));
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target.classList.contains('lb__stage')) close();
    });

    document.addEventListener('keydown', (e) => {
      if (el.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });

    // swipe
    let sx = 0;
    el.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
    el.addEventListener(
      'touchend',
      (e) => {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 60) show(idx + (dx < 0 ? 1 : -1));
      },
      { passive: true }
    );
  }

  /* ── Contact form → WhatsApp / email ──────────────────────────────── */
  function contactForm() {
    const form = $('[data-wa-form]');
    if (!form) return;
    const err = $('[data-form-error]', form);

    const compose = () => {
      const lines = [form.dataset.intro, ''];
      $$('[data-label]', form).forEach((f) => {
        const v = (f.value || '').trim();
        if (v) lines.push(`${f.dataset.label}: ${v}`);
      });
      return lines.join('\n');
    };

    const valid = () => {
      const name = $('#f-name', form).value.trim();
      const ok = name.length > 1;
      err.hidden = ok;
      if (!ok) err.textContent = form.dataset.required;
      return ok;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!valid()) return $('#f-name', form).focus();
      window.open(`https://wa.me/${form.dataset.number}?text=${encodeURIComponent(compose())}`, '_blank', 'noopener');
    });

    $('[data-mailto]', form)?.addEventListener('click', () => {
      if (!valid()) return $('#f-name', form).focus();
      const subject = encodeURIComponent(form.dataset.intro);
      window.location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${encodeURIComponent(compose())}`;
    });
  }

  /* ── FAQ smooth open ──────────────────────────────────────────────── */
  function faq() {
    $$('.faq__item').forEach((item) => {
      const body = $('.faq__a', item);
      if (!body) return;
      body.style.height = '0px';
      body.style.transition = 'height .5s cubic-bezier(.16,1,.3,1)';
      const summary = $('summary', item);
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        const open = item.hasAttribute('open');
        if (open) {
          body.style.height = body.scrollHeight + 'px';
          requestAnimationFrame(() => (body.style.height = '0px'));
          setTimeout(() => item.removeAttribute('open'), 420);
        } else {
          item.setAttribute('open', '');
          body.style.height = body.scrollHeight + 'px';
          setTimeout(() => (body.style.height = 'auto'), 500);
        }
      });
    });
  }

  /* ── Boot ─────────────────────────────────────────────────────────── */
  splitText();
  document.addEventListener('DOMContentLoaded', () => {
    navigation();
    reveals();
    parallax();
    hero();
    hoverImage();
    dragRail();
    testimonials();
    reviewRail();
    floatCards();
    lightbox();
    contactForm();
    faq();
    scrollSpy('[data-gnav]', 'gnav', '.chap');
    scrollSpy('[data-gsnav]', 'gsnav', '.gsec');
    requestAnimationFrame(() => document.body.classList.add('is-ready'));
  });

  // The remaining hero frames download only once the fold is fully painted.
  window.addEventListener('load', () => setTimeout(promoteDeferred, 400));
})();

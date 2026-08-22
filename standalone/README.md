# MAURIMAX — single-file build

`maurimax.html` is the whole site in one self-contained file: no build step to
run before serving, no framework, no dependencies. Rename it to `index.html`
and upload it anywhere (GitHub Pages, cPanel, Netlify drop, a USB stick).

Arabic is the default language and the page renders `dir="rtl"`. The globe
button in the header switches to English; the choice is kept in `localStorage`.

The older MOORTV build is still here as `moortv.html` / `moortv.js`. It is
untouched by the rebrand — keep it or delete it.

## The three source files

| File | What it is |
| --- | --- |
| `maurimax.src.html` | markup + all CSS, with `__LOGO_URI__` / `__IMG_MAP__` placeholders |
| `maurimax.js` | the runtime: prices, artwork, both dictionaries, cart, interactions |
| `maurimax.preview.html` | generated too — the same page without a document wrapper, for hosts that supply their own skeleton |
| `fontlab.html` | a floating typeface switcher, injected into the preview copy only |
| `images/` | the logo, the optimised player and league artwork, `prepare.mjs` |

**Edit those, never `maurimax.html`** — it is generated, and the next build
overwrites whatever you typed into it:

```bash
node standalone/build-maurimax.mjs
```

The build inlines the script, base64s the logo into the three places it is
used, and turns every `images/*.webp` into `window.MXIMG['<filename>']`.

## Editing

| What | Where |
| --- | --- |
| Prices, badges, which player goes on which card | `PLANS` in `maurimax.js` |
| WhatsApp number | `WA_E164` (international, no `+`) and `WA_DISPLAY` — currently 46 26 17 21 |
| Snapchat handle | `SNAP` |
| All interface text, both languages | the `T` object (`T.ar` and `T.en`) |
| Categories, FAQ, reviews | `CATS`, `FAQS`, `REVIEWS` |
| Which crest sits beside which competition | `LEAGUE_CRESTS` |
| Which posters fill the wall, and the hero fan | `POSTERS`, and the `fan` array in `render()` |
| Colours, type, spacing | the `:root` block in `maurimax.src.html` |

## Images

Everything in `images/` is inlined at build time. Keys come from the filename:
`p-messi.webp` → `MXIMG['p-messi']`, referenced from `PLANS[].photo`,
`LEAGUE_CRESTS`, and the hero (`p-alvarez`).

Anything missing simply falls back to the drawn SVG artwork, so you can delete
a file without breaking the page.

To regenerate the optimised versions from full-resolution originals:

```bash
node standalone/images/prepare.mjs "/path/to/Football pngs"
```

That trims each file to its alpha bounding box, resizes it, and writes WebP
with transparency. Adding a new one means adding a line to `JOBS` in
`prepare.mjs` and a reference in `maurimax.js`.

Guidance for new artwork:

- **Format** PNG or WebP with transparency for cut-outs; JPG for full-bleed
  photography.
- **Size** the whole `images/` folder ends up inside the HTML file, and base64
  adds a third on top. Keep the total under ~400 KB.
- **Rights** see below.

## Before publishing

- **The football photographs and league marks are not licensed.** The player
  cut-outs came from FootyRenders and uniqrenders; the competition marks came
  from football-logos.cc. Photographs of footballers are copyrighted and carry
  likeness rights on top, and league marks are registered trademarks —
  removing a background or resizing changes neither. Using them on a
  commercial page is a real legal exposure. Replace them with images you own
  or have licensed, or drop the files from `images/` and the page falls back
  to its own artwork.
- **The reviews and the "5,000+ subscribers / 4.9★" figures are illustrative,
  not real.** Replace them with genuine reviews and real numbers. Publishing
  invented ones as if they were real would mislead customers.

## The design system

The page runs **dark → light → dark**: a cinematic football hero, a white
editorial body, a dark closing CTA and footer. Purple is concentrated in the
dark zones instead of spread everywhere, and orange is an accent — never a
surface.

- **Type** three variables drive everything: `--head` for headings, `--ui`
  for body text and `--disp` for numerals, the wordmark and Latin poster
  words. Currently `Alexandria` for the first two and
  `Big Shoulders Display` for the third.

  To try alternatives, open `maurimax.preview.html` — `fontlab.html` adds a
  switcher to that copy with six candidate pairings. The build asserts the
  lab never reaches `maurimax.html`. Once a pairing is chosen, set the three
  variables in `:root` and delete the lab.
- **Radius** collapsed to `0 / 3px / pill`. The pill is spent on exactly one
  thing — the primary call to action.
- **No shadows on light surfaces.** Hairlines separate things instead;
  `drop-shadow` appears only under player cut-outs, where it is motivated.
- **Players break their containers** — out of the hero fan, out of the top of
  the lead pricing card, off the edge of the football and closing sections.
- **Sections are not numbered.** They are not a sequence, so numbering them
  would have been decoration.

### Two things that must stay measured, not calculated

`fitWordmarks()` shrinks each typographic category poster until it fits its
tile. Sizing it from character counts breaks: if Google Fonts has not loaded,
the fallback's metrics are far wider and the word overflows.

`figure()` splits each library statistic into a number plus whatever surrounds
it, so `20,000+` counts up on scroll and `4K UHD` is printed as-is.

Everything decorative is disabled under `prefers-reduced-motion`.

## Notes

- Fonts load from Google Fonts — the single external request in the file.
  Remove the two `<link>` tags in `<head>` to drop it; the CSS falls back to
  system Arabic and Latin faces.
- Checkout does not take payment. It formats the order and opens WhatsApp.

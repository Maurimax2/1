# MAURIMAX — single-file build

`maurimax.html` is the whole site in one self-contained file: no build step to
run before serving, no framework, no dependencies. Rename it to `index.html`
and upload it anywhere (GitHub Pages, cPanel, Netlify drop, a USB stick).

Arabic is the default language and the page renders `dir="rtl"`. The header
toggle switches to **French**; the choice is kept in `localStorage`. Figures
follow the locale too — `1,500` in Arabic, `1 500` in French — including in
the WhatsApp order.

## Two sites, one pipeline

| Brand | Sources | Build | Palette |
| --- | --- | --- | --- |
| **MAURIMAX** | `maurimax.src.html`, `maurimax.js` | `build-maurimax.mjs` | white ground, violet + orange |
| **MOOR TV** | `moortv.src.html`, `moortv.js` | `build-moortv.mjs` | black ground, blue + violet |

They share `images/`, the same layout and the same runtime shape — only the
palette, the copy, the prices and the contact details differ. Each build reads
its own logo (`maurimax-logo.png` / `moortv-logo.png`) and writes its own
`*.html`, `*.preview.html` and `dist*` output.

MOOR TV differs from MAURIMAX in two structural ways:

- **Five durations, not four** — 500 / 1,000 / 1,700 / 2,500 / 3,000 MRU for
  1, 3, 6, 12 and 15 months, measured against a 500 monthly reference.
- **An extras section.** Two-screen terms and the hardware bundle are a
  different thing being bought, not a longer version of the same thing, so
  they sit in `EXTRAS` outside the ladder. `planLabel()` is the single place
  that names an offer, so the cards, the order sheet and the WhatsApp message
  always describe it the same way. `find()` resolves ids across both lists,
  which is what lets an extra be ordered through the same sheet.

MOOR TV's mark is rendered from `images/moortv-logo.svg`, the cool colourway
of the brand's retro-TV logo. Its bezel is the brand blue rather than the
stock near-black, which would disappear against the dark header.

## The three source files

| File | What it is |
| --- | --- |
| `maurimax.src.html` | markup + all CSS, with `__LOGO_URI__` / `__IMG_MAP__` placeholders |
| `maurimax.js` | the runtime: prices, artwork, both dictionaries, the order sheet, interactions |
| `maurimax.preview.html` | generated too — the same page without a document wrapper, for hosts that supply their own skeleton |
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
| All interface text, both languages | the `T` object (`T.ar` and `T.fr`) |
| Categories, FAQ, reviews | `CATS`, `FAQS`, `REVIEWS` |
| Which crest sits beside which competition | `LEAGUE_CRESTS` |
| Which posters fill the wall, and the hero fan | `POSTERS`, and the `fan` array in `render()` |
| Key art drifting behind the closing CTA | `DRIFT` |
| Who stands where | `PLANS[].photo` / `.photo2`, and the `setImg` calls in `render()` |
| Colours, type, spacing | the `:root` block in `maurimax.src.html` |

## Images

Everything in `images/` is inlined at build time. Keys come from the filename:
`p-messi.webp` → `MXIMG['p-messi']`. The prefix says what a file is for:

| Prefix | Used by | What it is |
| --- | --- | --- |
| `p-` | `PLANS[].photo`, the hero | footballer cut-outs, transparent |
| `l-` | `LEAGUE_CRESTS`, the marquee | competition marks, transparent |
| `po-` | `POSTERS` | league key art, opaque |
| `m-` | `DRIFT`, the hero fan, two genre tiles | film and series key art, opaque |
| `x-` | `PLANS`, the hero, section anchors | character cut-outs, background removed |
| `c-` | `CATS[].photo` | photography for genre tiles |

Cut-outs were produced with `rembg` (u2net, alpha matting on); the nature
photograph had its overlaid branding removed with an OpenCV TELEA inpaint
before cropping. Neither step is part of the build — `images/` holds the
results.

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
- **The film, series and character images are not licensed either.** Poster
  art, production stills and the nature photograph are copyrighted, the
  characters carry likeness rights, and the titles are trademarks. Cutting a
  background out or removing a logo changes none of that.
- **The reviews and the "5,000+ subscribers / 4.9★" figures are illustrative,
  not real.** Replace them with genuine reviews and real numbers. Publishing
  invented ones as if they were real would mislead customers.

### Genre tiles

All ten now carry real artwork. The News tile is the one exception in
treatment: it holds a channel mark rather than a photograph, so it sets
`logo:true` and the art sits contained on the brand ground instead of being
cropped to fill.

`fitWordmarks()` and the `.typo` treatment are kept even though nothing uses
them now — drop a `photo` from any `CATS` entry and that tile falls back to
its name set at display size rather than breaking.

## The design system

The page runs **dark → light → dark**: a cinematic football hero, a white
editorial body, a dark closing CTA and footer. Purple is concentrated in the
dark zones instead of spread everywhere, and orange is an accent — never a
surface.

- **Type** three variables drive everything: `--head` for headings, `--ui`
  for body text and `--disp` for numerals, the wordmark and Latin poster
  words. `Alexandria` for the first two, `Big Shoulders Display` for the
  third — chosen from six candidates and now fixed.
- **Radius** collapsed to `0 / 3px / pill`. The pill is spent on exactly one
  thing — the primary call to action.
- **No shadows on light surfaces.** Hairlines separate things instead;
  `drop-shadow` appears only under player cut-outs, where it is motivated.
- **Football and screen sit side by side.** A footballer and a character stand
  together in the hero, together on the best-value card, and alternate down
  the plan ladder; each section is anchored by one or the other. Neither world
  is filed away in a rail of its own.
- **Figures break their containers** — out of the hero fan, out of the top of
  the lead pricing card, off the edge of the football, content, why and
  closing sections.
- **Sections are not numbered.** They are not a sequence, so numbering them
  would have been decoration.
- **Key art is texture, not a list.** Film and series posters drift in two
  crossing rows behind the closing call to action and fill the hero fan. The
  page never presents them as a catalogue of titles.

### Ordering: no cart

Nobody buys two subscriptions, so there is no cart to maintain. Tapping a
genre — or any plan — opens one sheet: step one lists the four terms, step two
takes a name and number and hands the order to WhatsApp. `chosen` holds the
single selected plan id; `openSheet(planId, catName)` decides which step
opens, and naming the genre makes the sheet feel like an answer to the tap
rather than a generic popup.

### Two things that must stay measured, not calculated

`fitWordmarks()` shrinks each typographic category poster until it fits its
tile. Sizing it from character counts breaks: if Google Fonts has not loaded,
the fallback's metrics are far wider and the word overflows.

`figure()` splits each library statistic into a number plus whatever surrounds
it, so `20,000+` counts up on scroll and `4K UHD` is printed as-is.

One more trap worth knowing: `aspect-ratio` is ignored on inline elements. Any
frame built from a `<span>` needs `display:block` or it collapses and the art
covers whatever follows it.

Everything decorative is disabled under `prefers-reduced-motion`.

## Notes

- Fonts load from Google Fonts — the single external request in the file.
  Remove the two `<link>` tags in `<head>` to drop it; the CSS falls back to
  system Arabic and Latin faces.
- Checkout does not take payment. It formats the order and opens WhatsApp.
- The file is ~970 KB because all 35 images are base64'd into it. That is the
  cost of one self-contained file. If load time on mobile data matters more
  than portability, change the build to write `images/` alongside the HTML and
  reference them by path — the markup already lazy-loads everything below the
  hero.

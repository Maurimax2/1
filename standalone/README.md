# MAURIMAX — single-file build

`maurimax.html` is the whole site in one self-contained file: no build step to
run before serving, no framework, no dependencies. Rename it to `index.html`
and upload it anywhere (GitHub Pages, cPanel, Netlify drop, a USB stick).

Arabic is the default language and the page renders `dir="rtl"`. The header
toggle switches to **French**; the choice is kept in `localStorage`. Figures
follow the locale too — `1,500` in Arabic, `1 500` in French — including in
the WhatsApp order.

## Two sites, one pipeline

| Brand | Sources | Build | Look |
| --- | --- | --- | --- |
| **MAURIMAX** | `maurimax.src.html`, `maurimax.js` | `build-maurimax.mjs` | dark → light → dark; white editorial body, violet + orange |
| **MOOR TV** | `moortv.src.html`, `moortv.js` | `build-moortv.mjs` | dark throughout; blue leads, violet is the atmosphere |

They share `images/` and the same runtime shape — the dictionaries, the order
sheet, the reveal and counter machinery are the same code in both files. What
they do **not** share is the layout. Each build reads its own logo
(`maurimax-logo.png` / `moortv-logo.png`) and writes its own `*.html`,
`*.preview.html` and `dist*` output.

### What MOOR TV does differently

Every section is a different shape, not a recolour of the MAURIMAX one:

| Section | MAURIMAX | MOOR TV |
| --- | --- | --- |
| Ground | dark → white → dark | dark all the way down; sections separate by elevation (`--paper` base, `--paper-2` panel, a lit blue field) |
| Hero | copy left, a fan of three cards right, two figures over it | no figures at all: centred type inside a raked wall of full-size posters, three rows filling the screen at three speeds |
| Statistics | four stepped hairline rows in a 5/7 split | one scoreboard band, four figures read across |
| Pricing | one dominant card plus four hairline rows | a horizontal shelf that drifts on its own, each offer a card with a figure standing in a colour of its own |
| Hardware | sold as one of the plan cards | a section of its own: the product large and lit, with what the offer includes beside it |
| Football | a 2×2-lead poster grid | a full-bleed marquee, paused on hover or focus |
| Content | two horizontal rails with arrows | a mosaic, everything on screen, two tiles double width |
| Why | a two-column hairline list | eight numbered blocks; the ninth cell is where the figure stands |
| Reviews | a draggable rail of columns | a wall of quotes, the first one double width |
| FAQ | a 4/7 sidebar split | one centred column, help block beneath |
| Closing CTA | type left, figure right | centred, the figure behind the type |

And two differences of substance rather than form:

- **Five durations, not four** — 500 / 1,000 / 1,700 / 2,500 / 3,000 MRU for
  1, 3, 6, 12 and 15 months, measured against a 500 monthly reference.
- **Seven subscriptions on a shelf, and the hardware on a stage.** The five
  durations and the two two-screen terms are the same purchase in different
  sizes, so they share one horizontal rail. The device is not a longer
  subscription — it is a thing in a box — so it has `#device` to itself.
  `EXTRAS` still holds all three, and `find()` resolves ids across both lists,
  which is what lets any of them be ordered through the same sheet;
  `render()` simply filters the device out of the shelf.

### The offer shelf

`OFFER_ART` is the whole look of the shelf in one table: which figure stands
in each card and its two colours. The colour is a **ladder** — blue at one
month through violet at fifteen — so the row reads as ascending, and the
two-screen terms break out into cyan because they are a different product,
not a longer one. Those two cards carry a drawn pair of screens rather than a
person; a face would have said nothing about what makes them different.
`--ct` is the text that sits on `--c2`, declared only by the cyan pair, where
white would fail.

**The drift.** The rail moves on its own and stops the moment anyone reaches
for it — pointer, keyboard or touch. It scrolls a real scroll container rather
than translating a track, so a drag, a swipe and the arrow buttons all still
work while it is moving, and it reverses at each end rather than jumping back.
Two things it gets wrong if rewritten carelessly:

- **The step must accumulate in `pos`, not in `rail.scrollLeft`.** The browser
  rounds that property to whole pixels, so reading it back each frame throws
  the sub-pixel remainder away and the rail never moves at all.
- **`scrollLeft` counts *down* from zero under RTL**, so the sign of "forward"
  flips with the document direction.

A manual scroll also sets a `settle` counter, without which the drift fights
the reader's own swipe on a touch screen, where there is no `pointerleave`.

### The duration meter

Each card carries a meter of fifteen segments — one per month of the longest
term — lit up to that offer's length, so a one-month term is *meant* to look
short beside a fifteen-month one. Every offer is measured in months, so one
drawing compares all seven.

It draws off the section reveal rather than a scroll handler: the segments
carry a paused animation and `.railwrap.in` starts it, each waiting
`--i × 40ms` so the bar reads as filling rather than appearing. Under
`prefers-reduced-motion` the whole rule is absent and the segments simply
render. `METER_MAX` is the segment count; raise it if a longer term is ever
added, or the longest offer will sit at a full bar with nothing above it.

### The device section

`device.specs` is a label/value list in the dictionary. **Its rows restate
what the offer includes — they are not the manufacturer's datasheet.** The
supplied photograph is a Xiaomi TV stick, and the page sells it under the
MOOR TV name; confirm the model, its real specification (the 4K claim in
particular) and whether it may be resold under another name before this
section goes live.

### Three things the all-dark page forces

- **Nothing inverts to white-on-white.** Every icon button hover goes to
  `#fff` ground with `var(--ink)` text, not to `var(--ink-text)` — which is
  now white.
- **Half the competition marks are near-black artwork made for a white page.**
  `.lg .crest`, the marquee marks and the poster captions give them a plate to
  sit on; without it they disappear into the ground.
- **`.whyGrid` draws its dividers with the gap, not with borders.** It has
  `gap:2px` over a `var(--line)` ground and each block paints its own
  background over it, which keeps the hairlines correct at every column count.
  The price of that trick is that an incomplete last row shows the ground as a
  grey block, so the eight reasons' leftover ninth cell is where the figure
  stands.

### The hero wall

Three rows of posters at `--pw` wide (190 / 250 / 310 by breakpoint), 6px
apart, raked −9° and sliding at three speeds in two directions. Two details
keep it working:

- **The wall is `direction:ltr`, and that is load-bearing.** Each row is
  `max-content` wide — far wider than its grid area — so it is placed at the
  area's *inline start*. Under RTL that is the right edge, and a row
  translated −50% then walks clean off the left of the screen and disappears.
  It has to sit on the container, not the row: direction on the row governs
  its contents, not where the grid puts it.
- **The rows overflow the frame on purpose and are centred.** Sized to fit
  exactly, the gaps between them line up into a visible empty band once the
  rake tilts them. Overfilling crops the top and bottom rows instead.

The type sits in a *tight* pool of shadow, not a wide vignette — a wide one
blacked out the middle row and the wall read as having a hole in it.

MOOR TV's mark is rendered from `images/moortv-logo.svg`, the cool colourway
of the brand's retro-TV logo. Its bezel is the brand blue rather than the
stock near-black, which would disappear against the dark header.

### Keeping the two sites from looking alike

They share an image folder, so the casting is what separates them. **No figure
or poster holds the same slot on both sites**, and five files were held back
from MAURIMAX entirely so MOOR TV could open on faces the other site never
shows: the alternate Ronaldo and Messi renders (`p-ronaldo-b`, `p-messi-b`),
Kane (`p-kane`, cut out — he was displaced from MAURIMAX when Makhachev took
the Sports tile), the Ligue 1 mark and the Premier League mark with its
wordmark.

| Slot | MAURIMAX | MOOR TV |
| --- | --- | --- |
| Hero | Álvarez + Homelander over a fan of three posters | no figures — the whole `WALL` pool, raked and sliding |
| Offer cards | Messi, Walter White, Haaland, Tyrion, Punisher | Kane, Homelander, Jane, Haaland, Messi (alt) + Tyrion — see `OFFER_ART` |
| Football anchor | Ronaldo | Yamal |
| Content anchor | Patrick Jane | Walter White |
| Why anchor | Haaland | Álvarez |
| Closing CTA | Yamal | Messi |
| Poster wall lead | Premier League | Champions League |
| Movies / Series tiles | Fury / The Walking Dead | Spider-Man / Game of Thrones |

The eight genre photographs — football, sports, kids, anime, news,
documentaries, drama, live — have no alternates, so both sites use them. New
images for any of those would separate the two further.

Two figures are now unused by MOOR TV — the alternate Ronaldo render and the
Punisher — but the build inlines the whole of `images/` into `moortv.html`
regardless, so they still cost bytes there. `dist-moortv/` does not pay that,
since it writes the files out and the browser fetches only what the markup
asks for.

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

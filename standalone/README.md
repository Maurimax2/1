# MOORTV — single-file build

`moortv.html` is the whole site in one self-contained file: no build step, no
framework, no dependencies. Rename it to `index.html` and upload it anywhere
(GitHub Pages, cPanel, Netlify drop, a USB stick).

Arabic is the default language and the page renders `dir="rtl"`. The globe
button in the header switches to English; the choice is kept in `localStorage`.

## Editing

| What | Where |
| --- | --- |
| Prices, plan and device copy | `PLANS` / `DEVICES` near the top of the script |
| WhatsApp number | `WA_E164` (international, no `+`) and `WA_DISPLAY` |
| Snapchat handle | `SNAP` |
| All interface text, both languages | the `T` object (`T.ar` and `T.en`) |
| Categories, FAQ, testimonials | `CATS`, `FAQS`, `REVIEWS` |
| Colours | the `:root` block in `<style>` |

`moortv.js` is the readable source for that script. **If you edit the `.js`,
re-inline it** — otherwise the HTML keeps serving the old copy:

```bash
node standalone/build.mjs
```

Editing `moortv.html` directly is fine too; just be aware the `.js` will then
be stale.

## Before publishing

- **The 4,500 MRU box price is a placeholder.** Only the stick (3,000 MRU with
  a year included) comes from the brand's own flyer. Confirm the box price and
  update it in `DEVICES` and in the Stick-vs-Box FAQ answer, which quotes both.
- **The testimonials and the "5,000+ subscribers / 4.9★" figures are
  illustrative, not real.** Replace them with genuine reviews and real numbers.
  Publishing invented ones as if they were real would be misleading to
  customers.

## What's in it

Cinematic intro (once per browser session), aurora lighting, a canvas
particle field, a hero collage that follows the cursor with per-tile depth,
word-by-word headline reveal, scroll-reveal on every section, animated
counters, a live sale countdown, 3D tilt with a cursor spotlight on every
card, ripple on every button, arrow controls on the category rails, an
accordion FAQ, a cart drawer, and a checkout modal that opens WhatsApp.

Everything decorative is disabled under `prefers-reduced-motion`, and the
tilt is skipped on touch devices.

## Notes

- Fonts load from Google Fonts — the single external request in the file.
  Remove the two `<link>` tags in `<head>` to drop it; the CSS falls back to
  system Arabic and Latin faces.
- All artwork is original SVG drawn in code, so there is nothing to license.
  Streaming-service names are set as plain typography rather than reproduced
  logos, with an ownership notice under the strip.
- Checkout does not take payment. It formats the order and opens WhatsApp.

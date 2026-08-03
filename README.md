# MOORTV

The MOORTV website — `maurimax.store`.

**أكبر منصة ترفيهية في موريتانيا**

Built with Next.js 15 (App Router), React 18, Tailwind CSS and Framer Motion,
and exported as a fully static site so GitHub Pages can serve it directly.

---

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Building

```bash
npm run build      # type-checks, builds, and writes the static site to out/
npm run typecheck  # types only
```

`next build` runs the export automatically (`output: 'export'` in
`next.config.mjs`). The contents of `out/` are what get deployed.

## Deploying

The generated site is committed at the repository root so GitHub Pages can
serve it from the branch with no build step: `index.html`, `checkout/`,
`404.html`, `_next/`, `sitemap.xml`, `robots.txt`, plus `CNAME` and
`.nojekyll` (the latter is required — Jekyll otherwise ignores `_next/`).

To publish a change:

```bash
npm run deploy     # build, then sync out/ to the repo root
git add -A && git commit -m "..." && git push
```

---

## Where to change things

| What | File |
| --- | --- |
| Prices, plans, TV boxes | `lib/products.ts` |
| Categories & football leagues | `lib/products.ts` |
| WhatsApp number, Snapchat, tagline | `lib/site.ts` |
| Colours, fonts, animations | `tailwind.config.ts`, `app/globals.css` |
| FAQ questions | `components/sections/FAQ.tsx` |
| Testimonials | `components/sections/Testimonials.tsx` |

### Prices — please confirm before launch

| Item | Price used | Source |
| --- | --- | --- |
| 3 Months | 1200 MRU | project brief |
| 6 Months | 2000 MRU | project brief |
| 12 Months + 3 free | 3000 MRU | project brief |
| MOORTV Stick 4K | 3000 MRU, 1 year included | the brand's own flyer |
| Box 4K / Cinema Pro / Family Bundle / Remote | 4000 / 6500 / 5500 / 500 MRU | **placeholders — confirm or remove** |

The 2024 flyer advertised 800 / 1200 / 2000 MRU for the three subscription
tiers. The brief's newer ladder is what the site uses; change `lib/products.ts`
if that is wrong.

---

## How the ordering flow works

There is no payment processing on the site. The cart lives in
`localStorage` (`lib/cart.tsx`), and checkout builds a formatted order message
and opens `wa.me/22243042404` with it prefilled. Payment and activation happen
in the WhatsApp conversation.

## Artwork

Every image on the site is original SVG drawn in code
(`components/art/PosterArt.tsx`, `components/ui/Logo.tsx`) — no stock photos
and no third-party promotional art, so there is nothing to license. The logo is
a vector recreation of the MOORTV mark: a retro TV framing a desert night with
crimson dunes and a coral crescent.

Streaming-service names in the logo cloud are set as plain typography rather
than reproduced logo files, and carry an ownership notice. They are there to
describe the kind of content available, not to imply any partnership.

## Accessibility & performance

- Skip link, focus-visible rings, keyboard-navigable cart with a focus trap.
- Every decorative animation is disabled under `prefers-reduced-motion`.
- The particle canvas pauses when off-screen or when the tab is hidden.
- Fonts are self-hosted through `next/font`; nothing loads from a third party
  at runtime.

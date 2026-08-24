# maurimax.store

Two sites live in this repository, both served by GitHub Pages from `main`.

| URL | What it is | Source |
| --- | --- | --- |
| `maurimax.store/` | **MAURIMAX** — the streaming subscription site | `site/` |
| `maurimax.store/travel/` | the Mauritanian travel site | `travel/` |

The travel site used to sit at the root. It moved to `/travel/` when MAURIMAX
took the domain; every link in it was already relative, so nothing needed
rewriting apart from its sitemap. The exact pre-move state is preserved on the
`travel-site` branch if it is ever wanted back at the root.

## MAURIMAX

Arabic is the default language and the page renders `dir="rtl"`; the header
toggle switches to French. There is no cart — tapping a genre or a plan opens
one order sheet that ends in a prefilled WhatsApp message.

Everything at the root is **generated**. Edit the sources in `site/`, never
`index.html` or `assets/`:

| File | What it is |
| --- | --- |
| `site/maurimax.src.html` | markup and all CSS |
| `site/maurimax.js` | prices, artwork, both dictionaries, the order sheet |
| `site/images/` | artwork, plus `prepare.mjs` which optimises new files |

To rebuild and publish to the root:

```bash
node site/build-maurimax.mjs --out .
```

That writes `index.html` and `assets/` here, and also refreshes
`site/maurimax.html` — one self-contained copy of the whole site, useful for
sending to someone or hosting somewhere without a build step.

`--out` only ever clears the `assets/` folder inside the target, never the
target itself, so pointing it at a populated directory cannot wipe it.

The design system, the image pipeline and the outstanding items are documented
in [`site/README.md`](site/README.md).

## Before this is promoted

Two points from `site/README.md` are worth repeating here, because they are
commercial risks rather than technical ones:

- **None of the photography is licensed.** The footballers, league marks, film
  and series key art, characters and the nature photograph are copyrighted,
  several carry likeness rights, and the titles and competition names are
  trademarks. Removing a background or a logo changes none of that.
- **The reviews and the subscriber figures are illustrative, not real.** They
  need replacing with genuine ones.

## The travel site

Unchanged apart from its location and its sitemap URLs. Its own documentation
is at [`travel/README.md`](travel/README.md) and its build tooling lives in
`travel/src` and `travel/tools`.

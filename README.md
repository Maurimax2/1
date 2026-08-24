# maurimax.store

**MAURIMAX** — the streaming subscription site. Served by GitHub Pages from
`main`.

Arabic is the default language and the page renders `dir="rtl"`; the header
toggle switches to French. There is no cart — tapping a genre or a plan opens
one order sheet that ends in a prefilled WhatsApp message.

A Mauritanian travel site used to occupy this domain, first at the root and
briefly at `/travel/`. It has been removed from the domain entirely. Nothing
was lost: its exact state is preserved on the **`travel-site`** branch, and
`git log` still has every commit.

## Editing

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

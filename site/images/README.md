Everything in this folder is inlined into `maurimax.html` by
`../build-maurimax.mjs`:

- `maurimax-logo.png` — the brand mark, used in the header, the footer, the
  preloader and the favicon.
- `*.webp` — becomes `window.MXIMG['<filename without extension>']`, which
  `maurimax.js` reads for the plan cards (`p-*`), the league grid (`l-*`) and
  the hero. Any key that is absent falls back to the drawn SVG artwork.
- `prepare.mjs` — regenerates the `.webp` files from full-resolution sources.

Only use images you have the right to use commercially — files you own,
material a rights-holder has licensed to you, or press assets cleared for
promotional use. Studio stills, character art and agency photos of players
are copyrighted and also carry likeness rights; league and club marks are
registered trademarks. The football files currently here came from
FootyRenders, uniqrenders and football-logos.cc and are **not** licensed —
see "Before publishing" in `../README.md`.

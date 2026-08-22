/**
 * Re-generates the optimised artwork in this folder from the original
 * full-resolution files. Only needs re-running when a source image changes.
 *
 *   node standalone/images/prepare.mjs /path/to/source-folder
 *
 * Sources are the player cut-outs and league marks supplied by the brand.
 * Everything is trimmed to its alpha bounding box, resized, and written as
 * WebP with transparency so it can be inlined as a data: URI without
 * bloating the single-file build.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
if (!src) {
  console.error('usage: node prepare.mjs <source-folder>');
  process.exit(1);
}

/**
 * key → [source filename fragment, target size, webp quality].
 *
 * The filename fragment is matched as a case-insensitive substring, so the
 * accented names survive whichever Unicode normalisation the source folder
 * happens to use. The size is a height; prefix it with `w` (`'w420'`) to fit
 * to a width instead, which is what the near-square posters want.
 *
 *   p-*   player cut-outs, transparent — plan cards and the hero
 *   l-*   competition marks, transparent — beside each league name
 *   po-*  league key art, opaque — the poster wall
 *   c-*   player photography, opaque — the content rails
 */
const JOBS = {
  'p-ronaldo':     ['Ronaldo - FootyRenders.png', 660, 68],
  'p-haaland':     ['land - FootyRenders.png', 660, 68],
  'p-yamal':       ['lamine-yamal', 660, 68],
  'p-messi':       ['Messi - FootyRenders 2.png', 660, 68],
  'p-alvarez':     ['lvarez - FootyRenders.png', 620, 66],
  'l-epl':         ['english-premier-league--no-text', 240, 80],
  'l-laliga':      ['spain_la-liga_3000', 240, 80],
  'l-seriea':      ['italy_serie-a_3000x3000.football-logos.cc.png', 240, 80],
  'l-bundesliga':  ['germany_bundesliga_3000', 240, 80],
  'l-ucl':         ['uefa-champions-league_3000', 240, 80],
  'l-spl':         ['saudi-professional-league_3000', 240, 80],
  'po-epl':        ['IMG_5253', 'w400', 52],
  'po-ucl':        ['IMG_5257', 'w400', 52],
  'po-laliga':     ['IMG_5252', 'w400', 52],
  'po-seriea':     ['IMG_5254', 'w400', 52],
  'po-bundesliga': ['IMG_5256', 'w400', 52],
  'po-ligue1':     ['IMG_5255', 'w400', 52],
  'c-football':    ['IMG_5250', 560, 58],
  'c-sports':      ['IMG_5251', 560, 58],
  'c-live':        ['IMG_5249', 560, 58],
};

const pool = readdirSync(src);
function resolve(fragment) {
  const hit = pool.filter((f) => f.toLowerCase().includes(fragment.toLowerCase()));
  if (hit.length !== 1) {
    throw new Error(`"${fragment}" matched ${hit.length} files: ${hit.join(', ')}`);
  }
  return join(src, hit[0]);
}

const py = `
import sys
from PIL import Image
inp, out, size, q = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
im = Image.open(inp).convert('RGBA')
bb = im.getchannel('A').getbbox()
if bb: im = im.crop(bb)
if size.startswith('w'):
    w = int(size[1:]); h = max(1, round(im.height * w / im.width))
else:
    h = int(size); w = max(1, round(im.width * h / im.height))
im = im.resize((w, h), Image.LANCZOS)
# Opaque sources keep no alpha channel — it only costs bytes.
if im.getchannel('A').getextrema()[0] == 255: im = im.convert('RGB')
im.save(out, 'WEBP', quality=q, method=6)
print(im.width, im.height)
`;

let total = 0;
for (const [key, [file, h, q]] of Object.entries(JOBS)) {
  const out = join(here, key + '.webp');
  const dims = execFileSync('python3', ['-c', py, resolve(file), out, String(h), String(q)])
    .toString().trim();
  const size = statSync(out).size;
  total += size;
  console.log(`${key.padEnd(14)} ${dims.padEnd(10)} ${(size / 1024).toFixed(1)} KB`);
}
console.log(`total ${(total / 1024).toFixed(1)} KB`);

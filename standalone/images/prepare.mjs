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
 * key → [source filename fragment, target height, webp quality].
 * Matched as a case-insensitive substring so the accented filenames survive
 * whichever Unicode normalisation the source folder happens to use.
 */
const JOBS = {
  'p-ronaldo':    ['Ronaldo - FootyRenders.png', 660, 68],
  'p-haaland':    ['land - FootyRenders.png', 660, 68],
  'p-yamal':      ['lamine-yamal', 660, 68],
  'p-messi':      ['Messi - FootyRenders 2.png', 660, 68],
  'p-alvarez':    ['lvarez - FootyRenders.png', 620, 66],
  'l-epl':        ['english-premier-league--no-text', 240, 80],
  'l-laliga':     ['spain_la-liga_3000', 240, 80],
  'l-seriea':     ['italy_serie-a_3000x3000.football-logos.cc.png', 240, 80],
  'l-bundesliga': ['germany_bundesliga_3000', 240, 80],
  'l-ucl':        ['uefa-champions-league_3000', 240, 80],
  'l-spl':        ['saudi-professional-league_3000', 240, 80],
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
inp, out, h, q = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
im = Image.open(inp).convert('RGBA')
bb = im.getchannel('A').getbbox()
if bb: im = im.crop(bb)
w = max(1, round(im.width * h / im.height))
im = im.resize((w, h), Image.LANCZOS)
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

/**
 * Builds the single-file MOOR TV site.
 *
 *   moortv.src.html   template — markup + CSS, `__LOGO_URI__` placeholders
 *   moortv.js         runtime — data, art, i18n, cart, interactions
 *   images/moortv-logo.png
 *          ↓
 *   moortv.html       one self-contained file, nothing external except fonts
 *
 *   node standalone/build-maurimax.mjs
 */
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const imgDir = join(here, 'images');

let html = readFileSync(join(here, 'moortv.src.html'), 'utf8');
const js = readFileSync(join(here, 'moortv.js'), 'utf8');
const logo = readFileSync(join(imgDir, 'moortv-logo.png'));

const logoUri = 'data:image/png;base64,' + logo.toString('base64');
if (!html.includes('__LOGO_URI__')) throw new Error('No __LOGO_URI__ placeholder found');
html = html.split('__LOGO_URI__').join(logoUri);

// Every images/*.webp becomes MXIMG['<basename>'] = '<data uri>'. The runtime
// reads them by key (`p-messi`, `l-ucl`, …) and falls back to its own SVG
// artwork for any key that is absent, so dropping a file simply removes a
// photo rather than breaking the page.
const photos = readdirSync(imgDir).filter((f) => f.endsWith('.webp')).sort();
let photoBytes = 0;
const map = photos.map((f) => {
  const buf = readFileSync(join(imgDir, f));
  photoBytes += buf.length;
  return JSON.stringify(f.replace(/\.webp$/, '')) + ':"data:image/webp;base64,' + buf.toString('base64') + '"';
});
const mapTag = '__IMG_MAP__';
if (!html.includes(mapTag)) throw new Error('No ' + mapTag + ' placeholder found');
html = html.replace(mapTag, () => '<script>window.MXIMG={' + map.join(',\n') + '};</script>');

const tag = '<script src="moortv.js"></script>';
if (!html.includes(tag)) throw new Error('No `' + tag + '` found in the template');
// A function replacer, not a string — `$$`, `$&` and friends in the JS would
// otherwise be interpreted as replacement patterns and silently mangled.
html = html.replace(tag, () => '<script>\n' + js + '\n</script>');

writeFileSync(join(here, 'moortv.html'), html);

// A second copy for the Artifact preview host, which supplies its own
// document skeleton and rejects a full document. Same page, unwrapped:
// the <title> stays (it names the artifact), charset/viewport/icon go
// because the host sets them, and dir/lang are stamped by an inline script
// before first paint so the RTL layout never flashes left-to-right.
const preview = html
  .replace(/^[\s\S]*?<meta name="viewport"[^>]*>\s*/, '<script>(function(){var l="ar";' +
    'try{var s=localStorage.getItem("moortv.lang");if(s==="ar"||s==="fr")l=s;}catch(e){}' +
    'var d=document.documentElement;d.lang=l;d.dir=l==="ar"?"rtl":"ltr";})();</script>\n')
  // The descriptive title is right for search results but wrong for a gallery
  // card, which wants the name on its own.
  .replace(/<title>[\s\S]*?<\/title>/, '<title>مور تيفي MOOR TV</title>')
  .replace(/<link rel="icon"[^>]*>\s*/, '')
  .replace(/<\/head>\s*<body[^>]*>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '');
if (/<\/?(?:html|head|body)\b/i.test(preview)) {
  throw new Error('Preview build still contains a document wrapper tag');
}
writeFileSync(join(here, 'moortv.preview.html'), preview);

/* ----------------------------------------------------------------
   dist/ — the same site for real hosting, with the artwork as separate
   cacheable files instead of base64 inside the document. The single file
   is ~1.1 MB and blocks first paint until all of it arrives; this one is
   under 100 KB and streams its images, which matters a lot on mobile data.
   ---------------------------------------------------------------- */
// `--out <dir>` writes the deployable copy somewhere else — used to publish
// straight into the repo root. Only assets/ is cleared, never the whole
// directory, so pointing this at a populated folder cannot wipe it.
const outArg = process.argv.indexOf('--out');
const dist = outArg > -1 && process.argv[outArg + 1]
  ? resolve(process.argv[outArg + 1])
  : join(here, 'dist-moortv');
rmSync(join(dist, 'assets'), { recursive: true, force: true });
mkdirSync(join(dist, 'assets'), { recursive: true });

let distHtml = readFileSync(join(here, 'moortv.src.html'), 'utf8')
  .split('__LOGO_URI__').join('assets/logo.png')
  .replace(mapTag, () => '<script>window.MXIMG={' +
    photos.map((f) => JSON.stringify(f.replace(/\.webp$/, '')) +
      ':"assets/' + f + '"').join(',') + '};</script>')
  .replace(tag, () => '<script>\n' + js + '\n</script>');

writeFileSync(join(dist, 'index.html'), distHtml);
writeFileSync(join(dist, '.nojekyll'), '');

/* The order log. It only does anything where the /api functions are running —
   on a plain static host it shows its own error rather than a blank page. */
writeFileSync(join(dist, 'admin.html'),
  readFileSync(join(here, 'admin.src.html'), 'utf8')
    .split('__LOGO_URI__').join('assets/logo.png'));
cpSync(join(imgDir, 'moortv-logo.png'), join(dist, 'assets', 'logo.png'));
for (const f of photos) cpSync(join(imgDir, f), join(dist, 'assets', f));

console.log(
  dist + '/index.html — ' + (Buffer.byteLength(distHtml) / 1024).toFixed(1) +
    ' KB + admin.html + ' + (photos.length + 1) + ' asset files\n' +
  'moortv.html — ' + (Buffer.byteLength(html) / 1024).toFixed(1) + ' KB\n' +
    '  logo   ' + (logo.length / 1024).toFixed(1) + ' KB\n' +
    '  photos ' + photos.length + ' files, ' + (photoBytes / 1024).toFixed(1) + ' KB\n' +
    'moortv.preview.html — ' + (Buffer.byteLength(preview) / 1024).toFixed(1) + ' KB (Artifact copy)'
);

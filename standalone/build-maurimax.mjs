/**
 * Builds the single-file MAURIMAX site.
 *
 *   maurimax.src.html   template — markup + CSS, `__LOGO_URI__` placeholders
 *   maurimax.js         runtime — data, art, i18n, cart, interactions
 *   images/maurimax-logo.png
 *          ↓
 *   maurimax.html       one self-contained file, nothing external except fonts
 *
 *   node standalone/build-maurimax.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const imgDir = join(here, 'images');

let html = readFileSync(join(here, 'maurimax.src.html'), 'utf8');
const js = readFileSync(join(here, 'maurimax.js'), 'utf8');
const logo = readFileSync(join(imgDir, 'maurimax-logo.png'));

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

const tag = '<script src="maurimax.js"></script>';
if (!html.includes(tag)) throw new Error('No `' + tag + '` found in the template');
// A function replacer, not a string — `$$`, `$&` and friends in the JS would
// otherwise be interpreted as replacement patterns and silently mangled.
html = html.replace(tag, () => '<script>\n' + js + '\n</script>');

writeFileSync(join(here, 'maurimax.html'), html);

// A second copy for the Artifact preview host, which supplies its own
// document skeleton and rejects a full document. Same page, unwrapped:
// the <title> stays (it names the artifact), charset/viewport/icon go
// because the host sets them, and dir/lang are stamped by an inline script
// before first paint so the RTL layout never flashes left-to-right.
const preview = html
  .replace(/^[\s\S]*?<meta name="viewport"[^>]*>\s*/, '<script>(function(){var l="ar";' +
    'try{var s=localStorage.getItem("maurimax.lang");if(s==="ar"||s==="fr")l=s;}catch(e){}' +
    'var d=document.documentElement;d.lang=l;d.dir=l==="ar"?"rtl":"ltr";})();</script>\n')
  // The descriptive title is right for search results but wrong for a gallery
  // card, which wants the name on its own.
  .replace(/<title>[\s\S]*?<\/title>/, '<title>موريماكس MAURIMAX</title>')
  .replace(/<link rel="icon"[^>]*>\s*/, '')
  .replace(/<\/head>\s*<body[^>]*>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '');
if (/<\/?(?:html|head|body)\b/i.test(preview)) {
  throw new Error('Preview build still contains a document wrapper tag');
}
writeFileSync(join(here, 'maurimax.preview.html'), preview);

console.log(
  'maurimax.html — ' + (Buffer.byteLength(html) / 1024).toFixed(1) + ' KB\n' +
    '  logo   ' + (logo.length / 1024).toFixed(1) + ' KB\n' +
    '  photos ' + photos.length + ' files, ' + (photoBytes / 1024).toFixed(1) + ' KB\n' +
    'maurimax.preview.html — ' + (Buffer.byteLength(preview) / 1024).toFixed(1) + ' KB (Artifact copy)'
);

/**
 * Inlines moortv.js into moortv.html so the result is a single self-contained
 * file. Run this after editing moortv.js — the HTML is the deliverable.
 *
 *   node standalone/build.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, 'moortv.html');
const js = readFileSync(join(here, 'moortv.js'), 'utf8');
let html = readFileSync(htmlPath, 'utf8');

// Replace whatever currently sits in the final <script> block.
const start = html.lastIndexOf('<script>');
const end = html.lastIndexOf('</script>');
if (start === -1 || end === -1 || end < start) {
  throw new Error('Could not find the trailing <script> block in moortv.html');
}
html = html.slice(0, start) + '<script>\n' + js + '\n' + html.slice(end);
writeFileSync(htmlPath, html);
console.log('Inlined moortv.js → moortv.html (' + Buffer.byteLength(html) + ' bytes)');

/**
 * Copies the static export from out/ to the repository root so GitHub Pages
 * can serve it straight from the branch. Removes the previously-deployed
 * artefacts first so deleted routes don't linger.
 */
import { cp, rm, mkdir, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');

const DEPLOYED = ['_next', 'checkout', 'index.html', 'index.txt', '404.html', '404', 'sitemap.xml', 'robots.txt', 'icon.svg'];

for (const entry of DEPLOYED) {
  await rm(path.join(root, entry), { recursive: true, force: true });
}

for (const entry of await readdir(out)) {
  await cp(path.join(out, entry), path.join(root, entry), { recursive: true });
}

// Jekyll skips directories beginning with an underscore unless this exists.
await writeFile(path.join(root, '.nojekyll'), '');

console.log('Deployed out/ -> repository root');

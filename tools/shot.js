/**
 * Dev helper: screenshot a local page.
 *   node tools/shot.js <url> <out.png> [width] [height] [fullPage]
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

(async () => {
  const [url, out, w = '1440', h = '900', full = 'false'] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: +w, height: +h },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: out, fullPage: full === 'true' });
  await browser.close();
  if (errors.length) console.log('CONSOLE:\n' + errors.join('\n'));
  console.log('saved', out);
})();

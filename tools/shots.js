/**
 * Dev helper: screenshot a page at several scroll offsets (or selectors).
 *   node tools/shots.js <url> <prefix> <w> <h> <sel|offset> [...]
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

(async () => {
  const [url, prefix, w = '1440', h = '900', ...spots] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +w, height: +h } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  for (const spot of spots) {
    if (/^\d+$/.test(spot)) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), +spot);
    } else {
      await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), spot);
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${prefix}-${spot.replace(/[^\w]/g, '')}.png` });
  }
  await browser.close();
  if (errors.length) console.log('CONSOLE:\n' + errors.join('\n'));
  console.log('done');
})();

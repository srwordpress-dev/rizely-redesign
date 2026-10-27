// Renders scripts/og/og.html to app/opengraph-image.png (1200×630).
// The share image used to be a hand-made PNG with no source, and it kept the
// banned stats long after the page dropped them. Edit og.html, then re-render.
// Playwright is not a project dependency:
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/og/render.mjs
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "..", "..", "app", "opengraph-image.png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.join(dir, "og.html")).href);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: out });
await browser.close();
console.log(`wrote ${out}`);

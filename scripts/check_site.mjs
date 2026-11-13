// Screenshot pages at desktop + phone widths and flag horizontal overflow.
// Usage: node scripts/check_site.mjs <baseUrl> <outDir> <path> [path...]
//   e.g. node scripts/check_site.mjs http://localhost:5101 /tmp/shots /swiss-minimal /swiss-minimal/work
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// Uses the pre-installed Playwright (resolved via NODE_PATH), so it is not a project dependency.
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
import fs from "node:fs";
import path from "node:path";

const [base, outDir, ...paths] = process.argv.slice(2);
if (!base || !outDir || paths.length === 0) {
  console.error("usage: node scripts/check_site.mjs <baseUrl> <outDir> <path> [path...]");
  process.exit(2);
}
fs.mkdirSync(outDir, { recursive: true });
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "phone", width: 390, height: 844, isMobile: true, hasTouch: true },
];
const browser = await chromium.launch();
let problems = 0;
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  for (const p of paths) {
    errors.length = 0;
    const res = await page.goto(base + p, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const { sw, cw, offenders, broken } = await page.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > cw + 1 && getComputedStyle(el).position !== "fixed") {
          offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`);
          if (offenders.length > 5) break;
        }
      }
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
      return { sw: document.documentElement.scrollWidth, cw, offenders, broken };
    });
    const file = path.join(outDir, `${vp.name}${p.replace(/[\/]/g, "_") || "_root"}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const status = res ? res.status() : "no-response";
    const overflow = sw > cw + 1;
    const flag = status !== 200 || overflow || broken.length || errors.length;
    if (flag) problems++;
    console.log(`${flag ? "FAIL" : "ok  "} [${vp.name}] ${p} status=${status} scrollWidth=${sw} clientWidth=${cw} -> ${file}`);
    if (overflow) console.log("   overflow offenders:", offenders.join(" | "));
    if (broken.length) console.log("   broken images:", broken.join(", "));
    if (errors.length) console.log("   console errors:", errors.slice(0, 5).join(" || "));
  }
  await ctx.close();
}
await browser.close();
process.exit(problems ? 1 : 0);

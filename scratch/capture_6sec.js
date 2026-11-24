import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, '../public/assets/projects');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WEBSITES = [
  {
    id: "01",
    title: "SURATGARH PROPERTIES",
    slug: "suratgarh-properties",
    url: "https://suratgarhproperties.shop/",
  },
  {
    id: "02",
    title: "GLAMOUR MAKEOVER",
    slug: "glamour-makeover",
    url: "https://glamourmakeover.in/",
  },
  {
    id: "03",
    title: "MEGHNA MOTORS",
    slug: "meghna-motors",
    url: "https://meghnamotors.online/",
  },
  {
    id: "04",
    title: "PARMARTH MEDICOSE",
    slug: "parmarth-medicose",
    url: "https://parmarthmedicose.store/",
  },
  {
    id: "05",
    title: "RAJWADA FURNISH",
    slug: "rajwada-furnish",
    url: "https://rajwadafurnish.com/",
    fallbackUrl: "https://www.rajwadafurnish.com/",
  },
  {
    id: "06",
    title: "CHAWLA SILK STORE",
    slug: "chawla-silk-store",
    url: "https://chawlasilkstore.com/",
  },
  {
    id: "07",
    title: "GROSHINE CONSULTANTS",
    slug: "groshine-consultants",
    url: "https://groshineconsultants.com/",
  },
  {
    id: "08",
    title: "MANTOLA OF MOTORS",
    slug: "mantola-motors",
    url: "https://mantola.in/",
  },
];

async function captureAll() {
  console.log("Launching Edge via Playwright...");
  let browser;
  try {
    browser = await chromium.launch({
      channel: 'msedge',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
  } catch (e) {
    console.log("Fallback to standard chromium...");
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 810 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    deviceScaleFactor: 1
  });

  for (const site of WEBSITES) {
    console.log(`\n========================================`);
    console.log(`[${site.id}] Navigating to ${site.title} (${site.url})...`);
    const page = await context.newPage();

    try {
      let targetUrl = site.url;
      try {
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch (err) {
        if (site.fallbackUrl) {
          console.log(`  Primary URL failed, trying fallback: ${site.fallbackUrl}`);
          targetUrl = site.fallbackUrl;
          await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        } else {
          throw err;
        }
      }

      console.log(`  Page loaded. Waiting EXACTLY 6000ms for animations/loaders to settle...`);
      // Wait EXACTLY 6 seconds after page load
      await page.waitForTimeout(6000);

      const pngPath = path.join(OUTPUT_DIR, `${site.slug}.png`);
      const webpPath = path.join(OUTPUT_DIR, `${site.slug}.webp`);

      await page.screenshot({
        path: pngPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1440, height: 810 }
      });

      console.log(`  Screenshot captured (1440x810). Converting to WebP...`);

      try {
        execSync(`python -c "from PIL import Image; img = Image.open(r'${pngPath}'); img.save(r'${webpPath}', 'WEBP', quality=88)"`);
        console.log(`  [SUCCESS] WebP generated: ${fs.statSync(webpPath).size} bytes -> ${site.slug}.webp`);
        if (fs.existsSync(pngPath)) {
          fs.unlinkSync(pngPath);
        }
      } catch (convErr) {
        console.error(`  Conversion error: ${convErr.message}`);
      }

    } catch (err) {
      console.error(`  ERROR processing ${site.title}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nFinished processing all 8 sites.");
}

captureAll();

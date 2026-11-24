import { chromium } from 'playwright';

async function testFilterScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Suppress popup
  await page.addInitScript(() => {
    sessionStorage.setItem("xwebsitewalaAppointmentSeen", "true");
  });

  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);

  // Scroll to bottom of projects section
  const sectionStart = await page.evaluate(() => {
    const section = document.querySelector('#projects-section');
    const spacer = section?.parentElement;
    return spacer?.offsetTop || 4966;
  });
  console.log('Section start offsetTop:', sectionStart);

  // Scroll through to bottom (e.g. sectionStart + 4000)
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 4200, behavior: 'instant' });
  }, sectionStart);
  await page.waitForTimeout(1000);

  const scrollAfter = await page.evaluate(() => window.scrollY);
  console.log('Scrolled to bottom of projects:', scrollAfter);

  await browser.close();
}

testFilterScroll();

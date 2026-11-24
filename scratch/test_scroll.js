import { chromium } from 'playwright';

async function testScroll() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);

  // Check ScrollTrigger on page
  const stInfo = await page.evaluate(() => {
    const section = document.querySelector('#projects-section');
    const pinSpacer = section?.parentElement;
    return {
      sectionId: section?.id,
      pinSpacerClass: pinSpacer?.className,
      pinSpacerOffsetTop: pinSpacer instanceof HTMLElement ? pinSpacer.offsetTop : null,
      sectionOffsetTop: section instanceof HTMLElement ? section.offsetTop : null,
      windowScrollY: window.scrollY
    };
  });
  console.log('ST INFO AT TOP:', stInfo);

  // Scroll into middle of projects section
  await page.evaluate(() => {
    window.scrollTo({ top: 3000, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);

  const stInfoScrolled = await page.evaluate(() => {
    const section = document.querySelector('#projects-section');
    const pinSpacer = section?.parentElement;
    return {
      windowScrollY: window.scrollY,
      sectionBoundingTop: section?.getBoundingClientRect().top,
      pinSpacerBoundingTop: pinSpacer?.getBoundingClientRect().top,
      pinSpacerOffsetTop: pinSpacer instanceof HTMLElement ? pinSpacer.offsetTop : null,
    };
  });
  console.log('ST INFO AT SCROLLED 3000:', stInfoScrolled);

  await browser.close();
}

testScroll();

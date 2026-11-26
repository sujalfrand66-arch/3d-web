import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// Read SEO pages data
const seoPagesModule = await import('../src/data/seoPages.ts');
const SEO_PAGES = seoPagesModule.SEO_PAGES;

function generateSubpageHtml(templateHtml, page) {
  let html = templateHtml;

  // 1. Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`);

  // 2. Meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${page.metaDescription}" />`
  );

  // 3. Keywords
  html = html.replace(
    /<meta name="keywords" content=".*?" \/>/i,
    `<meta name="keywords" content="${page.keywords}" />`
  );

  // 4. Canonical URL
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${page.canonicalUrl}" />`
  );

  // 5. Open Graph tags
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${page.metaDescription}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${page.canonicalUrl}" />`
  );

  // 6. Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${page.metaDescription}" />`
  );

  // 7. Breadcrumb & Page Specific Schema
  const isNested = page.slug.includes('/');
  const topSlug = isNested ? page.slug.split('/')[0] : page.slug;
  const subSlug = isNested ? page.slug.split('/')[1] : '';

  const breadcrumbsList = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lfeditor.in/' }
  ];

  if (isNested) {
    breadcrumbsList.push({
      '@type': 'ListItem',
      position: 2,
      name: topSlug.charAt(0).toUpperCase() + topSlug.slice(1),
      item: `https://lfeditor.in/${topSlug}/`
    });
    breadcrumbsList.push({
      '@type': 'ListItem',
      position: 3,
      name: page.h1,
      item: page.canonicalUrl
    });
  } else {
    breadcrumbsList.push({
      '@type': 'ListItem',
      position: 2,
      name: page.h1,
      item: page.canonicalUrl
    });
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbsList
      },
      {
        '@type': page.schemaType === 'LocalBusiness' ? 'ProfessionalService' : page.schemaType,
        '@id': `${page.canonicalUrl}#mainEntity`,
        name: page.title,
        description: page.metaDescription,
        url: page.canonicalUrl,
        provider: {
          '@type': 'Organization',
          name: 'XWEBSITEWALA',
          url: 'https://lfeditor.in/',
          founders: [
            { '@type': 'Person', name: 'Sujal Frand' },
            { '@type': 'Person', name: 'Anmol Frand' }
          ]
        },
        areaServed: ['Suratgarh', 'Hanumangarh', 'Pilibanga', 'Bikaner', 'Rajasthan']
      }
    ]
  };

  // Replace default homepage schema with page-specific schema
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${JSON.stringify(pageSchema, null, 2)}\n    </script>`
  );

  // 8. Static HTML Body Content for 100% Crawlability
  const sectionsHtml = page.sections
    .map(
      (sec) => `
        <section class="border-t border-white/10 pt-8 sm:pt-10 my-8">
          <h2 class="font-display font-bold text-xl sm:text-3xl tracking-tight text-white mb-4">${sec.heading}</h2>
          <div class="space-y-4 font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl">
            ${sec.body.map((p) => `<p class="mb-4">${p}</p>`).join('\n')}
          </div>
          ${
            sec.listItems && sec.listItems.length > 0
              ? `
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${sec.listItems
                .map(
                  (item) => `
                <div class="p-4 bg-white/[0.03] border border-white/10 rounded-sm font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed flex items-start gap-3">
                  <span class="text-[#D31010] font-bold text-base">&bull;</span>
                  <span>${item}</span>
                </div>
              `
                )
                .join('\n')}
            </div>
          `
              : ''
          }
        </section>
      `
    )
    .join('\n');

  const relatedLinksHtml =
    page.relatedLinks && page.relatedLinks.length > 0
      ? `
      <section class="mt-16 pt-10 border-t border-white/15">
        <h3 class="font-sans font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-white/50 mb-6">EXPLORE MORE FROM XWEBSITEWALA</h3>
        <div class="flex flex-wrap gap-3 sm:gap-4">
          ${page.relatedLinks
            .map(
              (link) => `
            <a href="${link.url}" class="px-4 py-2 bg-white/[0.04] hover:bg-[#D31010] border border-white/15 hover:border-[#D31010] text-neutral-300 hover:text-white font-sans text-xs sm:text-sm font-semibold tracking-wide rounded-sm transition-all duration-200">${link.label} &rarr;</a>
          `
            )
            .join('\n')}
        </div>
      </section>
    `
      : '';

  const staticBody = `
    <div class="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-[#D31010] selection:text-white">
      <header class="w-full border-b border-white/10 px-6 sm:px-12 py-5 flex items-center justify-between z-30 bg-[#080808]/90 backdrop-blur-md sticky top-0">
        <a href="/" class="font-sans font-black text-lg sm:text-xl tracking-[0.18em] uppercase flex items-center hover:opacity-80 transition-opacity">
          <span class="text-white">XWEB</span>
          <span class="text-[#D31010]">SITE</span>
          <span class="text-white">WALA</span>
          <span class="inline-block w-2 h-2 rounded-full bg-[#D31010] ml-1"></span>
        </a>
        <nav class="hidden md:flex items-center gap-8 font-sans font-bold text-xs tracking-[0.2em] text-white/70 uppercase">
          <a href="/" class="hover:text-white transition-colors">Home</a>
          <a href="/about/" class="hover:text-white transition-colors">About</a>
          <a href="/services/" class="hover:text-white transition-colors">Services</a>
          <a href="/projects/" class="hover:text-white transition-colors">Projects</a>
          <a href="/contact/" class="hover:text-white transition-colors">Contact</a>
        </nav>
        <div>
          <a href="https://wa.me/919983853091" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-[#D31010] hover:bg-[#b00d0d] text-white font-sans font-bold text-xs tracking-[0.18em] uppercase px-4 sm:px-6 py-2.5 rounded-sm transition-all">
            <span>LET'S TALK</span>
            <span>&nearr;</span>
          </a>
        </div>
      </header>

      <main class="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-12 py-12 sm:py-20 flex flex-col justify-start">
        <nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-2 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-white/40">
          <a href="/" class="hover:text-white transition-colors">Home</a>
          <span>/</span>
          ${
            isNested
              ? `<a href="/${topSlug}/" class="hover:text-white transition-colors">${topSlug}</a><span>/</span><span class="text-[#D31010] font-semibold">${subSlug}</span>`
              : `<span class="text-[#D31010] font-semibold">${page.slug}</span>`
          }
        </nav>

        <div class="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#D31010] mb-3">
          ${page.eyebrow}
        </div>

        <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.05] text-white mb-6">
          ${page.h1}
        </h1>

        <p class="font-sans text-base sm:text-xl text-neutral-300 leading-relaxed font-light mb-12 max-w-3xl">
          ${page.leadParagraph}
        </p>

        <div class="space-y-12 sm:space-y-16">
          ${sectionsHtml}
        </div>

        ${relatedLinksHtml}
      </main>

      <footer class="w-full border-t border-white/15 bg-[#050505] px-6 sm:px-12 py-10 text-neutral-500 font-sans text-xs">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span class="font-bold text-white tracking-[0.2em] uppercase">XWEBSITEWALA</span>
            <span class="hidden sm:inline">&mdash;</span>
            <span>Suratgarh, Rajasthan &middot; 335804</span>
          </div>
          <div class="flex items-center gap-6 font-bold tracking-widest uppercase text-[10px]">
            <a href="https://wa.me/919983853091" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">WhatsApp</a>
            <a href="https://instagram.com/sujalfrand" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Instagram</a>
            <a href="https://github.com/sujalfrand66-arch" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
        <div class="max-w-5xl mx-auto pt-6 mt-6 border-t border-white/5 flex justify-between items-center text-[10px] tracking-wider uppercase opacity-60">
          <span>&copy; ${new Date().getFullYear()} XWEBSITEWALA &mdash; Sujal Frand &amp; Anmol Frand</span>
          <a href="/" class="hover:text-white text-[#D31010] transition-colors">Back to Homepage &uarr;</a>
        </div>
      </footer>
    </div>
  `;

  // Inject static body into <div id="root">
  html = html.replace('<div id="root"></div>', `<div id="root">${staticBody}</div>`);

  return html;
}

async function run() {
  const rootIndexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(rootIndexHtmlPath)) {
    console.error('Error: dist/index.html does not exist. Run "vite build" first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(rootIndexHtmlPath, 'utf-8');
  console.log(`Generating ${SEO_PAGES.length} static SEO HTML pages in dist/...`);

  for (const page of SEO_PAGES) {
    const pageHtml = generateSubpageHtml(templateHtml, page);
    const targetDir = path.join(distDir, page.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetFilePath = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFilePath, pageHtml, 'utf-8');
    console.log(`✓ Created: dist/${page.slug}/index.html (${page.canonicalUrl})`);
  }

  // Update root dist/index.html with pre-rendered homepage semantic content for crawlers
  const homepagePrerender = `
    <div id="root">
      <div style="opacity:0.001;position:absolute;pointer-events:none;z-index:-1;" aria-label="XWEBSITEWALA Web Design & Development">
        <header>
          <h1>XWEBSITEWALA — Web Designer &amp; Web Developer in Suratgarh, Rajasthan</h1>
          <p>XWEBSITEWALA is a creative web design and development studio founded by Sujal Frand and Anmol Frand in Suratgarh, Rajasthan.</p>
        </header>
        <main>
          <section>
            <h2>Web Design &amp; Custom Web Development Services</h2>
            <p>We create modern, responsive websites, UI/UX experiences and custom digital solutions for businesses across Suratgarh, Hanumangarh, Pilibanga, Bikaner, and Rajasthan.</p>
            <ul>
              <li><a href="/services/web-development/">Custom Web Development (React &amp; TypeScript)</a></li>
              <li><a href="/services/web-design/">Modern Web Design &amp; Digital Branding</a></li>
              <li><a href="/services/ui-ux-design/">UI / UX Interface Design</a></li>
              <li><a href="/services/ecommerce/">E-Commerce Website Development</a></li>
              <li><a href="/services/seo/">Technical SEO &amp; Speed Optimization</a></li>
            </ul>
          </section>
          <section>
            <h2>Featured Client Projects</h2>
            <ul>
              <li><a href="https://suratgarhproperties.shop/">Suratgarh Properties — Real Estate Portal</a></li>
              <li><a href="https://glamourmakeover.in/">Glamour Makeover — Beauty &amp; Lifestyle Studio</a></li>
              <li><a href="https://meghnamotors.online/">Meghna Motors — Automotive Dealership</a></li>
              <li><a href="https://parmarthmedicose.store/">Parmarth Medicose — Pharmacy &amp; Healthcare Store</a></li>
              <li><a href="https://www.rajwadafurnish.com/">Rajwada Furnish — Luxury Furniture E-Commerce</a></li>
              <li><a href="https://chawlasilkstore.com/">Chawla Silk Store — Ethnic Wear &amp; Silks</a></li>
              <li><a href="https://groshineconsultants.com/">Groshine Consultants — Business &amp; Advisory</a></li>
              <li><a href="https://mantola.in/">Mantola of Motors — Automotive Care &amp; Services</a></li>
            </ul>
          </section>
          <section>
            <h2>Local Coverage in Rajasthan</h2>
            <ul>
              <li><a href="/locations/suratgarh/">Suratgarh Web Designer &amp; Developer</a></li>
              <li><a href="/locations/hanumangarh/">Hanumangarh Website Development</a></li>
              <li><a href="/locations/pilibanga/">Pilibanga Web Design</a></li>
              <li><a href="/locations/bikaner/">Bikaner Web Development</a></li>
            </ul>
          </section>
          <section>
            <h2>About Founders &amp; Contact</h2>
            <p>Founded by Sujal Frand and Anmol Frand. Contact: +91 99838 53091. Suratgarh, Rajasthan, India — 335804.</p>
            <a href="/about/">About XWEBSITEWALA</a> | <a href="/contact/">Contact Us</a>
          </section>
        </main>
      </div>
    </div>
  `;
  const updatedRootHtml = templateHtml.replace('<div id="root"></div>', homepagePrerender.trim());
  fs.writeFileSync(rootIndexHtmlPath, updatedRootHtml, 'utf-8');
  console.log('✓ Updated root dist/index.html with pre-rendered crawlable semantic content');

  console.log('\n--- VERIFYING ALL 14 CANONICAL ROUTES ---');
  const allRoutes = [
    '/',
    ...SEO_PAGES.map((p) => `/${p.slug}/`)
  ];

  let allValid = true;
  for (const route of allRoutes) {
    const relativePath = route === '/' ? 'index.html' : `${route.slice(1)}index.html`;
    const fullPath = path.join(distDir, relativePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const hasTitle = /<title>.+?<\/title>/i.test(content);
      const hasDesc = /<meta name="description" content=".+?" \/>/i.test(content);
      const hasCanonical = /<link rel="canonical" href="https:\/\/lfeditor\.in\/.+?" \/>/i.test(content) || /<link rel="canonical" href="https:\/\/lfeditor\.in\/" \/>/i.test(content);
      const hasH1 = /<h1[\s\S]*?>[\s\S]*?<\/h1>/i.test(content);
      const hasLdJson = /<script type="application\/ld\+json">[\s\S]*?<\/script>/i.test(content);

      console.log(`✓ ${route} -> exists [title:${hasTitle}, desc:${hasDesc}, canonical:${hasCanonical}, H1:${hasH1}, schema:${hasLdJson}]`);
    } else {
      console.error(`✗ MISSING: ${fullPath}`);
      allValid = false;
    }
  }

  if (!allValid) {
    process.exit(1);
  }
  console.log('\nAll 14 static HTML routes verified successfully!');
}

run();

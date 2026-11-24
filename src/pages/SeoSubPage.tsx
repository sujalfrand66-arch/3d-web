import React, { useEffect } from "react";
import type { SeoPageData } from "../data/seoPages";

interface SeoSubPageProps {
  page: SeoPageData;
}

export const SeoSubPage: React.FC<SeoSubPageProps> = ({ page }) => {
  useEffect(() => {
    // Dynamic document title update
    document.title = page.title;

    // Dynamic meta description update
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", page.metaDescription);

    // Dynamic canonical link update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", page.canonicalUrl);

    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between selection:bg-[#D31010] selection:text-white">
      {/* Subpage Header */}
      <header className="w-full border-b border-white/10 px-6 sm:px-12 py-5 flex items-center justify-between z-30 bg-[#080808]/90 backdrop-blur-md sticky top-0">
        <a
          href="/"
          className="font-sans font-black text-lg sm:text-xl tracking-[0.18em] uppercase flex items-center hover:opacity-80 transition-opacity"
        >
          <span className="text-white">XWEB</span>
          <span className="text-[#D31010]">SITE</span>
          <span className="text-white">WALA</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#D31010] ml-1"></span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-sans font-bold text-xs tracking-[0.2em] text-white/70 uppercase">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about/" className="hover:text-white transition-colors">About</a>
          <a href="/services/" className="hover:text-white transition-colors">Services</a>
          <a href="/projects/" className="hover:text-white transition-colors">Projects</a>
          <a href="/contact/" className="hover:text-white transition-colors">Contact</a>
        </nav>

        <div>
          <a
            href="https://wa.me/919983853091"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D31010] hover:bg-[#b00d0d] text-white font-sans font-bold text-xs tracking-[0.18em] uppercase px-4 sm:px-6 py-2.5 rounded-sm transition-all"
          >
            <span>LET'S TALK</span>
            <span>&nearr;</span>
          </a>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-12 py-12 sm:py-20 flex flex-col justify-start">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-white/40">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          {page.slug.includes("/") ? (
            <>
              <a href={`/${page.slug.split("/")[0]}/`} className="hover:text-white transition-colors">
                {page.slug.split("/")[0]}
              </a>
              <span>/</span>
              <span className="text-[#D31010] font-semibold">{page.slug.split("/")[1]}</span>
            </>
          ) : (
            <span className="text-[#D31010] font-semibold">{page.slug}</span>
          )}
        </nav>

        {/* Eyebrow */}
        <div className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#D31010] mb-3">
          {page.eyebrow}
        </div>

        {/* Semantic H1 */}
        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.05] text-white mb-6">
          {page.h1}
        </h1>

        {/* Lead Paragraph */}
        <p className="font-sans text-base sm:text-xl text-neutral-300 leading-relaxed font-light mb-12 max-w-3xl">
          {page.leadParagraph}
        </p>

        {/* Detail Sections */}
        <div className="space-y-12 sm:space-y-16">
          {page.sections.map((sec, idx) => (
            <section key={idx} className="border-t border-white/10 pt-8 sm:pt-10">
              <h2 className="font-display font-bold text-xl sm:text-3xl tracking-tight text-white mb-4">
                {sec.heading}
              </h2>
              <div className="space-y-4 font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl">
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.listItems && sec.listItems.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sec.listItems.map((item, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-4 bg-white/[0.03] border border-white/10 rounded-sm font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-[#D31010] font-bold text-base">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Reciprocal Internal Linking Section */}
        {page.relatedLinks && page.relatedLinks.length > 0 && (
          <section className="mt-16 pt-10 border-t border-white/15">
            <h3 className="font-sans font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-white/50 mb-6">
              EXPLORE MORE FROM XWEBSITEWALA
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {page.relatedLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="px-4 py-2 bg-white/[0.04] hover:bg-[#D31010] border border-white/15 hover:border-[#D31010] text-neutral-300 hover:text-white font-sans text-xs sm:text-sm font-semibold tracking-wide rounded-sm transition-all duration-200"
                >
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Subpage Editorial Footer */}
      <footer className="w-full border-t border-white/15 bg-[#050505] px-6 sm:px-12 py-10 text-neutral-500 font-sans text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-bold text-white tracking-[0.2em] uppercase">XWEBSITEWALA</span>
            <span className="hidden sm:inline">&mdash;</span>
            <span>Suratgarh, Rajasthan &middot; 335804</span>
          </div>
          <div className="flex items-center gap-6 font-bold tracking-widest uppercase text-[10px]">
            <a href="https://wa.me/919983853091" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="https://instagram.com/sujalfrand" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://github.com/sujalfrand66-arch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-6 mt-6 border-t border-white/5 flex justify-between items-center text-[10px] tracking-wider uppercase opacity-60">
          <span>&copy; {new Date().getFullYear()} XWEBSITEWALA &mdash; Sujal Frand &amp; Anmol Frand</span>
          <a href="/" className="hover:text-white text-[#D31010] transition-colors">Back to Homepage &uarr;</a>
        </div>
      </footer>
    </div>
  );
};

export default SeoSubPage;

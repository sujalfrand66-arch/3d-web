import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const infoRowRef = useRef<HTMLDivElement>(null);
  const giantTextWrapperRef = useRef<HTMLDivElement>(null);
  const giantTextInnerRef = useRef<HTMLHeadingElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Top Info Row Reveal
      if (infoRowRef.current) {
        tl.fromTo(
          infoRowRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0
        );
      }

      // 2. Huge XWEBSITEWALA Typography Masked Reveal
      if (giantTextWrapperRef.current && giantTextInnerRef.current) {
        tl.fromTo(
          giantTextWrapperRef.current,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "expo.out",
          },
          0.2
        );

        tl.fromTo(
          giantTextInnerRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.25, ease: "expo.out" },
          0.2
        );
      }

      // 3. Bottom Copyright Line Reveal
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 15 },
          { opacity: 0.6, y: 0, duration: 0.6, ease: "power2.out" },
          0.6
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      className="relative w-full bg-[#7a0000] text-white select-none pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden border-t border-white/20"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* TOP INFORMATION ROW (3-Column Layout on Desktop) */}
        <div
          ref={infoRowRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/20 items-start"
        >
          {/* LEFT: Location & Studio Info (Span 4) */}
          <div className="md:col-span-4 flex flex-col space-y-2">
            <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase">
              XWEBSITEWALA
            </h3>
            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase opacity-75 font-medium leading-relaxed">
              SURATGARH, RAJASTHAN<br />
              INDIA &mdash; 335804
            </p>
          </div>

          {/* CENTER: Editorial Mission Statement (Span 5) */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <p className="font-sans text-xs sm:text-sm lg:text-base leading-relaxed opacity-85 font-light max-w-prose">
              We design and build modern digital experiences for businesses, brands and people who want their website to feel different.
            </p>
          </div>

          {/* RIGHT: Direct Social & Contact Links (Span 3) */}
          <div className="md:col-span-3 flex flex-col space-y-3 sm:space-y-4 font-sans text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-left md:text-right">
            <a
              href="https://wa.me/919983853091"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300 inline-flex items-center gap-1.5 justify-start md:justify-end"
            >
              <span>WHATSAPP</span>
              <span className="text-xs">&nearr;</span>
            </a>
            <a
              href="https://instagram.com/sujalfrand"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300 inline-flex items-center gap-1.5 justify-start md:justify-end"
            >
              <span>INSTAGRAM</span>
              <span className="text-xs">&nearr;</span>
            </a>
            <a
              href="https://facebook.com/XWEBSITEWALA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300 inline-flex items-center gap-1.5 justify-start md:justify-end"
            >
              <span>FACEBOOK</span>
              <span className="text-xs">&nearr;</span>
            </a>
            <a
              href="https://github.com/sujalfrand66-arch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 hover:translate-x-1 md:hover:-translate-x-1 transition-all duration-300 inline-flex items-center gap-1.5 justify-start md:justify-end"
            >
              <span>GITHUB</span>
              <span className="text-xs">&nearr;</span>
            </a>
          </div>
        </div>

        {/* MASSIVE EDITORIAL TYPOGRAPHY: XWEBSITEWALA */}
        <div
          ref={giantTextWrapperRef}
          className="relative w-full overflow-hidden my-12 sm:my-16 lg:my-24 py-4 flex items-center justify-center pointer-events-none select-none"
          style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
        >
          <h2
            ref={giantTextInnerRef}
            className="font-display font-black text-[14.5vw] sm:text-[16.5vw] lg:text-[18.5vw] leading-[0.8] tracking-tighter uppercase text-white text-center whitespace-nowrap block"
          >
            XWEBSITEWALA
          </h2>
        </div>

        {/* BOTTOM COPYRIGHT & METADATA BAR */}
        <div
          ref={bottomBarRef}
          className="flex flex-col sm:flex-row justify-between items-center text-[8.5px] sm:text-[10px] font-sans tracking-[0.2em] uppercase pt-6 border-t border-white/20 gap-2 opacity-60"
        >
          <span>&copy; {new Date().getFullYear()} XWEBSITEWALA &mdash; ALL RIGHTS RESERVED</span>
          <span>SUJAL FRAND &times; ANMOL FRAND</span>
        </div>

      </div>
    </footer>
  );
}

export default FooterSection;

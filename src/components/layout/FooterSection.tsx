import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAGES_LINKS = [
  { label: "HOME", target: "#hero-section" },
  { label: "ABOUT", target: "#approach-section" },
  { label: "WHY CHOOSE US", target: "#why-choose-us-section" },
  { label: "PROJECTS", target: "#projects-section" },
  { label: "SERVICES", target: "#services-section" },
  { label: "CONTACT", target: "#footer-section" },
];

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", url: "https://instagram.com/sujalfrand" },
  { label: "FACEBOOK", url: "https://facebook.com/XWEBSITEWALA" },
  { label: "GITHUB", url: "https://github.com/sujalfrand66-arch" },
  { label: "WHATSAPP", url: "https://wa.me/919983853091" },
];

const SERVICES_LINKS = [
  { label: "WEB DESIGN", target: "#services-section" },
  { label: "WEB DEVELOPMENT", target: "#services-section" },
  { label: "UI / UX DESIGN", target: "#services-section" },
  { label: "E-COMMERCE", target: "#services-section" },
  { label: "SEO", target: "#services-section" },
  { label: "CUSTOM WEB EXPERIENCES", target: "#services-section" },
];

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const colBrandRef = useRef<HTMLDivElement>(null);
  const colPagesRef = useRef<HTMLDivElement>(null);
  const colSocialsRef = useRef<HTMLDivElement>(null);
  const colServicesRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLHeadingElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Top Content Columns Reveal (Brand -> Pages -> Socials -> Services)
      const columns = [
        colBrandRef.current,
        colPagesRef.current,
        colSocialsRef.current,
        colServicesRef.current,
      ].filter(Boolean);

      tl.fromTo(
        columns,
        {
          opacity: 0,
          y: isMobile ? 20 : 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        },
        0
      );

      // 2. Giant Typography Reveal (Editorial, Heavy, Smooth)
      if (giantTextRef.current) {
        tl.fromTo(
          giantTextRef.current,
          {
            yPercent: isMobile ? 70 : 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.3,
            ease: "expo.out",
          },
          0.3
        );
      }

      // 3. Subtle Bottom Divider & Metadata Reveal
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          0.6
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();
    if (target === "#hero-section") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      className="relative w-full bg-[#050505] text-white select-none pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col justify-between overflow-hidden border-t border-white/[0.08]"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TOP FOOTER LAYOUT (4-Column Structure with Generous Spacing)
            Desktop: Brand (~30%) + Pages (~23%) + Socials (~23%) + Services (~24%)
            Mobile: Stacked cleanly with comfortable vertical spacing
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 md:gap-8 lg:gap-12 pb-14 sm:pb-20 items-start">
          {/* COLUMN 01: BRAND & STUDIO INFO */}
          <div
            ref={colBrandRef}
            className="flex flex-col justify-between space-y-6 md:pr-4"
          >
            <div>
              <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight uppercase text-white">
                XWEBSITEWALA
              </h3>
              <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/50 font-medium mt-2.5">
                SURATGARH, RAJASTHAN, INDIA
              </p>
            </div>

            <p className="font-sans text-xs tracking-wider text-white/40 leading-relaxed font-light hidden md:block">
              &copy; 2026 XWEBSITEWALA.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* COLUMN 02: PAGES */}
          <div ref={colPagesRef} className="flex flex-col space-y-3 sm:space-y-4">
            <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/35">
              PAGES
            </span>
            <ul className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium">
              {PAGES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.target}
                    onClick={(e) => handleSmoothScroll(e, link.target)}
                    className="text-white/70 hover:text-white inline-flex items-center transition-all duration-200 hover:translate-x-1.5 focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 03: SOCIALS */}
          <div ref={colSocialsRef} className="flex flex-col space-y-3 sm:space-y-4">
            <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/35">
              SOCIALS
            </span>
            <ul className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-white/70 hover:text-white inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1.5 focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    <span>{social.label}</span>
                    <span className="text-[11px] inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      &#8599;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 04: SERVICES */}
          <div
            ref={colServicesRef}
            className="flex flex-col space-y-3 sm:space-y-4"
          >
            <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/35">
              SERVICES
            </span>
            <ul className="flex flex-col space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-[13px] tracking-[0.18em] uppercase font-medium">
              {SERVICES_LINKS.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.target}
                    onClick={(e) => handleSmoothScroll(e, service.target)}
                    className="text-white/70 hover:text-white inline-flex items-center transition-all duration-200 hover:translate-x-1.5 focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    <span>{service.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            GIANT BRAND TYPOGRAPHY: XWEBSITEWALA
            Main visual feature: Subdued, low-contrast (#181818),
            editorial clamp sizing, tight tracking, spanning full width
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          className="relative w-full overflow-hidden my-8 sm:my-12 lg:my-16 py-2 sm:py-4 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <h2
            ref={giantTextRef}
            className="font-display font-black text-[12.8vw] sm:text-[13.5vw] lg:text-[14vw] leading-[0.82] tracking-tighter uppercase text-[#181818] text-center whitespace-nowrap block select-none"
            style={{
              letterSpacing: "-0.04em",
              willChange: "transform, opacity",
            }}
          >
            XWEBSITEWALA
          </h2>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FOOTER BOTTOM LINE (Quiet Editorial Metadata & Divider)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          ref={bottomBarRef}
          className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10.5px] font-sans tracking-[0.22em] uppercase pt-6 sm:pt-8 border-t border-white/[0.08] gap-3 text-white/40"
        >
          <span>&copy; 2026 XWEBSITEWALA</span>
          <span>CRAFTED IN SURATGARH, RAJASTHAN</span>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "ABOUT", target: "#approach-section" },
  { label: "WHY US", target: "#why-choose-us-section" },
  { label: "PROJECTS", target: "#projects-section" },
  { label: "SERVICES", target: "#services-section" },
  { label: "PHOTOS", target: "#visual-story-section" },
];

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Set initial hidden state so it doesn't collide with Hero's editorial navbar
    gsap.set(nav, { opacity: 0, pointerEvents: "none", y: -20 });

    // Scroll Visibility & Compression Animation
    const ctx = gsap.context(() => {
      let lastScroll = window.scrollY;

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          const currentScroll = self.scroll();
          const heroThreshold = window.innerHeight * 0.65;

          // Hide floating navbar inside Hero section
          if (currentScroll < heroThreshold) {
            gsap.to(nav, {
              opacity: 0,
              y: -20,
              pointerEvents: "none",
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            // Show floating navbar past Hero section
            const isScrollingDown = currentScroll > lastScroll && currentScroll > heroThreshold + 100;
            gsap.to(nav, {
              opacity: 1,
              pointerEvents: "auto",
              scale: isScrollingDown ? 0.96 : 1,
              y: isScrollingDown ? -4 : 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          lastScroll = currentScroll;
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  // Animate Mobile Menu Overlay
  useEffect(() => {
    if (!menuOverlayRef.current) return;

    if (mobileOpen) {
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power2.out",
      });
      const validLinks = menuLinksRef.current.filter(Boolean);
      gsap.fromTo(
        validLinks,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "expo.out", stagger: 0.08, delay: 0.1 }
      );
    } else {
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Glass Pill Navbar */}
      <div
        ref={navRef}
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] sm:w-auto max-w-5xl pointer-events-auto"
      >
        <nav className="flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.07] backdrop-blur-[18px] border border-white/[0.14] shadow-2xl text-white font-sans text-xs select-none">
          {/* Logo Left */}
          <a
            onClick={() => handleNavClick("#hero-section")}
            className="font-sans font-bold tracking-[0.25em] text-[10px] sm:text-xs uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span>XWEB</span>
            <span className="text-red-500">SITE</span>
            <span>WALA</span>
          </a>

          {/* Desktop Navigation Links Center */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-[10px] sm:text-xs tracking-[0.22em] uppercase opacity-90">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                onClick={() => handleNavClick(link.target)}
                className="relative py-1 cursor-pointer transition-colors duration-200 hover:text-red-500 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Right */}
          <div className="hidden md:flex items-center">
            <a
              onClick={() => handleNavClick("#footer-section")}
              className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-[9.5px] tracking-[0.2em] uppercase cursor-pointer transition-colors duration-200"
            >
              LET'S TALK &rarr;
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? "CLOSE \u2715" : "MENU \u2630"}
          </button>
        </nav>
      </div>

      {/* Mobile Full-Screen Glass Overlay Menu */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl text-white flex flex-col justify-between p-8 pointer-events-none opacity-0 md:hidden"
      >
        <div className="pt-20 pb-8 flex flex-col space-y-6">
          <span className="font-sans text-[9px] font-bold tracking-[0.35em] uppercase opacity-40">
            NAVIGATION
          </span>
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.label}
              ref={(el) => { menuLinksRef.current[idx] = el; }}
              onClick={() => handleNavClick(link.target)}
              className="font-display font-black text-3xl tracking-tight uppercase hover:text-red-500 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            ref={(el) => { menuLinksRef.current[NAV_LINKS.length] = el; }}
            onClick={() => handleNavClick("#footer-section")}
            className="font-display font-black text-3xl tracking-tight uppercase text-red-500 cursor-pointer pt-4 border-t border-white/10"
          >
            LET'S TALK &rarr;
          </a>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[9px] font-sans tracking-[0.2em] uppercase opacity-50">
          <span>XWEBSITEWALA</span>
          <span>SURATGARH, RAJASTHAN</span>
        </div>
      </div>
    </>
  );
}

export default Navbar;

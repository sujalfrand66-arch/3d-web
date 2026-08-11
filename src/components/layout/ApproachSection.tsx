import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCloud } from "../ui/interactive-icon-cloud";

gsap.registerPlugin(ScrollTrigger);

const TECH_SLUGS = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "nextdotjs",
  "vite",
  "threedotjs",
  "firebase",
  "git",
  "github",
  "figma",
  "laravel",
  "php",
  "wordpress",
  "vercel",
];

export function ApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const builtWithLineRef = useRef<HTMLSpanElement>(null);
  const modernTechLineRef = useRef<HTMLSpanElement>(null);
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Pinned ScrollTrigger container
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
      });

      const isMobile = window.innerWidth < 768;

      // 2. Coordinated GSAP Entrance Timeline (Responsive text entrance from Left + Red-to-White BG transition)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Step A: Header & Footer Entrance
      tl.fromTo(
        [headerRef.current, footerRef.current],
        { opacity: 0, y: (i) => (i === 0 ? -12 : 12) },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0
      );

      // Step B: Text travels smoothly from LEFT side toward CENTER (Mobile uses -55%, Desktop uses -85%)
      tl.fromTo(
        textGroupRef.current,
        {
          xPercent: isMobile ? -55 : -85,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: isMobile ? 1.05 : 1.25,
          ease: "expo.out",
        },
        0.05
      );

      // Step C: As text approaches center, Background transitions RED (#7a0000) -> WHITE (#F2F2F0)
      tl.to(
        section,
        {
          backgroundColor: "#F2F2F0",
          duration: 1.0,
          ease: "power2.inOut",
        },
        0.45
      );

      // Step D: Text colors adapt for high readability on WHITE background
      if (builtWithLineRef.current && modernTechLineRef.current) {
        tl.to(
          builtWithLineRef.current,
          {
            color: "rgba(0, 0, 0, 0.22)",
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.5
        );
        tl.to(
          modernTechLineRef.current,
          {
            color: "#000000",
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.5
        );
      }

      // Step E: Header & Footer text/border colors adapt to dark text on white
      tl.to(
        [headerRef.current, footerRef.current],
        {
          color: "rgba(0, 0, 0, 0.65)",
          borderColor: "rgba(0, 0, 0, 0.15)",
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.5
      );

      // Step F: IconCloud smoothly zooms in as background reaches WHITE
      tl.fromTo(
        cloudContainerRef.current,
        {
          opacity: 0,
          scale: isMobile ? 0.8 : 0.7,
          y: isMobile ? 12 : 20,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          scale: 1.0,
          y: 0,
          filter: "blur(0px)",
          duration: isMobile ? 1.0 : 1.15,
          ease: "expo.out",
        },
        0.6
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="approach-section"
      className="relative w-full h-screen overflow-hidden bg-[#7a0000] text-white select-none flex flex-col justify-between"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Top Header */}
      <div
        ref={headerRef}
        className="relative z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-16 lg:px-24 pt-3 sm:pt-8 pb-2.5 sm:pb-3 border-b border-white/15 transition-colors duration-500"
      >
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase">
          XWEBSITEWALA / SURATGARH, RAJASTHAN
        </div>
        <div className="flex items-center gap-3 sm:gap-6 text-[8px] sm:text-[10px] font-sans tracking-[0.18em] sm:tracking-[0.25em] uppercase opacity-70">
          <span>04 / TECH STACK</span>
          <span>&mdash;</span>
          <span>CREATIVE WEB PORTFOLIO</span>
        </div>
      </div>

      {/* Main Unified Composition: Editorial Headline + Overlaying 3D Icon Cloud */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 sm:px-6 py-2 sm:py-4 overflow-hidden">
        {/* Layer 1: Large Editorial Typography (Travels smoothly from LEFT -> CENTER) */}
        <div
          ref={textGroupRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 px-3 sm:px-4"
        >
          <p className="font-sans text-[8px] sm:text-[11px] font-bold tracking-[0.28em] sm:tracking-[0.38em] uppercase opacity-40 mb-1.5 sm:mb-4 text-center">
            DIGITAL CRAFT &amp; ENGINEERING
          </p>
          <h2 className="font-display font-black text-[11vw] min-[400px]:text-[10vw] sm:text-[9vw] lg:text-[8vw] leading-[0.88] tracking-tighter text-center uppercase">
            <span ref={builtWithLineRef} className="block text-white/20 transition-colors duration-500">
              BUILT WITH
            </span>
            <span ref={modernTechLineRef} className="block text-white transition-colors duration-500">
              MODERN TECH.
            </span>
          </h2>
        </div>

        {/* Layer 2: Interactive Icon Cloud (Composed seamlessly in the visual center) */}
        <div
          ref={cloudContainerRef}
          className="relative w-full max-w-[260px] min-[380px]:max-w-[310px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[520px] aspect-square flex items-center justify-center pointer-events-auto z-10"
        >
          {/* Soft, ultra-subtle radial separation light */}
          <div className="absolute inset-0 rounded-full bg-black/5 blur-3xl pointer-events-none z-0" />

          {/* Interactive Cloud */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <IconCloud iconSlugs={TECH_SLUGS} />
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div
        ref={footerRef}
        className="relative z-30 flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.18em] sm:tracking-[0.25em] uppercase opacity-70 px-4 sm:px-6 md:px-16 lg:px-24 py-2.5 sm:py-6 border-t border-white/15 gap-1 transition-colors duration-500"
      >
        <span>XWEBSITEWALA &mdash; FOUNDED 2016</span>
        <span>SCROLL TO CONTINUE &#x2193;</span>
      </div>
    </div>
  );
}

export default ApproachSection;

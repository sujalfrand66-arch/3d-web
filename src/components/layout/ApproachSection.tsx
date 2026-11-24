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
  const footerRef = useRef<HTMLDivElement>(null);

  // Left Story Refs
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const metaBadgeRef = useRef<HTMLDivElement>(null);

  // Right Tech Cloud Ref
  const cloudContainerRef = useRef<HTMLDivElement>(null);

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

      // 2. Coordinated GSAP Timeline
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

      // Step B: Eyebrow & Main Headline Reveal
      tl.fromTo(
        [eyebrowRef.current, headlineRef.current],
        { opacity: 0, x: isMobile ? -25 : -45 },
        { opacity: 1, x: 0, duration: 1.0, ease: "expo.out", stagger: 0.12 },
        0.05
      );

      // Step C: Progressive Left Story Paragraphs Reveal
      const validParas = paragraphRefs.current.filter(Boolean);
      if (validParas.length > 0) {
        tl.fromTo(
          validParas,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
          0.2
        );
      }

      // Step D: Metadata Badges Reveal
      if (metaBadgeRef.current) {
        tl.fromTo(
          metaBadgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.45
        );
      }

      // Step E: Right-Side Tech Cloud Entrance (Scale & Fade independently on right)
      if (cloudContainerRef.current) {
        tl.fromTo(
          cloudContainerRef.current,
          { opacity: 0, scale: 0.82, y: 25 },
          { opacity: 1, scale: 1.0, y: 0, duration: 1.1, ease: "expo.out" },
          0.25
        );
      }

      // Step F: Background Color Transition RED (#7a0000) -> WARM WHITE (#F2F2F0)
      tl.to(
        section,
        {
          backgroundColor: "#F2F2F0",
          color: "#000000",
          duration: 1.0,
          ease: "power2.inOut",
        },
        0.5
      );

      // Step G: Adapt Header & Footer borders on white
      tl.to(
        [headerRef.current, footerRef.current],
        {
          borderColor: "rgba(0, 0, 0, 0.15)",
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.55
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
        className="relative z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-16 lg:px-24 pt-3 sm:pt-8 pb-2.5 sm:pb-3 border-b border-current/15 transition-colors duration-500 shrink-0"
      >
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase">
          XWEBSITEWALA / SURATGARH, RAJASTHAN
        </div>
        <div className="flex items-center gap-3 sm:gap-6 text-[8px] sm:text-[10px] font-sans tracking-[0.18em] sm:tracking-[0.25em] uppercase opacity-70">
          <span>04 / ABOUT XWEBSITEWALA</span>
          <span>&mdash;</span>
          <span>CREATIVE WEB PORTFOLIO</span>
        </div>
      </div>

      {/* Main Continuous Two-Column Story Arena */}
      <div className="relative z-20 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-6 overflow-hidden">
        
        {/* LEFT COLUMN: ABOUT STORY (55-65% Desktop Width) */}
        <div className="w-full lg:w-[58%] flex flex-col justify-center items-start text-left space-y-2.5 sm:space-y-4">
          
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="font-sans text-[8.5px] sm:text-[11px] font-bold tracking-[0.32em] uppercase opacity-50"
          >
            ABOUT XWEBSITEWALA
          </p>

          {/* Large Statement Headline */}
          <h2
            ref={headlineRef}
            className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[0.92] tracking-tight uppercase"
          >
            <span className="block opacity-40">TWO BROTHERS.</span>
            <span className="block">ONE SCREEN.</span>
            <span className="block text-red-500">A LOT OF IDEAS.</span>
          </h2>

          {/* Story Paragraphs */}
          <div className="space-y-2 sm:space-y-3 font-sans text-xs sm:text-sm md:text-base leading-relaxed opacity-85 font-light max-w-2xl">
            <p ref={(el) => { paragraphRefs.current[0] = el; }}>
              XWEBSITEWALA started with two brothers who looked at websites a little differently.
            </p>
            <p ref={(el) => { paragraphRefs.current[1] = el; }}>
              Sujal Frand and Anmol Frand work across design, development, and motion, building digital experiences that are meant to feel as good as they function.
            </p>
            <p ref={(el) => { paragraphRefs.current[2] = el; }}>
              We care about the details people usually overlook &mdash; the movement between sections, the rhythm of typography, the interaction, the tiny moments that make a website feel alive.
            </p>
            <p ref={(el) => { paragraphRefs.current[3] = el; }} className="font-semibold opacity-100">
              We don't just build websites. We design experiences around them.
            </p>
          </div>

          {/* Metadata Badges */}
          <div
            ref={metaBadgeRef}
            className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-[8px] sm:text-[9.5px] font-sans tracking-[0.2em] uppercase font-bold opacity-60"
          >
            <span className="px-2.5 py-1 rounded-full border border-current/20">SUJAL FRAND &times; ANMOL FRAND</span>
            <span className="px-2.5 py-1 rounded-full border border-current/20">DESIGN &times; DEVELOPMENT &times; MOTION</span>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE TECH CLOUD (35-45% Desktop Width) */}
        <div className="w-full lg:w-[38%] flex items-center justify-center shrink-0">
          <div
            ref={cloudContainerRef}
            className="relative w-full max-w-[240px] min-[380px]:max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px] aspect-square flex items-center justify-center pointer-events-auto"
          >
            {/* Subtle Ambient Separation Glow */}
            <div className="absolute inset-0 rounded-full bg-black/5 blur-3xl pointer-events-none z-0" />

            {/* Interactive Cloud Component */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <IconCloud iconSlugs={TECH_SLUGS} />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Bar */}
      <div
        ref={footerRef}
        className="relative z-30 flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.18em] sm:tracking-[0.25em] uppercase opacity-70 px-4 sm:px-6 md:px-16 lg:px-24 py-2.5 sm:py-6 border-t border-current/15 gap-1 transition-colors duration-500 shrink-0"
      >
        <span>XWEBSITEWALA &mdash; FOUNDED 2016</span>
        <span>SCROLL TO CONTINUE &#x2193;</span>
      </div>
    </div>
  );
}

export default ApproachSection;

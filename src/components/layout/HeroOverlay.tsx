import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "6+", label: "YEARS OF", sublabel: "EXPERIENCE" },
  { value: "80+", label: "PROJECTS", sublabel: "COMPLETED" },
  { value: "40+", label: "HAPPY", sublabel: "CLIENTS" },
  { value: "12", label: "INDUSTRY", sublabel: "AWARDS" },
];

const NAV_ITEMS = [
  { label: "WORK", target: "#projects-section" },
  { label: "SERVICES", target: "#services-section" },
  { label: "ABOUT", target: "#approach-section" },
  { label: "EXPERIENCE", target: "#why-choose-us-section" },
  { label: "CONTACT", target: "#footer-section" },
];

export function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const talkBtnRef = useRef<HTMLButtonElement>(null);

  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const asteriskRef = useRef<HTMLSpanElement>(null);

  const subheadingLine1Ref = useRef<HTMLDivElement>(null);
  const subheadingLine2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);

  const redPanelRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const suziRef = useRef<HTMLImageElement>(null);
  const circularBadgeRef = useRef<HTMLDivElement>(null);

  const statsBarRef = useRef<HTMLDivElement>(null);
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleNavClick = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });

      // ── INITIAL STATES (Clip-paths, transforms, opacity) ──
      gsap.set(logoRef.current, { y: -15, opacity: 0 });
      const validNavLinks = navLinksRef.current.filter(Boolean);
      gsap.set(validNavLinks, { y: -12, opacity: 0 });
      gsap.set(talkBtnRef.current, { scale: 0.94, opacity: 0 });

      gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
        yPercent: 110,
        opacity: 0,
      });

      gsap.set(asteriskRef.current, { scale: 0, rotation: -25, opacity: 0 });

      gsap.set([subheadingLine1Ref.current, subheadingLine2Ref.current], {
        yPercent: 100,
        opacity: 0,
      });

      gsap.set(descRef.current, { y: 20, opacity: 0 });

      gsap.set(ctaBtnRef.current, { scale: 0.7, rotation: -15, opacity: 0 });
      gsap.set(ctaTextRef.current, { x: -15, opacity: 0 });

      gsap.set(redPanelRef.current, {
        clipPath: "inset(100% 0 0 0)",
      });

      gsap.set(suziRef.current, {
        clipPath: "inset(100% 0 0 0)",
        y: 100,
        scale: 0.96,
        opacity: 0,
      });

      gsap.set(circularBadgeRef.current, {
        scale: 0.75,
        rotation: -12,
        opacity: 0,
      });

      gsap.set(statsBarRef.current, { yPercent: 100, opacity: 0 });
      const validStatItems = statItemsRef.current.filter(Boolean);
      gsap.set(validStatItems, { y: 20, opacity: 0 });

      // ── 12-PHASE AWWWARDS-LEVEL GSAP EDITORIAL REVEAL ──
      
      // Phase 1: Background & Container Load
      tl.fromTo(
        containerRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.7, ease: "power3.inOut" }
      )

      // Phase 2: Navbar elements (Logo -> Links -> LET'S TALK)
      .to(logoRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .to(validNavLinks, { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.out" }, "-=0.4")
      .to(talkBtnRef.current, { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")

      // Phase 3: WEB (Masked yPercent reveal + power4.out)
      .to(
        titleLine1Ref.current,
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        "-=0.3"
      )

      // Phase 4: DESIGNER (Follows with distinct offset timing)
      .to(
        titleLine2Ref.current,
        { yPercent: 0, opacity: 1, duration: 1.15, ease: "power4.out" },
        "-=0.9"
      )

      // Phase 5: Red Asterisk (Independent scale/rotation reveal)
      .to(
        asteriskRef.current,
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      )

      // Phase 6: Subheading (Line-based masking, red portion follows black)
      .to(
        subheadingLine1Ref.current,
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .to(
        subheadingLine2Ref.current,
        { yPercent: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        "-=0.65"
      )

      // Phase 7: Description (Quiet 0.7s duration opacity + y reveal)
      .to(
        descRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )

      // Phase 8: CTA (Red arrow scale/rotate + VIEW MY WORK text slide)
      .to(
        ctaBtnRef.current,
        { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .to(
        ctaTextRef.current,
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )

      // Phase 9: Red Vertical Panel (Architectural vertical clip-path reveal)
      .to(
        redPanelRef.current,
        { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.out" },
        "-=1.2"
      )

      // Phase 10: Suzi Character (Masked clip-path + y translation uncover)
      .to(
        suziRef.current,
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.85"
      )

      // Phase 11: Freelance Badge (Scale/rotation pop + continuous rotation)
      .to(
        circularBadgeRef.current,
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      )

      // Phase 12: Statistics Bar & Numbers (Upward yPercent reveal + staggered numbers)
      .to(
        statsBarRef.current,
        { yPercent: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        "-=0.6"
      )
      .to(
        validStatItems,
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );

      // Continuous subtle ambient motion on Asterisk
      gsap.to(asteriskRef.current, {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });

      // Subtle Scroll Parallax Effects
      if (titleLine1Ref.current && redPanelRef.current) {
        gsap.to([titleLine1Ref.current, titleLine2Ref.current], {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(redPanelRef.current, {
          y: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        if (suziRef.current) {
          gsap.to(suziRef.current, {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        gsap.to(circularBadgeRef.current, {
          rotation: 90,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full bg-[#F4F3EE] text-black overflow-hidden flex flex-col justify-between"
      style={{
        minHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      {/* ── TOP EDITORIAL NAVBAR ── */}
      <header
        ref={navRef}
        className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 py-6 border-b border-black/10 select-none z-30 bg-[#F4F3EE]"
      >
        {/* Left: Typography Logo */}
        <div
          ref={logoRef}
          onClick={() => handleNavClick("#hero-section")}
          className="cursor-pointer font-sans font-black text-xl sm:text-2xl tracking-[0.18em] uppercase flex items-center"
        >
          <span className="text-black">XWEB</span>
          <span className="text-[#D31010]">SITE</span>
          <span className="text-black">WALA</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#D31010] ml-1"></span>
        </div>

        {/* Center: Editorial Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 font-sans font-bold text-xs tracking-[0.22em] text-black/80">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              ref={(el) => {
                navLinksRef.current[idx] = el;
              }}
              onClick={() => handleNavClick(item.target)}
              className="cursor-pointer transition-colors duration-200 hover:text-[#D31010] relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D31010] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Red CTA Button */}
        <div>
          <button
            ref={talkBtnRef}
            onClick={() => handleNavClick("#footer-section")}
            className="group flex items-center gap-2 bg-[#D31010] hover:bg-[#b00d0d] text-white font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase px-5 sm:px-7 py-3 transition-all duration-200 shadow-sm"
          >
            <span>LET'S TALK</span>
            <span className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              &#x2197;
            </span>
          </button>
        </div>
      </header>

      {/* ── MAIN HERO BODY (ASYMMETRIC EDITORIAL GRID) ── */}
      {/* Tightened vertical padding (pt-6 lg:pt-8 pb-0) to bring stats bar immediately below Suzi */}
      <div className="relative flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
        
        {/* ── LEFT CONTENT COLUMN (Cols 1-7 ~55%) ── */}
        <div className="lg:col-span-7 flex flex-col justify-center select-none z-20 pr-0 lg:pr-6 pb-8 lg:pb-12">
          
          {/* Main Title: WEB DESIGNER + Red Asterisk */}
          <div className="relative mb-6">
            <div className="overflow-hidden">
              <div
                ref={titleLine1Ref}
                className="flex items-baseline"
                style={{
                  fontFamily: "var(--font-hero)",
                  fontSize: "clamp(34px, 10vw, 160px)",
                  lineHeight: 0.85,
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                  color: "#0A0A0A",
                  textTransform: "uppercase",
                }}
              >
                <span>WEB</span>
                {/* Red 8-Point Asterisk Accent */}
                <span
                  ref={asteriskRef}
                  className="inline-block ml-3 sm:ml-5 text-[#D31010] align-top"
                  style={{
                    transformOrigin: "center center",
                    lineHeight: 1,
                  }}
                >
                  <svg
                    className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 fill-current inline-block"
                    viewBox="0 0 100 100"
                  >
                    <path d="M43 0h14v37l26-26 10 10-26 26h37v14H67l26 26-10 10-26-26v37H43V67L17 93 7 83l26-26H0V43h37L11 17l10-10 26 26V0z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                ref={titleLine2Ref}
                style={{
                  fontFamily: "var(--font-hero)",
                  fontSize: "clamp(34px, 10vw, 160px)",
                  lineHeight: 0.85,
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                  color: "#0A0A0A",
                  textTransform: "uppercase",
                }}
              >
                DESIGNER
              </div>
            </div>
          </div>

          {/* Subheading Statement (Masked line reveals) */}
          <div className="mb-4 overflow-hidden">
            <div ref={subheadingLine1Ref} className="font-sans font-extrabold text-lg sm:text-2xl lg:text-3xl tracking-tight uppercase leading-tight text-black">
              I DESIGN DIGITAL EXPERIENCES
            </div>
            <div ref={subheadingLine2Ref} className="font-sans font-extrabold text-lg sm:text-2xl lg:text-3xl tracking-tight uppercase leading-tight text-[#D31010]">
              WITH XWEBSITE WALA
            </div>
          </div>

          {/* Description Paragraph */}
          <p
            ref={descRef}
            className="font-sans font-medium text-sm sm:text-base text-neutral-700 max-w-lg mb-8 leading-relaxed"
          >
            I create modern, user-centered websites that combine strategy,
            aesthetics and performance.
          </p>

          {/* CTA: Circular Red Arrow + Text */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("#projects-section")}
              className="group flex items-center gap-4 text-black hover:text-[#D31010] font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-colors"
            >
              <button
                ref={ctaBtnRef}
                className="w-12 h-12 rounded-full bg-[#D31010] text-white flex items-center justify-center text-lg group-hover:scale-110 group-hover:bg-[#b00d0d] transition-all shadow-md"
              >
                &rarr;
              </button>
              <span
                ref={ctaTextRef}
                className="border-b-2 border-transparent group-hover:border-[#D31010] py-1 transition-all"
              >
                VIEW MY WORK
              </span>
            </button>
          </div>
        </div>

        {/* ── RIGHT VISUAL & RED PANEL AREA (Cols 8-12 ~45%) ── */}
        <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex items-end justify-start h-full pb-0">
          
          {/* Red Right-Side Vertical Panel */}
          <div
            ref={redPanelRef}
            className="absolute right-0 top-0 bottom-0 w-[82%] sm:w-[75%] lg:w-[85%] bg-[#D31010] z-0 overflow-hidden shadow-xl flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Top Text Inside Red Panel */}
            <div className="text-white font-sans font-bold text-xs sm:text-sm tracking-[0.25em] uppercase leading-tight select-none">
              <div>BASED IN</div>
              <div className="text-white/90">INDIA</div>
            </div>

            {/* Subtle Vertical Accent Lines inside Red Panel */}
            <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-white/15 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-white/10 pointer-events-none"></div>
          </div>

          {/* Hero Visual Container with Suzi Character Asset */}
          <div
            ref={visualRef}
            className="hero-visual absolute inset-0 z-10 pointer-events-none flex items-end justify-center lg:justify-start overflow-visible"
            style={{
              background: "transparent",
            }}
          >
            <img
              ref={suziRef}
              src="/mp4/suzi.png"
              alt="Suzi - Creative Web Designer"
              className="suzi-character object-contain max-h-[94%] lg:max-h-[99%] max-w-[95%] lg:max-w-full drop-shadow-2xl -translate-x-[15%] sm:-translate-x-[25%] lg:-translate-x-[38%]"
              style={{
                objectFit: "contain",
                objectPosition: "bottom center",
              }}
            />
          </div>

          {/* Circular Badge Floating Near Center-Left Space Between Text & Suzi */}
          <div
            ref={circularBadgeRef}
            className="absolute left-2 sm:-left-24 lg:-left-40 bottom-4 sm:bottom-10 z-20 select-none pointer-events-auto"
          >
            <div className="relative w-22 h-22 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Rotating Circular Text SVG */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 120 120"
              >
                <path
                  id="badgePath"
                  d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="none"
                />
                <text className="font-sans font-bold text-[9.5px] uppercase tracking-[0.24em] fill-black">
                  <textPath href="#badgePath" startOffset="0%">
                    • WEB DESIGN • UI/UX • BRANDING
                  </textPath>
                </text>
              </svg>

              {/* Center Static Badge Text */}
              <div className="text-center font-sans font-extrabold text-[9px] sm:text-[10px] leading-tight uppercase tracking-wider bg-[#F4F3EE] p-3 rounded-full shadow-md border border-black/10">
                <div className="text-black">AVAILABLE</div>
                <div className="text-black">FOR</div>
                <div className="text-[#D31010]">FREELANCE</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── BOTTOM STATISTICS BAR (FULL-WIDTH BLACK STRIP IMMEDIATELY BELOW HERO VISUAL) ── */}
      <div
        ref={statsBarRef}
        className="w-full bg-[#0A0A0A] text-white border-t border-black/10 select-none z-30"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              ref={(el) => {
                statItemsRef.current[idx] = el;
              }}
              className="flex items-center justify-center gap-4 sm:gap-6 py-6 sm:py-8 px-4 text-center md:text-left"
            >
              {/* Metric Value */}
              <span
                style={{ fontFamily: "var(--font-hero)" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#D31010] tracking-wide"
              >
                {stat.value}
              </span>

              {/* Metric Label */}
              <div className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.22em] uppercase text-neutral-300 leading-tight">
                <div>{stat.label}</div>
                <div>{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroOverlay;

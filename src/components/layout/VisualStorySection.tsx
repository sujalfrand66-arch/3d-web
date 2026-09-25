import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Abstract SVG composition for the main visual frame ──
// Replaces the photograph — same container size/refs preserved for GSAP
function VisualArchiveSVG() {
  return (
    <svg
      viewBox="0 0 800 550"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Base black background */}
      <rect width="800" height="550" fill="#080808" />

      {/* Subtle dot-matrix texture */}
      {Array.from({ length: 20 }).map((_, col) =>
        Array.from({ length: 14 }).map((_, row) => (
          <circle
            key={`dot-${col}-${row}`}
            cx={col * 42 + 21}
            cy={row * 40 + 20}
            r="0.8"
            fill="rgba(255,255,255,0.06)"
          />
        ))
      )}

      {/* Ghost oversized background numeral */}
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'General Sans', sans-serif"
        fontWeight="900"
        fontSize="380"
        fill="rgba(255,255,255,0.018)"
        letterSpacing="-15"
      >
        06
      </text>

      {/* Large background rectangle — red accent block */}
      <rect x="580" y="60" width="180" height="420" fill="rgba(220,38,38,0.08)" />

      {/* Vertical red accent bar — hard left */}
      <rect x="0" y="0" width="4" height="550" fill="#dc2626" opacity="0.7" />

      {/* Thin horizontal grid lines */}
      <line x1="0" y1="110" x2="800" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="220" x2="800" y2="220" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="330" x2="800" y2="330" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="440" x2="800" y2="440" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* Thin vertical grid lines */}
      <line x1="200" y1="0" x2="200" y2="550" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="400" y1="0" x2="400" y2="550" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="600" y1="0" x2="600" y2="550" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

      {/* Diagonal accent line — upper */}
      <line x1="80" y1="0" x2="800" y2="480" stroke="rgba(255,255,255,0.03)" strokeWidth="1.5" />

      {/* Red accent horizontal rule — scan line */}
      <rect x="0" y="274" width="800" height="2" fill="rgba(220,38,38,0.3)" />

      {/* Corner registration marks — top-left */}
      <line x1="30" y1="25" x2="70" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="30" y1="25" x2="30" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Corner registration marks — top-right */}
      <line x1="730" y1="25" x2="770" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="770" y1="25" x2="770" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Corner registration marks — bottom-left */}
      <line x1="30" y1="525" x2="70" y2="525" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="30" y1="485" x2="30" y2="525" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Corner registration marks — bottom-right */}
      <line x1="730" y1="525" x2="770" y2="525" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="770" y1="485" x2="770" y2="525" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* DIGITAL CRAFT — large ghost text */}
      <text
        x="46"
        y="210"
        fontFamily="'Bebas Neue', 'General Sans', sans-serif"
        fontSize="68"
        fontWeight="900"
        fill="rgba(255,255,255,0.08)"
        letterSpacing="8"
      >
        DIGITAL
      </text>
      <text
        x="46"
        y="295"
        fontFamily="'Bebas Neue', 'General Sans', sans-serif"
        fontSize="68"
        fontWeight="900"
        fill="rgba(255,255,255,0.08)"
        letterSpacing="8"
      >
        CRAFT
      </text>

      {/* Bold VISUAL ARCHIVE label — top center */}
      <text
        x="400"
        y="52"
        textAnchor="middle"
        fontFamily="'General Sans', sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="rgba(255,255,255,0.22)"
        letterSpacing="6"
      >
        VISUAL ARCHIVE — XWEBSITEWALA STUDIO
      </text>

      {/* Small red accent rectangle — upper-left zone */}
      <rect x="46" y="130" width="60" height="3" fill="#dc2626" opacity="0.8" />

      {/* Crosshair center marker */}
      <line x1="395" y1="260" x2="395" y2="290" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="380" y1="275" x2="420" y2="275" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <circle cx="400" cy="275" r="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
      <circle cx="400" cy="275" r="3" fill="rgba(220,38,38,0.8)" />

      {/* Numbered progression — process steps */}
      {[
        { x: 46, y: 360, label: "01", text: "IDEA" },
        { x: 196, y: 360, label: "02", text: "PROCESS" },
        { x: 346, y: 360, label: "03", text: "CRAFT" },
        { x: 496, y: 360, label: "04", text: "RESULT" },
      ].map((step) => (
        <g key={step.label}>
          <text
            x={step.x}
            y={step.y}
            fontFamily="'General Sans', sans-serif"
            fontSize="10"
            fontWeight="700"
            fill="rgba(220,38,38,0.7)"
            letterSpacing="2"
          >
            {step.label}
          </text>
          <text
            x={step.x}
            y={step.y + 16}
            fontFamily="'General Sans', sans-serif"
            fontSize="10"
            fontWeight="700"
            fill="rgba(255,255,255,0.25)"
            letterSpacing="4"
          >
            {step.text}
          </text>
          <line
            x1={step.x}
            y1={step.y + 22}
            x2={step.x + 110}
            y2={step.y + 22}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Connector arrows between steps */}
      {[46 + 110, 196 + 110, 346 + 110].map((x, i) => (
        <text
          key={`arr-${i}`}
          x={x + 12}
          y={368}
          fontFamily="monospace"
          fontSize="10"
          fill="rgba(255,255,255,0.15)"
        >
          →
        </text>
      ))}

      {/* Bottom coordinate label */}
      <text
        x="46"
        y="532"
        fontFamily="monospace"
        fontSize="7.5"
        fill="rgba(255,255,255,0.18)"
        letterSpacing="2"
      >
        SURATGARH, INDIA — EST. 2026 — CREATIVE DIGITAL STUDIO
      </text>

      {/* Right-side vertical label */}
      <text
        x="775"
        y="360"
        fontFamily="'General Sans', sans-serif"
        fontSize="8"
        fontWeight="700"
        fill="rgba(220,38,38,0.4)"
        letterSpacing="3"
        transform="rotate(90, 775, 275)"
        textAnchor="middle"
      >
        FINAL CHAPTER — EDITORIAL SPREAD
      </text>
    </svg>
  );
}

export function VisualStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const mainImageFrameRef = useRef<HTMLDivElement>(null);
  const secondaryPanelRef = useRef<HTMLDivElement>(null);
  const floatingPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (prefersReducedMotion) {
        gsap.set(
          [
            labelRef.current,
            ...headingLinesRef.current,
            copyRef.current,
            mainImageFrameRef.current,
            secondaryPanelRef.current,
            floatingPillRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, yPercent: 0, xPercent: 0 }
        );
        return;
      }

      // ── MASTER ENTRANCE TIMELINE ────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Small Label
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          0
        );
      }

      // 2. Line-by-Line Masked Typography Reveal
      const validLines = headingLinesRef.current.filter(Boolean);
      if (validLines.length > 0) {
        tl.fromTo(
          validLines,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.07,
          },
          0.06
        );
      }

      // 3. Supporting Text & Studio Meta
      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
          0.22
        );
      }

      // 4. Dominant Visual Object Entrance
      if (mainImageFrameRef.current) {
        tl.fromTo(
          mainImageFrameRef.current,
          { scale: 0.88, opacity: 0, y: isMobile ? 25 : 45 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          0.18
        );
      }

      // 5. Layered Secondary Panel & Floating Pill
      if (secondaryPanelRef.current) {
        tl.fromTo(
          secondaryPanelRef.current,
          {
            xPercent: isMobile ? -8 : -14,
            yPercent: isMobile ? 8 : 12,
            opacity: 0,
          },
          {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            duration: 0.42,
            ease: "power3.out",
          },
          0.32
        );
      }

      if (floatingPillRef.current) {
        tl.fromTo(
          floatingPillRef.current,
          { scale: 0.75, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" },
          0.38
        );
      }

      // ── SCROLL-DRIVEN CONTINUOUS PARALLAX ─────────────────────
      if (!isMobile) {
        // Typography moves slightly upward while visual drifts oppositely
        if (textColRef.current) {
          gsap.to(textColRef.current, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        if (mainImageFrameRef.current) {
          gsap.to(mainImageFrameRef.current, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        if (secondaryPanelRef.current) {
          gsap.to(secondaryPanelRef.current, {
            xPercent: -4,
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        if (floatingPillRef.current) {
          gsap.to(floatingPillRef.current, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visual-story-section"
      className="relative w-full bg-[#ece4da] text-[#000000] select-none py-16 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 flex flex-col justify-between overflow-hidden border-t-2 border-[#000000]"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP CHAPTER DIVIDER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-6 border-b-2 border-[#000000]">
        <div
          ref={labelRef}
          className="font-sans text-[10.5px] sm:text-xs font-black tracking-[0.3em] uppercase text-[#707070] flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#000000]" />
          <span>06 / FINAL CHAPTER &mdash; VISUAL ARCHIVE</span>
        </div>
        <div className="font-sans text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-[#000000] font-bold">
          XWEBSITEWALA &mdash; EDITORIAL SPREAD
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN ASYMMETRICAL ART-DIRECTED SPREAD
          LEFT: Huge Editorial Typographic Statement
          RIGHT: Single Dominant Visual Object (Abstract SVG)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto w-full my-10 sm:my-14 lg:my-18 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Enormous Editorial Statement ──────────── */}
        <div
          ref={textColRef}
          className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8 text-left"
        >
          {/* Label */}
          <div className="font-sans text-[11px] sm:text-xs font-black tracking-[0.28em] uppercase text-[#707070]">
            ART DIRECTION &amp; CODE
          </div>

          {/* Huge Staggered Typography Reveal */}
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.88] tracking-[-0.03em] uppercase text-[#000000] flex flex-col">
            <span className="overflow-hidden block">
              <span
                ref={(el) => {
                  headingLinesRef.current[0] = el;
                }}
                className="block"
              >
                DIGITAL
              </span>
            </span>
            <span className="overflow-hidden block">
              <span
                ref={(el) => {
                  headingLinesRef.current[1] = el;
                }}
                className="block"
              >
                CRAFT.
              </span>
            </span>
            <span className="overflow-hidden block">
              <span
                ref={(el) => {
                  headingLinesRef.current[2] = el;
                }}
                className="block text-[#707070]"
              >
                TIMELESS
              </span>
            </span>
            <span className="overflow-hidden block">
              <span
                ref={(el) => {
                  headingLinesRef.current[3] = el;
                }}
                className="block"
              >
                CULTURE.
              </span>
            </span>
          </h2>

          {/* Supporting Copy & Meta */}
          <div ref={copyRef} className="space-y-4 pt-2">
            <p className="font-sans text-sm sm:text-base lg:text-[17px] text-[#000000]/80 leading-relaxed font-normal max-w-lg">
              We architect digital experiences where rigorous engineering meets
              high-editorial rhythm. Built from the ground up by{" "}
              <span className="font-bold text-[#000000]">Sujal Frand</span> and{" "}
              <span className="font-bold text-[#000000]">Anmol Frand</span> for
              brands that demand distinct visual authority.
            </p>

            <div className="pt-2 flex items-center gap-4 font-mono text-[11px] sm:text-xs tracking-widest uppercase text-[#707070] font-semibold">
              <span>● SURATGARH, INDIA</span>
              <span>&mdash;</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Abstract SVG Visual Object ─────────── */}
        <div
          ref={visualWrapperRef}
          className="lg:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0"
        >
          {/* Main Visual Frame — Abstract SVG composition (same ref for GSAP) */}
          <div
            ref={mainImageFrameRef}
            tabIndex={0}
            role="region"
            aria-label="Visual Archive — Digital Craft by XWEBSITEWALA"
            className="group relative w-full aspect-[16/11] rounded-[44px] sm:rounded-[56px] border-2 border-[#000000] bg-[#080808] overflow-hidden shadow-[6px_6px_0px_#000000] transition-all duration-200 ease-out hover:scale-[1.015] hover:shadow-[8px_8px_0px_#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]"
          >
            {/* Abstract SVG replaces the photo */}
            <div className="w-full h-full">
              <VisualArchiveSVG />
            </div>

            {/* Bottom Embedded Editorial Caption Bar — unchanged */}
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t-2 border-[#000000] px-6 py-3.5 flex justify-between items-center text-[#000000]">
              <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase">
                BEHIND THE INTERACTION
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#707070]">
                XWEBSITEWALA STUDIO
              </span>
            </div>
          </div>

          {/* Secondary Overlapping Layered Panel — refined with red top-accent */}
          <div
            ref={secondaryPanelRef}
            className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 z-10 w-52 sm:w-64 md:w-72 p-5 sm:p-6 rounded-[28px] sm:rounded-[36px] bg-[#c7d7e9] border-2 border-[#000000] shadow-[5px_5px_0px_#000000] text-[#000000] transition-all duration-200 hover:scale-[1.02] overflow-hidden"
          >
            {/* Red top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#dc2626]" />
            <div className="flex justify-between items-start font-sans text-[9px] sm:text-[10px] font-black tracking-[0.25em] uppercase text-[#000000]/60">
              <span>01 / SPECIFICATION</span>
              <span className="font-mono text-xs font-black text-[#000000]">
                01
              </span>
            </div>
            <h3 className="font-display font-black text-base sm:text-lg uppercase leading-tight tracking-tight mt-3 text-[#000000]">
              BESPOKE CODE &amp; MOTION
            </h3>
            <p className="font-sans text-[11px] sm:text-xs text-[#000000]/75 font-medium mt-1 leading-snug">
              Fluid 60fps scroll choreography with zero generic templates.
            </p>
          </div>

          {/* Floating Editorial Accent Pill — unchanged */}
          <div
            ref={floatingPillRef}
            className="absolute -top-3 -right-2 sm:-top-5 sm:-right-4 z-10 px-4 py-2 rounded-full bg-white border-2 border-[#000000] shadow-[3px_3px_0px_#000000] text-[#000000] font-sans text-[10px] sm:text-xs font-black tracking-wider uppercase flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#000000]" />
            <span>ARCHIVE 2026</span>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM SECTION TRANSITION LINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10.5px] font-sans tracking-[0.25em] uppercase text-[#707070] font-bold pt-6 border-t-2 border-[#000000] gap-2">
        <span>XWEBSITEWALA &mdash; CREATIVE ARCHIVE</span>
        <span>FINAL CHAPTER &bull; FOOTER BELOW &#x2193;</span>
      </div>
    </section>
  );
}

export default VisualStorySection;

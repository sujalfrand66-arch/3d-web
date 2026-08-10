import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FirstScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Target elements
      const gridV = section.querySelectorAll(".first-scroll-grid-v");
      const gridH = section.querySelectorAll(".first-scroll-grid-h");
      const meta = section.querySelectorAll(".first-scroll-meta");
      const headingLines = section.querySelectorAll(".first-scroll-heading-line");
      const supportLines = section.querySelectorAll(".first-scroll-support-line");
      const wrapper = imageWrapperRef.current;
      const img = imageInnerRef.current;

      // ── Initial State Setup ──
      gsap.set(gridV, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(gridH, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(meta, { opacity: 0, y: 20 });
      gsap.set(headingLines, { yPercent: 110 });
      gsap.set(supportLines, { yPercent: 110 });

      if (wrapper) {
        gsap.set(wrapper, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });
      }
      if (img) {
        gsap.set(img, {
          scale: 1.15,
          yPercent: 10,
          filter: "opacity(0.6) contrast(0.85)",
        });
      }

      // ── MASTER CHOREOGRAPHED TIMELINE (Scrubbed by Scroll Playhead) ──
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // PHASE 01 & 08: Grid Line Draw + Initial Metadata Entry
      master
        .to(gridV, {
          scaleY: 1,
          stagger: 0.04,
          duration: 0.35,
          ease: "power3.inOut",
        })
        .to(
          gridH,
          {
            scaleX: 1,
            stagger: 0.04,
            duration: 0.35,
            ease: "power3.inOut",
          },
          "<0.05"
        )
        .to(
          meta,
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.45,
            ease: "power3.out",
          },
          "<0.05"
        )

        // PHASE 02 & 03: Image Reveal (Bottom → Top) + Scale & Contrast Settle
        .to(
          wrapper,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
            ease: "expo.out",
          },
          "-=0.15"
        )
        .to(
          img,
          {
            scale: 1.0,
            yPercent: 0,
            filter: "opacity(1) contrast(1)",
            duration: 0.85,
            ease: "power4.out",
          },
          "<"
        )

        // PHASE 04 & 05: Masked Heading Reveal + Micro-Tracking Refinement
        .to(
          headingLines,
          {
            yPercent: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .fromTo(
          headingLines,
          { letterSpacing: "0.02em" },
          {
            letterSpacing: "-0.025em",
            duration: 0.35,
            ease: "power2.out",
          },
          "<0.2"
        )

        // PHASE 07: Masked Supporting Text & Link Line Reveal
        .to(
          supportLines,
          {
            yPercent: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power4.out",
          },
          "-=0.25"
        )

        // PHASE 09: Divergent Scroll Parallax (Subtle Depth Hierarchy)
        .to(
          img,
          {
            yPercent: -10,
            ease: "none",
            duration: 1.0,
          },
          "parallax"
        )
        .to(
          section.querySelector(".first-scroll-heading"),
          {
            yPercent: -4,
            ease: "none",
            duration: 1.0,
          },
          "parallax"
        )
        .to(
          meta,
          {
            yPercent: -2,
            ease: "none",
            duration: 1.0,
          },
          "parallax"
        )
        .to(
          section.querySelector(".first-scroll-support"),
          {
            yPercent: -3,
            ease: "none",
            duration: 1.0,
          },
          "parallax"
        )

        // PHASE 10: Exit Transition (Controlled Receding Motion)
        .to(
          img,
          {
            scale: 1.03,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          headingLines,
          {
            y: -15,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          meta,
          {
            opacity: 0.4,
            y: -10,
            duration: 0.4,
            ease: "power2.inOut",
          },
          "<"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="first-scroll-section"
      className="relative w-full min-h-screen bg-[#050505] text-[#f0ede8] overflow-hidden"
      style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
    >
      {/* Subtle 1px vertical grid lines for PRODUX editorial framing (PHASE 08 Animated) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 px-6 md:px-12 lg:px-20 z-0">
        <div className="first-scroll-grid-v border-r border-white/[0.04] h-full" />
        <div className="first-scroll-grid-v border-r border-white/[0.04] h-full" />
        <div className="first-scroll-grid-v border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-32 flex flex-col justify-between min-h-screen">
        
        {/* ── 4-COLUMN EDITORIAL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMN 1: Metadata (Span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-white/[0.06] pb-8 lg:pb-0 lg:pr-8">
            <div className="first-scroll-meta">
              <div className="font-display font-light text-4xl lg:text-6xl text-white/30 mb-6">
                01
              </div>
              <div className="font-sans text-[10px] font-semibold tracking-[0.32em] uppercase text-white/40 mb-1">
                ABOUT
              </div>
              <div className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-white/25">
                XWEBSITEWALA
              </div>
            </div>

            <div className="first-scroll-meta first-scroll-grid-h mt-12 lg:mt-32 pt-6 border-t border-white/[0.06]">
              <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/30">
                EST. 2025 — RAJASTHAN, INDIA
              </div>
            </div>
          </div>

          {/* COLUMN 2 + 3: Primary Heading & Visual Focal Point (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            
            {/* Oversized Line-by-Line Masked Typography */}
            <h2 className="first-scroll-heading font-display uppercase tracking-tight">
              <span className="block overflow-hidden">
                <span className="first-scroll-heading-line block font-black text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.8rem] leading-[0.92] text-white">
                  WE BUILD
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="first-scroll-heading-line block font-black text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.8rem] leading-[0.92] text-white/45">
                  DIGITAL
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="first-scroll-heading-line block font-serif italic font-light text-4xl sm:text-6xl lg:text-[5.2rem] xl:text-[6.5rem] leading-[0.98] text-white lowercase">
                  experiences.
                </span>
              </span>
            </h2>

            {/* Primary Visual: Bottom-to-Top Clip-Path Reveal with Parallax */}
            <div
              ref={imageWrapperRef}
              className="relative w-full aspect-[21/9] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#0d0d0d] rounded-sm"
              style={{
                willChange: "clip-path",
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
            >
              <img
                ref={imageInnerRef}
                src="/assets/exhibit-wide.png"
                alt="XWEBSITEWALA Showcase"
                className="w-full h-[125%] -mt-[12.5%] object-cover object-center pointer-events-none select-none block"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>

          {/* COLUMN 4: Supporting Copy & Minimal Link (Span 3) */}
          <div className="first-scroll-support lg:col-span-3 lg:pl-6 flex flex-col justify-between h-full pt-4 lg:pt-0">
            <div className="flex flex-col gap-6">
              <span className="block overflow-hidden">
                <span className="first-scroll-support-line block font-sans text-xs sm:text-sm text-white/45 leading-relaxed tracking-wide max-w-prose">
                  A creative development studio from Rajasthan — building digital presences that move, breathe, and endure.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="first-scroll-support-line block font-sans text-xs sm:text-sm text-white/35 leading-relaxed tracking-wide max-w-prose">
                  We combine precision engineering with editorial aesthetics.
                </span>
              </span>
            </div>

            <div className="first-scroll-grid-h mt-10 lg:mt-24 pt-6 border-t border-white/[0.06]">
              <span className="block overflow-hidden">
                <span className="first-scroll-support-line block">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    <span>DISCOVER STUDIO</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-red-500">
                      →
                    </span>
                  </a>
                </span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom subtle editorial bar */}
        <div className="first-scroll-meta first-scroll-grid-h mt-16 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[9px] font-sans tracking-[0.25em] uppercase text-white/30">
          <span>01 / 01 — ARCHITECTURE</span>
          <span>PRODUX EDITORIAL FRAMEWORK</span>
        </div>

      </div>
    </section>
  );
}

export default FirstScrollSection;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneCanvas } from "../three/SceneCanvas";
import { HeroOverlay } from "../components/layout/HeroOverlay";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const sweepLayerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for the Three.js canvas
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !heroRef.current) return;

    // 1. Page Load Entry Animation
    const entryCtx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 2.2 },
      });

      // Start hidden
      gsap.set(["header", "#backdrop-wrapper"], { opacity: 0 });

      tl.fromTo(
        "#backdrop-wrapper",
        { scale: 0.97, opacity: 0 },
        { scale: 1.0, opacity: 1, delay: 0.3 }
      );

      tl.fromTo(
        "header",
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        "-=1.8"
      );
    });

    // 2. Scroll Trigger — Unified Hero pin + backdrop drift
    const scrollCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      if (backdropRef.current) {
        tl.to(backdropRef.current, {
          xPercent: -3,
          ease: "none",
        }, 0);
      }
    });

    // 3. Continuous red sweep illumination — light travelling through letters
    const sweepCtx = gsap.context(() => {
      const el = sweepLayerRef.current;
      if (!el) return;

      const sweepObj = { pos: -40 };

      gsap.to(sweepObj, {
        pos: 130,
        duration: 3.2,
        ease: "none",
        repeat: -1,
        repeatDelay: 1.0,
        onUpdate: () => {
          const p = sweepObj.pos;
          const leadEdge = p - 38;
          const brightStart = p;
          const brightEnd = p + 22;
          const trailEdge = p + 38;
          const g = `linear-gradient(90deg, transparent ${leadEdge}%, rgba(255,255,255,0.95) ${brightStart}%, rgba(255,255,255,0.95) ${brightEnd}%, transparent ${trailEdge}%)`;
          el.style.webkitMaskImage = g;
          el.style.maskImage = g;
        },
      });
    });

    return () => {
      entryCtx.revert();
      scrollCtx.revert();
      sweepCtx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black min-h-screen" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      {/* ── Pinned Hero Section ── */}
      <div
        ref={heroRef}
        id="hero-section"
        className="relative w-full h-screen overflow-hidden bg-black"
        style={{ maxWidth: "100vw", overflowX: "hidden" }}
      >
        {/* ──────────────────────────────────────────────────── */}
        {/* Layer 1: Massive XWEBSITEWALA background text       */}
        {/* Sits behind the 3D ring (z-index 0)                 */}
        {/* Two-layer: dim base + animated bright sweep overlay  */}
        {/* ──────────────────────────────────────────────────── */}
        <div
          id="backdrop-wrapper"
          ref={backdropRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          style={{ overflow: "hidden" }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>

            {/* Base layer — dark red outline, always present */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(28px, 16vw, 256px)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "transparent",
                WebkitTextStroke: "2px rgba(140, 0, 0, 0.55)",
                textShadow:
                  "0 0 50px rgba(180,0,0,0.32), 0 0 100px rgba(180,0,0,0.16)",
                whiteSpace: "nowrap",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              XWEBSITEWALA
            </div>

            {/* Sweep layer — bright red, mask animated by GSAP */}
            <div
              ref={sweepLayerRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(28px, 16vw, 256px)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "transparent",
                WebkitTextStroke: "2.5px rgb(255, 38, 38)",
                textShadow:
                  "0 0 12px rgba(255,30,30,1), 0 0 28px rgba(255,20,20,0.90), 0 0 56px rgba(255,0,0,0.72), 0 0 110px rgba(255,0,0,0.45)",
                whiteSpace: "nowrap",
                lineHeight: 1,
                userSelect: "none",
                // Initial mask — fully offscreen until GSAP starts
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent -50%, rgba(255,255,255,0.95) -30%, rgba(255,255,255,0.95) -15%, transparent 0%)",
                maskImage:
                  "linear-gradient(90deg, transparent -50%, rgba(255,255,255,0.95) -30%, rgba(255,255,255,0.95) -15%, transparent 0%)",
              }}
            >
              XWEBSITEWALA
            </div>

          </div>
        </div>

        {/* Layer 2: 3D OLED Ring — sits above background text */}
        <SceneCanvas scrollProgress={scrollProgress} />

        {/* Layer 3: Hero UI overlay */}
        <HeroOverlay />
      </div>
    </div>
  );
}

export default Home;

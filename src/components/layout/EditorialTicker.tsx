import { useEffect, useRef } from "react";

// ─── Content — matches reference image order ───────────────────────────────
const WORDS = [
  "UI / UX",
  "INTERACTIVE DESIGN",
  "XWEBSITEWALA",
  "WEB EXPERIENCES",
  "REACT",
  "THREE.JS",
  "GSAP",
  "WEBGL",
];

// ─── Speed ────────────────────────────────────────────────────────────────
// 24 px/sec — deliberate, editorial drift
const SPEED_PPS = 24;

// ─── Ticker Content — JSX so we can color the separators red ──────────────
function TickerContent() {
  return (
    <>
      {WORDS.map((word, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(9px, 0.88vw, 11px)",
              fontWeight: 400,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.52)",
              whiteSpace: "nowrap",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {word}
          </span>
          {/* Red em-dash separator */}
          <span
            style={{
              color: "rgba(200,18,18,0.78)",
              fontSize: "clamp(9px, 0.88vw, 11px)",
              fontWeight: 300,
              margin: "0 clamp(14px, 1.6vw, 22px)",
              whiteSpace: "nowrap",
            }}
          >
            —
          </span>
        </span>
      ))}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────
export function EditorialTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const rafRef = useRef<number>(0);
  const prevTRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const boot = () => {
      // scrollWidth = 2 copies, half = one loop unit
      const loopWidth = track.scrollWidth / 2;

      const step = (ts: number) => {
        if (!prevTRef.current) prevTRef.current = ts;
        const dt = Math.min((ts - prevTRef.current) / 1000, 0.05);
        prevTRef.current = ts;

        xRef.current -= SPEED_PPS * dt;
        if (xRef.current <= -loopWidth) xRef.current += loopWidth;

        // Compositor-only transform — zero layout cost
        track.style.transform = `translate3d(${xRef.current}px,0,0)`;
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(boot);
    return () => {
      cancelAnimationFrame(rafRef.current);
      prevTRef.current = 0;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        overflow: "hidden",
        paddingTop: "clamp(10px, 1.3vw, 16px)",
        paddingBottom: "clamp(10px, 1.3vw, 16px)",
        // Subtle red-tinted top and bottom lines — matching reference
        borderTop: "1px solid rgba(200,18,18,0.28)",
        borderBottom: "1px solid rgba(200,18,18,0.28)",
        position: "relative",
        // Fade at edges
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
      }}
    >
      {/* Inner track — two copies for seamless infinite loop */}
      <div
        ref={trackRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        {/* Copy A */}
        <TickerContent />
        {/* Copy B — mirrors A for stitch-free loop */}
        <TickerContent />
      </div>
    </div>
  );
}

export default EditorialTicker;

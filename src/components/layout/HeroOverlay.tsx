import { EditorialTicker } from "./EditorialTicker";

// No scrollProgress dependency — spotlight removed per reference (glow comes from background text)

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-20">

      {/* ── Top header ── */}
      {/* Brand left | Metadata right */}
      <header
        className="absolute top-0 left-0 w-full flex justify-between items-start pointer-events-auto"
        style={{
          padding: "clamp(20px, 3vw, 44px) clamp(24px, 4.5vw, 60px)",
          zIndex: 30,
        }}
      >
        {/* Brand — XWEB(white) SITE(red) WALA(white) */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(9px, 0.85vw, 12px)",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.82)" }}>XWEB</span>
          <span style={{ color: "rgba(220,28,28,0.95)" }}>SITE</span>
          <span style={{ color: "rgba(255,255,255,0.82)" }}>WALA</span>
        </div>

        {/* EST. 2025 | INDIA */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(9px, 0.85vw, 12px)",
            fontWeight: 400,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 1.8vw, 28px)",
            lineHeight: 1,
          }}
        >
          <span>EST. 2025</span>
          <span style={{ color: "rgba(255,255,255,0.18)" }}>|</span>
          <span>INDIA</span>
        </div>
      </header>

      {/* ── Buttons — lower right ── */}
      {/* VIEW WORK: solid red / LET'S TALK: transparent border */}
      <div
        className="absolute pointer-events-auto flex"
        style={{
          right: "clamp(24px, 4.5vw, 64px)",
          bottom: "clamp(58px, 10vw, 120px)",
          gap: "clamp(8px, 1vw, 12px)",
          zIndex: 30,
          alignItems: "center",
        }}
      >
        {/* VIEW WORK — solid red fill */}
        <button
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(8px, 0.78vw, 11px)",
            fontWeight: 600,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "#ffffff",
            background: "#cc1111",
            border: "1px solid #cc1111",
            padding: "clamp(10px, 1.2vw, 15px) clamp(18px, 2.2vw, 30px)",
            cursor: "pointer",
            transition: "background 0.22s ease, transform 0.22s ease",
            borderRadius: "2px",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e01515";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#cc1111";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          VIEW WORK
        </button>

        {/* LET'S TALK — transparent background, white border */}
        <button
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(8px, 0.78vw, 11px)",
            fontWeight: 600,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.50)",
            padding: "clamp(10px, 1.2vw, 15px) clamp(18px, 2.2vw, 30px)",
            cursor: "pointer",
            transition: "border-color 0.22s ease, color 0.22s ease, transform 0.22s ease",
            borderRadius: "2px",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.90)";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.50)";
            e.currentTarget.style.color = "rgba(255,255,255,0.85)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          LET'S TALK
        </button>
      </div>

      {/* ── Bottom editorial strip ── */}
      {/* Slim ticker with red separators, anchored at Hero bottom */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ pointerEvents: "none", zIndex: 25 }}
      >
        <EditorialTicker />
      </div>
    </div>
  );
}

export default HeroOverlay;

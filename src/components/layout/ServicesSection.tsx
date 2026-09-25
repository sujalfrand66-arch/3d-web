import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Service data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "01",
    name: "WEB DESIGN",
    category: "EDITORIAL & DIGITAL BRANDING",
    desc: "Bespoke digital architecture with custom visual identity and typography systems that establish distinct brand authority. Every decision is intentional.",
    tag: "FLAGSHIP",
  },
  {
    id: "02",
    name: "WEB DEVELOPMENT",
    category: "REACT, TYPESCRIPT & NEXT.JS",
    desc: "Scalable, high-performance web applications engineered for speed and precision.",
    tag: "CORE",
  },
  {
    id: "03",
    name: "UI / UX DESIGN",
    category: "USER INTERFACE & EXPERIENCE",
    desc: "Intuitive user flows crafted to turn visitors into loyal clients.",
    tag: "CORE",
  },
  {
    id: "04",
    name: "ANIMATED WEBSITES",
    category: "GSAP & THREE.JS MOTION",
    desc: "Fluid scroll choreography and interactive 3D web experiences.",
    tag: "MOTION",
  },
  {
    id: "05",
    name: "E-COMMERCE",
    category: "FLAGSHIP DIGITAL STORES",
    desc: "High-conversion online stores with seamless payment & interaction.",
    tag: "COMMERCE",
  },
  {
    id: "06",
    name: "CUSTOM WEB EXPERIENCES",
    category: "BESPOKE DIGITAL CRAFT",
    desc: "Tailor-made web solutions designed around complex client requirements.",
    tag: "BESPOKE",
  },
  {
    id: "07",
    name: "WEBSITE OPTIMIZATION",
    category: "SPEED & PERFORMANCE AUDIT",
    desc: "Core Web Vitals tuning, asset compression, and instant load speeds.",
    tag: "AUDIT",
  },
  {
    id: "08",
    name: "SUPPORT & MAINTENANCE",
    category: "ONGOING DIGITAL CARE",
    desc: "Continuous support, updates, and proactive maintenance for lasting performance.",
    tag: "SUPPORT",
  },
];

// ─── Abstract geometric SVG — white theme, black/red ─────────────────────────
function CraftSystemSVG() {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Subtle grid */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="500" y2={i * 50} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      ))}

      {/* Ghost background numeral */}
      <text
        x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
        fontFamily="'General Sans', sans-serif" fontWeight="900"
        fontSize="210" fill="rgba(0,0,0,0.03)" letterSpacing="-10"
      >
        05
      </text>

      {/* Outer rectangle frame */}
      <rect x="55" y="55" width="390" height="290" stroke="rgba(0,0,0,0.09)" strokeWidth="1" fill="none" />

      {/* Red accent top bar */}
      <rect x="55" y="55" width="100" height="3" fill="#dc2626" />

      {/* Inner frame */}
      <rect x="100" y="95" width="300" height="210" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none" />

      {/* Diagonals */}
      <line x1="55" y1="55" x2="445" y2="345" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
      <line x1="445" y1="55" x2="55" y2="345" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />

      {/* Center crosshair */}
      <line x1="250" y1="165" x2="250" y2="235" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <line x1="185" y1="200" x2="315" y2="200" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

      {/* Center orbit */}
      <circle cx="250" cy="200" r="42" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
      <circle cx="250" cy="200" r="6" fill="rgba(0,0,0,0.12)" />
      <circle cx="250" cy="200" r="2.5" fill="#dc2626" />

      {/* Orbital nodes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const cx = 250 + Math.cos(angle) * 42;
        const cy = 200 + Math.sin(angle) * 42;
        return <circle key={i} cx={cx} cy={cy} r="2.5" fill={i % 2 === 0 ? "#dc2626" : "rgba(0,0,0,0.18)"} />;
      })}

      {/* Corner registration marks */}
      <line x1="55" y1="75" x2="75" y2="75" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="55" y1="55" x2="55" y2="75" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="425" y1="75" x2="445" y2="75" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="445" y1="55" x2="445" y2="75" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="55" y1="325" x2="75" y2="325" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="55" y1="325" x2="55" y2="345" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="425" y1="325" x2="445" y2="325" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <line x1="445" y1="325" x2="445" y2="345" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />

      {/* Coordinate micro-labels */}
      <text x="58" y="90" fontFamily="monospace" fontSize="7" fill="rgba(0,0,0,0.2)" letterSpacing="1">X:0,0</text>
      <text x="418" y="90" fontFamily="monospace" fontSize="7" fill="rgba(0,0,0,0.2)" letterSpacing="1" textAnchor="end">X:1,0</text>
      <text x="58" y="342" fontFamily="monospace" fontSize="7" fill="rgba(220,38,38,0.5)" letterSpacing="1">R:SYS</text>

      {/* Red right accent bar */}
      <rect x="494" y="0" width="4" height="400" fill="#dc2626" opacity="0.5" />

      {/* Process line */}
      <line x1="90" y1="340" x2="410" y2="340" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      {[90, 170, 250, 330, 410].map((x, i) => (
        <circle key={i} cx={x} cy={340} r="3" fill={i === 0 ? "#dc2626" : "rgba(0,0,0,0.12)"} />
      ))}

      {/* Bottom label */}
      <text x="250" y="386" textAnchor="middle" fontFamily="'Satoshi', sans-serif"
        fontSize="7.5" fontWeight="700" fill="rgba(0,0,0,0.15)" letterSpacing="5"
      >
        DIGITAL CRAFT SYSTEM — XWEBSITEWALA
      </text>
    </svg>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const svgColRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [featuredHover, setFeaturedHover] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading masked reveal
      const lines = headingRef.current?.querySelectorAll(".s5-line");
      if (lines?.length) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 0.85, ease: "power3.out", stagger: 0.1,
            scrollTrigger: {
              trigger: section, start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Supporting text + SVG col entrance
      const metaEls = section.querySelectorAll(".s5-meta");
      if (metaEls.length) {
        gsap.fromTo(
          metaEls,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
            scrollTrigger: {
              trigger: section, start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // SVG visual slide in from right
      if (svgColRef.current) {
        gsap.fromTo(
          svgColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "expo.out",
            scrollTrigger: {
              trigger: section, start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Featured block clip-path reveal
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            opacity: 1, duration: 0.9, ease: "expo.out",
            scrollTrigger: {
              trigger: featuredRef.current, start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // List rows stagger reveal
      const validRows = listRowsRef.current.filter(Boolean);
      if (validRows.length) {
        gsap.fromTo(
          validRows,
          { opacity: 0, x: -24 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "expo.out", stagger: 0.07,
            scrollTrigger: {
              trigger: listRef.current, start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative w-full bg-white text-black select-none overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* ── TOP CHAPTER BAR ─────────────────────────────────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 pt-20 lg:pt-28">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-5 border-b border-black/8">
          <div className="font-sans text-[8.5px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-black/35 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
            05 / SERVICES
          </div>
          <div className="font-sans text-[8px] sm:text-[10px] tracking-[0.22em] uppercase text-black/25 font-medium">
            XWEBSITEWALA &mdash; CREATIVE CAPABILITIES
          </div>
        </div>
      </div>

      {/* ── HERO AREA: heading left + SVG right ─────────────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: oversized editorial heading */}
          <div ref={headingRef} className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <p className="s5-meta font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase text-red-600 mb-5">
                STUDIO SPECIALITIES
              </p>
              <h2 className="font-display font-black leading-[0.88] tracking-tight uppercase">
                <span className="block overflow-hidden">
                  <span className="s5-line block text-[13.5vw] sm:text-[10.5vw] lg:text-[8.8vw] xl:text-[8vw] text-black">
                    SERVICES &amp;
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="s5-line block text-[13.5vw] sm:text-[10.5vw] lg:text-[8.8vw] xl:text-[8vw] text-red-600">
                    CRAFT
                  </span>
                </span>
              </h2>
            </div>
            <div className="s5-meta max-w-sm">
              <p className="font-sans text-sm sm:text-base text-black/55 leading-relaxed font-light">
                Every service is a deliberate act of craft. We design, build, and animate digital presences that earn their audience — from first pixel to final deployment.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="block w-8 h-[1px] bg-red-600" />
                <span className="font-sans text-[9px] tracking-[0.32em] uppercase text-black/30 font-semibold">
                  8 CORE DISCIPLINES
                </span>
              </div>
            </div>
          </div>

          {/* Right: abstract SVG visual */}
          <div ref={svgColRef} className="lg:col-span-5 flex items-start justify-center lg:justify-end">
            <div className="w-full lg:max-w-sm aspect-[5/4] bg-black/[0.015] border border-black/6 overflow-hidden">
              <CraftSystemSVG />
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURED SERVICE BLOCK: 01 WEB DESIGN ───────────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 mt-14 lg:mt-20">
        <div className="max-w-7xl mx-auto">
          <div
            ref={featuredRef}
            onMouseEnter={() => setFeaturedHover(true)}
            onMouseLeave={() => setFeaturedHover(false)}
            className="group relative w-full border border-black/8 bg-black/[0.012] overflow-hidden cursor-pointer"
            style={{ willChange: "clip-path, opacity" }}
          >
            {/* Animated red top line on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

            <div className="p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
              {/* Left: service info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className={`font-display font-black text-5xl sm:text-6xl leading-none transition-colors duration-400 ${featuredHover ? "text-red-600/25" : "text-black/8"}`}
                  >
                    01
                  </span>
                  <div className="w-px h-8 bg-black/10" />
                  <span className="font-sans text-[8px] font-bold tracking-[0.35em] uppercase bg-red-600 text-white px-3 py-1">
                    FLAGSHIP
                  </span>
                </div>

                <h3
                  className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight uppercase leading-[0.92] transition-all duration-400 ${featuredHover ? "translate-x-3 text-black" : "text-black/80"}`}
                >
                  WEB DESIGN
                </h3>
                <div className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-black/35 mt-2">
                  EDITORIAL &amp; DIGITAL BRANDING
                </div>
                <p className="mt-5 font-sans text-sm sm:text-base text-black/55 leading-relaxed font-light max-w-xl">
                  Bespoke digital architecture with custom visual identity and typography systems that establish distinct brand authority. Every layout decision is intentional, every spacing choice purposeful.
                </p>
              </div>

              {/* Right: year + arrow */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-end gap-6 shrink-0">
                <div className="text-right">
                  <div className="font-display font-black text-4xl sm:text-5xl text-black/6">2026</div>
                  <div className="font-sans text-[8px] tracking-[0.25em] uppercase text-black/20 mt-1">EST.</div>
                </div>
                <span
                  className={`font-sans text-2xl font-bold text-red-600 transition-transform duration-300 ${featuredHover ? "translate-x-2" : ""}`}
                >
                  →
                </span>
              </div>
            </div>

            {/* Bottom micro-bar */}
            <div className="px-8 sm:px-10 lg:px-12 py-3.5 border-t border-black/5 flex justify-between items-center">
              <span className="font-sans text-[8px] tracking-[0.28em] uppercase text-black/18">
                BESPOKE ARCHITECTURE — ZERO TEMPLATES
              </span>
              <span
                className={`font-sans text-[8px] tracking-[0.22em] uppercase transition-colors duration-300 ${featuredHover ? "text-red-600" : "text-black/20"}`}
              >
                INQUIRE →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES LIST: 02–08 ─────────────────────────────────────────── */}
      <div ref={listRef} className="px-6 sm:px-12 lg:px-20 mt-8">
        <div className="max-w-7xl mx-auto">

          {/* List header */}
          <div className="flex items-center justify-between py-3.5 border-b border-black/6">
            <span className="font-sans text-[8px] tracking-[0.32em] uppercase text-black/25 font-bold">
              ADDITIONAL SERVICES
            </span>
            <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-black/15">
              02 — 08
            </span>
          </div>

          {/* Row per service */}
          {SERVICES.slice(1).map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { listRowsRef.current[idx] = el; }}
              onMouseEnter={() => setActiveRow(idx)}
              onMouseLeave={() => setActiveRow(null)}
              className="relative border-b border-black/[0.05] cursor-pointer"
            >
              {/* Red left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[2px] bg-red-600 transition-all duration-300 ${activeRow === idx ? "opacity-100" : "opacity-0"}`}
              />

              <div
                className={`py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 transition-all duration-300 ${activeRow === idx ? "pl-4" : "pl-0"}`}
              >
                {/* Number */}
                <div className="w-14 shrink-0">
                  <span
                    className={`font-display font-bold text-base sm:text-lg transition-colors duration-300 ${activeRow === idx ? "text-red-600" : "text-black/12"}`}
                  >
                    {item.id}
                  </span>
                </div>

                {/* Name + category */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight uppercase leading-tight transition-all duration-300 ${activeRow === idx ? "text-black translate-x-1" : "text-black/70"}`}
                  >
                    {item.name}
                  </h3>
                  <span className="font-sans text-[8px] sm:text-[9px] font-bold tracking-[0.28em] uppercase text-black/25 mt-0.5 block">
                    {item.category}
                  </span>
                </div>

                {/* Tag badge — desktop */}
                <div className="hidden sm:flex w-24 shrink-0 items-center">
                  <span
                    className={`font-sans text-[8px] font-bold tracking-[0.25em] uppercase px-2 py-1 border transition-all duration-300 ${activeRow === idx ? "border-red-400 text-red-600" : "border-black/8 text-black/20"}`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Description — desktop only */}
                <div className="hidden lg:block max-w-[280px] xl:max-w-xs shrink-0 mr-6">
                  <p className="font-sans text-[11px] sm:text-xs text-black/45 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="w-8 shrink-0 flex justify-end">
                  <span
                    className={`font-sans text-base font-bold text-red-600 transition-all duration-300 ${activeRow === idx ? "opacity-100 translate-x-1" : "opacity-0"}`}
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────── */}
      <div className="px-6 sm:px-12 lg:px-20 pb-20 lg:pb-28 mt-10 lg:mt-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.22em] uppercase text-black/22 pt-5 border-t border-black/6 gap-1">
            <span>XWEBSITEWALA &mdash; EXPERTISE</span>
            <span>SCROLL FOR PROCESS &#x2193;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROUND_CARDS = [
  {
    id: "01",
    title: "GLAMOUR MAKEOVER",
    category: "BEAUTY & LIFESTYLE",
    image: "/assets/ed-02.png",
    url: "https://glamourmakeover.com",
  },
  {
    id: "02",
    title: "MANTOLA CORPORATE",
    category: "CORPORATE IDENTITY",
    image: "/assets/exhibit-wide.png",
    url: "https://mantola.in",
  },
  {
    id: "03",
    title: "RAJWADA FURNISH",
    category: "E-COMMERCE FLAGSHIP",
    image: "/assets/showcase-screen-horizontal.png",
    url: "https://rajwadafurnish.com",
  },
  {
    id: "04",
    title: "SURATGARH PROPERTIES",
    category: "REAL ESTATE PORTAL",
    image: "/assets/horizontal-showcase.png",
    url: "https://suratgarhproperties.com",
  },
  {
    id: "05",
    title: "LUXURY INTERIORS",
    category: "ARCHITECTURAL DESIGN",
    image: "/assets/ed-01.png",
    url: "#",
  },
  {
    id: "06",
    title: "STUDIO PORTFOLIO",
    category: "CREATIVE DIRECTION",
    image: "/assets/ed-03.png",
    url: "#",
  },
];

const N_CARDS = ROUND_CARDS.length;
// Precompute static base angles around the continuous path loop
const BASE_ANGLES = ROUND_CARDS.map((_, i) => (i / N_CARDS) * 2 * Math.PI);

export function ApproachSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollProgressRef = useRef(0);
  const autoAngleRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;
    let halfW = 0;
    let halfH = 0;

    const updateGeometry = () => {
      const vW = window.innerWidth;
      const vH = window.innerHeight;
      cx = vW * 0.5;
      
      const isMobile = vW < 768;
      // Upper Semicircular Arc Center Y placement:
      cy = isMobile ? vH * 0.54 : vH * 0.65;

      // Compact radius for upper arc
      rx = isMobile ? Math.min(vW * 0.35, 145) : Math.min(vW * 0.36, 460);
      ry = isMobile ? Math.min(vH * 0.15, 100) : Math.min(vH * 0.26, 210);

      // Card width for landscape 16:9 thumbnail format
      const cardW = isMobile ? Math.min(vW * 0.36, 145) : Math.min(vW * 0.18, 225);
      halfW = cardW * 0.5;
      halfH = (cardW * (9 / 16) + 32) * 0.5;
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry, { passive: true });

    const validCards: HTMLDivElement[] = [];
    cardRefs.current.forEach((el) => {
      if (el) validCards.push(el);
    });
    const lastZIndex = new Array(validCards.length).fill(-1);

    // Continuous Upper Semicircular Arc Motion Update (synchronized with GSAP ticker)
    const updateArcPositions = () => {
      const scrollA = scrollProgressRef.current * Math.PI * 2.8;
      const autoA = autoAngleRef.current;

      for (let i = 0; i < validCards.length; i++) {
        const card = validCards[i];
        
        // base angle + continuous progress
        const rawAngle = BASE_ANGLES[i] + autoA + scrollA;
        
        // Normalize angle to [-PI, PI]
        const normAngle = Math.atan2(Math.sin(rawAngle), Math.cos(rawAngle));

        // Inverse theta so cards progress RIGHT (+theta) -> TOP/CENTER (0) -> LEFT (-theta)
        const theta = -normAngle;

        const sinVal = Math.sin(theta);
        const cosVal = Math.cos(theta);

        // Position ONLY on upper arc: x = cx + rx * sin(theta), y = cy - ry * cos(theta)
        const x = cx + rx * sinVal;
        const y = cy - ry * cosVal;

        // Tangential rotation along upper arc: TOP/CENTER = 0deg (upright), RIGHT = +clockwise, LEFT = -counter-clockwise
        const tilt = sinVal * 24;

        // Subtle depth scaling (top center = 1.00, lower sides = 0.94)
        const scale = 0.94 + 0.06 * Math.max(0, cosVal);

        // Smooth Opacity Fade at upper arc extremities (|theta| > 1.30 rad ~ 75deg)
        // Keeps the center and bottom area 100% EMPTY and clean!
        const absTheta = Math.abs(theta);
        let opacity = 1.0;
        if (absTheta > 1.30) {
          opacity = Math.max(0, 1.0 - (absTheta - 1.30) / 0.25);
        }

        // Z-Index ordering so center top cards sit above side cards
        const zIndex = Math.floor(20 + cosVal * 15);
        if (lastZIndex[i] !== zIndex) {
          card.style.zIndex = `${zIndex}`;
          lastZIndex[i] = zIndex;
        }

        const posX = (x - halfW).toFixed(2);
        const posY = (y - halfH).toFixed(2);
        const rot = tilt.toFixed(2);
        const sc = scale.toFixed(3);
        const op = opacity.toFixed(3);

        card.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rot}deg) scale(${sc})`;
        card.style.opacity = op;
      }
    };

    // Synchronize smooth continuous movement along upper arc with GSAP Ticker
    const onTickerUpdate = (_time: number, deltaTime: number) => {
      const deltaSec = Math.min(deltaTime / 1000, 0.1);
      autoAngleRef.current += deltaSec * 0.16; // smooth continuous traversal (~0.16 rad/sec)
      updateArcPositions();
    };

    gsap.ticker.add(onTickerUpdate);

    // ScrollTrigger Pinned Section — Progress tracking
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=350%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });
    }, section);

    return () => {
      gsap.ticker.remove(onTickerUpdate);
      ctx.revert();
      window.removeEventListener("resize", updateGeometry);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="approach-section"
      className="relative w-full h-screen overflow-hidden bg-[#7a0000] text-white"
    >
      {/* Top Header */}
      <div className="approach-header absolute top-0 left-0 w-full z-30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 md:px-16 lg:px-24 pt-4 sm:pt-8 pb-3 border-b border-white/15">
        <div className="approach-eyebrow font-sans text-[9px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/80">
          LUSUX WEB / SURATGARH, RAJASTHAN
        </div>
        <div className="approach-meta flex items-center gap-4 sm:gap-6 text-[8.5px] sm:text-[10px] font-sans tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/50">
          <span>04 / CIRCULAR SHOWCASE</span>
          <span>—</span>
          <span>CREATIVE WEB PORTFOLIO</span>
        </div>
      </div>

      {/* Background Editorial Headline (Breaths in the open center) */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 px-4 sm:px-6 md:px-16"
      >
        <h2 className="font-display font-black text-[10vw] sm:text-[8vw] lg:text-[7vw] leading-[0.92] tracking-tighter text-center uppercase">
          <div className="overflow-hidden py-1">
            <span className="line-inner block text-white">
              FAST MODERN
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="line-inner block text-white/35">
              WEBSITES FROM
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="line-inner block text-white">
              SURATGARH.
            </span>
          </div>
        </h2>
      </div>

      {/* Clean Upper Semicircular Arc Layer for 16:9 Project Cards */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        {ROUND_CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 select-none pointer-events-auto cursor-pointer"
            onClick={() => {
              if (card.url && card.url !== "#") {
                window.open(card.url, "_blank", "noopener,noreferrer");
              }
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="w-[135px] min-[400px]:w-[145px] sm:w-[195px] md:w-[215px] lg:w-[230px] overflow-hidden rounded-xl bg-[#0d0d0d] text-white border border-white/12 p-2 sm:p-2.5 shadow-2xl hover:scale-105 transition-transform duration-200"
              style={{
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              {/* 16:9 Landscape Website Preview Frame */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#161616]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-top block"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Card Label & Meta */}
              <div className="mt-1.5 flex justify-between items-center text-[7.5px] sm:text-[8.5px] font-sans tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white/60">
                <span className="font-bold text-white/90 truncate mr-1.5">
                  {card.title}
                </span>
                <span className="text-white/40 shrink-0">↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bar */}
      <div className="approach-footer-bar absolute bottom-0 left-0 w-full z-30 flex flex-col sm:flex-row justify-between items-center text-[8.5px] sm:text-[9px] font-sans tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/50 px-4 sm:px-6 md:px-16 lg:px-24 py-3 sm:py-6 border-t border-white/15 gap-1">
        <span>LUSUX WEB DEVELOPER — FOUNDED 2016</span>
        <span>SCROLL TO CONTINUE ↓</span>
      </div>
    </div>
  );
}

export default ApproachSection;


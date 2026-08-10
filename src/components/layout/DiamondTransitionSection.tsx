import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "WEB DEVELOPMENT",
    desc: "High-performance, responsive websites\nbuilt from scratch with clean code\nand modern architecture.",
  },
  {
    num: "02",
    title: "UI / UX DESIGN",
    desc: "Pixel-perfect interfaces designed\nfor clarity, conversion and strong\nuser experience.",
  },
  {
    num: "03",
    title: "SEO OPTIMIZATION",
    desc: "Technical SEO, on-page strategy\nand content optimization that\ndrives measurable growth.",
  },
  {
    num: "04",
    title: "ADVANCED INTEGRATIONS",
    desc: "Payment gateways, APIs, WhatsApp\nflows, CRMs and custom business\nintegrations.",
  },
  {
    num: "05",
    title: "BUSINESS WEBSITES",
    desc: "Complete online presence — from\nlanding pages to multi-page\ncorporate websites.",
  },
];

const TECH = [
  "REACT", "NEXT.JS", "THREE.JS", "GSAP",
  "TYPESCRIPT", "NODE.JS", "TAILWIND", "FIREBASE",
  "MONGODB", "MYSQL", "FIGMA", "AWS",
];

export function DiamondTransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const maskLayer = maskLayerRef.current;
    if (!section || !maskLayer) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".diamond-eyebrow");
      const meta = section.querySelector(".diamond-meta");
      const lines = headlineRef.current?.querySelectorAll(".line-inner");
      const imgBox = imageRef.current;
      const img = imgBox?.querySelector("img");
      const serviceItems = section.querySelectorAll(".service-item");
      const techPills = section.querySelectorAll(".tech-pill");
      const contactRow = section.querySelector(".contact-row");

      // Initial state: Mask layer clipped to small 4-point diamond at exact center
      gsap.set(maskLayer, {
        clipPath: "polygon(50% 48%, 52% 50%, 50% 52%, 48% 50%)",
      });

      // Initial state for content inside the mask layer
      if (lines) gsap.set(lines, { yPercent: 110, rotate: 2 });
      if (imgBox) gsap.set(imgBox, { clipPath: "inset(100% 0% 0% 0%)" });
      if (img) gsap.set(img, { scale: 1.15 });

      // ── MASTER PINNED SCROLLTIMELINE FOR CENTER DIAMOND MASK WIPE ──
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // PHASE 01-04: Center Diamond Expands from tiny to full-viewport wipe
      master.to(maskLayer, {
        clipPath: "polygon(50% -120%, 220% 50%, 50% 220%, -120% 50%)",
        duration: 1.4,
        ease: "power3.inOut",
      });

      // PHASE 05: Brief hold at full-screen coverage
      master.to({}, { duration: 0.3 });

      // PHASE 06: Eyebrow + Metadata reveal
      master.fromTo(
        [eyebrow, meta],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );

      // PHASE 07: Masked Headline reveal line-by-line
      if (lines) {
        master.to(
          lines,
          { yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.12, ease: "expo.out" },
          "-=0.2"
        );
      }

      // PHASE 08: Primary Image clip-path reveal
      if (imgBox && img) {
        master.to(imgBox, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "power4.out" }, "-=0.4");
        master.to(img, { scale: 1.0, duration: 1.2, ease: "power3.out" }, "<");
      }

      // PHASE 09: Service list items stagger reveal
      master.fromTo(
        serviceItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.5"
      );

      // PHASE 10: Tech pills + Contact row
      master.fromTo(
        techPills,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
        "-=0.3"
      );
      master.fromTo(
        contactRow,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="diamond-transition-section"
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      {/* Outer Dark Layer — Visible AROUND the expanding center diamond */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center px-6 md:px-12 py-8 pointer-events-none select-none">
        <div className="w-full flex justify-between text-[9px] font-sans tracking-[0.25em] uppercase text-white/25">
          <span>LUSUX WEB / SURATGARH</span>
          <span>CAPABILITIES // 02</span>
        </div>
        <div className="text-[10vw] font-display font-black text-white/5 uppercase leading-none tracking-tighter">
          LUSUX WEB
        </div>
        <div className="w-full flex justify-between text-[9px] font-sans tracking-[0.25em] uppercase text-white/25">
          <span>RAJASTHAN, INDIA</span>
          <span>SCROLL ↓</span>
        </div>
      </div>

      {/* Masked Layer — Revealed INSIDE expanding Center Diamond */}
      <div
        ref={maskLayerRef}
        className="absolute inset-0 w-full h-full bg-[#F7F7F4] text-[#111111] px-6 md:px-16 lg:px-24 py-8 lg:py-12 flex flex-col overflow-y-hidden"
        style={{ willChange: "clip-path" }}
      >
        {/* Header */}
        <div className="w-full max-w-[1700px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-black/10 z-30 shrink-0">
          <div className="diamond-eyebrow font-sans text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/70">
            LUSUX WEB / SURATGARH, RAJASTHAN
          </div>
          <div className="diamond-meta flex items-center gap-5 text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase text-black/45">
            <span>02 / SERVICES</span>
            <span>—</span>
            <span>WEB · DESIGN · SEO · INTEGRATIONS</span>
            <span>—</span>
            <span>FOUNDED 2016</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto items-start z-20 pt-6">

          {/* Left — Large Headline + Services List */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div ref={headlineRef} className="mb-6">
              <h2 className="font-display font-black text-[8vw] sm:text-[6vw] lg:text-[4.5vw] leading-[0.94] tracking-tighter text-[#111111] uppercase select-none">
                <div className="overflow-hidden py-0.5">
                  <span className="line-inner block">WE BUILD</span>
                </div>
                <div className="overflow-hidden py-0.5">
                  <span className="line-inner block text-black/38">FAST MODERN</span>
                </div>
                <div className="overflow-hidden py-0.5">
                  <span className="line-inner block">WEBSITES.</span>
                </div>
              </h2>
            </div>

            {/* Service List */}
            <div className="flex flex-col divide-y divide-black/10 border-t border-black/10">
              {SERVICES.map((s) => (
                <div key={s.num} className="service-item flex gap-5 py-3">
                  <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-black/35 uppercase mt-0.5 shrink-0">
                    {s.num}
                  </span>
                  <div>
                    <div className="font-sans text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#111111] mb-0.5">
                      {s.title}
                    </div>
                    <p className="font-sans text-[10px] sm:text-[11px] text-black/55 leading-relaxed whitespace-pre-line">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image + Tech Stack + Contact */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Editorial Widescreen Visual */}
            <div
              ref={imageRef}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-[3px] bg-[#e5e5e0] shadow-xl border border-black/8"
              style={{ willChange: "clip-path" }}
            >
              <img
                src="/assets/showcase-screen-horizontal.png"
                alt="Lusux Web — Portfolio Showcase"
                className="w-full h-[125%] -mt-[12.5%] object-cover object-center block"
                style={{ willChange: "transform" }}
              />
            </div>

            {/* Tech Stack Pills */}
            <div>
              <div className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-black/40 mb-2.5">
                TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="tech-pill px-3 py-1 bg-black/5 rounded-full text-[9px] font-sans font-bold tracking-[0.18em] uppercase text-black/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Row */}
            <div
              className="contact-row flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-black/10"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-black/40">
                  CONTACT
                </span>
                <span className="font-sans text-sm font-bold tracking-tight text-[#111111]">
                  +91 99838 53091
                </span>
                <span className="font-sans text-xs text-black/55">
                  +91 90247 91337 &middot; WhatsApp
                </span>
              </div>
              <div className="flex flex-col gap-0.5 sm:text-right">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-black/40">
                  COVERAGE
                </span>
                <span className="font-sans text-xs text-black/65 leading-snug">
                  Suratgarh · Hanumangarh<br />
                  Pilibanga · Bikaner
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-[1700px] mx-auto flex justify-between items-center text-[9px] font-sans tracking-[0.25em] uppercase text-black/35 pt-4 mt-auto border-t border-black/10 z-30 shrink-0">
          <span>LUSUX WEB DEVELOPER — SUJAL &amp; ANMOL FRAND</span>
          <span>SURATGARH, RAJASTHAN, INDIA — 2016 – 2026</span>
        </div>
      </div>
    </section>
  );
}

export default DiamondTransitionSection;

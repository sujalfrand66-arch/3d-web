/**
 * EditorialSection.tsx
 *
 * Rebuilt from scratch using real business content from XWEBSITEWALA
 * (Founders: Sujal Frand & Anmol Frand | 9+ Years | 150+ Projects | Suratgarh, Rajasthan).
 *
 * Cinematic Chapters:
 *   Chapter 01: THE FOUNDATION & BRAND POSITIONING (Sticky 120vh)
 *   Chapter 02: OUR DISCIPLINE / SERVICES MATRIX (Interactive sticky 150vh)
 *   Chapter 03: SELECTED WORK EXHIBITION (Dark canvas gallery, parallax scrub)
 *   Chapter 04: TECH MATRIX & PERFORMANCE CORE (High-tech precision grid)
 *   Chapter 05: THE COMMISSION / DIRECT ENGAGEMENT (Contact & Project Booking)
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Helper Components ────────────────────────────────────────────────────────

function LineReveal({
  lines,
  className = "",
  innerClass = "",
  style,
  innerStyle,
}: {
  lines: string[];
  className?: string;
  innerClass?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${className}`} style={style}>
          <span
            className={`block will-change-transform ${innerClass}`}
            style={{ transform: "translateY(105%)", ...innerStyle }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

// ─── Main Editorial Section Component ─────────────────────────────────────────

export function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProjectType, setSelectedProjectType] = useState("Business Website");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const EXPO = "expo.out";
    const PWR4 = "power4.out";
    const EXPOIN = "expo.inOut";

    const ctx = gsap.context(() => {
      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 01 — BRAND POSITIONING & ARCHITECTURE (Sticky 120vh)
      // Image first -> Pause -> Heading second -> Pause
      // ══════════════════════════════════════════════════════════════════════
      gsap.set(".c01-img-wrap", { clipPath: "inset(0 100% 0 0)", willChange: "clip-path" });
      gsap.set(".c01-img-inner", { scale: 1.15, willChange: "transform" });
      gsap.set(".c01-heading .ln", { yPercent: 105, willChange: "transform" });
      gsap.set(".c01-badge", { opacity: 0, y: 15 });
      gsap.set(".c01-meta", { opacity: 0 });

      const tl01 = gsap.timeline({ paused: true });

      // Step 1: Image wipes in horizontally (0% -> 40%)
      tl01.to(".c01-img-wrap", {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.0,
        ease: EXPOIN,
      });
      tl01.to(".c01-img-inner", {
        scale: 1.0,
        duration: 1.4,
        ease: PWR4,
      }, "<");

      // Step 2: Pause (40% -> 55%)
      tl01.to({}, { duration: 0.45 });

      // Step 3: Typography reveals line by line (55% -> 82%)
      tl01.to(".c01-heading .ln", {
        yPercent: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: PWR4,
      });
      tl01.to(".c01-badge", {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: EXPO,
      }, "-=0.4");

      // Step 4: Metadata & Stats reveal (82% -> 92%)
      tl01.to(".c01-meta", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Step 5: Final Pause (92% -> 100%)
      tl01.to({}, { duration: 0.35 });

      ScrollTrigger.create({
        trigger: "#chapter-01",
        start: "top top",
        end: "+=120vh",
        pin: true,
        pinSpacing: true,
        scrub: 1.8,
        animation: tl01,
      });

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 02 — OUR DISCIPLINE / SERVICES MATRIX (Scroll 150vh)
      // ══════════════════════════════════════════════════════════════════════
      gsap.set(".c02-title .ln", { yPercent: 105, willChange: "transform" });
      gsap.set(".c02-service-item", { opacity: 0, y: 30 });
      gsap.set(".c02-img-wrap", { clipPath: "inset(100% 0 0 0)", willChange: "clip-path" });
      gsap.set(".c02-img-inner", { scale: 1.1, willChange: "transform" });

      // Title reveal
      gsap.timeline({
        scrollTrigger: {
          trigger: "#chapter-02",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }).to(".c02-title .ln", {
        yPercent: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: EXPO,
      });

      // Image reveal
      gsap.timeline({
        scrollTrigger: {
          trigger: ".c02-img-wrap",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
        .to(".c02-img-wrap", { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: EXPOIN })
        .to(".c02-img-inner", { scale: 1.0, duration: 2.0, ease: PWR4 }, "<");

      // Staggered list items reveal
      gsap.timeline({
        scrollTrigger: {
          trigger: ".c02-services-list",
          start: "top 78%",
          toggleActions: "play none none none",
        },
      }).to(".c02-service-item", {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1.0,
        ease: PWR4,
      });

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 03 — SELECTED WORK EXHIBITION (Dark Gallery & Parallax)
      // ══════════════════════════════════════════════════════════════════════
      gsap.set(".c03-header .ln", { yPercent: 105, willChange: "transform" });
      gsap.set(".c03-card-wrap", { clipPath: "inset(0 0 100% 0)", willChange: "clip-path" });
      gsap.set(".c03-card-img", { scale: 1.12, willChange: "transform" });

      // Header reveal
      gsap.timeline({
        scrollTrigger: {
          trigger: "#chapter-03",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }).to(".c03-header .ln", {
        yPercent: 0,
        stagger: 0.1,
        duration: 1.4,
        ease: EXPO,
      });

      // Cards reveal with staggered clip-path
      const cards = gsap.utils.toArray<HTMLElement>(".c03-card");
      cards.forEach((card) => {
        const wrap = card.querySelector(".c03-card-wrap");
        const img = card.querySelector(".c03-card-img");

        if (wrap && img) {
          gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          })
            .to(wrap, { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: EXPOIN })
            .to(img, { scale: 1.0, duration: 1.8, ease: PWR4 }, "<");

          // Parallax movement
          gsap.to(img, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
            yPercent: 8,
            ease: "none",
          });
        }
      });

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 04 — TECH MATRIX & PERFORMANCE CORE
      // ══════════════════════════════════════════════════════════════════════
      gsap.set(".c04-title .ln", { yPercent: 105, willChange: "transform" });
      gsap.set(".c04-tech-card", { opacity: 0, y: 25 });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#chapter-04",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }).to(".c04-title .ln", {
        yPercent: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: EXPO,
      }).to(".c04-tech-card", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: PWR4,
      }, "-=0.6");

      // ══════════════════════════════════════════════════════════════════════
      // CHAPTER 05 — THE COMMISSION & DIRECT ENGAGEMENT (CONTACT)
      // ══════════════════════════════════════════════════════════════════════
      gsap.set(".c05-title .ln", { yPercent: 105, willChange: "transform" });
      gsap.set(".c05-content", { opacity: 0, y: 20 });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#chapter-05",
          start: "top 78%",
          toggleActions: "play none none none",
        },
      })
        .to(".c05-title .ln", {
          yPercent: 0,
          stagger: 0.12,
          duration: 1.4,
          ease: EXPO,
        })
        .to(".c05-content", {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: PWR4,
        }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Design Tokens
  const PAPER = "#F5F4F0";
  const DARK = "#0A0A0A";
  const DARK_CARD = "#121212";
  const TEXT_DARK = "#111111";
  const TEXT_MUTED = "rgba(17,17,17,0.42)";
  const LABEL_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "9px",
    letterSpacing: "0.44em",
    textTransform: "uppercase",
  };

  const servicesData = [
    {
      num: "01",
      title: "Website Development",
      desc: "High-performance, responsive websites built from scratch with clean code, React, Next.js, and modern digital architecture.",
      tags: ["React 19", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      num: "02",
      title: "UI / UX Architecture",
      desc: "Pixel-perfect interfaces designed for clarity, luxury conversion, and an unforgettable spatial user experience.",
      tags: ["Figma", "Digital Design", "Design Systems", "Prototyping"],
    },
    {
      num: "03",
      title: "SEO & Performance Engineering",
      desc: "Technical SEO, search strategies, sub-100ms performance tuning, and content optimization to dominate Google search results.",
      tags: ["Technical SEO", "Lighthouse 100", "Schema Markup", "Local SEO"],
    },
    {
      num: "04",
      title: "Advanced Systems & Integrations",
      desc: "Payment gateways, custom REST/GraphQL APIs, WhatsApp automation flows, CRMs — wiring your web app seamlessly to your business.",
      tags: ["Node.js", "Payment APIs", "WhatsApp API", "CRMs"],
    },
    {
      num: "05",
      title: "E-Commerce & Corporate Platforms",
      desc: "Complete digital flagships for modern enterprises — built for speed, international scale, and seamless client transactions.",
      tags: ["Custom E-Com", "Corporate Sites", "Database Systems", "Firebase"],
    },
  ];

  const projectsData = [
    {
      num: "01",
      title: "Glamour Makeover",
      category: "Beauty & Lifestyle Platform",
      img: "/assets/cube2.png",
      year: "2025",
      desc: "High-fashion luxury lifestyle portal with custom booking flows and fluid animations.",
    },
    {
      num: "02",
      title: "Mantola Corporate",
      category: "Corporate Brand Identity",
      img: "/assets/proj-04.png",
      year: "2025",
      desc: "Minimalist corporate digital presence built with high-contrast typography and WebGL interactive elements.",
    },
    {
      num: "03",
      title: "Rajwada Furnish",
      category: "E-Commerce Flagship",
      img: "/assets/cube3.png",
      year: "2024",
      desc: "Luxury furniture e-commerce experience showcasing artisan craftsmanship with smooth product showcases.",
    },
    {
      num: "04",
      title: "Suratgarh Properties",
      category: "Real Estate Platform",
      img: "/assets/cube1.png",
      year: "2024",
      desc: "Architectural real estate portal with interactive map filtering, virtual tours, and instant agent messaging.",
    },
  ];

  const techStack = [
    { category: "Frontend Core", items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Lenis"] },
    { category: "Backend & APIs", items: ["Node.js", "Python", "Java", "PHP", "GraphQL", "REST APIs"] },
    { category: "Databases & Cloud", items: ["MongoDB", "MySQL", "Firebase", "Redis", "Docker", "AWS", "Linux"] },
    { category: "Design & Workflow", items: ["Figma", "Git", "CI/CD", "Vite", "Lighthouse 100/100"] },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="cinematic-experience"
      className="relative w-full overflow-x-hidden"
      style={{ background: PAPER, color: TEXT_DARK }}
    >
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CHAPTER 01 — BRAND POSITIONING & ARCHITECTURE                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        id="chapter-01"
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", background: PAPER }}
      >
        {/* Project Screenshot Showcase (Right side) */}
        <div
          className="c01-img-wrap absolute top-0 right-0 bottom-0"
          style={{
            width: "min(72vw, 100%)",
            clipPath: "inset(0 100% 0 0)",
            overflow: "hidden",
          }}
        >
          <div
            className="c01-img-inner w-full h-full"
            style={{ transform: "scale(1.15)" }}
          >
            <img
              src="/assets/cube2.png"
              alt="XWEBSITEWALA Web Design and Development Showcase"
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
        </div>

        {/* Small Eyebrow Label (Top-Left) */}
        <div
          className="c01-badge absolute flex items-center gap-3"
          style={{ top: "6vh", left: "5vw" }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span style={{ ...LABEL_STYLE, color: TEXT_MUTED }}>
            XWEBSITEWALA &nbsp;·&nbsp; EST. 2016
          </span>
        </div>

        {/* Main Editorial Headline Overlapping Image */}
        <div
          className="c01-heading absolute"
          style={{ bottom: "10vh", left: "5vw", right: 0, zIndex: 20 }}
        >
          <span className="block overflow-hidden">
            <span
              className="ln block will-change-transform"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.0rem, 8.5vw, 14rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: TEXT_DARK,
                transform: "translateY(105%)",
              }}
            >
              WE BUILD WEBSITES
            </span>
          </span>
          <span className="block overflow-hidden" style={{ paddingLeft: "clamp(2vw, 16vw, 16vw)" }}>
            <span
              className="ln block will-change-transform"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 8.0vw, 13rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: TEXT_DARK,
                transform: "translateY(105%)",
              }}
            >
              That Grow Your Business.
            </span>
          </span>
        </div>

        {/* Bottom Metadata & Track Record */}
        <div
          className="c01-meta absolute flex items-center gap-10"
          style={{ bottom: "4.5vh", left: "5vw" }}
        >
          <span style={{ ...LABEL_STYLE, color: "rgba(17,17,17,0.55)" }}>
            SUJAL FRAND & ANMOL FRAND &nbsp;·&nbsp; SURATGARH, RAJASTHAN
          </span>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono opacity-60">
            <span>9+ YEARS EXP</span>
            <span>150+ PROJECTS</span>
            <span>100% SATISFACTION</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CHAPTER 02 — OUR DISCIPLINE / SERVICES MATRIX                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        id="chapter-02"
        className="relative w-full"
        style={{ minHeight: "150vh", background: PAPER, paddingTop: "14vh", paddingBottom: "14vh" }}
      >
        <div className="px-6 md:px-16 xl:px-24">
          {/* Header */}
          <div className="c02-title mb-16">
            <span style={{ ...LABEL_STYLE, color: TEXT_MUTED }} className="block mb-4">
              CHAPTER 02 &nbsp;/&nbsp; OUR DISCIPLINE
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(3rem, 7.5vw, 10rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            >
              <LineReveal lines={["WE BUILD EXPERIENCES,", "NOT JUST WEBSITES."]} innerClass="ln" />
            </h2>
          </div>

          {/* Grid Layout: Left Sticky Image + Right Interactive List */}
          <div className="grid grid-cols-1 lg:grid-cols-[42vw_1fr] gap-12 lg:gap-20 items-start">
            {/* Left Image Showcase */}
            <div className="relative">
              <div
                className="c02-img-wrap"
                style={{
                  clipPath: "inset(100% 0 0 0)",
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                }}
              >
                <div
                  className="c02-img-inner w-full h-full"
                  style={{ transform: "scale(1.1)" }}
                >
                  <img
                    src="/assets/cube3.png"
                    alt="Services Architectural Showcase"
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>
              </div>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase opacity-40">
                XWEBSITEWALA DIGITAL ARCHITECTURE — SURATGARH, INDIA
              </p>
            </div>

            {/* Right Services List */}
            <div className="c02-services-list flex flex-col divide-y divide-black/10">
              {servicesData.map((service, i) => (
                <div
                  key={i}
                  className="c02-service-item py-8 first:pt-0 group cursor-pointer transition-colors duration-300"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-black transition-colors">
                      {service.num}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-neutral-400 group-hover:translate-x-1 transition-transform">
                      Explore &rarr;
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: "clamp(1.4rem, 2.5vw, 2.8rem)",
                      letterSpacing: "-0.02em",
                    }}
                    className="mb-3 group-hover:text-neutral-700 transition-colors"
                  >
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-neutral-600 mb-4 max-w-xl">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-black/5 text-neutral-700 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CHAPTER 03 — SELECTED WORK EXHIBITION (Dark Canvas Gallery)        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        id="chapter-03"
        className="relative w-full"
        style={{ background: DARK, color: "#F5F4F0", paddingTop: "16vh", paddingBottom: "16vh" }}
      >
        <div className="px-6 md:px-16 xl:px-24">
          {/* Header */}
          <div className="c03-header mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
              <span style={{ ...LABEL_STYLE, color: "rgba(245,244,240,0.38)" }} className="block mb-4">
                CHAPTER 03 &nbsp;/&nbsp; SELECTED WORK ARCHIVE
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 8vw, 11rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                }}
              >
                <LineReveal lines={["MUSEUM OF", "DIGITAL CRAFT"]} innerClass="ln" />
              </h2>
            </div>
            <div className="max-w-xs text-xs leading-relaxed text-white/50">
              A curated selection of 150+ delivered platforms across Suratgarh, Hanumangarh, Bikaner, and global markets.
            </div>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {projectsData.map((proj, i) => (
              <div
                key={i}
                className={`c03-card relative flex flex-col ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3">
                  <span>{proj.num} // {proj.category}</span>
                  <span>{proj.year}</span>
                </div>

                <div
                  className="c03-card-wrap mb-6"
                  style={{
                    clipPath: "inset(0 0 100% 0)",
                    overflow: "hidden",
                    aspectRatio: "16 / 10",
                    background: DARK_CARD,
                  }}
                >
                  <div
                    className="c03-card-img w-full h-full"
                    style={{ transform: "scale(1.12)" }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="w-full h-full object-cover object-center"
                      draggable={false}
                    />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 3.8vw, 4.5rem)",
                    fontStyle: "italic",
                    lineHeight: 1.0,
                  }}
                  className="mb-2 text-white/95"
                >
                  {proj.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed max-w-md">
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CHAPTER 04 — TECH MATRIX & PERFORMANCE CORE                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        id="chapter-04"
        className="relative w-full"
        style={{ background: PAPER, paddingTop: "14vh", paddingBottom: "14vh" }}
      >
        <div className="px-6 md:px-16 xl:px-24">
          <div className="c04-title mb-16">
            <span style={{ ...LABEL_STYLE, color: TEXT_MUTED }} className="block mb-4">
              CHAPTER 04 &nbsp;/&nbsp; ENGINEERING & PERFORMANCE CORE
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 7vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            >
              <LineReveal lines={["MODERN STACK.", "PRECISION ENGINE."]} innerClass="ln" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="c04-tech-card p-8 border border-black/10 bg-white/40 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-6">
                    0{i + 1} // {tech.category}
                  </span>
                  <ul className="space-y-3">
                    {tech.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm font-semibold tracking-tight text-neutral-800 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-black/5 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                  Verified Engine
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CHAPTER 05 — THE COMMISSION & DIRECT ENGAGEMENT (CONTACT)          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        id="chapter-05"
        className="relative w-full"
        style={{ background: DARK, color: "#F5F4F0", paddingTop: "16vh", paddingBottom: "16vh" }}
      >
        <div className="px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Info Column */}
            <div>
              <div className="c05-title mb-10">
                <span style={{ ...LABEL_STYLE, color: "rgba(245,244,240,0.38)" }} className="block mb-4">
                  CHAPTER 05 &nbsp;/&nbsp; START A PROJECT
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(3.5rem, 8.5vw, 11rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <LineReveal lines={["Let's Build", "Something", "Powerful."]} innerClass="ln" />
                </h2>
              </div>

              <div className="c05-content space-y-8 text-white/70">
                <p className="text-sm leading-relaxed max-w-md">
                  Ready to transform your digital presence? Reach out directly to Sujal Frand & Anmol Frand. We consult, design, and code custom digital solutions for ambitious brands.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 w-24">Phone</span>
                    <div className="flex flex-col">
                      <a href="tel:+919983853091" className="text-sm hover:text-white transition-colors font-mono">
                        +91 99838 53091
                      </a>
                      <a href="tel:+919024791337" className="text-sm hover:text-white transition-colors font-mono">
                        +91 90247 91337
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 w-24">WhatsApp</span>
                    <a
                      href="https://wa.me/919024791337"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors font-mono underline decoration-emerald-500/50 underline-offset-4"
                    >
                      +91 90247 91337 &rarr;
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 w-24">Studio</span>
                    <span className="text-sm text-white/80">
                      Suratgarh, Hanumangarh, Pilibanga & Bikaner, Rajasthan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="c05-content bg-white/5 border border-white/10 p-8 md:p-12 rounded-none backdrop-blur-md">
              <h3 className="text-xl font-bold tracking-tight text-white mb-6">
                Book an Appointment / Project Brief
              </h3>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm rounded">
                  Thank you! Your message has been received. Sujal & Anmol will respond within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Business Website",
                        "E-Commerce Store",
                        "Web Application",
                        "Website Redesign",
                      ].map((t, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedProjectType(t)}
                          className={`px-3 py-2 text-xs border text-left transition-all ${
                            selectedProjectType === t
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                      Phone Number / Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your project goals..."
                      className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-black font-semibold text-xs uppercase tracking-[0.25em] hover:bg-neutral-200 transition-colors"
                  >
                    Submit Project Brief &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-white/40 gap-4">
            <div>&copy; {new Date().getFullYear()} XWEBSITEWALA. All rights reserved.</div>
            <div>Crafted with precision in Suratgarh, Rajasthan</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorialSection;

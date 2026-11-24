import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  year: string;
  image: string;
  url: string;
}

export const CATEGORIES = ["All", "E-commerce", "Business", "Portfolio", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "SURATGARH PROPERTIES",
    category: "REAL ESTATE PORTAL",
    filterCategory: "Business",
    year: "2026",
    image: "/assets/projects/suratgarh-properties.webp",
    url: "https://suratgarhproperties.shop/",
  },
  {
    id: "02",
    title: "GLAMOUR MAKEOVER",
    category: "BEAUTY & LIFESTYLE",
    filterCategory: "Portfolio",
    year: "2026",
    image: "/assets/projects/glamour-makeover.webp",
    url: "https://glamourmakeover.in/",
  },
  {
    id: "03",
    title: "MEGHNA MOTORS",
    category: "AUTOMOTIVE DEALERSHIP",
    filterCategory: "Business",
    year: "2026",
    image: "/assets/projects/meghna-motors.webp",
    url: "https://meghnamotors.online/",
  },
  {
    id: "04",
    title: "PARMARTH MEDICOSE",
    category: "PHARMACY & HEALTHCARE",
    filterCategory: "Other",
    year: "2025",
    image: "/assets/projects/parmarth-medicose.webp",
    url: "https://parmarthmedicose.store/",
  },
  {
    id: "05",
    title: "RAJWADA FURNISH",
    category: "LUXURY FURNITURE & DECOR",
    filterCategory: "Business",
    year: "2025",
    image: "/assets/projects/rajwada-furnish.webp",
    url: "https://www.rajwadafurnish.com/",
  },
  {
    id: "06",
    title: "CHAWLA SILK STORE",
    category: "ETHNIC WEAR & SILKS",
    filterCategory: "E-commerce",
    year: "2025",
    image: "/assets/projects/chawla-silk-store.webp",
    url: "https://chawlasilkstore.com/",
  },
  {
    id: "07",
    title: "GROSHINE CONSULTANTS",
    category: "BUSINESS & CONSULTING",
    filterCategory: "Business",
    year: "2025",
    image: "/assets/projects/groshine-consultants.webp",
    url: "https://groshineconsultants.com/",
  },
  {
    id: "08",
    title: "MANTOLA OF MOTORS",
    category: "AUTOMOTIVE CARE & SERVICES",
    filterCategory: "Other",
    year: "2025",
    image: "/assets/projects/mantola-motors.webp",
    url: "https://mantola.in/",
  },
  {
    id: "09",
    title: "KANHA SAREE",
    category: "ETHNIC WEAR & SILKS",
    filterCategory: "E-commerce",
    year: "2026",
    image: "/assets/projects/kanha-saree.webp",
    url: "https://kanhasaree.in/",
  },
  {
    id: "10",
    title: "ROOP SHREE UDAIPUR",
    category: "BRIDAL & COUTURE BOUTIQUE",
    filterCategory: "E-commerce",
    year: "2026",
    image: "/assets/projects/roop-shree-udaipur.webp",
    url: "https://roopshreeudaipur.com/",
  },
  {
    id: "11",
    title: "NIRMAL BOUTIQUE",
    category: "DESIGNER WEAR & BOUTIQUE",
    filterCategory: "E-commerce",
    year: "2026",
    image: "/assets/projects/nirmal-boutique.webp",
    url: "https://nirmalboutique.com/",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((proj) => proj.filterCategory === activeCategory);
  }, [activeCategory]);

  const filteredProjectsRef = useRef(filteredProjects);
  filteredProjectsRef.current = filteredProjects;

  const currentProgressRef = useRef(0);
  const updateCardPositionsRef = useRef<((progress: number) => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pathEl = pathRef.current;
    if (!section || !pathEl) return;

    const ctx = gsap.context(() => {
      const bgText = section.querySelector<HTMLElement>(".projects-bg-text");
      const brand = section.querySelector(".projects-brand");
      const nav = section.querySelector(".projects-nav");
      const intro = section.querySelector(".projects-intro");

      const totalLength = pathEl.getTotalLength();

      let svgWidth = section.offsetWidth || window.innerWidth;
      let svgHeight = section.offsetHeight || window.innerHeight;

      const updateDimensions = () => {
        if (section) {
          svgWidth = section.offsetWidth || window.innerWidth;
          svgHeight = section.offsetHeight || window.innerHeight;
        }
      };
      updateDimensions();
      window.addEventListener("resize", updateDimensions, { passive: true });

      // ── CARD POSITION UPDATE — direct style writes, zero tween allocation ──
      const updateCardPositions = (progress: number) => {
        const list = filteredProjectsRef.current;
        const numCards = list.length;
        if (numCards === 0) return;

        const spacing = totalLength / (numCards > 6 ? 3.2 : 2.5);
        const travelDistance = progress * (totalLength + spacing * (numCards + 1));
        const scaleX = svgWidth / 1400;
        const scaleY = svgHeight / 800;

        list.forEach((_, idx) => {
          const card = cardRefs.current[idx];
          const dot = dotRefs.current[idx];
          if (!card || !dot) return;

          const cardDistance = (totalLength + spacing * 0.4) - travelDistance + idx * spacing;
          const clampedDistance = Math.max(0, Math.min(totalLength, cardDistance));
          const point = pathEl.getPointAtLength(clampedDistance);

          const aheadDist = Math.max(0, Math.min(totalLength, clampedDistance - 6));
          const aheadPoint = pathEl.getPointAtLength(aheadDist);
          const dx = (aheadPoint.x - point.x) * scaleX;
          const dy = (aheadPoint.y - point.y) * scaleY;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const tilt = Math.max(-14, Math.min(14, angle * 0.28));

          const realX = point.x * scaleX;
          const realY = point.y * scaleY;

          const halfW = (card.offsetWidth || (window.innerWidth < 768 ? 130 : 270)) * 0.5;
          const halfH = (card.offsetHeight || (window.innerWidth < 768 ? 90 : 180)) * 0.5;

          const isVisible = cardDistance > -spacing * 0.4 && cardDistance < totalLength + spacing * 0.4;
          const opacity = isVisible
            ? Math.min(1, Math.max(0, (cardDistance < 120 ? cardDistance / 120 : (totalLength - cardDistance) / 120)))
            : 0;

          const waveHeight = (realY - 120) / (svgHeight || 800);
          const scale = 0.94 + waveHeight * 0.12;

          card.style.transform = `translate3d(${realX - halfW}px, ${realY - halfH}px, 0) rotate(${tilt}deg) scale(${scale})`;
          card.style.opacity = `${opacity}`;
          card.style.zIndex = `${Math.floor(20 + waveHeight * 20)}`;

          dot.style.transform = `translate3d(${realX - 4}px, ${realY - 4}px, 0)`;
          dot.style.opacity = `${opacity * 0.8}`;
        });
      };

      updateCardPositionsRef.current = updateCardPositions;

      // Header entrance (fires once on scroll into view, not per-frame)
      gsap.fromTo(
        [brand, nav, intro],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );

      // ── BGTEXT SCALE — scrubbed timeline ──
      if (bgText) {
        gsap.fromTo(
          bgText,
          { scale: 1.0 },
          {
            scale: 0.38,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=" + (520 * 0.40) + "%",
              scrub: 1.5,
            },
          }
        );
        gsap.fromTo(
          bgText,
          { scale: 0.38 },
          {
            scale: 1.0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "+=" + (520 * 0.75) + "%",
              end: "+=" + (520 * 0.88) + "%",
              scrub: 1.5,
            },
          }
        );
      }

      // ── SECTION BG COLOR TRANSITION — scrubbed timeline (WHITE → RED) ──
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=520%",
          scrub: true,
        },
      })
        .to(section, { backgroundColor: "#F2F2F0", color: "#000000", duration: 0.35, ease: "none" }, 0)
        .to(section, { backgroundColor: "#b82424", color: "#ffffff", duration: 0.35, ease: "power1.inOut" }, 0.35)
        .to(section, { backgroundColor: "#7a0000", color: "#ffffff", duration: 0.30, ease: "power1.inOut" }, 0.70);

      // ── BGTEXT COLOR TRANSITION — scrubbed, synced with bg ──
      if (bgText) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=520%",
            scrub: true,
          },
        })
          .to(bgText, { color: "rgba(0,0,0,0.95)", duration: 0.35, ease: "none" }, 0)
          .to(bgText, { color: "rgba(255,255,255,0.30)", duration: 0.35, ease: "power1.inOut" }, 0.35)
          .to(bgText, { color: "rgba(255,255,255,0.20)", duration: 0.30, ease: "power1.inOut" }, 0.70);
      }

      // ── MASTER PIN + CARD TRAVERSAL ──
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=520%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          currentProgressRef.current = self.progress;
          updateCardPositions(self.progress);
        },
      });

      scrollTriggerRef.current = st;

      // Set initial positions
      updateCardPositions(0);
    }, section);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  // Update card positions immediately whenever filteredProjects changes
  useLayoutEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filteredProjects.length);
    dotRefs.current = dotRefs.current.slice(0, filteredProjects.length);

    if (updateCardPositionsRef.current) {
      updateCardPositionsRef.current(currentProgressRef.current);
    }
  }, [filteredProjects]);

  // Custom Cursor Mouse Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseEnter = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleCardMouseLeave = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.7,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const scrollToProjectsStart = () => {
    const section = sectionRef.current;
    if (!section) return;

    let targetTop = 0;
    if (scrollTriggerRef.current) {
      targetTop = scrollTriggerRef.current.start;
    } else {
      const pinSpacer = section.closest(".pin-spacer") || section.parentElement;
      if (pinSpacer && pinSpacer.classList.contains("pin-spacer")) {
        targetTop = pinSpacer.getBoundingClientRect().top + window.scrollY;
      } else {
        targetTop = section.getBoundingClientRect().top + window.scrollY;
      }
    }

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | Element | string, options?: Record<string, unknown>) => void } }).__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetTop, {
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  const handleFilterClick = (cat: Category) => {
    if (cat !== activeCategory) {
      setActiveCategory(cat);
    }
    scrollToProjectsStart();
  };

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#F2F2F0] text-[#000000] overflow-hidden"
      style={{
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Custom "VISIT SITE" Cursor Label */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 px-3.5 py-1.5 bg-black text-white text-[10px] font-sans font-bold tracking-[0.22em] uppercase rounded-full shadow-2xl opacity-0 scale-75 hidden md:block"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform, opacity" }}
      >
        VISIT SITE
      </div>

      {/* Sticky Content Viewport */}
      <div className="relative w-full h-full flex flex-col justify-between items-center px-3 sm:px-6 md:px-12 lg:px-20 py-5 sm:py-8 lg:py-12 overflow-hidden">
        
        {/* Top Header: Top Left Branding & Top Right Navigation */}
        <div className="w-full max-w-[1800px] flex justify-between items-center z-30">
          {/* Top Left Branding */}
          <div className="projects-brand font-sans font-bold text-[10px] sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.25em] uppercase transition-colors duration-500">
            XWEBSITEWALA
          </div>

          {/* Top Right Navigation */}
          <nav className="projects-nav flex items-center gap-2 sm:gap-6 md:gap-10 text-[8px] sm:text-[10px] md:text-xs font-sans font-medium tracking-[0.18em] sm:tracking-[0.3em] uppercase transition-colors duration-500">
            <span className="cursor-pointer hover:opacity-60 transition-opacity">WORK</span>
            <span className="opacity-30">—</span>
            <span className="cursor-pointer hover:opacity-60 transition-opacity">ABOUT</span>
            <span className="opacity-30">—</span>
            <span className="cursor-pointer hover:opacity-60 transition-opacity">CONTACT</span>
          </nav>
        </div>

        {/* Center Intro Statement & Plus Mark & Category Filters */}
        <div className="projects-intro relative z-30 flex flex-col items-center text-center mt-1 sm:mt-2 lg:mt-3 transition-colors duration-500">
          <p className="font-sans text-[8px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.22em] sm:tracking-[0.28em] uppercase leading-tight max-w-[200px] sm:max-w-md opacity-80">
            WE DESIGN &amp; BUILD<br />
            DIGITAL EXPERIENCES<br />
            <span className="opacity-50">/ HERE'S SOME OF OUR WORK</span>
          </p>
          <div className="opacity-50 text-xs font-mono font-bold my-0.5 sm:my-1 select-none">
            +
          </div>

          {/* Category Filter Controls */}
          <div
            className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap max-w-[95vw] px-1 mt-1 z-30"
            role="tablist"
            aria-label="Filter portfolio projects by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick(cat);
                  }}
                  className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[7.5px] sm:text-[9.5px] md:text-[10.5px] font-sans font-semibold tracking-[0.16em] sm:tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-black/5 hover:bg-black/10 text-current border border-current/15 opacity-70 hover:opacity-100"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "#000000", color: "#ffffff", borderColor: "#000000" }
                      : undefined
                  }
                >
                  <span>{cat}</span>
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 ml-1.5 align-middle -mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Typography "PROJECTS" (Background Anchor Element — Scales LARGE -> SMALL -> LARGE AGAIN) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4 sm:px-6 md:px-12">
          <h2
            className="projects-bg-text font-display font-black leading-none tracking-tighter uppercase transition-colors duration-500 text-[18vw] sm:text-[20vw] md:text-[18vw]"
            style={{
              userSelect: "none",
              color: "rgba(0, 0, 0, 0.95)",
              willChange: "transform, color",
            }}
          >
            PROJECTS
          </h2>
        </div>

        {/* SVG Fixed Wave Path Track (Shifted Upward for Upper-Center Placement) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="0 0 1400 800"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 1600,340 C 1300,180 1080,500 780,280 C 480,80 240,440 -200,260"
            fill="none"
            stroke="rgba(0, 0, 0, 0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Connector Dots on Fixed Wave Path */}
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {filteredProjects.map((proj, idx) => (
            <div
              key={`dot-${proj.id}`}
              ref={(el) => { dotRefs.current[idx] = el; }}
              className="absolute top-0 left-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/40 shadow-sm transition-opacity duration-300"
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </div>

        {/* Travelling Project Cards along Fixed Wave Track (RIGHT -> LEFT) */}
        <div className="relative w-full max-w-[1400px] h-[62vh] lg:h-[68vh] flex items-center justify-center z-20">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              onClick={() => handleCardClick(proj.url)}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              className={`project-card project-card-${idx} absolute top-0 left-0 w-[210px] min-[360px]:w-[235px] min-[400px]:w-[260px] min-[480px]:w-[310px] sm:w-[420px] md:w-[480px] lg:w-[540px] p-2 sm:p-4 md:p-6 rounded-[4px] border border-white/12 bg-[#0e0e0e] text-white shadow-2xl transition-opacity duration-300 cursor-pointer`}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Top Hanging Attachment String to Wave Path Connector Pin */}
              <div className="absolute -top-6 sm:-top-8 md:-top-10 left-1/2 -translate-x-1/2 w-[1px] h-6 sm:h-8 md:h-10 bg-white/25 pointer-events-none" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/40 pointer-events-none" />

              {/* Card Header: Metadata */}
              <div className="flex justify-between items-center mb-1.5 md:mb-2.5 text-[7px] sm:text-[8px] md:text-[10px] font-sans tracking-[0.15em] md:tracking-[0.25em] uppercase text-white/50 overflow-hidden">
                <span className="font-display font-light text-[9px] sm:text-[10px] md:text-sm text-white/40 shrink-0">{proj.id}</span>
                <span className="truncate mx-1 text-center">{proj.category}</span>
                <span className="shrink-0">{proj.year}</span>
              </div>

              {/* Card Visual Image Frame with Parallax */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[2px] bg-[#161616]">
                <img
                  src={proj.image}
                  alt={`${proj.title} — ${proj.category.toLowerCase()} website designed and developed by XWEBSITEWALA`}
                  className="card-img w-full h-[125%] -mt-[12.5%] object-cover object-center block"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Card Footer: Project Title & View Indicator */}
              <div className="mt-1.5 sm:mt-2 md:mt-3 flex justify-between items-end">
                <h3 className="font-sans font-bold text-[10px] sm:text-lg md:text-2xl lg:text-3xl tracking-tight text-white leading-tight">
                  {proj.title}
                </h3>
                <span className="font-sans text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em] text-white/40 uppercase shrink-0 ml-1">
                  VISIT &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Metadata Bar */}
        <div className="w-full max-w-[1800px] flex justify-between items-center text-[7px] sm:text-[9px] font-sans tracking-[0.18em] sm:tracking-[0.25em] uppercase opacity-40 z-30 transition-colors duration-500 mb-1 sm:mb-2 overflow-hidden">
          <span className="truncate mr-2">XWEBSITEWALA SHOWCASE</span>
          <span className="shrink-0">RIGHT TO LEFT WAVE STREAM</span>
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;

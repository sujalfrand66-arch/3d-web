import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  url: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "GLAMOUR MAKEOVER",
    category: "BEAUTY & LIFESTYLE",
    year: "2026",
    image: "/assets/ed-02.png",
    url: "https://glamourmakeover.com",
  },
  {
    id: "02",
    title: "MANTOLA CORPORATE",
    category: "CORPORATE IDENTITY",
    year: "2026",
    image: "/assets/exhibit-wide.png",
    url: "https://mantola.in",
  },
  {
    id: "03",
    title: "RAJWADA FURNISH",
    category: "E-COMMERCE FLAGSHIP",
    year: "2025",
    image: "/assets/showcase-screen-horizontal.png",
    url: "https://rajwadafurnish.com",
  },
  {
    id: "04",
    title: "SURATGARH PROPERTIES",
    category: "REAL ESTATE PORTAL",
    year: "2025",
    image: "/assets/horizontal-showcase.png",
    url: "https://suratgarhproperties.com",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      const numCards = PROJECTS.length;
      const spacing = totalLength / 3.2;

      // ── CARD POSITION UPDATE — direct style writes, zero tween allocation ──
      const updateCardPositions = (progress: number) => {
        const travelDistance = progress * (totalLength + spacing * (numCards + 1));

        PROJECTS.forEach((_, idx) => {
          const card = cardRefs.current[idx];
          const dot = dotRefs.current[idx];
          if (!card || !dot) return;

          const cardDistance = (totalLength + spacing * 0.4) - travelDistance + idx * spacing;
          const clampedDistance = Math.max(0, Math.min(totalLength, cardDistance));
          const point = pathEl.getPointAtLength(clampedDistance);

          const aheadDist = Math.max(0, Math.min(totalLength, clampedDistance - 6));
          const aheadPoint = pathEl.getPointAtLength(aheadDist);
          const dx = aheadPoint.x - point.x;
          const dy = aheadPoint.y - point.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const tilt = Math.max(-14, Math.min(14, angle * 0.28));

          const isVisible = cardDistance > -spacing * 0.4 && cardDistance < totalLength + spacing * 0.4;
          const opacity = isVisible
            ? Math.min(1, Math.max(0, (cardDistance < 120 ? cardDistance / 120 : (totalLength - cardDistance) / 120)))
            : 0;

          const waveHeight = (point.y - 120) / 280;
          const scale = 0.94 + waveHeight * 0.12;

          card.style.transform = `translate3d(${point.x - 260}px, ${point.y - 150}px, 0) rotate(${tilt}deg) scale(${scale})`;
          card.style.opacity = `${opacity}`;
          card.style.zIndex = `${Math.floor(20 + waveHeight * 20)}`;

          dot.style.transform = `translate3d(${point.x - 4}px, ${point.y - 4}px, 0)`;
          dot.style.opacity = `${opacity * 0.8}`;
        });
      };

      // Header entrance (fires once on scroll into view, not per-frame)
      gsap.fromTo(
        [brand, nav, intro],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
      );

      // ── BGTEXT SCALE — scrubbed timeline, zero per-frame tween allocation ──
      // LARGE → SMALL when cards travel (5%–85%), then LARGE again
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
              end: "+="  + (520 * 0.40) + "%",
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
              start: "+="  + (520 * 0.75) + "%",
              end: "+="   + (520 * 0.88) + "%",
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
        .to(section, { backgroundColor: "#b82424", color: "#ffffff",  duration: 0.35, ease: "power1.inOut" }, 0.35)
        .to(section, { backgroundColor: "#7a0000", color: "#ffffff",  duration: 0.30, ease: "power1.inOut" }, 0.70);

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
          .to(bgText, { color: "rgba(0,0,0,0.95)",       duration: 0.35, ease: "none" }, 0)
          .to(bgText, { color: "rgba(255,255,255,0.30)", duration: 0.35, ease: "power1.inOut" }, 0.35)
          .to(bgText, { color: "rgba(255,255,255,0.20)", duration: 0.30, ease: "power1.inOut" }, 0.70);
      }

      // ── MASTER PIN + CARD TRAVERSAL — onUpdate does only direct style writes ──
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=520%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          updateCardPositions(self.progress);
        },
      });

      // Set initial positions
      updateCardPositions(0);
    }, section);

    return () => ctx.revert();
  }, []);


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

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#F2F2F0] text-[#000000] overflow-hidden"
      style={{ borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}
    >
      {/* Custom "VISIT SITE" Cursor Label */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 px-3.5 py-1.5 bg-black text-white text-[10px] font-sans font-bold tracking-[0.22em] uppercase rounded-full shadow-2xl opacity-0 scale-75"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform, opacity" }}
      >
        VISIT SITE
      </div>

      {/* Sticky Content Viewport */}
      <div className="relative w-full h-full flex flex-col justify-between items-center px-6 md:px-12 lg:px-20 py-8 lg:py-12 overflow-hidden">
        
        {/* Top Header: Top Left Branding & Top Right Navigation */}
        <div className="w-full max-w-[1800px] flex justify-between items-center z-30">
          {/* Top Left Branding */}
          <div className="projects-brand font-sans font-bold text-sm sm:text-base tracking-[0.25em] uppercase transition-colors duration-500">
            XWEBSITEWALA
          </div>

          {/* Top Right Navigation */}
          <nav className="projects-nav flex items-center gap-6 sm:gap-10 text-[10px] sm:text-xs font-sans font-medium tracking-[0.3em] uppercase transition-colors duration-500">
            <span className="cursor-pointer hover:opacity-60 transition-opacity">WORK</span>
            <span className="opacity-30">—</span>
            <span className="cursor-pointer hover:opacity-60 transition-opacity">ABOUT</span>
            <span className="opacity-30">—</span>
            <span className="cursor-pointer hover:opacity-60 transition-opacity">CONTACT</span>
          </nav>
        </div>

        {/* Center Intro Statement & Plus Mark */}
        <div className="projects-intro relative z-30 flex flex-col items-center text-center mt-2 lg:mt-4 transition-colors duration-500">
          <p className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase leading-tight max-w-md opacity-80">
            WE DESIGN & BUILD<br />
            DIGITAL EXPERIENCES<br />
            <span className="opacity-50">/ HERE'S SOME OF OUR WORK</span>
          </p>
          <div className="opacity-50 text-xs font-mono font-bold my-2 select-none">
            +
          </div>
        </div>

        {/* Display Typography "PROJECTS" (Background Anchor Element — Scales LARGE -> SMALL -> LARGE AGAIN) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-6 md:px-12">
          <h2
            className="projects-bg-text font-display font-black text-[22vw] leading-none tracking-tighter uppercase transition-colors duration-500"
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
          {PROJECTS.map((proj, idx) => (
            <div
              key={`dot-${proj.id}`}
              ref={(el) => { dotRefs.current[idx] = el; }}
              className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-black/40 shadow-sm"
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </div>

        {/* Travelling Project Cards along Fixed Wave Track (RIGHT -> LEFT) */}
        <div className="relative w-full max-w-[1400px] h-[62vh] lg:h-[68vh] flex items-center justify-center z-20">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              onClick={() => handleCardClick(proj.url)}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              className={`project-card project-card-${idx} absolute top-0 left-0 w-[85vw] sm:w-[58vw] md:w-[46vw] lg:w-[30vw] max-w-[520px] rounded-[4px] border border-white/12 bg-[#0e0e0e] text-white p-3 sm:p-4 shadow-2xl transition-colors duration-300 cursor-pointer`}
              style={{
                willChange: "transform, opacity",
              }}
            >
              {/* Top Hanging Attachment String to Wave Path Connector Pin */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-white/25 pointer-events-none" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/40 pointer-events-none" />

              {/* Card Header: Metadata */}
              <div className="flex justify-between items-center mb-2.5 text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase text-white/50">
                <span className="font-display font-light text-sm text-white/40">{proj.id}</span>
                <span>{proj.category}</span>
                <span>{proj.year}</span>
              </div>

              {/* Card Visual Image Frame with Parallax */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[2px] bg-[#161616]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="card-img w-full h-[125%] -mt-[12.5%] object-cover object-center block"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Card Footer: Project Title & View Indicator */}
              <div className="mt-3 flex justify-between items-end">
                <h3 className="font-sans font-bold text-lg sm:text-2xl lg:text-3xl tracking-tight text-white">
                  {proj.title}
                </h3>
                <span className="font-sans text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  VISIT →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Metadata Bar (Generous Bottom Breathing Room) */}
        <div className="w-full max-w-[1800px] flex justify-between items-center text-[9px] font-sans tracking-[0.25em] uppercase opacity-40 z-30 transition-colors duration-500 mb-2">
          <span>XWEBSITEWALA SHOWCASE</span>
          <span>RIGHT TO LEFT WAVE STREAM</span>
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;

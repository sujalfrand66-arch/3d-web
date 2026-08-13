import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  img: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "01",
    name: "WEB DESIGN",
    category: "EDITORIAL & DIGITAL BRANDING",
    desc: "Bespoke digital architecture with custom visual identity and typography.",
    img: "/assets/ed-02.png",
  },
  {
    id: "02",
    name: "WEB DEVELOPMENT",
    category: "REACT, TYPESCRIPT & NEXT.JS",
    desc: "Scalable, high-performance web applications engineered for speed.",
    img: "/assets/showcase-screen-horizontal.png",
  },
  {
    id: "03",
    name: "UI / UX DESIGN",
    category: "USER INTERFACE & EXPERIENCE",
    desc: "Intuitive user flows crafted to turn visitors into loyal clients.",
    img: "/assets/exhibit-wide.png",
  },
  {
    id: "04",
    name: "ANIMATED WEBSITES",
    category: "GSAP & THREE.JS MOTION",
    desc: "Fluid scroll choreography and interactive 3D web experiences.",
    img: "/assets/horizontal-showcase.png",
  },
  {
    id: "05",
    name: "E-COMMERCE",
    category: "FLAGSHIP DIGITAL STORES",
    desc: "High-conversion online stores with seamless payment & interaction.",
    img: "/assets/showcase-screen-horizontal.png",
  },
  {
    id: "06",
    name: "CUSTOM WEB EXPERIENCES",
    category: "BESPOKE DIGITAL CRAFT",
    desc: "Tailor-made web solutions designed around complex client requirements.",
    img: "/assets/ed-02.png",
  },
  {
    id: "07",
    name: "WEBSITE OPTIMIZATION",
    category: "SPEED & PERFORMANCE AUDIT",
    desc: "Core Web Vitals tuning, asset compression, and instant load speeds.",
    img: "/assets/exhibit-wide.png",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const validRows = rowsRef.current.filter(Boolean);

      // Sequential GSAP Reveal
      gsap.fromTo(
        validRows,
        { opacity: 0, x: -40, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Desktop Floating Cursor Preview Mouse Follow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!previewRef.current || window.innerWidth < 1024) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(previewRef.current, {
      x: x + 20,
      y: y - 100,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services-section"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#050505] text-white select-none py-20 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Floating Image Preview on Hover (Desktop Only) */}
      <div
        ref={previewRef}
        className={`pointer-events-none absolute z-30 hidden lg:block w-72 h-44 rounded-sm overflow-hidden border border-white/20 shadow-2xl transition-opacity duration-300 ${
          activeIdx !== null ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        {activeIdx !== null && (
          <img
            src={SERVICES[activeIdx].img}
            alt="Service Preview"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-6 border-b border-white/15">
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50">
          05 / SERVICES
        </div>
        <div className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] uppercase opacity-60">
          XWEBSITEWALA &mdash; CREATIVE CAPABILITIES
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-12 lg:my-16">
        {/* Section Headline */}
        <div className="mb-12 lg:mb-16 text-left">
          <p className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-red-500 mb-3">
            STUDIO SPECIALITIES
          </p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight uppercase">
            SERVICES &amp; CRAFT.
          </h2>
        </div>

        {/* Premium Interactive Services List */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {SERVICES.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { rowsRef.current[idx] = el; }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={`group py-6 sm:py-8 lg:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all duration-300 px-2 sm:px-4 cursor-pointer ${
                activeIdx === idx ? "bg-white/[0.04] pl-6" : ""
              }`}
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className={`font-display font-bold text-sm sm:text-base transition-colors duration-300 ${
                  activeIdx === idx ? "text-red-500" : "text-white/40"
                }`}>
                  {item.id}
                </span>
                <div>
                  <h3 className={`font-display font-black text-xl sm:text-3xl lg:text-4xl tracking-tight uppercase transition-all duration-300 ${
                    activeIdx === idx ? "text-white translate-x-2" : "text-white/80"
                  }`}>
                    {item.name}
                  </h3>
                  <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 mt-1 block">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="max-w-md flex items-center justify-between gap-4">
                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {item.desc}
                </p>
                <span className={`font-sans text-sm font-bold text-red-500 transition-transform duration-300 ${
                  activeIdx === idx ? "translate-x-1 opacity-100" : "opacity-0"
                }`}>
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.2em] uppercase opacity-50 pt-6 border-t border-white/10 gap-1">
        <span>XWEBSITEWALA &mdash; EXPERTISE</span>
        <span>SCROLL FOR VISUAL STORY &#x2193;</span>
      </div>
    </section>
  );
}

export default ServicesSection;

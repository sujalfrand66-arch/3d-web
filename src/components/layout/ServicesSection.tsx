import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    name: "WEB DESIGN",
    category: "EDITORIAL & DIGITAL BRANDING",
    desc: "Bespoke digital architecture with custom visual identity and typography.",
  },
  {
    id: "02",
    name: "WEB DEVELOPMENT",
    category: "REACT, TYPESCRIPT & NEXT.JS",
    desc: "Scalable, high-performance web applications engineered for speed.",
  },
  {
    id: "03",
    name: "UI / UX DESIGN",
    category: "USER INTERFACE & EXPERIENCE",
    desc: "Intuitive user flows crafted to turn visitors into loyal clients.",
  },
  {
    id: "04",
    name: "LANDING PAGES",
    category: "HIGH-CONVERSION EXPERIENCE",
    desc: "High-impact single-page experiences focused on maximum engagement.",
  },
  {
    id: "05",
    name: "ANIMATED WEBSITES",
    category: "GSAP & THREE.JS MOTION",
    desc: "Fluid scroll choreography and interactive 3D web experiences.",
  },
  {
    id: "06",
    name: "CUSTOM WEB EXPERIENCES",
    category: "BESPOKE DIGITAL CRAFT",
    desc: "Tailor-made web solutions designed around complex client requirements.",
  },
  {
    id: "07",
    name: "WEBSITE OPTIMIZATION",
    category: "SPEED & PERFORMANCE AUDIT",
    desc: "Core Web Vitals tuning, asset compression, and instant load speeds.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const validRows = rowsRef.current.filter(Boolean);

      gsap.fromTo(
        validRows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
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

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="relative w-full min-h-screen bg-[#050505] text-white select-none py-20 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-6 border-b border-white/15">
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50">
          05 / SERVICES
        </div>
        <div className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] uppercase opacity-60">
          XWEBSITEWALA &mdash; WHAT WE BUILD
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-12 lg:my-16">
        {/* Section Headline */}
        <div className="mb-12 lg:mb-16 text-left">
          <p className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-red-500 mb-3">
            CAPABILITIES &amp; SPECIALTIES
          </p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight uppercase">
            SERVICES OFFERED.
          </h2>
        </div>

        {/* Editorial Services List */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {SERVICES.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => { rowsRef.current[idx] = el; }}
              className="group py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors duration-300 px-2 sm:px-4"
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="font-display font-bold text-sm sm:text-base text-red-500">
                  {item.id}
                </span>
                <div>
                  <h3 className="font-display font-black text-xl sm:text-3xl lg:text-4xl tracking-tight uppercase group-hover:text-red-500 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 mt-1 block">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="max-w-md">
                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {item.desc}
                </p>
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

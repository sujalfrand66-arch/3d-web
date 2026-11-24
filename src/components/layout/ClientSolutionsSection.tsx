import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    num: "01",
    title: "E-COMMERCE WEBSITES",
    subtitle: "HIGH-CONVERSION DIGITAL STORES",
    desc: "Bespoke online retail storefronts with high-conversion product showcases, seamless shopping carts, and automated payment gateway integrations designed to maximize sales.",
    tag: "COMMERCE",
  },
  {
    num: "02",
    title: "BUSINESS WEBSITES",
    subtitle: "CORPORATE & COMMERCIAL PLATFORMS",
    desc: "Authoritative digital architecture designed to establish brand credibility, articulate company value propositions, and consistently capture qualified inquiries.",
    tag: "ENTERPRISE",
  },
  {
    num: "03",
    title: "PORTFOLIO WEBSITES",
    subtitle: "CREATIVE & PROFESSIONAL SHOWCASES",
    desc: "Immersive portfolio experiences crafted with fluid micro-interactions, distinct typography rhythm, and responsive galleries that make your work unforgettable.",
    tag: "SHOWCASE",
  },
  {
    num: "04",
    title: "CUSTOM WEB APPLICATIONS",
    subtitle: "DYNAMIC & SCALABLE SYSTEMS",
    desc: "Engineered web platforms built with modern React and TypeScript. Scalable component architecture, custom workflows, and real-time backend integrations.",
    tag: "FULL-STACK",
  },
  {
    num: "05",
    title: "ADMIN DASHBOARDS",
    subtitle: "ANALYTICS & MANAGEMENT PANELS",
    desc: "Clean, intuitive management panels and analytical consoles designed for data clarity, multi-tenant workflows, and effortless business control.",
    tag: "DASHBOARD",
  },
  {
    num: "06",
    title: "LANDING PAGES",
    subtitle: "FOCUSED CAMPAIGN CONVERSION",
    desc: "High-impact, lightning-fast landing pages optimized for marketing campaigns, product launches, psychological hierarchy, and peak conversion performance.",
    tag: "CONVERSION",
  },
];

export function ClientSolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter(Boolean);

      gsap.fromTo(
        validCards,
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
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
      id="solutions-section"
      className="relative w-full min-h-screen bg-[#080808] text-white select-none py-20 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-6 border-b border-white/15">
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
          WHAT WE BUILD / CLIENT SOLUTIONS
        </div>
        <div className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] uppercase opacity-60">
          XWEBSITEWALA &mdash; DIGITAL CAPABILITIES
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-12 lg:my-16">
        {/* Editorial Section Headline */}
        <div className="mb-12 lg:mb-20 text-left max-w-3xl">
          <p className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-red-500 mb-3">
            TAILORED DIGITAL ARCHITECTURE
          </p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight uppercase">
            WEBSITE SOLUTIONS <br />
            <span className="text-white/40">CRAFTED FOR YOUR GOALS.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-xs sm:text-sm md:text-base text-white/60 font-sans font-light leading-relaxed">
            Every business requires a distinct digital instrument. We build custom-engineered website solutions and web applications designed around your exact operational scale and conversion goals.
          </p>
        </div>

        {/* 6 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SOLUTIONS.map((item, idx) => (
            <div
              key={item.num}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 p-6 sm:p-8 rounded-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display font-bold text-2xl text-red-500">
                    {item.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-300" />
                </div>
                <div className="font-sans text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] uppercase text-white/40 mb-1.5">
                  {item.subtitle}
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl tracking-tight uppercase mb-3 text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="font-sans text-[8.5px] sm:text-[9px] tracking-[0.2em] uppercase text-white/40 font-semibold">
                  {item.tag}
                </span>
                <span className="font-mono text-xs text-red-500/80 group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Editorial Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-6 border-t border-white/10 text-[8px] sm:text-[9.5px] font-sans tracking-[0.2em] uppercase opacity-40">
        <span>XWEBSITEWALA &mdash; PURPOSE-BUILT WEB ENGINEERING</span>
        <span>MODERN REACT &bull; TYPESCRIPT &bull; GSAP MOTION</span>
      </div>
    </section>
  );
}

export default ClientSolutionsSection;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    num: "01",
    title: "DESIGN THAT HAS A PURPOSE",
    desc: "We don't build arbitrary layouts. Every line, grid, and pixel serves a clear brand & conversion purpose.",
  },
  {
    num: "02",
    title: "MOTION THAT FEELS NATURAL",
    desc: "Fluid GSAP timelines and interactive 3D elements designed to intrigue, not distract.",
  },
  {
    num: "03",
    title: "FAST & MODERN DEVELOPMENT",
    desc: "Modern React, TypeScript, and optimized codebases built for lightning performance.",
  },
  {
    num: "04",
    title: "BUILT AROUND YOUR BUSINESS",
    desc: "Tailored digital experiences engineered specifically around your audience and growth goals.",
  },
  {
    num: "05",
    title: "DETAILS THAT PEOPLE NOTICE",
    desc: "Micro-interactions, section transitions, and typography rhythm that make your site unforgettable.",
  },
  {
    num: "06",
    title: "CUSTOM CRAFT, NO TEMPLATES",
    desc: "Bespoke digital architecture crafted from scratch — no generic templates ever.",
  },
];

export function WhyChooseUsSection() {
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
          stagger: 0.12,
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
      id="why-choose-us-section"
      className="relative w-full min-h-screen bg-[#080808] text-white select-none py-20 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-6 border-b border-white/15">
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50">
          03 / WHY CHOOSE US
        </div>
        <div className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] uppercase opacity-60">
          XWEBSITEWALA &mdash; CREATIVE ADVANTAGE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-12 lg:my-16">
        {/* Editorial Section Headline */}
        <div className="mb-12 lg:mb-20 text-left max-w-3xl">
          <p className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-red-500 mb-3">
            THE XWEBSITEWALA DIFFERENCE
          </p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight uppercase">
            BUILT FOR IMPACT. <br />
            <span className="text-white/40">ENGINEERED FOR MOTION.</span>
          </h2>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((item, idx) => (
            <div
              key={item.num}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-6 sm:p-8 rounded-sm transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display font-bold text-2xl text-red-500">
                    {item.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-300" />
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl tracking-tight uppercase mb-3 text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 group-hover:text-white/60 transition-colors">
                XWEBSITEWALA STANDARD &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.2em] uppercase opacity-50 pt-6 border-t border-white/10 gap-1">
        <span>XWEBSITEWALA &mdash; QUALITY GUARANTEE</span>
        <span>SCROLL FOR PROJECTS &#x2193;</span>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;

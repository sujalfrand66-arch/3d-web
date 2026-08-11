import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VISUAL_ITEMS = [
  {
    id: "01",
    title: "DIGITAL CRAFT & ART DIRECTION",
    subtitle: "SUJAL FRAND &times; ANMOL FRAND",
    img: "/assets/exhibit-wide.png",
  },
  {
    id: "02",
    title: "BEHIND THE INTERACTION",
    subtitle: "XWEBSITEWALA STUDIO",
    img: "/assets/exhibit-wide.png",
  },
];

export function VisualStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const validImages = imagesRef.current.filter(Boolean);

      validImages.forEach((wrapper) => {
        if (!wrapper) return;
        const img = wrapper.querySelector("img");

        gsap.fromTo(
          wrapper,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, yPercent: 8 },
            {
              scale: 1.0,
              yPercent: 0,
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="visual-story-section"
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white select-none py-20 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-between overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-6 border-b border-white/15">
        <div className="font-sans text-[8.5px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50">
          06 / VISUAL STORY
        </div>
        <div className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] uppercase opacity-60">
          XWEBSITEWALA &mdash; GALLERY &amp; CULTURE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full my-12 lg:my-16 space-y-16 lg:space-y-24">
        {/* Section Headline */}
        <div className="text-left">
          <p className="font-sans text-[9px] sm:text-[11px] font-bold tracking-[0.35em] uppercase text-red-500 mb-3">
            PORTFOLIO PERSPECTIVE
          </p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight uppercase">
            VISUAL ARCHIVE.
          </h2>
        </div>

        {/* Visual Frames Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {VISUAL_ITEMS.map((item, idx) => (
            <div key={item.id} className="flex flex-col space-y-4">
              <div
                ref={(el) => { imagesRef.current[idx] = el; }}
                className="relative w-full aspect-[16/10] overflow-hidden bg-[#111] rounded-sm border border-white/10"
                style={{
                  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center pointer-events-none select-none block"
                  loading="lazy"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="font-display font-bold text-xs sm:text-sm tracking-widest uppercase">
                  {item.title}
                </span>
                <span className="font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase text-white/40 font-bold" dangerouslySetInnerHTML={{ __html: item.subtitle }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[8px] sm:text-[9px] font-sans tracking-[0.2em] uppercase opacity-50 pt-6 border-t border-white/10 gap-1">
        <span>XWEBSITEWALA &mdash; VISUALS</span>
        <span>SCROLL FOR FOOTER &#x2193;</span>
      </div>
    </section>
  );
}

export default VisualStorySection;

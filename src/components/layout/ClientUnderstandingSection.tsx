const CAPABILITIES = [
  "E-commerce Websites",
  "Business Websites",
  "Portfolio Websites",
  "Custom Web Applications",
  "Admin Dashboards",
  "Landing Pages",
];

export function ClientUnderstandingSection() {
  return (
    <section className="relative w-full bg-[#F4F3EE] text-black px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <div className="max-w-7xl mx-auto border-t border-black/10 pt-5 sm:pt-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">
          <div className="max-w-2xl">
            <p className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-red-600 mb-4">WHAT I CAN BUILD</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.9] tracking-tight uppercase">
              DIGITAL EXPERIENCES<br />
              <span className="text-black/35">BUILT AROUND YOU.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-black/55 max-w-md">
            From a focused first impression to a complete operational platform, every project is shaped around your audience, workflow and growth.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/10">
          {CAPABILITIES.map((capability, index) => (
            <div key={capability} className="min-h-32 border-r border-b border-black/10 p-5 sm:p-6 flex flex-col justify-between">
              <span className="font-sans text-[9px] font-bold tracking-[0.25em] uppercase text-red-600">0{index + 1}</span>
              <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase leading-none mt-8">{capability}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientUnderstandingSection;

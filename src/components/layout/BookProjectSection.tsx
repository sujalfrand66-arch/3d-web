import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  "WEBSITE",
  "WEB APPLICATION",
  "SOFTWARE",
  "MOBILE APP",
  "E-COMMERCE",
  "UI / UX DESIGN",
  "OTHER",
];

interface FormState {
  name: string;
  mobile: string;
  projectType: string;
  description: string;
  budget: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  projectType?: string;
  description?: string;
}

function validateMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile.trim());
}

export function BookProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    projectType: "",
    description: "",
    budget: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // ── GSAP Entrance ──────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Ghost background text drifts in
      if (bgTextRef.current) {
        tl.fromTo(
          bgTextRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          0
        );
      }

      // Label
      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          0.1
        );
      }

      // Heading lines stagger up from clip
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hl");
        tl.fromTo(
          lines,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.09,
          },
          0.12
        );
      }

      // Copy + details
      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.36
        );
      }
      if (detailsRef.current) {
        const items = detailsRef.current.querySelectorAll(".di");
        tl.fromTo(
          items,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.1,
          },
          0.48
        );
      }

      // Form panel slides in
      if (formPanelRef.current) {
        tl.fromTo(
          formPanelRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
          0.22
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // ── Form handlers ──────────────────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleProjectType(type: string) {
    setForm((prev) => ({ ...prev, projectType: type }));
    if (errors.projectType) {
      setErrors((prev) => ({ ...prev, projectType: undefined }));
    }
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.mobile.trim()) {
      e.mobile = "Mobile number is required";
    } else if (!validateMobile(form.mobile)) {
      e.mobile = "Enter a valid 10-digit Indian mobile number";
    }
    if (!form.projectType) e.projectType = "Please select a project type";
    if (!form.description.trim()) e.description = "Please describe your project";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);

    setTimeout(() => {
      const msg =
        `Hello XWEBSITEWALA,\n\nI want to discuss a project.\n\n` +
        `Name: ${form.name}\n` +
        `Mobile: ${form.mobile}\n` +
        `Project Type: ${form.projectType}\n` +
        (form.budget ? `Budget / Timeline: ${form.budget}\n` : "") +
        `\nProject Details:\n${form.description}\n\nPlease contact me regarding this project.`;
      window.open(
        `https://wa.me/919983853091?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }, 900);
  }

  return (
    <section
      ref={sectionRef}
      id="book-project-section"
      className="relative w-full bg-[#c8171e] overflow-hidden"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
      aria-label="Book a project"
    >
      {/* ── Ghost background numeral ──────────────────────────────────────── */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-4vw] top-1/2 -translate-y-1/2 font-display font-black leading-none text-[30vw] text-black/[0.07] tracking-tighter"
      >
        06
      </div>

      {/* ── Thin black top border ─────────────────────────────────────────── */}
      <div className="w-full h-[3px] bg-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36">
        {/* ── Chapter label ─────────────────────────────────────────────────── */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-10 sm:mb-14"
        >
          <span
            className="font-sans text-[9px] sm:text-[10px] font-black tracking-[0.35em] uppercase text-black/50"
          >
            START A PROJECT
          </span>
          <span className="h-[1px] w-8 bg-black/40 shrink-0" />
          <span className="font-sans text-[9px] sm:text-[10px] font-black tracking-[0.35em] uppercase text-black/40">
            06
          </span>
        </div>

        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 xl:gap-24 items-start">

          {/* ════════════════════════════════════════════════
              LEFT — Editorial CTA copy
          ════════════════════════════════════════════════ */}
          <div className="flex flex-col space-y-8 lg:space-y-10">

            {/* Main heading */}
            <div ref={headingRef}>
              <h2
                className="font-display font-black uppercase leading-[0.88] tracking-[-0.03em]"
                style={{ fontSize: "clamp(52px, 8vw, 104px)" }}
              >
                <span className="overflow-hidden block">
                  <span className="hl block text-black">LET'S</span>
                </span>
                <span className="overflow-hidden block">
                  <span className="hl block text-black">BUILD</span>
                </span>
                <span className="overflow-hidden block">
                  <span className="hl block text-black">SOMETHING</span>
                </span>
                <span className="overflow-hidden block">
                  <span className="hl block text-black">GREAT.</span>
                </span>
              </h2>
            </div>

            {/* Copy */}
            <div ref={copyRef} className="space-y-5 max-w-md">
              <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-black/70 font-normal">
                Have an idea, business or digital product in mind?
                Tell us what you're looking to build and let's start the conversation.
              </p>
              {/* Thin black rule */}
              <div className="w-10 h-[2px] bg-black/40" />
            </div>

            {/* Editorial details */}
            <div ref={detailsRef} className="space-y-0">
              {[
                { num: "01", text: "TELL US YOUR IDEA" },
                { num: "02", text: "WE DESIGN YOUR VISION" },
                { num: "03", text: "WE BUILD & DELIVER" },
              ].map((item) => (
                <div
                  key={item.num}
                  className="di flex items-center gap-5 py-4 border-b border-black/15 last:border-b-0"
                >
                  <span className="font-sans text-[10px] font-black tracking-[0.28em] text-black/35 w-6 shrink-0">
                    {item.num}
                  </span>
                  <span className="h-px w-5 bg-black/30 shrink-0" />
                  <span className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-black/60">
                    {item.text}
                  </span>
                  <span className="ml-auto font-sans text-black/25 text-sm">→</span>
                </div>
              ))}
            </div>

            {/* WhatsApp direct link */}
            <a
              href="https://wa.me/919983853091"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-sans text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-black/45 hover:text-black/80 transition-colors duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-black/40 group-hover:bg-black/80 transition-colors duration-200 shrink-0" />
              WHATSAPP — +91 99838 53091
            </a>
          </div>

          {/* ════════════════════════════════════════════════
              RIGHT — Black form panel
          ════════════════════════════════════════════════ */}
          <div ref={formPanelRef}>
            <div
              className="bg-[#0a0a0a] p-7 sm:p-9 lg:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-white/30">
                  ENQUIRY FORM
                </span>
                <span className="h-[1px] flex-1 mx-4 bg-white/[0.08]" />
                <span className="font-sans text-[9px] font-black tracking-[0.25em] uppercase text-[#c8171e]">
                  XWEBSITEWALA
                </span>
              </div>

              {submitted ? (
                /* ── SUCCESS STATE ─────────────────────────────────────── */
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-12 h-12 border border-[#c8171e] flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#c8171e]">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[#c8171e] mb-3">
                    ENQUIRY READY
                  </div>
                  <p className="font-display font-black text-2xl sm:text-3xl uppercase text-white leading-tight mb-3">
                    OPENING
                    <br />
                    WHATSAPP…
                  </p>
                  <p className="font-sans text-xs text-white/35 leading-relaxed max-w-xs">
                    Your project details are pre-filled and ready to send to +91 9983853091.
                  </p>
                </div>
              ) : (
                /* ── FORM ─────────────────────────────────────────────── */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Book a project form"
                >
                  {/* Name */}
                  <BlackField label="01 — YOUR NAME" error={errors.name}>
                    <input
                      id="bp-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Full name"
                      value={form.name}
                      onChange={handleChange}
                      className={bpInput(!!errors.name)}
                    />
                  </BlackField>

                  {/* Mobile */}
                  <BlackField label="02 — MOBILE NUMBER" error={errors.mobile}>
                    <input
                      id="bp-mobile"
                      name="mobile"
                      type="tel"
                      required
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={form.mobile}
                      onChange={handleChange}
                      className={bpInput(!!errors.mobile)}
                    />
                  </BlackField>

                  {/* Project type */}
                  <div className="space-y-3">
                    <span className="font-sans text-[9px] font-black tracking-[0.28em] uppercase text-white/35">
                      03 — WHAT DO YOU WANT TO BUILD?
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleProjectType(type)}
                          aria-pressed={form.projectType === type}
                          className={bpTypeBtn(form.projectType === type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {errors.projectType && (
                      <p className="font-sans text-[10px] text-[#c8171e]">
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <BlackField
                    label="04 — TELL US ABOUT YOUR PROJECT"
                    error={errors.description}
                  >
                    <textarea
                      id="bp-description"
                      name="description"
                      required
                      rows={4}
                      placeholder="Briefly describe what you want to build..."
                      value={form.description}
                      onChange={handleChange}
                      className={`${bpInput(!!errors.description)} resize-none`}
                    />
                  </BlackField>

                  {/* Budget (optional) */}
                  <div className="space-y-2">
                    <span className="font-sans text-[9px] font-black tracking-[0.28em] uppercase text-white/20">
                      05 — BUDGET / TIMELINE{" "}
                      <span className="text-white/15">(OPTIONAL)</span>
                    </span>
                    <input
                      id="bp-budget"
                      name="budget"
                      type="text"
                      placeholder="e.g. ₹20,000 · 1 month · flexible"
                      value={form.budget}
                      onChange={handleChange}
                      className={bpInput(false)}
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="group relative w-full inline-flex items-center justify-center gap-3 bg-[#c8171e] hover:bg-[#a8121a] text-white font-sans font-black text-xs sm:text-sm tracking-[0.25em] uppercase py-4 sm:py-5 transition-all duration-300 hover:scale-[1.015] active:scale-[0.98] overflow-hidden"
                    >
                      {/* shimmer */}
                      <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 skew-x-[-15deg]" />
                      <span className="relative">SEND ENQUIRY</span>
                      <span className="relative transition-transform duration-300 group-hover:translate-x-1.5 text-base leading-none">
                        →
                      </span>
                    </button>
                    <p className="text-center font-sans text-[9px] tracking-widest uppercase text-white/20 mt-3">
                      Direct WhatsApp · +91 99838 53091
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Thin black bottom border → footer transition ──────────────────── */}
      <div className="w-full h-[2px] bg-black/20" />
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BlackField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <span className="font-sans text-[9px] font-black tracking-[0.28em] uppercase text-white/35">
        {label}
      </span>
      {children}
      {error && (
        <p className="font-sans text-[10px] text-[#c8171e]">{error}</p>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function bpInput(hasError: boolean): string {
  return [
    "w-full bg-[#151515] border font-sans text-sm text-white placeholder-white/20 px-4 py-3",
    "focus:outline-none transition-all duration-300",
    "focus:border-[#c8171e]",
    hasError
      ? "border-[#c8171e]/70"
      : "border-white/[0.09] hover:border-white/[0.18]",
  ].join(" ");
}

function bpTypeBtn(active: boolean): string {
  return [
    "font-sans text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase px-3 py-2",
    "border transition-all duration-200 focus:outline-none",
    active
      ? "bg-[#c8171e] border-[#c8171e] text-white"
      : "bg-transparent border-white/10 text-white/40 hover:border-[#c8171e]/60 hover:text-white/70",
  ].join(" ");
}

export default BookProjectSection;

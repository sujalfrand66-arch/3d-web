import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const POPUP_PROJECT_TYPES = [
  "WEBSITE",
  "SOFTWARE",
  "MOBILE APP",
  "WEB APP",
  "E-COMMERCE",
  "OTHER",
];

interface PopupForm {
  name: string;
  mobile: string;
  projectType: string;
  description: string;
}

interface PopupErrors {
  name?: string;
  mobile?: string;
  projectType?: string;
  description?: string;
}

function validateMobile(v: string) {
  return /^[6-9]\d{9}$/.test(v.trim());
}

export function AppointmentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  // NOTE: gsapContentRef is a separate wrapper ONLY for GSAP — it never clips scroll
  const gsapContentRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<PopupForm>({
    name: "",
    mobile: "",
    projectType: "",
    description: "",
  });
  const [errors, setErrors] = useState<PopupErrors>({});

  // ── Show once per session ─────────────────────────────────────────────────
  useEffect(() => {
    const seen = sessionStorage.getItem("xwebsitewalaAppointmentSeen");
    if (seen) return;
    const t = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("xwebsitewalaAppointmentSeen", "true");
    }, 650);
    return () => clearTimeout(t);
  }, []);

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible) return;
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    const accentLine = accentLineRef.current;
    const gsapContent = gsapContentRef.current;
    if (!overlay || !modal) return;

    // Lock body scroll, but NOT the modal's internal scroll
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.38, ease: "power2.out" },
      0
    );
    tl.fromTo(
      modal,
      { opacity: 0, y: 32, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "expo.out" },
      0.06
    );
    if (accentLine) {
      tl.fromTo(
        accentLine,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, ease: "power3.out" },
        0.2
      );
    }
    // Animate the inner wrapper — NOT the scroll container itself
    if (gsapContent) {
      tl.fromTo(
        gsapContent,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.28
      );
    }

    return () => {
      tl.kill();
      // If timeline was killed early, make sure content is visible
      if (gsapContent) gsap.set(gsapContent, { opacity: 1, y: 0 });
    };
  }, [isVisible]);

  // ── ESC key ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isAnimating) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isAnimating]);

  // ── Close ─────────────────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal || isAnimating) return;

    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setIsAnimating(false);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      },
    });
    tl.to(modal, {
      opacity: 0,
      y: 20,
      scale: 0.96,
      duration: 0.28,
      ease: "power2.in",
    });
    tl.to(
      overlay,
      { opacity: 0, duration: 0.22, ease: "power1.in" },
      0.08
    );
  }, [isAnimating]);

  // ── Form handlers ─────────────────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof PopupErrors]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  }

  function selectType(type: string) {
    setForm((p) => ({ ...p, projectType: type }));
    if (errors.projectType)
      setErrors((p) => ({ ...p, projectType: undefined }));
  }

  function validate() {
    const e: PopupErrors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.mobile.trim()) {
      e.mobile = "Required";
    } else if (!validateMobile(form.mobile)) {
      e.mobile = "Enter valid 10-digit number";
    }
    if (!form.projectType) e.projectType = "Select a type";
    if (!form.description.trim()) e.description = "Required";
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
        `\nProject Details:\n${form.description}\n\nPlease contact me regarding this project.`;
      window.open(
        `https://wa.me/919983853091?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
      setTimeout(() => handleClose(), 700);
    }, 1100);
  }

  if (!isVisible) return null;

  return (
    /* ══════════════════════════════════════════════════════════════════════
       OVERLAY
    ══════════════════════════════════════════════════════════════════════ */
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Book a project with XWEBSITEWALA"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
      }}
    >
      {/* ════════════════════════════════════════════════════════════════════
          MODAL SHELL
          - overflow: hidden (clips to max-height)
          - display: flex + flex-direction: column
          - max-height: 90dvh
      ════════════════════════════════════════════════════════════════════ */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          /* Hard cap at 90% of viewport — works on short laptop screens too */
          maxHeight: "90dvh",
          /* Modal shell clips — inner scroll div scrolls */
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#080808",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 0 80px rgba(0,0,0,0.95)",
        }}
      >
        {/* ── Red accent line (absolute, pointer-events:none) ──────────── */}
        <div
          ref={accentLineRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "#dc2626",
            transformOrigin: "left center",
            zIndex: 30,
            pointerEvents: "none",
          }}
        />

        {/* ════════════════════════════════════════════════════════════════
            NON-SCROLLING HEADER — close button is anchored here
            flex-shrink: 0 means it never gets squashed or scrolled away
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            flexShrink: 0,
            height: "54px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 14px",
            zIndex: 20,
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close popup"
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(220,38,38,0.3)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "rotate(0deg)";
            }}
          >
            {/* White × — always fully visible */}
            <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SCROLLABLE CONTENT AREA
            - flex: 1  →  takes remaining height after header
            - overflow-y: auto  →  scrolls when content is taller
            - -webkit-overflow-scrolling: touch  →  iOS momentum scroll
            - overscroll-behavior: contain  →  no bleed to body
            - padding-bottom: 32px  →  button never jammed at edge
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            /* iOS momentum scroll */
            WebkitOverflowScrolling:
              "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            overscrollBehavior: "contain",
            /* Hide scrollbar visually */
            scrollbarWidth: "none",
            msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
          }}
        >
          {/* ── GSAP fade wrapper — opacity/y animated here, NOT on scroll div */}
          <div
            ref={gsapContentRef}
            style={{ padding: "0 28px 32px 28px" }}
          >
            {submitted ? (
              /* ── SUCCESS STATE ─────────────────────────────────────── */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "40px 0",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid #dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#dc2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: "inherit",
                    fontSize: "9px",
                    fontWeight: 900,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#dc2626",
                    marginBottom: 8,
                  }}
                >
                  ENQUIRY READY
                </p>
                <p
                  style={{
                    fontFamily: "inherit",
                    fontSize: "22px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "#ffffff",
                    lineHeight: 0.95,
                    marginBottom: 12,
                  }}
                >
                  OPENING
                  <br />
                  WHATSAPP…
                </p>
                <p
                  style={{
                    fontFamily: "inherit",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.6,
                    maxWidth: 260,
                  }}
                >
                  Your project details are pre-filled and ready to send.
                </p>
              </div>
            ) : (
              <>
                {/* ── Top label ──────────────────────────────────────── */}
                <div style={{ marginBottom: 16 }}>
                  <p
                    style={{
                      fontFamily: "inherit",
                      fontSize: "9px",
                      fontWeight: 900,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    XWEBSITEWALA / START YOUR PROJECT
                  </p>
                  <div
                    style={{
                      height: 1,
                      width: 32,
                      background: "#dc2626",
                      marginTop: 8,
                    }}
                  />
                </div>

                {/* ── Heading ────────────────────────────────────────── */}
                <h2
                  style={{
                    fontFamily: "inherit",
                    fontSize: "clamp(26px, 6vw, 38px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    lineHeight: 0.9,
                    marginBottom: 8,
                  }}
                >
                  LET'S BUILD
                  <br />
                  <span style={{ color: "#dc2626" }}>YOUR IDEA.</span>
                </h2>

                <p
                  style={{
                    fontFamily: "inherit",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    marginBottom: 24,
                  }}
                >
                  Tell us what you're planning. We'll get back to you on
                  WhatsApp.
                </p>

                {/* ════════════════════════════════════════════════════
                    FORM
                    Everything from name → SEND ENQUIRY is inside this
                    form element. The submit button is the LAST child.
                ════════════════════════════════════════════════════ */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  {/* Name */}
                  <Field label="NAME" error={errors.name}>
                    <input
                      id="pu-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      style={iStyle(!!errors.name)}
                    />
                  </Field>

                  {/* Mobile */}
                  <Field label="MOBILE NUMBER" error={errors.mobile}>
                    <input
                      id="pu-mobile"
                      name="mobile"
                      type="tel"
                      required
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={form.mobile}
                      onChange={handleChange}
                      style={iStyle(!!errors.mobile)}
                    />
                  </Field>

                  {/* Project type */}
                  <div>
                    <p style={labelStyle}>WHAT DO YOU WANT TO BUILD?</p>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {POPUP_PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => selectType(type)}
                          aria-pressed={form.projectType === type}
                          style={{
                            fontFamily: "inherit",
                            fontSize: "9px",
                            fontWeight: 800,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            padding: "7px 11px",
                            border: `1px solid ${
                              form.projectType === type
                                ? "#dc2626"
                                : "rgba(255,255,255,0.12)"
                            }`,
                            background:
                              form.projectType === type
                                ? "#dc2626"
                                : "transparent",
                            color:
                              form.projectType === type
                                ? "#fff"
                                : "rgba(255,255,255,0.45)",
                            cursor: "pointer",
                            transition: "all 0.18s",
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {errors.projectType && (
                      <p style={errStyle}>{errors.projectType}</p>
                    )}
                  </div>

                  {/* Description */}
                  <Field
                    label="ABOUT YOUR PROJECT"
                    error={errors.description}
                  >
                    <textarea
                      id="pu-description"
                      name="description"
                      required
                      rows={3}
                      placeholder="Tell us a little about your project..."
                      value={form.description}
                      onChange={handleChange}
                      style={{ ...iStyle(!!errors.description), resize: "none" }}
                    />
                  </Field>

                  {/* ══════════════════════════════════════════════════
                      SEND ENQUIRY BUTTON
                      type="submit" — triggers handleSubmit on the form
                      This is the LAST element inside <form>
                      It is inside the scroll container so it is always
                      reachable by scrolling down.
                  ══════════════════════════════════════════════════ */}
                  <button
                    type="submit"
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      minHeight: "54px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "#dc2626",
                      color: "#ffffff",
                      fontFamily: "inherit",
                      fontSize: "12px",
                      fontWeight: 900,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.22s",
                      /* Guarantee it is never zero-height or hidden */
                      flexShrink: 0,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#b91c1c";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#dc2626";
                    }}
                  >
                    <span>SEND ENQUIRY</span>
                    <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
                  </button>

                  {/* Helper text below button */}
                  <p
                    style={{
                      fontFamily: "inherit",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                      textAlign: "center",
                      marginTop: "-8px",
                    }}
                  >
                    Quick enquiry · Direct WhatsApp contact
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
        {/* end scrollable area */}
      </div>
      {/* end modal shell */}
    </div>
    /* end overlay */
  );
}

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      {children}
      {error && <p style={errStyle}>{error}</p>}
    </div>
  );
}

// ── Shared style objects ──────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "9px",
  fontWeight: 900,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "6px",
};

const errStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "10px",
  color: "#dc2626",
  marginTop: "4px",
};

function iStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: "#111111",
    border: `1px solid ${
      hasError ? "rgba(220,38,38,0.6)" : "rgba(255,255,255,0.1)"
    }`,
    color: "#ffffff",
    fontSize: "13px",
    fontFamily: "inherit",
    padding: "11px 12px",
    outline: "none",
    transition: "border-color 0.25s",
    boxSizing: "border-box",
  };
}

export default AppointmentPopup;

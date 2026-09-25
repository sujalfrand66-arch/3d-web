import { useState, useEffect } from "react";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { ApproachSection } from "./components/layout/ApproachSection";
import { WhyChooseUsSection } from "./components/layout/WhyChooseUsSection";
import { ProjectsSection } from "./components/layout/ProjectsSection";
import { ServicesSection } from "./components/layout/ServicesSection";

import { FooterSection } from "./components/layout/FooterSection";
import { BookProjectSection } from "./components/layout/BookProjectSection";
import { AppointmentPopup } from "./components/layout/AppointmentPopup";
import { SEO_PAGES } from "./data/seoPages";
import { SeoSubPage } from "./pages/SeoSubPage";

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname.replace(/\/+$/, "") || "/";
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.replace(/\/+$/, "") || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Check if current path matches an SEO subpage
  const normalizedPath = currentPath.startsWith("/") ? currentPath.slice(1) : currentPath;
  const matchedPage = SEO_PAGES.find(
    (p) => p.slug === normalizedPath || `/${p.slug}` === currentPath
  );

  if (matchedPage) {
    return <SeoSubPage page={matchedPage} />;
  }

  // Primary Homepage (100% untouched layout & animations)
  return (
    <SmoothScroll>
      {/* Floating Glass UI Navbar */}
      <Navbar />

      {/* 01 — HERO */}
      <Home />

      {/* 02 — ABOUT (Sujal Frand + Anmol Frand Story + Interactive Tech Cloud) */}
      <ApproachSection />

      {/* 03 — WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* 04 — PROJECTS (Approved Project Cards Animation) */}
      <ProjectsSection />

      {/* 05 — SERVICES (Premium Interactive Service List + Hover Preview) */}
      <ServicesSection />

      {/* 06 — BOOK A PROJECT (Premium Appointment + WhatsApp CTA) */}
      <BookProjectSection />

      {/* 08 — FOOTER (Premium Editorial Footer) */}
      <FooterSection />

      {/* Instagram Ad Flow: Website-entry appointment popup (session-once) */}
      <AppointmentPopup />
    </SmoothScroll>
  );
}

export default App;

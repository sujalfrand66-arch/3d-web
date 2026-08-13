import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { ApproachSection } from "./components/layout/ApproachSection";
import { WhyChooseUsSection } from "./components/layout/WhyChooseUsSection";
import { ProjectsSection } from "./components/layout/ProjectsSection";
import { ServicesSection } from "./components/layout/ServicesSection";
import { VisualStorySection } from "./components/layout/VisualStorySection";
import { FooterSection } from "./components/layout/FooterSection";

function App() {
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

      {/* 06 — PHOTOS / VISUAL STORY */}
      <VisualStorySection />

      {/* 07 — FOOTER (Premium Editorial Footer) */}
      <FooterSection />
    </SmoothScroll>
  );
}

export default App;

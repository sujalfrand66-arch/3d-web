import { SmoothScroll } from "./components/layout/SmoothScroll";
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
      {/* 01 — HERO */}
      <Home />

      {/* 02 — ABOUT (Sujal Frand + Anmol Frand Story + Interactive Tech Cloud) */}
      <ApproachSection />

      {/* 03 — WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* 04 — PROJECTS (Approved Project Cards Animation) */}
      <ProjectsSection />

      {/* 05 — SERVICES */}
      <ServicesSection />

      {/* 06 — PHOTOS / VISUAL STORY */}
      <VisualStorySection />

      {/* 07 — FOOTER */}
      <FooterSection />
    </SmoothScroll>
  );
}

export default App;

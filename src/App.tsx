import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Home } from "./pages/Home";
import { FirstScrollSection } from "./components/layout/FirstScrollSection";
import { ProjectsSection } from "./components/layout/ProjectsSection";
import { ApproachSection } from "./components/layout/ApproachSection";

function App() {
  return (
    <SmoothScroll>
      <Home />
      <FirstScrollSection />
      <ProjectsSection />
      <ApproachSection />
    </SmoothScroll>
  );
}

export default App;


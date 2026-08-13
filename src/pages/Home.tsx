import { HeroOverlay } from "../components/layout/HeroOverlay";

export function Home() {
  return (
    <div className="relative w-full bg-[#F4F3EE]" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <HeroOverlay />
    </div>
  );
}

export default Home;

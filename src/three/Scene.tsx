import { PortfolioCylinder } from "./PortfolioCylinder";
import { CameraRig } from "./CameraRig";

interface SceneProps {
  scrollProgress: { current: number };
}

export function Scene({ scrollProgress }: SceneProps) {
  return (
    <>
      {/* Subtle Ambient base - keeps total pitch black shadows organic */}
      <ambientLight intensity={0.02} />

      {/* Primary Key Light - Soft studio light casting shadows */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2} // Reduced key light to prevent washing out the screens
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />

      {/* Fill Light - Soft cool fill light from the opposite side */}
      <directionalLight
        position={[-6, -4, 2]}
        intensity={0.2}
        color="#a1a1a6"
      />

      {/* Rim Light 1 - Sharp back-left light to catch the rounded bevel edges of the matte panels */}
      <directionalLight
        position={[-5, 5, -8]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Rim Light 2 - Secondary back-right light to catch the right side contours */}
      <directionalLight
        position={[8, 3, -6]}
        intensity={0.8}
        color="#ffffff"
      />

      {/* The Hero Portfolio Cylinder Carousel */}
      <PortfolioCylinder scrollProgress={scrollProgress} />

      {/* Camera Controller Rig */}
      <CameraRig scrollProgress={scrollProgress} />
    </>
  );
}
export default Scene;

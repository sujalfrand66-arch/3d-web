import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

interface SceneCanvasProps {
  scrollProgress: { current: number };
}

export function SceneCanvas({ scrollProgress }: SceneCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-10">
      <Canvas
        shadows
        dpr={[1, 1.5]} // Limit device pixel ratio for smooth rendering
        gl={{
          antialias: true,
          alpha: true, // Allow background text to show behind the cylinder
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{
          fov: 26,  // Tighter telephoto: shows depth but still lets rear panels wrap into view
          near: 0.1,
          far: 35,
          position: [0, 0.25, 15.0], // Matches CameraRig startZ
        }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default SceneCanvas;

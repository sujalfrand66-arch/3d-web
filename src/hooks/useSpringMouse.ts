import { useEffect, useRef } from "react";

interface SpringState {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
}

export function useSpringMouse(stiffness = 8.0, damping = 3.5, mass = 2.0) {
  const mouseState = useRef<SpringState>({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1] relative to window center
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      
      mouseState.current.targetX = x;
      mouseState.current.targetY = y;
    };

    const handleMouseLeave = () => {
      // Return to center when mouse leaves viewport
      mouseState.current.targetX = 0;
      mouseState.current.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Update physics frame-by-frame (call this inside R3F useFrame)
  const update = (dt: number) => {
    // Clamp delta time to avoid physics explosion on low frame rates/tab switching
    const timeStep = Math.min(dt, 0.1);
    const state = mouseState.current;

    // Spring equations: Force = -k * x - c * v
    // Acceleration = Force / mass
    const forceX = (state.targetX - state.currentX) * stiffness - state.vx * damping;
    const forceY = (state.targetY - state.currentY) * stiffness - state.vy * damping;

    const ax = forceX / mass;
    const ay = forceY / mass;

    state.vx += ax * timeStep;
    state.vy += ay * timeStep;

    state.currentX += state.vx * timeStep;
    state.currentY += state.vy * timeStep;

    return {
      x: state.currentX,
      y: state.currentY,
      vx: state.vx,
      vy: state.vy,
    };
  };

  return { mouseState, update };
}

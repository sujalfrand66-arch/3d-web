import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: { current: number };
}

// Reusable vectors placed outside component scope to eliminate per-render allocations
const tempPosition = new THREE.Vector3();
const tempTarget = new THREE.Vector3();

export function CameraRig({ scrollProgress }: CameraRigProps) {
  // Track smoothed mouse position for physical camera movement (heavy premium inertia)
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    const scrollVal = scrollProgress.current;
    const time = state.clock.elapsedTime;

    // 1. Smoothly track and damp the cursor coordinates (reacting to pointer movement)
    // Dynamic premium inertia with a slightly faster damp rate for responsiveness
    smoothedMouse.current.x = THREE.MathUtils.damp(smoothedMouse.current.x, state.pointer.x, 3.8, delta);
    smoothedMouse.current.y = THREE.MathUtils.damp(smoothedMouse.current.y, state.pointer.y, 3.8, delta);

    // True physical camera parallax multipliers.
    // Moving the camera along X/Y axes while looking at the center results in an orbit effect,
    // revealing the thickness of the 3D screens in 3D space.
    const parallaxX = -smoothedMouse.current.x * 3.5;    // orbits left/right to show panel thickness
    const parallaxY = -smoothedMouse.current.y * 2.2;    // orbits up/down to show top/bottom edges

    // 2. Camera positioning based on scroll progress and cinematic page-load entry
    const entryProgress = Math.min(time / 2.2, 1.0);
    const easedEntry = 1.0 - Math.pow(1.0 - entryProgress, 4); // smooth power4 out curve

    const startX = 0;
    const startY = 1.8 - easedEntry * 1.4;  // dolly down from 1.8 to 0.4 (eye level)
    const startZ = 15.0 - easedEntry * 2.8; // dolly in to 12.2 (balanced medium scale)

    // Combine base cinematic trajectory and physical mouse translation
    // Locked camera Z distance eliminates scale jump at Hero end
    const targetX = startX + parallaxX;
    const targetY = startY - scrollVal * 0.08 + parallaxY;
    const targetZ = startZ;

    // 3. Slow organic breathing movement (cinematic float)
    const breathingX = Math.sin(time * 0.4) * 0.03;
    const breathingY = Math.cos(time * 0.35) * 0.025;
    const breathingZ = Math.sin(time * 0.25) * 0.015;

    // Set position and damp for frame-rate independent fluid lag
    tempPosition.set(targetX + breathingX, targetY + breathingY, targetZ + breathingZ);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, tempPosition.x, 6, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, tempPosition.y, 6, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, tempPosition.z, 6, delta);

    // 4. LookAt target positioning (symmetric centering)
    // The camera gimbals to keep looking at the center, creating true perspective shift
    const targetLookAtX = 0;
    const targetLookAtY = -scrollVal * 0.02;
    const targetLookAtZ = 0;

    tempTarget.set(targetLookAtX, targetLookAtY, targetLookAtZ);
    state.camera.lookAt(tempTarget);
  });

  return null;
}

export default CameraRig;

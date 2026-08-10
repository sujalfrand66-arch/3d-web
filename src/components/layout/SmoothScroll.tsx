import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Initialize Lenis with smooth, premium settings
    const lenis = new Lenis({
      duration: 1.2,           // slightly snappier than 1.4 — still luxurious
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential deceleration
      smoothWheel: true,
      wheelMultiplier: 0.9,   // restrained multiplier for precise control
      touchMultiplier: 1.5,
    });

    // Feed Lenis into GSAP ticker — one unified RAF loop
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);

    // Prevent giant delta jumps after tab switches / visibility changes
    // (500ms cap keeps it smooth without hard cutting on normal use)
    gsap.ticker.lagSmoothing(500, 33);

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return <>{children}</>;
}

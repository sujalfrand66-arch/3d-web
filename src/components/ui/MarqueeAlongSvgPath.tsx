import React, { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export interface MarqueeAlongSvgPathProps {
  children: React.ReactNode;
  path?: string;
  baseVelocity?: number;
  repeat?: number;
  className?: string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

const DEFAULT_PATH = "M 1500,280 C 1250,140 1050,420 780,260 C 510,100 300,420 -100,260";

export function MarqueeAlongSvgPath({
  children,
  path = DEFAULT_PATH,
  baseVelocity = 85,
  repeat = 3,
  className = "",
  viewBoxWidth = 1400,
  viewBoxHeight = 550,
}: MarqueeAlongSvgPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const offsetRef = useRef(0);
  const lastTimeRef = useRef(-1);

  const childArray = React.Children.toArray(children);
  const totalItems = childArray.length * repeat;
  const repeatedChildren = Array.from({ length: repeat }, () => childArray).flat();

  useAnimationFrame((now) => {
    const container = containerRef.current;
    const pathEl = pathRef.current;
    if (!container || !pathEl) return;

    if (lastTimeRef.current < 0) lastTimeRef.current = now;
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
    lastTimeRef.current = now;

    const totalLength = pathEl.getTotalLength();
    if (!totalLength || totalLength <= 0) return;

    // Advance continuous travel offset along path
    offsetRef.current = (offsetRef.current + baseVelocity * dt) % totalLength;

    const containerW = container.offsetWidth || window.innerWidth;
    const containerH = container.offsetHeight || window.innerHeight;
    const scaleX = containerW / viewBoxWidth;
    const scaleY = containerH / viewBoxHeight;

    // Equal spacing between all repeated items along path
    const spacing = totalLength / totalItems;

    for (let i = 0; i < totalItems; i++) {
      const el = itemsRef.current[i];
      if (!el) continue;

      // Position item along path (Right -> Left flow)
      const rawDist = spacing * i - offsetRef.current;
      const dist = ((rawDist % totalLength) + totalLength) % totalLength;
      const clampedD = Math.max(0, Math.min(totalLength, dist));

      const pt = pathEl.getPointAtLength(clampedD);
      const ptNext = pathEl.getPointAtLength(Math.min(totalLength, clampedD + 6));

      // Movement vector along path
      const dx = (ptNext.x - pt.x) * scaleX;
      const dy = (ptNext.y - pt.y) * scaleY;

      // Natural tilt along path curve
      const slopeAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      let tilt = slopeAngle > 0 ? slopeAngle - 180 : slopeAngle + 180;
      tilt = Math.max(-15, Math.min(15, tilt));

      const realX = pt.x * scaleX;
      const realY = pt.y * scaleY;

      const halfW = (el.offsetWidth || 180) * 0.5;
      const halfH = (el.offsetHeight || 110) * 0.5;

      // Subtle scale depth based on vertical curve
      const normY = (pt.y - 100) / (viewBoxHeight - 100);
      const scale = 0.92 + Math.max(0, normY) * 0.10;

      // Smooth edge fade at path extremities (x=1500 and x=-100)
      const edgeFade = Math.min(
        Math.min(1, clampedD / 50),
        Math.min(1, (totalLength - clampedD) / 50)
      );

      el.style.transform = `translate3d(${(realX - halfW).toFixed(1)}px, ${(realY - halfH).toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = edgeFade.toFixed(3);
    }
  });

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
        />
      </svg>

      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        {repeatedChildren.map((child, i) => (
          <div
            key={`marquee-item-${i}`}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="absolute top-0 left-0 select-none pointer-events-auto cursor-pointer"
            style={{ willChange: "transform, opacity" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeAlongSvgPath;

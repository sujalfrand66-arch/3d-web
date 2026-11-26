import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── 3D Object Material and Texture Helper ────────────────────────────────────
function createPanelTexture(image: HTMLImageElement): THREE.CanvasTexture {
  const CW = 1280;
  const CH = 720;
  const canvas = document.createElement("canvas");
  canvas.width = CW;
  canvas.height = CH;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CW, CH);

  const iw = image.naturalWidth || image.width || CW;
  const ih = image.naturalHeight || image.height || CH;
  const scale = Math.max(CW / iw, CH / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (CW - dw) / 2;
  const dy = (CH - dh) / 2;
  ctx.drawImage(image, dx, dy, dw, dh);

  // Subtle vignette
  const grad = ctx.createRadialGradient(CW / 2, CH / 2, CH * 0.2, CW / 2, CH / 2, CH * 0.7);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.3)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CW, CH);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// ─── Center 3D Object (Sleek Sculptural Dual Ring) ────────────────────────────
function CenterObject({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const rawTextures = useTexture(["/assets/ed-01.png", "/assets/ed-02.png"]);

  const textures = useMemo(() => {
    return rawTextures.map((t) =>
      t.image ? createPanelTexture(t.image as HTMLImageElement) : t
    );
  }, [rawTextures]);

  const PANEL_R = 2.4;
  const PANEL_H = 1.35;
  const ARC_RAD = (110 / 180) * Math.PI;
  const DEPTH = 0.02;

  const geoFront = useMemo(
    () => new THREE.CylinderGeometry(PANEL_R, PANEL_R, PANEL_H, 64, 1, true, -ARC_RAD / 2, ARC_RAD),
    []
  );

  const screenMat1 = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#000000",
        emissiveMap: textures[0] ?? undefined,
        emissive: new THREE.Color(1, 1, 1),
        emissiveIntensity: 1.35,
        roughness: 0.08,
        metalness: 0.05,
        clearcoat: 0.4,
        clearcoatRoughness: 0.05,
        reflectivity: 0.4,
        toneMapped: true,
        side: THREE.DoubleSide,
      }),
    [textures]
  );

  const screenMat2 = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#000000",
        emissiveMap: textures[1] ?? undefined,
        emissive: new THREE.Color(1, 1, 1),
        emissiveIntensity: 1.35,
        roughness: 0.08,
        metalness: 0.05,
        clearcoat: 0.4,
        clearcoatRoughness: 0.05,
        reflectivity: 0.4,
        toneMapped: true,
        side: THREE.DoubleSide,
      }),
    [textures]
  );

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#060606",
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  const autoRot = useRef(0);
  const scrollRot = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    autoRot.current += delta * 0.03;
    const targetScroll = (scrollProgress.current ?? 0) * Math.PI * 2.5;

    // Smooth frame-rate independent rotation response to scroll
    scrollRot.current = THREE.MathUtils.damp(scrollRot.current, targetScroll, 10, delta);

    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.02;

    // Responsive 3D Object Scale for mobile viewports
    const vpW = state.viewport.width;
    const targetScale = vpW < 6.5 ? (vpW < 4.2 ? 0.52 : 0.68) : 1.0;
    groupRef.current.scale.setScalar(targetScale);

    // Controlled rotation around Y with subtle tilt
    groupRef.current.rotation.y = autoRot.current + scrollRot.current;
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, Math.sin(t * 0.2) * 0.03, 5, delta);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Panel 1 */}
      <group rotation={[0, 0, 0]}>
        <mesh geometry={geoFront} material={screenMat1} />
        <mesh material={bodyMat} position={[0, 0, -DEPTH / 2]}>
          <boxGeometry args={[PANEL_R * 1.5, PANEL_H, DEPTH]} />
        </mesh>
      </group>

      {/* Panel 2 (Counter-rotated for sculptural 3D composition) */}
      <group rotation={[0, Math.PI, 0]}>
        <mesh geometry={geoFront} material={screenMat2} />
        <mesh material={bodyMat} position={[0, 0, -DEPTH / 2]}>
          <boxGeometry args={[PANEL_R * 1.5, PANEL_H, DEPTH]} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Main CreativeSection Component ──────────────────────────────────────────
export function CreativeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const textRow1Ref = useRef<HTMLDivElement>(null);
  const textRow2Ref = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const circleImgRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin section for scroll experience
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;

          // Spotlight opacity variation (fades in as object reaches center rotation)
          if (spotlightRef.current) {
            const p = self.progress;
            const spotlightOpacity = 0.1 + Math.sin(p * Math.PI) * 0.45;
            spotlightRef.current.style.opacity = spotlightOpacity.toFixed(3);
          }
        },
      });

      // Scroll-driven typography & element animations (GSAP Scrub)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 1,
        },
      });

      // Phase 01–03: Reveal large background typography with clip-path mask & translation
      tl.fromTo(
        textRow1Ref.current,
        {
          x: -100,
          opacity: 0,
          clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)",
        },
        {
          x: 40,
          opacity: 0.18,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power2.out",
          duration: 0.4,
        },
        0
      );

      tl.fromTo(
        textRow2Ref.current,
        {
          x: 100,
          opacity: 0,
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        },
        {
          x: -40,
          opacity: 0.18,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power2.out",
          duration: 0.4,
        },
        0.1
      );

      // Phase 05–06: Overlay typography depth shift across composition
      tl.fromTo(
        overlayTextRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 0.85, scale: 1.0, ease: "power3.out", duration: 0.5 },
        0.3
      );

      // Phase 07: Small circular image parallax movement
      tl.fromTo(
        circleImgRef.current,
        { y: 70, opacity: 0, scale: 0.8 },
        { y: -20, opacity: 1, scale: 1.0, ease: "power2.out", duration: 0.4 },
        0.35
      );

      // Phase 07: Metadata reveal
      tl.fromTo(
        metadataRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.2
      );

      // Phase 08: Bottom buttons reveal
      tl.fromTo(
        buttonsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out", duration: 0.3 },
        0.55
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="creative-craft"
      className="relative w-full bg-black text-white overflow-hidden select-none"
    >
      <div
        ref={stickyRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 z-10"
      >
        {/* ── Spotlight Highlight (Subtle reflection behind central object) ── */}
        <div
          ref={spotlightRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)",
            opacity: 0.1,
            filter: "blur(40px)",
          }}
        />

        {/* ── Top Small Metadata ── */}
        <div
          ref={metadataRef}
          className="w-full flex justify-between items-start text-[9px] md:text-[10px] tracking-[0.35em] font-sans uppercase text-white/40 z-30 pointer-events-none"
        >
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-white/70">02 // SPATIAL ARCHITECTURE</span>
            <span className="text-[8px] text-white/30">XWEBSITEWALA LABS</span>
          </div>
          <div className="flex gap-8">
            <span>2025 — 2026</span>
            <span>INDIA</span>
          </div>
        </div>

        {/* ── Background Editorial Outlined Typography (Interacts in Depth) ── */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 overflow-hidden px-4">
          <div
            ref={textRow1Ref}
            className="font-display font-black text-[11vw] leading-[0.85] text-stroke text-white/10 uppercase tracking-[0.18em] whitespace-nowrap"
          >
            WEB EXPERIENCES
          </div>
          <div
            ref={textRow2Ref}
            className="font-display font-black text-[11vw] leading-[0.85] text-stroke text-white/10 uppercase tracking-[0.18em] whitespace-nowrap mt-2"
          >
            DIGITAL CRAFT
          </div>
        </div>

        {/* ── Center 3D Canvas (Rotates continuously on scroll) ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <Canvas
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{
              fov: 28,
              near: 0.1,
              far: 30,
              position: [0, 0, 9.5],
            }}
            className="w-full h-full"
          >
            <ambientLight intensity={0.02} />
            <directionalLight position={[5, 6, 4]} intensity={1.2} />
            <directionalLight position={[-5, -4, 2]} intensity={0.25} color="#a0a0b5" />
            <directionalLight position={[0, 4, -6]} intensity={0.8} color="#ffffff" />
            <CenterObject scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* ── Foreground Overlay Accent Typography (Front Depth Layer) ── */}
        <div
          ref={overlayTextRef}
          className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-30"
        >
          <p className="text-[10px] md:text-[12px] tracking-[0.45em] uppercase text-white/60 font-sans font-light">
            CREATIVE DIRECTION & ARCHITECTURE
          </p>
        </div>

        {/* ── Bottom Section Layout (Circular Image + Minimal Buttons) ── */}
        <div className="w-full flex justify-between items-end z-30 pointer-events-auto">
          {/* Small Circular Image (80-120px) with scroll parallax */}
          <div
            ref={circleImgRef}
            className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/20 shadow-2xl relative group bg-neutral-950 flex items-center justify-center p-0.5"
          >
            <img
              src="/assets/ed-01.png"
              alt="Editorial Visual"
              className="w-full h-full rounded-full object-cover grayscale opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
          </div>

          {/* Bottom Minimal Buttons */}
          <div ref={buttonsRef} className="flex gap-3 md:gap-5">
            <button className="px-5 py-2.5 md:px-7 md:py-3 border border-white/20 hover:border-white/70 bg-black/50 backdrop-blur-md text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              [ VIEW WORK ]
            </button>
            <button className="px-5 py-2.5 md:px-7 md:py-3 border border-white/20 hover:border-white/70 bg-black/50 backdrop-blur-md text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              [ LET'S TALK ]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreativeSection;

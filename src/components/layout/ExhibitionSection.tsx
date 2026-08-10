import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function createScreenTexture(image: HTMLImageElement, w: number, h: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);

  const iw = image.naturalWidth || image.width || w;
  const ih = image.naturalHeight || image.height || h;
  const scale = Math.max(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (w - dw) / 2;
  const dy = (h - dh) / 2;
  ctx.drawImage(image, dx, dy, dw, dh);

  // Subtle vignette
  const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.75);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.18)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// ─── Object 01: Thin vertical OLED panel ──────────────────────────────────────
function VerticalPanel({ texture }: { texture: THREE.Texture | null }) {
  const W = 0.72;  // width  — thin vertical slab
  const H = 1.32;  // height
  const D = 0.014; // almost zero depth (ultra-thin OLED)


  const screenMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#000000",
    emissive: new THREE.Color(1, 1, 1),
    emissiveMap: texture ?? undefined,
    emissiveIntensity: texture ? 1.3 : 0.02,
    roughness: 0.06,
    metalness: 0.02,
    clearcoat: 0.4,
    clearcoatRoughness: 0.04,
    reflectivity: 0.3,
    toneMapped: true,
  }), [texture]);

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#070707",
    roughness: 0.92,
    metalness: 0.03,
  }), []);

  // Simple box approximating a thin OLED slab — no heavy geometry
  return (
    <group>
      {/* Screen face */}
      <mesh position={[0, 0, D / 2 + 0.0001]} material={screenMat}>
        <planeGeometry args={[W, H]} />
      </mesh>
      {/* Matte frame body */}
      <mesh material={bodyMat}>
        <boxGeometry args={[W, H, D]} />
      </mesh>
    </group>
  );
}

// ─── Object 02: Huge curved OLED wall ────────────────────────────────────────
// A curved CylinderGeometry arc — wide, shallow curve, monumental
function CurvedWall({ texture }: { texture: THREE.Texture | null }) {
  const WALL_R    = 9.2;    // large radius → gentle wide curve
  const WALL_H    = 2.6;    // tall enough to fill view
  const ARC_DEG   = 52;     // degrees of arc — wide but not full cylinder
  const ARC_RAD   = (ARC_DEG / 180) * Math.PI;
  const DEPTH     = 0.018;  // ultra-thin

  const screenGeo = useMemo(() => new THREE.CylinderGeometry(
    WALL_R, WALL_R, WALL_H, 128, 1, true, -ARC_RAD / 2, ARC_RAD
  ), []);

  // flip UVs on the back face for a back-plane
  const backGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(
      WALL_R - DEPTH, WALL_R - DEPTH, WALL_H, 128, 1, true, -ARC_RAD / 2, ARC_RAD
    );
    const uv = g.getAttribute("uv") as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
    uv.needsUpdate = true;
    return g;
  }, []);

  const edgeRingGeo = useMemo(() => {
    const g = new THREE.RingGeometry(WALL_R - DEPTH, WALL_R, 128, 1,
      (3 * Math.PI) / 2 - ARC_RAD / 2, ARC_RAD);
    return g;
  }, []);

  const screenMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#000000",
    emissive: new THREE.Color(1, 1, 1),
    emissiveMap: texture ?? undefined,
    emissiveIntensity: texture ? 1.2 : 0.02,
    roughness: 0.05,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.03,
    reflectivity: 0.28,
    toneMapped: true,
    side: THREE.FrontSide,
  }), [texture]);

  const edgeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#060606",
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide,
  }), []);

  // Top / Bottom caps
  const topCapGeo = useMemo(() => {
    const g = edgeRingGeo.clone();
    g.rotateX(-Math.PI / 2);
    g.translate(0, WALL_H / 2, 0);
    return g;
  }, [edgeRingGeo]);

  const botCapGeo = useMemo(() => {
    const g = edgeRingGeo.clone();
    g.rotateX(Math.PI / 2);
    g.translate(0, -WALL_H / 2, 0);
    return g;
  }, [edgeRingGeo]);

  return (
    <group>
      <mesh geometry={screenGeo} material={screenMat} />
      <mesh geometry={backGeo} material={screenMat} />
      <mesh geometry={topCapGeo} material={edgeMat} />
      <mesh geometry={botCapGeo} material={edgeMat} />
    </group>
  );
}

// ─── Scene Lights ─────────────────────────────────────────────────────────────
function ExhibitionLights() {
  return (
    <>
      {/* Minimal ambient — OLED panels are self-lit */}
      <ambientLight intensity={0.015} />
      {/* Subtle key from top-left */}
      <directionalLight position={[-4, 6, 4]} intensity={0.6} color="#ffffff" />
      {/* Soft fill right */}
      <directionalLight position={[6, -2, 3]} intensity={0.15} color="#a0a0b0" />
      {/* Rear rim — catches very thin edges */}
      <directionalLight position={[0, 4, -8]} intensity={0.4} color="#ffffff" />
    </>
  );
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────
interface CameraRigProps {
  scrollProgress: React.RefObject<number>;
  revealProgress: React.RefObject<number>;
}

function ExhibitionCamera({ scrollProgress, revealProgress }: CameraRigProps) {
  const { camera } = useThree();
  const smoothMouse = useRef(new THREE.Vector2(0, 0));
  const targetPos   = useRef(new THREE.Vector3(0, 0, 8));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth)  * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      smoothMouse.current.set(nx, ny);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const reveal = revealProgress.current;
    const scroll = scrollProgress.current;

    // Very gentle lerp on mouse — cinematic inertia
    const mx = THREE.MathUtils.damp(0, smoothMouse.current.x, 2.5, delta);
    const my = THREE.MathUtils.damp(0, smoothMouse.current.y, 2.5, delta);

    // Camera slides in on reveal (from far to resting position)
    const baseZ = 7.5 - reveal * 1.2;
    // Scroll: very slight dolly forward + slight lift
    const scrollZ = scroll * 0.8;
    const scrollY = scroll * 0.05;

    // Mouse: ultra-subtle — only 0.12 units max
    const camX = mx * 0.12;
    const camY = -my * 0.08 + 0.08;

    targetPos.current.set(camX, camY - scrollY, baseZ - scrollZ);
    camera.position.lerp(targetPos.current, 0.04);

    // Always look at origin
    camera.lookAt(0.3, 0, 0);
    camera.updateMatrixWorld();
  });

  return null;
}

// ─── Main 3D Scene ───────────────────────────────────────────────────────────
interface ExhibitionSceneProps {
  scrollProgress: React.RefObject<number>;
  revealProgress: React.RefObject<number>;
}

function ExhibitionScene({ scrollProgress, revealProgress }: ExhibitionSceneProps) {
  const textures = useTexture(["/assets/exhibit-vertical.png", "/assets/exhibit-wide.png"]);

  const verticalTex = useMemo(
    () => textures[0].image ? createScreenTexture(textures[0].image as HTMLImageElement, 720, 1280) : null,
    [textures]
  );
  const wideTex = useMemo(
    () => textures[1].image ? createScreenTexture(textures[1].image as HTMLImageElement, 2560, 1440) : null,
    [textures]
  );

  const groupRef = useRef<THREE.Group>(null);
  const revealRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Animate group reveal — everything rises up on scroll trigger
    const target = revealProgress.current;
    revealRef.current = THREE.MathUtils.damp(revealRef.current, target, 1.8, delta);

    // Subtle float breathing
    const t = performance.now() * 0.001;
    groupRef.current.position.y = Math.sin(t * 0.28) * 0.018;
  });

  return (
    <group ref={groupRef}>
      <ExhibitionLights />

      {/* Object 01 — thin vertical panel, LEFT, balanced */}
      {/* Positioned slightly left and slightly behind for depth */}
      <group position={[-2.8, 0.05, 0.5]}>
        <VerticalPanel texture={verticalTex} />
      </group>

      {/* Object 02 — huge curved OLED wall, RIGHT, hero */}
      {/* Positioned center-right, arc facing camera */}
      <group position={[1.4, 0, 0]}>
        <CurvedWall texture={wideTex} />
      </group>

      <ExhibitionCamera scrollProgress={scrollProgress} revealProgress={revealProgress} />
    </group>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
export function ExhibitionSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const revealProgress = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Track section scroll for subtle camera dolly
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // Reveal trigger — fires once when section enters viewport
    const revealTrigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
      onEnter: () => {
        gsap.to(revealProgress, {
          current: 1,
          duration: 2.8,
          ease: "expo.out",
        });
      },
    });

    return () => {
      trigger.kill();
      revealTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exhibition"
      className="relative w-full bg-black"
      style={{ height: "100vh" }}
    >
      {/* ── Floating label — ultra small, top-left ── */}
      <div
        className="absolute top-10 left-10 z-20 pointer-events-none select-none"
        style={{ mixBlendMode: "normal" }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "9px",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
          }}
        >
          02 &nbsp;/&nbsp; SPATIAL EXHIBITION
        </span>
      </div>

      {/* ── Object index labels — editorial ── */}
      <div
        className="absolute bottom-10 left-10 z-20 pointer-events-none select-none flex flex-col gap-1"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "8px",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.16)",
          }}
        >
          OBJ_01 — VERTICAL OLED
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "8px",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.16)",
          }}
        >
          OBJ_02 — CURVED WALL
        </span>
      </div>

      {/* ── Three.js Canvas ── */}
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{
          fov: 32,
          near: 0.1,
          far: 60,
          position: [0, 0.08, 7.5],
        }}
        style={{ background: "#000000" }}
      >
        <ExhibitionScene
          scrollProgress={scrollProgress as React.RefObject<number>}
          revealProgress={revealProgress as React.RefObject<number>}
        />
      </Canvas>
    </section>
  );
}

export default ExhibitionSection;

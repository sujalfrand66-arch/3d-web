import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface PortfolioCylinderProps {
  scrollProgress: { current: number };
}

// ─────────────────────────────────────────────────────────────────────────────
// BEZEL CANVAS TEXTURE  –  strict contain-fit, never crops, never stretches
// Canvas is exactly 16:9 (1280×720). Image is scaled-down to fit fully inside.
// ─────────────────────────────────────────────────────────────────────────────
function createBezelTexture(image: HTMLImageElement): THREE.CanvasTexture {
  const CW = 1280;
  const CH = 720;

  const canvas = document.createElement("canvas");
  canvas.width  = CW;
  canvas.height = CH;
  const ctx = canvas.getContext("2d")!;

  // 1. Full black backing
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CW, CH);

  // 2. Rounded-rect clip for the edge (subtle rounding)
  rrect(ctx, 0, 0, CW, CH, 16);
  ctx.clip();

  // 3. Draw black backing in clipped region
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, CW, CH);

  // 4. CONTAIN-FIT: scale image to fit fully inside the CW × CH canvas, edge-to-edge
  const sx = 0, sy = 0, sw = CW, sh = CH;
  const iw = image.naturalWidth  || image.width  || CW;
  const ih = image.naturalHeight || image.height || CH;
  const scale = Math.min(sw / iw, sh / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = sx + (sw - dw) / 2;
  const dy = sy + (sh - dh) / 2;
  ctx.drawImage(image, dx, dy, dw, dh);

  // 5. Subtle vignette for premium OLED depth
  const grad = ctx.createRadialGradient(CW / 2, CH / 2, CH * 0.2, CW / 2, CH / 2, CH * 0.7);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CW, CH);

  // 6. Ultra-thin highlight rim at the top of the panel
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(12, 0, CW - 24, 1.5);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter     = THREE.LinearMipmapLinearFilter;
  tex.magFilter     = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy    = 16;
  tex.colorSpace    = THREE.SRGBColorSpace;
  tex.needsUpdate   = true;
  return tex;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x,     y + h, x,     y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x,     y,     x + r, y);
  ctx.closePath();
}
// ─────────────────────────────────────────────────────────────────────────────
// RING CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const N          = 3;                              // exactly three panels
const R          = 2.8;                            // ring radius – rear panels stay visible around sides
const ARC_DEG    = 116;                            // degrees per panel (2° gap each side)
const ARC_RAD    = (ARC_DEG / 180) * Math.PI;
// Panel height derived so the face arc is exactly 16:9:
//   chord = 2·R·sin(arc/2)   →  H = chord / (16/9)
const CHORD      = 2 * R * Math.sin(ARC_RAD / 2);
const PANEL_H    = CHORD / (16 / 9);
const DEPTH      = 0.022;                          // OLED display edge thickness

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function PortfolioCylinder({ scrollProgress }: PortfolioCylinderProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Raw textures
  const raw = useTexture(["/assets/cube1.png", "/assets/cube2.png", "/assets/cube3.png"]);

  // Process into 16:9 bezel canvas textures (contain-fit)
  const screenTextures = useMemo(
    () => raw.map((t) => (t.image ? createBezelTexture(t.image as HTMLImageElement) : t)),
    [raw]
  );

  // ── Geometries ─────────────────────────────────────────────────────────────
  
  // Front Screen (outward facing)
  const frontScreenGeo = useMemo(() => {
    return new THREE.CylinderGeometry(
      R,
      R,
      PANEL_H,
      64,
      1,
      true,
      -ARC_RAD / 2,
      ARC_RAD
    );
  }, []);

  // Back Screen (inward facing, readable U-flip texture)
  const backScreenGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      R - DEPTH,
      R - DEPTH,
      PANEL_H,
      64,
      1,
      true,
      -ARC_RAD / 2,
      ARC_RAD
    );
    // Flip U coordinates so the back screen website content reads left-to-right (readable, not mirrored)
    const uv = geo.getAttribute("uv") as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) {
      uv.setX(i, 1 - uv.getX(i));
    }
    uv.needsUpdate = true;
    return geo;
  }, []);

  // Top cap sealing the panel
  const topFrameGeo = useMemo(() => {
    const geo = new THREE.RingGeometry(
      R - DEPTH,
      R,
      64,
      1,
      (3 * Math.PI) / 2 - ARC_RAD / 2,
      ARC_RAD
    );
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, PANEL_H / 2, 0);
    return geo;
  }, []);

  // Bottom cap sealing the panel
  const bottomFrameGeo = useMemo(() => {
    const geo = new THREE.RingGeometry(
      R - DEPTH,
      R,
      64,
      1,
      (3 * Math.PI) / 2 - ARC_RAD / 2,
      ARC_RAD
    );
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -PANEL_H / 2, 0);
    return geo;
  }, []);

  // Left flat edge closure
  const leftFrameGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(DEPTH, PANEL_H);
    const theta = -ARC_RAD / 2;
    const rBar = R - DEPTH / 2;
    geo.rotateY(theta + Math.PI / 2);
    geo.translate(rBar * Math.sin(theta), 0, rBar * Math.cos(theta));
    return geo;
  }, []);

  // Right flat edge closure
  const rightFrameGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(DEPTH, PANEL_H);
    const theta = ARC_RAD / 2;
    const rBar = R - DEPTH / 2;
    geo.rotateY(theta + Math.PI / 2);
    geo.translate(rBar * Math.sin(theta), 0, rBar * Math.cos(theta));
    return geo;
  }, []);

  // Front Glass overlay
  const frontGlassGeo = useMemo(() => {
    const gap = 0.0005; // 0.5mm proud of the screen
    return new THREE.CylinderGeometry(
      R + gap,
      R + gap,
      PANEL_H,
      64,
      1,
      true,
      -ARC_RAD / 2,
      ARC_RAD
    );
  }, []);

  // Back Glass overlay
  const backGlassGeo = useMemo(() => {
    const gap = 0.0005; // 0.5mm proud of the screen
    return new THREE.CylinderGeometry(
      R - DEPTH - gap,
      R - DEPTH - gap,
      PANEL_H,
      64,
      1,
      true,
      -ARC_RAD / 2,
      ARC_RAD
    );
  }, []);

  // ── Materials ──────────────────────────────────────────────────────────────
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:     "#060606",
    roughness: 0.95,
    metalness: 0.0,
    side:      THREE.DoubleSide, // back of panel = same matte-black frame on both sides
  }), []);

  // Screen material – DoubleSide so the back face shows the SAME screenshot
  // Texture is baked once in useMemo and NEVER touched in useFrame (static print).
  const screenMats = useMemo(() => screenTextures.map(
    (tex) => new THREE.MeshPhysicalMaterial({
      color:              "#000000",
      emissiveMap:        tex,          // static – never animated
      emissive:           new THREE.Color(1, 1, 1),
      emissiveIntensity:  1.4,
      roughness:          0.08,
      metalness:          0.05,
      clearcoat:          0.35,
      clearcoatRoughness: 0.06,
      reflectivity:       0.45,
      toneMapped:         true,
      side:               THREE.DoubleSide, // ← back face mirrors front screenshot
    })
  ), [screenTextures]);

  // Glass overlay material – very subtle; only a whisper of reflection at grazing angle
  // No emissive, no bloom, no colour. Pure physical glass coat.
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              "#ffffff",
    transparent:        true,
    opacity:            0.0,           // fully transparent colour channel
    roughness:          0.0,           // mirror-smooth glass
    metalness:          0.0,
    clearcoat:          1.0,           // full physical clearcoat
    clearcoatRoughness: 0.0,           // optically perfect surface
    reflectivity:       0.04,          // 4% Fresnel at normal incidence → barely visible
    envMapIntensity:    0.18,          // environment reflection strength
    side:               THREE.DoubleSide, // both sides of glass layers render correctly
    depthWrite:         false,         // don't write depth (transparent overlay)
  }), []);

  const autoRot   = useRef(0);
  const scrollRot = useRef(0);

  // Clean up WebGL resources on unmount to prevent VRAM memory leaks
  useEffect(() => {
    return () => {
      frontScreenGeo.dispose();
      backScreenGeo.dispose();
      topFrameGeo.dispose();
      bottomFrameGeo.dispose();
      leftFrameGeo.dispose();
      rightFrameGeo.dispose();
      frontGlassGeo.dispose();
      backGlassGeo.dispose();
      bodyMat.dispose();
      glassMat.dispose();
      screenMats.forEach((m) => m.dispose());
      screenTextures.forEach((t) => t.dispose());
    };
  }, [
    frontScreenGeo,
    backScreenGeo,
    topFrameGeo,
    bottomFrameGeo,
    leftFrameGeo,
    rightFrameGeo,
    frontGlassGeo,
    backGlassGeo,
    bodyMat,
    glassMat,
    screenMats,
    screenTextures,
  ]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    autoRot.current += delta * 0.04;

    const targetScroll = scrollProgress.current * Math.PI * 2;
    // Single responsive frame-rate independent damp for immediate, continuous scroll tracking
    scrollRot.current = THREE.MathUtils.damp(scrollRot.current, targetScroll, 12, delta);

    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.025;

    // Direct Y assignment eliminates double-lerp lag and stutter during slow scrolling
    groupRef.current.rotation.y = autoRot.current + scrollRot.current;

    // Uniform responsive scaling: Desktop stays locked at 0.86, mobile viewports fit naturally
    const vpW = state.viewport.width;
    const responsiveScale = vpW < 5.8 ? 0.86 * (vpW / 5.8) : 0.86;
    groupRef.current.scale.setScalar(responsiveScale);
  });

  // ── Panel placement ────────────────────────────────────────────────────────
  // The CylinderGeometry arc is centred at Y-axis, arc centred at Z=+R (theta=0).
  // This means at theta=0, the arc's midpoint faces +Z (toward camera at Z=9.2).
  // Each panel group is rotated by (i/3)*2π around Y to space them evenly.
  // Panel 0 at rotation=0 faces +Z (toward camera). ✓
  return (
    <group ref={groupRef} scale={0.86}>
      {screenMats.map((_, i) => {
        const rotY = (i / N) * Math.PI * 2; // 0°, 120°, 240°
        return (
          <group key={i} rotation={[0, rotY, 0]}>
            {/* Front Screen (outward facing) */}
            <mesh geometry={frontScreenGeo} material={screenMats[i]} castShadow receiveShadow />
            {/* Back Screen (inward facing, readable U-flip texture) */}
            <mesh geometry={backScreenGeo} material={screenMats[i]} castShadow receiveShadow />

            {/* Premium Matte-Black Edge bezels/frame enclosing the sides */}
            <mesh geometry={topFrameGeo} material={bodyMat} />
            <mesh geometry={bottomFrameGeo} material={bodyMat} />
            {/* Left and Right edge caps are pre-rotated and translated */}
            <mesh geometry={leftFrameGeo} material={bodyMat} />
            <mesh geometry={rightFrameGeo} material={bodyMat} />

            {/* Front and Back Glass overlays for grazing-angle reflections */}
            <mesh geometry={frontGlassGeo} material={glassMat} />
            <mesh geometry={backGlassGeo} material={glassMat} />
          </group>
        );
      })}
    </group>
  );
}

export default PortfolioCylinder;

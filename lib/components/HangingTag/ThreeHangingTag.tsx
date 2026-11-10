"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ThreeHangingTagProps = {
  label: string;
  pin?: "orange" | "dark";
};

/**
 * Creates a 2D rounded rectangle shape for 3D extrusion with true rounded corners
 */
function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

/**
 * Creates Ultra-HD 4K canvas textures for front & back with pixel-perfect typography
 */
function createCardTextures(label: string, isDark: boolean, maxAnisotropy = 16) {
  const width = 2048;
  const height = 820;

  // --- Front Canvas ---
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = width;
  frontCanvas.height = height;
  const ctx = frontCanvas.getContext("2d", { alpha: true })!;

  const radius = 64;
  const pad = 24;

  // Background rounded rect
  ctx.fillStyle = "#07080f";
  ctx.beginPath();
  ctx.roundRect(pad, pad, width - pad * 2, height - pad * 2, radius);
  ctx.fill();

  // Dashed border (sharp high-res vector stroke in clean white)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 15;
  ctx.setLineDash([36, 24]);
  ctx.stroke();

  // Eyelet ring at top center
  ctx.setLineDash([]);
  const eyeletX = width / 2;
  const eyeletY = pad + 70;

  // Eyelet outer shadow / ring
  ctx.fillStyle = "#07080f";
  ctx.beginPath();
  ctx.arc(eyeletX, eyeletY, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 9;
  ctx.stroke();

  // Eyelet inner hole
  ctx.fillStyle = "#e0e2ec";
  ctx.beginPath();
  ctx.arc(eyeletX, eyeletY, 14, 0, Math.PI * 2);
  ctx.fill();

  // Label text with crisp typography in bright white and larger font size
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '800 165px "Syne", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(label, width / 2, height / 2 + 56);

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.generateMipmaps = true;
  frontTexture.minFilter = THREE.LinearMipmapLinearFilter;
  frontTexture.magFilter = THREE.LinearFilter;
  frontTexture.anisotropy = maxAnisotropy;

  // --- Back Canvas ---
  const backCanvas = document.createElement("canvas");
  backCanvas.width = width;
  backCanvas.height = height;
  const bCtx = backCanvas.getContext("2d", { alpha: true })!;

  bCtx.fillStyle = "#07080f";
  bCtx.beginPath();
  bCtx.roundRect(pad, pad, width - pad * 2, height - pad * 2, radius);
  bCtx.fill();

  bCtx.strokeStyle = "#ffffff";
  bCtx.lineWidth = 15;
  bCtx.setLineDash([36, 24]);
  bCtx.stroke();

  // Back monogram
  bCtx.setLineDash([]);
  bCtx.fillStyle = "#ffffff";
  bCtx.textAlign = "center";
  bCtx.textBaseline = "middle";
  bCtx.font = '800 190px "Syne", -apple-system, BlinkMacSystemFont, sans-serif';
  bCtx.fillText("A", width / 2, height / 2 + 20);

  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.generateMipmaps = true;
  backTexture.minFilter = THREE.LinearMipmapLinearFilter;
  backTexture.magFilter = THREE.LinearFilter;
  backTexture.anisotropy = maxAnisotropy;

  return { frontTexture, backTexture };
}

export function ThreeHangingTag({ label, pin = "orange" }: ThreeHangingTagProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mountRef.current) return;

    let destroyed = false;
    const container = mountRef.current;
    const width = 280;
    const height = 300;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // --- High-Performance Renderer with Anti-Aliasing ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // --- Professional 3-Point Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfff0e4, 0.9);
    fillLight.position.set(-3, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff7722, 0.7);
    rimLight.position.set(0, -4, 2);
    scene.add(rimLight);

    // --- Anchor Pin (Realistic Spherical Cap + Shadow) ---
    const anchorY = 2.1;
    const isDark = pin === "dark";

    const pinGroup = new THREE.Group();
    pinGroup.position.set(0, anchorY, 0.05);

    // Pin head (smooth glossy sphere)
    const pinGeo = new THREE.SphereGeometry(0.12, 48, 48);
    const pinMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x24242a : 0xf47025,
      metalness: 0.35,
      roughness: 0.18,
    });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinGroup.add(pinMesh);

    // Pin soft drop shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d")!;
    const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(7, 8, 15, 0.45)");
    grad.addColorStop(0.5, "rgba(7, 8, 15, 0.18)");
    grad.addColorStop(1, "rgba(7, 8, 15, 0)");
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(0.34, 0.34);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0.04, -0.04, -0.04);
    pinGroup.add(shadowMesh);

    scene.add(pinGroup);

    // --- Card Mesh with True Rounded Beveled Geometry ---
    const cardW = 2.45;
    const cardH = 0.98;
    const cardCornerRadius = 0.14;
    const cardThickness = 0.035;

    const roundedShape = createRoundedRectShape(cardW, cardH, cardCornerRadius);
    const cardGeo = new THREE.ExtrudeGeometry(roundedShape, {
      depth: cardThickness,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    cardGeo.center();

    // Generate UVs for custom planar mapping on front and back faces
    const posAttr = cardGeo.attributes.position;
    const uvAttr = cardGeo.attributes.uv;
    for (let i = 0; i < posAttr.count; i++) {
      const u = (posAttr.getX(i) + cardW / 2) / cardW;
      const v = (posAttr.getY(i) + cardH / 2) / cardH;
      uvAttr.setXY(i, u, v);
    }
    uvAttr.needsUpdate = true;

    // Materials
    let frontTexture: THREE.CanvasTexture | null = null;
    let backTexture: THREE.CanvasTexture | null = null;

    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x07080f,
      roughness: 0.35,
      metalness: 0.2,
    });

    const frontMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.28,
      metalness: 0.12,
      clearcoat: 0.15,
      clearcoatRoughness: 0.2,
    });

    const backMat = new THREE.MeshStandardMaterial({
      roughness: 0.28,
      metalness: 0.12,
    });

    // Face 0: Front & Back planar, Face 1: Bevel & Edges
    const cardMesh = new THREE.Mesh(cardGeo, [frontMat, edgeMat]);
    scene.add(cardMesh);

    // Load fonts and initialize ultra-crisp textures
    const setupTextures = () => {
      const tex = createCardTextures(label, isDark, maxAnisotropy);
      frontTexture = tex.frontTexture;
      backTexture = tex.backTexture;
      frontMat.map = frontTexture;
      frontMat.needsUpdate = true;
      backMat.map = backTexture;
      backMat.needsUpdate = true;
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!destroyed) setupTextures();
      });
    } else {
      setupTextures();
    }

    // --- Dynamic Stretchable String (High-Poly Tube) ---
    let stringMesh: THREE.Mesh | null = null;
    const stringMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d14,
      roughness: 0.45,
      metalness: 0.3,
    });

    function updateString() {
      if (stringMesh) {
        scene.remove(stringMesh);
        stringMesh.geometry.dispose();
      }

      cardMesh.updateMatrixWorld(true);

      const p0 = new THREE.Vector3(0, anchorY, 0.02);

      // Exact world position of the eyelet on the card, accounting for 3D rotation and tilt
      const eyeletLocal = new THREE.Vector3(0, cardH / 2 - 0.02, 0.015);
      eyeletLocal.applyMatrix4(cardMesh.matrixWorld);
      const p2 = eyeletLocal;

      const dist = p0.distanceTo(p2);
      // Natural slight catenary curve when compressed, straight taut cord when stretched
      const slack = Math.max(0, 1.85 - dist) * 0.12;
      const p1 = new THREE.Vector3(
        (p0.x + p2.x) / 2,
        (p0.y + p2.y) / 2 - slack,
        (p0.z + p2.z) / 2
      );

      const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
      // Elastic thinning: cord subtly narrows as it stretches
      const radius = Math.max(0.013, 0.02 - (dist - 1.85) * 0.006);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, radius, 12, false);

      stringMesh = new THREE.Mesh(tubeGeo, stringMat);
      scene.add(stringMesh);
    }

    // --- Physics Simulation Variables ---
    const restY = 0.32;
    const pos = new THREE.Vector3(0, restY, 0);
    const vel = new THREE.Vector3(0, 0, 0);
    const rot = new THREE.Euler(0, 0, -0.09); // -5.2 degree authentic resting slant
    const rotVel = new THREE.Vector3(0, 0, 0);

    let isDragging = false;
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const planeIntersect = new THREE.Vector3();
    const grabOffset = new THREE.Vector3();
    const lastDragPos = new THREE.Vector3();
    let lastDragTime = performance.now();
    const flingVel = new THREE.Vector3();

    cardMesh.position.copy(pos);
    cardMesh.rotation.copy(rot);
    updateString();

    // --- Pointer Events ---
    const getPointerCoords = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * 2 - 1,
        y: -((clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const handlePointerDown = (clientX: number, clientY: number) => {
      const coords = getPointerCoords(clientX, clientY);
      mouse.set(coords.x, coords.y);
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(cardMesh);
      if (intersects.length > 0) {
        isDragging = true;
        renderer.domElement.style.cursor = "grabbing";

        raycaster.ray.intersectPlane(dragPlane, planeIntersect);
        grabOffset.copy(cardMesh.position).sub(planeIntersect);
        vel.set(0, 0, 0);
        rotVel.set(0, 0, 0);
        lastDragPos.copy(cardMesh.position);
        lastDragTime = performance.now();
        flingVel.set(0, 0, 0);
      }
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const coords = getPointerCoords(clientX, clientY);
      mouse.set(coords.x, coords.y);

      if (!isDragging) {
        raycaster.setFromCamera(mouse, camera);
        const hit = raycaster.intersectObject(cardMesh).length > 0;
        renderer.domElement.style.cursor = hit ? "grab" : "default";
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
        const target = planeIntersect.add(grabOffset);

        const deltaX = target.x;
        const deltaY = target.y - restY;

        // Non-linear elastic tension curve
        pos.x = deltaX / (1 + Math.abs(deltaX) * 0.42);
        if (deltaY < 0) {
          pos.y = restY + deltaY / (1 + Math.abs(deltaY) * 0.32);
        } else {
          pos.y = restY + deltaY / (1 + Math.abs(deltaY) * 0.55);
        }

        // Realistic 3D rotation tracking
        rot.z = -0.09 - pos.x * 0.38;
        rot.x = (pos.y - restY) * 0.28;
        rot.y = -pos.x * 0.32;

        const now = performance.now();
        const dt = Math.max(0.001, (now - lastDragTime) / 1000);
        flingVel.copy(pos).sub(lastDragPos).divideScalar(dt);
        lastDragPos.copy(pos);
        lastDragTime = now;
      }
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor = "grab";

      // Transfer fling momentum to spring
      vel.copy(flingVel).clampLength(0, 20);
      rotVel.set(
        flingVel.y * 0.45,
        -flingVel.x * 0.35,
        -flingVel.x * 0.75
      ).clampLength(0, 26);
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Scroll kick
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!isDragging && Math.abs(delta) > 2) {
        vel.x += Math.max(-2.2, Math.min(2.2, -delta * 0.07));
        rotVel.z += Math.max(-2.8, Math.min(2.8, -delta * 0.12));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Animation Loop ---
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);

      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      if (!isDragging) {
        // High-fidelity spring physics (Hooke's Law + Euler integration)
        const springK = 92;
        const damping = 7.8;

        const fx = -springK * pos.x - damping * vel.x;
        const fy = -springK * (pos.y - restY) - damping * vel.y;
        const fz = -springK * pos.z - damping * vel.z;

        vel.x += fx * dt;
        vel.y += fy * dt;
        vel.z += fz * dt;

        pos.x += vel.x * dt;
        pos.y += vel.y * dt;
        pos.z += vel.z * dt;

        // Rotational spring
        const rotK = 100;
        const rotD = 8.2;
        const targetRotZ = -0.09;

        const rfx = -rotK * rot.x - rotD * rotVel.x;
        const rfy = -rotK * rot.y - rotD * rotVel.y;
        const rfz = -rotK * (rot.z - targetRotZ) - rotD * rotVel.z;

        rotVel.x += rfx * dt;
        rotVel.y += rfy * dt;
        rotVel.z += rfz * dt;

        rot.x += rotVel.x * dt;
        rot.y += rotVel.y * dt;
        rot.z += rotVel.z * dt;
      }

      cardMesh.position.copy(pos);
      cardMesh.rotation.copy(rot);
      updateString();

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // --- Cleanup ---
    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);

      if (container.contains(dom)) {
        container.removeChild(dom);
      }

      renderer.dispose();
      shadowTex.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      if (frontTexture) frontTexture.dispose();
      if (backTexture) backTexture.dispose();
      cardGeo.dispose();
      edgeMat.dispose();
      frontMat.dispose();
      backMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      if (stringMesh) {
        stringMesh.geometry.dispose();
        stringMat.dispose();
      }
    };
  }, [label, pin, mounted]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "fit-content",
        overflow: "visible",
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: 280,
          height: 300,
          margin: "-60px 0 -95px -40px",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}

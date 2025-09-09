"use client";

import React from "react";
import * as THREE from "three";

type IconKind =
  | "code"
  | "gear"
  | "robot"
  | "cloud"
  | "chip"
  | "atom"
  | "cube"
  | "bolt"
  | "eye"
  | "shield";

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    const v = new THREE.Vector3(x, y, z).multiplyScalar(radius);
    points.push(v);
  }
  return points;
}

function getScrollNorm(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
}

function drawIcon(ctx: CanvasRenderingContext2D, kind: IconKind, S: number) {
  const lw = Math.max(2, S * 0.06);
  ctx.clearRect(0, 0, S, S);
  ctx.save();
  ctx.translate(S / 2, S / 2);
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const u = (v: number) => v * (S / 2); // unit helper (-1..1)

  switch (kind) {
    case "code": {
      // < >
      ctx.beginPath();
      ctx.moveTo(u(-0.4), u(-0.2));
      ctx.lineTo(u(-0.65), u(0));
      ctx.lineTo(u(-0.4), u(0.2));
      ctx.moveTo(u(0.4), u(-0.2));
      ctx.lineTo(u(0.65), u(0));
      ctx.lineTo(u(0.4), u(0.2));
      ctx.stroke();
      break;
    }
    case "gear": {
      // ring
      ctx.beginPath();
      ctx.arc(0, 0, u(0.45), 0, Math.PI * 2);
      ctx.stroke();
      // spokes
      for (let a = 0; a < 6; a++) {
        const ang = (a * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * u(0.25), Math.sin(ang) * u(0.25));
        ctx.lineTo(Math.cos(ang) * u(0.45), Math.sin(ang) * u(0.45));
        ctx.stroke();
      }
      // center
      ctx.beginPath();
      ctx.arc(0, 0, u(0.12), 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "robot": {
      // head
      const r = u(0.35);
      const rr = u(0.08);
      ctx.beginPath();
      ctx.moveTo(-r, -r);
      ctx.lineTo(r, -r);
      ctx.lineTo(r, r);
      ctx.lineTo(-r, r);
      ctx.closePath();
      ctx.stroke();
      // eyes
      ctx.beginPath();
      ctx.arc(-u(0.15), -u(0.05), rr, 0, Math.PI * 2);
      ctx.arc(u(0.15), -u(0.05), rr, 0, Math.PI * 2);
      ctx.fill();
      // antenna
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(0, -u(0.6));
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -u(0.65), rr * 0.8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "cloud": {
      ctx.beginPath();
      ctx.arc(-u(0.2), 0, u(0.18), Math.PI * 0.2, Math.PI * 1.2);
      ctx.arc(0, -u(0.1), u(0.22), Math.PI * 0.8, Math.PI * 1.8);
      ctx.arc(u(0.22), 0, u(0.18), Math.PI * 1.1, Math.PI * 0.1);
      ctx.lineTo(u(-0.35), u(0.18));
      ctx.stroke();
      break;
    }
    case "chip": {
      // body
      ctx.strokeRect(-u(0.35), -u(0.28), u(0.7), u(0.56));
      // pins
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-u(0.45), i * u(0.08));
        ctx.lineTo(-u(0.38), i * u(0.08));
        ctx.moveTo(u(0.45), i * u(0.08));
        ctx.lineTo(u(0.38), i * u(0.08));
        ctx.stroke();
      }
      break;
    }
    case "atom": {
      ctx.save();
      const drawOrbit = (rot: number) => {
        ctx.save();
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, u(0.42), u(0.18), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      };
      drawOrbit(0);
      drawOrbit(Math.PI / 3);
      drawOrbit((2 * Math.PI) / 3);
      ctx.beginPath();
      ctx.arc(0, 0, u(0.06), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case "cube": {
      // isometric cube
      ctx.beginPath();
      ctx.moveTo(0, -u(0.45));
      ctx.lineTo(-u(0.35), -u(0.2));
      ctx.lineTo(-u(0.35), u(0.2));
      ctx.lineTo(0, u(0.45));
      ctx.lineTo(u(0.35), u(0.2));
      ctx.lineTo(u(0.35), -u(0.2));
      ctx.closePath();
      ctx.stroke();
      // inner edges
      ctx.beginPath();
      ctx.moveTo(0, -u(0.45));
      ctx.lineTo(0, -u(0.05));
      ctx.moveTo(0, u(0.45));
      ctx.lineTo(0, u(0.05));
      ctx.stroke();
      break;
    }
    case "bolt": {
      ctx.beginPath();
      ctx.moveTo(-u(0.1), -u(0.5));
      ctx.lineTo(u(0.1), -u(0.1));
      ctx.lineTo(-u(0.02), -u(0.1));
      ctx.lineTo(u(0.08), u(0.4));
      ctx.lineTo(-u(0.12), u(0.05));
      ctx.lineTo(u(0.02), u(0.05));
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "eye": {
      ctx.beginPath();
      ctx.ellipse(0, 0, u(0.5), u(0.28), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, u(0.1), 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "shield": {
      ctx.beginPath();
      ctx.moveTo(0, -u(0.5));
      ctx.lineTo(u(0.45), -u(0.2));
      ctx.lineTo(u(0.3), u(0.45));
      ctx.lineTo(0, u(0.55));
      ctx.lineTo(-u(0.3), u(0.45));
      ctx.lineTo(-u(0.45), -u(0.2));
      ctx.closePath();
      ctx.stroke();
      break;
    }
  }

  ctx.restore();
}

function makeIconTexture(kind: IconKind): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  drawIcon(ctx, kind, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.premultiplyAlpha = true;
  return tex;
}

const ICONS: IconKind[] = [
  "code", "gear", "robot", "cloud", "chip", "atom", "cube", "bolt", "eye", "shield",
];

export const UniverseBackgroundThree: React.FC = () => {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const mountedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    mountedRef.current = true;
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 3.0);

    const COUNT = 54;
    const baseRadius = 1.3;
    const targetsA = fibonacciSphere(COUNT, baseRadius);
    const targetsB = fibonacciSphere(COUNT, baseRadius * 1.6);

    const group = new THREE.Group();
    scene.add(group);

    const sprites: THREE.Sprite[] = [];
    const materials: THREE.SpriteMaterial[] = [];

    for (let i = 0; i < COUNT; i++) {
      const kind = ICONS[i % ICONS.length];
      const tex = makeIconTexture(kind);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, color: 0xffffff, opacity: 0.85 });
      const spr = new THREE.Sprite(mat);
      const s = 2.4 + ((i * 31) % 10) * 0.08; // larger icons with slight variation
      spr.scale.set(s, s, 1);
      spr.position.copy(targetsA[i]);
      group.add(spr);
      sprites.push(spr);
      materials.push(mat);
    }

    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!mountedRef.current) return;
      const s = getScrollNorm();
      const t = s < 0.5 ? s * 2.0 : (1.0 - s) * 2.0;

      group.rotation.y += 0.0012 + s * 0.002;

      for (let i = 0; i < COUNT; i++) {
        const a = targetsA[i];
        const b = targetsB[i];
        const spr = sprites[i];
        spr.position.set(
          a.x * (1 - t) + b.x * t,
          a.y * (1 - t) + b.y * t,
          a.z * (1 - t) + b.z * t
        );
        // subtle per-icon rotation
        materials[i].rotation += 0.0005 + (i % 7) * 0.00007;
        // depth-based opacity
        const dz = (spr.position.z + 3.0) / 6.0;
        materials[i].opacity = 0.55 + (1 - dz) * 0.35;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      for (const m of materials) m.map?.dispose();
      for (const m of materials) m.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

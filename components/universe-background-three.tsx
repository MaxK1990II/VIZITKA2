"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { ScenePhase } from "@/lib/site-content";

type UniverseBackgroundThreeProps = {
  mode: "desktop" | "mobile";
  phase: ScenePhase;
};

const dummy = new THREE.Object3D();
const tmp = new THREE.Vector3();
const current = new THREE.Vector3();
const prevNeighbor = new THREE.Vector3();
const nextNeighbor = new THREE.Vector3();
const screenVector = new THREE.Vector3();

function getScrollNorm() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
}

export function UniverseBackgroundThree({
  mode,
  phase,
}: UniverseBackgroundThreeProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef<ScenePhase>(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = mode === "mobile";
    const particleCount = prefersReducedMotion
      ? isMobile ? 140 : 1200
      : isMobile ? 260 : 4500;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.8));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isMobile ? 0.94 : 1.02;
    renderer.domElement.style.pointerEvents = "none";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 64 : 58, 1, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 6.6 : 6);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0xb8dcff, 0x0b1017, isMobile ? 0.79 : 1.04));

    const key = new THREE.DirectionalLight(0xffffff, isMobile ? 1.26 : 1.65);
    key.position.set(6, 8, 7);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8bbcff, isMobile ? 0.53 : 0.66);
    fill.position.set(-5, 2, -6);
    scene.add(fill);

    const rim = new THREE.PointLight(0xd7ebff, isMobile ? 0.39 : 0.5, 40);
    rim.position.set(0, 0, 8);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.SphereGeometry(1, 10, 10);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xc4def6,
      roughness: 0.24,
      metalness: 0,
      clearcoat: 0.58,
      clearcoatRoughness: 0.14,
      emissive: 0x2a4a66,
      emissiveIntensity: 0.46,
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, particleCount);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);

    const uValues = new Float32Array(particleCount);
    const vValues = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const phiAngles = new Float32Array(particleCount);
    const phiSpeeds = new Float32Array(particleCount);

    const posX = new Float32Array(particleCount);
    const posY = new Float32Array(particleCount);
    const posZ = new Float32Array(particleCount);
    const velX = new Float32Array(particleCount);
    const velY = new Float32Array(particleCount);
    const velZ = new Float32Array(particleCount);
    const nebulaX = new Float32Array(particleCount);
    const nebulaY = new Float32Array(particleCount);
    const nebulaZ = new Float32Array(particleCount);

    const baseColor = new THREE.Color(0xc0dbf5);
    const accentColor = new THREE.Color(0xff8a8a);
    const colorMix = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      uValues[i] = i / particleCount;
      vValues[i] = (Math.random() - 0.5) * 0.8;
      radii[i] = 0.012 + Math.random() * 0.028;
      speeds[i] = 0.042 + Math.random() * 0.10;
      phiAngles[i] = Math.random() * Math.PI * 2;
      phiSpeeds[i] = (Math.random() * 2 - 1) * 0.8;

      colorMix.copy(baseColor).lerp(accentColor, Math.max(0.05, 0.28 - Math.abs(vValues[i]) * 0.2));
      mesh.setColorAt(i, colorMix);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 6;
      nebulaX[i] = r * Math.sin(phi) * Math.cos(theta);
      nebulaY[i] = r * Math.sin(phi) * Math.sin(theta);
      nebulaZ[i] = r * Math.cos(phi);
    }

    const wrap01 = (v: number) => (v % 1 + 1) % 1;
    const ringDist = (a: number, b: number) => {
      const d = Math.abs(a - b);
      return Math.min(d, 1 - d);
    };

    let scrollAmp = 0;
    let velEMA = 0;
    let zoomImpulse = 0;
    let persistentZoom = 0;
    let engaged = 0;
    let previousTime = 0;
    let previousScroll = 0;
    let tapBoost = 0;
    let pointer: { x: number; y: number } | null = null;

    let transitionProgress = 0;
    const implodeCenter = new THREE.Vector3(0, 0, 0);

    let implodeInited = false;
    let burstInited = false;
    let reformInited = false;
    let introBlend = 0;

    const sampleMobius = (
      u: number, v: number, phi: number, time: number, out: THREE.Vector3
    ) => {
      const wave1 = Math.sin(u * Math.PI * 6 + time * 0.6) * 0.2;
      const wave2 = Math.cos(u * Math.PI * 10 + time * 0.8) * 0.14;
      const turbulence = Math.sin(u * Math.PI * 12 + time * 1.4) * 0.07;
      const deformation = wave1 + wave2 + turbulence;
      const baseR = isMobile ? 1.85 : 3.2;
      const baseWidth = isMobile ? 1.1 : 1.6;
      const R = baseR + deformation;
      const widthBase = baseWidth * (1 + scrollAmp);

      const c1 = wrap01(0.18 + 0.05 * Math.sin(time * 0.25));
      const c2 = wrap01(0.53 + 0.07 * Math.sin(time * 0.18 + 1.7));
      const c3 = wrap01(0.87 + 0.06 * Math.cos(time * 0.21 + 0.9));
      const sigma = 0.06;
      const amp = 1.1;
      const localWidth =
        amp *
        (Math.exp(-(ringDist(u, c1) ** 2) / (2 * sigma * sigma)) +
          Math.exp(-(ringDist(u, c2) ** 2) / (2 * sigma * sigma)) +
          Math.exp(-(ringDist(u, c3) ** 2) / (2 * sigma * sigma)));

      const width = widthBase * (1 + localWidth);
      const ringScale = 0.45 * localWidth;
      const angle = u * Math.PI * 2;
      const twist = u * Math.PI;
      const cosTw = Math.cos(twist);
      const sinTw = Math.sin(twist);
      const vcos = v * (1 + ringScale * Math.cos(phi));
      const vsin = v * (1 + ringScale * Math.sin(phi));
      const base = R + vcos * width * cosTw;

      out.set(
        base * Math.cos(angle),
        base * Math.sin(angle) + vsin * width * sinTw * 0.5,
        vsin * width * sinTw + deformation * 0.25
      );
    };

    for (let i = 0; i < particleCount; i++) {
      sampleMobius(uValues[i], vValues[i], phiAngles[i], 0, tmp);
      posX[i] = tmp.x;
      posY[i] = tmp.y;
      posZ[i] = tmp.z;
      velX[i] = 0;
      velY[i] = 0;
      velZ[i] = 0;
      dummy.position.copy(tmp);
      dummy.scale.setScalar(radii[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (e: MouseEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      pointer = { x: touch.clientX, y: touch.clientY };
      tapBoost = 1;
    };
    const handleVisibilityChange = () => {
      if (!document.hidden && rafRef.current === null) {
        previousTime = 0;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const animate = (timestamp: number) => {
      rafRef.current = null;
      if (document.hidden) return;

      const time = timestamp * 0.001;
      const dt = previousTime === 0 ? 0.016 : Math.min(0.05, time - previousTime);
      previousTime = time;
      const currentPhase = phaseRef.current;
      const motionScale = prefersReducedMotion ? 0.35 : 1;

      // === PHASE: INTRO (ambient Mobius) ===
      if (currentPhase === "intro") {
        transitionProgress = 0;
        implodeInited = false;
        burstInited = false;
        reformInited = false;

        if (introBlend > 0) {
          introBlend = Math.max(0, introBlend - dt * 1.2);
        }

        const scroll = getScrollNorm();
        const rawVel = (scroll - previousScroll) / Math.max(0.001, dt);
        previousScroll = scroll;

        velEMA = THREE.MathUtils.lerp(velEMA, Math.abs(rawVel), 0.12);
        zoomImpulse = Math.max(zoomImpulse * 0.86, Math.min(1, Math.abs(rawVel) * 2));
        persistentZoom = Math.min(1, Math.max(persistentZoom, zoomImpulse, persistentZoom + 0.05 * zoomImpulse));
        if (Math.abs(rawVel) > 0.001) engaged = Math.min(1, engaged + 0.05);
        scrollAmp = THREE.MathUtils.lerp(
          scrollAmp,
          THREE.MathUtils.clamp(velEMA * 0.28 + 0.34 * zoomImpulse, engaged * 0.2, 0.82),
          0.12
        );

        group.rotation.y += (0.0003 + scroll * 0.0014 + 0.0012 * zoomImpulse + 0.001 * engaged) * motionScale;
        camera.fov = THREE.MathUtils.lerp(camera.fov, (isMobile ? 64 : 58) * (1 - 0.24 * persistentZoom), 0.12);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, (isMobile ? 6.6 : 6) * (1 - 0.35 * persistentZoom), 0.12);
        camera.updateProjectionMatrix();

        tapBoost = Math.max(0, tapBoost - dt * 1.5);
        const flowFactor = Math.max(1.2 * engaged, THREE.MathUtils.clamp(velEMA * 2.5, 0, 10));

        for (let i = 0; i < particleCount; i++) {
          const chaosU = 0.029 * (0.25 + flowFactor) * dt * motionScale * (Math.sin(i * 17.11 + time * 2.3) + Math.cos(i * 9.97 + time * 1.7));
          const chaosV = 0.0017 * (0.3 + 0.7 * flowFactor) * motionScale * (Math.sin(i * 13.37 + time * 2.1) + Math.cos(i * 7.21 + time * 1.6));
          uValues[i] = (uValues[i] + speeds[i] * dt * (0.92 + flowFactor) + chaosU) % 1;
          vValues[i] = THREE.MathUtils.clamp(vValues[i] + chaosV, -0.8, 0.8);
          phiAngles[i] = (phiAngles[i] + phiSpeeds[i] * dt * (0.83 + 0.67 * flowFactor)) % (Math.PI * 2);
        }

        for (let i = 0; i < particleCount; i++) {
          const prev = (i - 1 + particleCount) % particleCount;
          const next = (i + 1) % particleCount;
          sampleMobius(uValues[i], vValues[i], phiAngles[i], time, current);
          sampleMobius(uValues[prev], vValues[prev], phiAngles[prev], time, prevNeighbor);
          sampleMobius(uValues[next], vValues[next], phiAngles[next], time, nextNeighbor);
          const minPrev = 0.06 + (radii[i] + radii[prev]) * 1.1;
          const minNext = 0.06 + (radii[i] + radii[next]) * 1.1;
          const dPrev = current.distanceTo(prevNeighbor);
          const dNext = current.distanceTo(nextNeighbor);
          if (dPrev < minPrev) uValues[i] = (uValues[i] - ((minPrev - dPrev) / minPrev) * 0.03 + 1) % 1;
          if (dNext < minNext) uValues[i] = (uValues[i] + ((minNext - dNext) / minNext) * 0.03) % 1;
        }

        const pointerActive = pointer && (!isMobile || tapBoost > 0.08);
        if (pointerActive && pointer) {
          const maxDist = isMobile ? 88 : 130;
          const step = isMobile ? 3 : 1;
          for (let i = 0; i < particleCount; i += step) {
            sampleMobius(uValues[i], vValues[i], phiAngles[i], time, current);
            screenVector.copy(current).project(camera);
            const sx = (screenVector.x * 0.5 + 0.5) * window.innerWidth;
            const sy = (screenVector.y * -0.5 + 0.5) * window.innerHeight;
            const dx = sx - pointer.x;
            const dy = sy - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 0.1 * (isMobile ? 0.8 + tapBoost : 1);
              const angle = Math.atan2(dy, dx);
              uValues[i] = (uValues[i] - Math.cos(angle) * force * dt + 1) % 1;
              vValues[i] = THREE.MathUtils.clamp(vValues[i] - Math.sin(angle) * force * dt * 0.7, -0.8, 0.8);
            }
          }
        }

        for (let i = 0; i < particleCount; i++) {
          sampleMobius(uValues[i], vValues[i], phiAngles[i], time, current);
          if (introBlend > 0.001) {
            const blend = 1 - introBlend;
            posX[i] = THREE.MathUtils.lerp(posX[i], current.x, blend * 0.15 + 0.02);
            posY[i] = THREE.MathUtils.lerp(posY[i], current.y, blend * 0.15 + 0.02);
            posZ[i] = THREE.MathUtils.lerp(posZ[i], current.z, blend * 0.15 + 0.02);
          } else {
            posX[i] = current.x;
            posY[i] = current.y;
            posZ[i] = current.z;
          }
          dummy.position.set(posX[i], posY[i], posZ[i]);
          dummy.scale.setScalar(radii[i]);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        material.emissiveIntensity = isMobile ? 0.36 : 0.46 + 0.1 * Math.sin(time * 1.2);
        material.opacity = 1;
      }

      // === PHASE: IMPLODE (chaotic rush to center) ===
      if (currentPhase === "implode") {
        if (!implodeInited) {
          implodeInited = true;
          transitionProgress = 0;
          for (let i = 0; i < particleCount; i++) {
            velX[i] = 0;
            velY[i] = 0;
            velZ[i] = 0;
          }
        }

        transitionProgress = Math.min(1, transitionProgress + dt * 1.25);

        const rampIn = Math.min(1, transitionProgress * 5);
        const ease = rampIn * transitionProgress * transitionProgress;

        group.rotation.y += 0.005 * (1 + ease * 6) * motionScale;

        for (let i = 0; i < particleCount; i++) {
          if (rampIn < 1) {
            const chaosU = 0.029 * 0.25 * dt * motionScale * (Math.sin(i * 17.11 + time * 2.3) + Math.cos(i * 9.97 + time * 1.7));
            uValues[i] = (uValues[i] + speeds[i] * dt * 0.92 * (1 - rampIn) + chaosU * (1 - rampIn)) % 1;
            phiAngles[i] = (phiAngles[i] + phiSpeeds[i] * dt * 0.83 * (1 - rampIn)) % (Math.PI * 2);

            sampleMobius(uValues[i], vValues[i], phiAngles[i], time, tmp);
            posX[i] = THREE.MathUtils.lerp(posX[i], tmp.x, 0.3);
            posY[i] = THREE.MathUtils.lerp(posY[i], tmp.y, 0.3);
            posZ[i] = THREE.MathUtils.lerp(posZ[i], tmp.z, 0.3);
          }

          const tx = implodeCenter.x;
          const ty = implodeCenter.y;
          const tz = implodeCenter.z;

          const dx = tx - posX[i];
          const dy = ty - posY[i];
          const dz = tz - posZ[i];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.001;

          const pullStrength = ease * 14;
          velX[i] += (dx / dist) * pullStrength * dt;
          velY[i] += (dy / dist) * pullStrength * dt;
          velZ[i] += (dz / dist) * pullStrength * dt;

          const jitter = ease * (1 - ease) * 4;
          const hash1 = Math.sin(i * 91.17 + 7.31) * 43758.5453;
          const hash2 = Math.sin(i * 43.23 + 11.07) * 28461.327;
          velX[i] += Math.sin(time * 8 + hash1) * jitter * dt;
          velY[i] += Math.cos(time * 7 + hash2) * jitter * dt;
          velZ[i] += Math.sin(time * 9 + i * 1.89) * jitter * dt;

          const damping = 0.93 - ease * 0.07;
          velX[i] *= damping;
          velY[i] *= damping;
          velZ[i] *= damping;

          posX[i] += velX[i] * dt;
          posY[i] += velY[i] * dt;
          posZ[i] += velZ[i] * dt;

          const particleScale = radii[i] * (1 - ease * 0.6);
          const spin = time * (3 + i % 7) * ease;
          dummy.position.set(posX[i], posY[i], posZ[i]);
          dummy.scale.setScalar(particleScale);
          dummy.rotation.set(spin, spin * 0.7, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        material.emissiveIntensity = 0.46 + ease * 0.7;
        material.opacity = 1;
      }

      // === PHASE: BURST (radial explosion from center) ===
      if (currentPhase === "burst") {
        if (!burstInited) {
          burstInited = true;
          transitionProgress = 0;
          for (let i = 0; i < particleCount; i++) {
            const angle1 = (i / particleCount) * Math.PI * 2 + Math.sin(i * 3.7) * 0.4;
            const angle2 = Math.acos(2 * ((i * 0.618) % 1) - 1);
            const burstSpeed = 8 + Math.random() * 14;
            velX[i] = Math.sin(angle2) * Math.cos(angle1) * burstSpeed;
            velY[i] = Math.sin(angle2) * Math.sin(angle1) * burstSpeed;
            velZ[i] = Math.cos(angle2) * burstSpeed;
          }
        }

        transitionProgress = Math.min(1, transitionProgress + dt * 1.67);
        const ease = transitionProgress;

        for (let i = 0; i < particleCount; i++) {
          posX[i] += velX[i] * dt;
          posY[i] += velY[i] * dt;
          posZ[i] += velZ[i] * dt;
          velX[i] *= 0.96;
          velY[i] *= 0.96;
          velZ[i] *= 0.96;

          const scale = radii[i] * Math.max(0, 1 - ease * 0.8);
          dummy.position.set(posX[i], posY[i], posZ[i]);
          dummy.scale.setScalar(scale);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        material.opacity = Math.max(0, 1 - ease * 1.2);
        material.emissiveIntensity = 1 - ease * 0.66;

        group.rotation.y += 0.01 * motionScale;
      }

      // === PHASE: NEBULA (calm star field background) ===
      if (currentPhase === "nebula") {
        transitionProgress = Math.min(1, transitionProgress + dt * 0.5);
        const ease = Math.min(1, transitionProgress);

        group.rotation.y += 0.0002 * motionScale;

        for (let i = 0; i < particleCount; i++) {
          posX[i] = THREE.MathUtils.lerp(posX[i], nebulaX[i], ease * 0.03);
          posY[i] = THREE.MathUtils.lerp(posY[i], nebulaY[i], ease * 0.03);
          posZ[i] = THREE.MathUtils.lerp(posZ[i], nebulaZ[i], ease * 0.03);

          const drift = Math.sin(time * 0.3 + i * 0.01) * 0.002;
          posX[i] += drift;
          posY[i] += Math.cos(time * 0.2 + i * 0.02) * 0.001;

          const nebulaScale = radii[i] * 0.4 * ease;
          dummy.position.set(posX[i], posY[i], posZ[i]);
          dummy.scale.setScalar(nebulaScale);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;

        material.opacity = Math.min(0.65, ease * 0.65);
        material.emissiveIntensity = 0.2;

        if (pointer && !isMobile) {
          const maxDist = 200;
          for (let i = 0; i < particleCount; i += 3) {
            screenVector.set(posX[i], posY[i], posZ[i]).project(camera);
            const sx = (screenVector.x * 0.5 + 0.5) * window.innerWidth;
            const sy = (screenVector.y * -0.5 + 0.5) * window.innerHeight;
            const dx = sx - pointer.x;
            const dy = sy - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 0.008;
              const angle = Math.atan2(dy, dx);
              posX[i] -= Math.cos(angle) * force;
              posY[i] -= Math.sin(angle) * force * 0.5;
            }
          }
        }
      }

      // === PHASE: REFORM (nebula gathers back into Mobius) ===
      if (currentPhase === "reform") {
        if (!reformInited) {
          reformInited = true;
          transitionProgress = 0;
          for (let i = 0; i < particleCount; i++) {
            velX[i] = 0;
            velY[i] = 0;
            velZ[i] = 0;
          }
        }

        transitionProgress = Math.min(1, transitionProgress + dt * 0.55);
        const ease = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);

        group.rotation.y += (0.0002 + ease * 0.002) * motionScale;

        camera.fov = THREE.MathUtils.lerp(camera.fov, isMobile ? 64 : 58, 0.06);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, isMobile ? 6.6 : 6, 0.06);
        camera.updateProjectionMatrix();

        const lerpRate = 0.008 + ease * ease * 0.14;

        for (let i = 0; i < particleCount; i++) {
          sampleMobius(uValues[i], vValues[i], phiAngles[i], time, tmp);

          posX[i] = THREE.MathUtils.lerp(posX[i], tmp.x, lerpRate);
          posY[i] = THREE.MathUtils.lerp(posY[i], tmp.y, lerpRate);
          posZ[i] = THREE.MathUtils.lerp(posZ[i], tmp.z, lerpRate);

          const spiralT = (1 - ease) * 0.6;
          posX[i] += Math.sin(time * 2 + i * 0.47) * spiralT * dt;
          posY[i] += Math.cos(time * 1.7 + i * 0.33) * spiralT * dt;

          const scale = THREE.MathUtils.lerp(radii[i] * 0.4, radii[i], ease);
          dummy.position.set(posX[i], posY[i], posZ[i]);
          dummy.scale.setScalar(scale);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;

        material.opacity = THREE.MathUtils.lerp(0.65, 1, ease);
        material.emissiveIntensity = THREE.MathUtils.lerp(0.2, 0.46, ease);

        introBlend = 1;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
    } else {
      window.addEventListener("mousemove", handlePointerMove);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
      } else {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [mode]);

  return <div ref={hostRef} className="universe-layer" />;
}

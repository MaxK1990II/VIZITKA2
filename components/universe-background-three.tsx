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

function randomInSphereVectors(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    let x = 0, y = 0, z = 0;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
    } while (x * x + y * y + z * z > 1);
    points.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
  }
  return points;
}

/**
 * Генерирует точки вдоль ленты Мёбиуса с океанскими деформациями
 */
function generateMobiusPoints(count: number, time: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  
  for (let i = 0; i < count; i++) {
    const u = (i / count) + (time * 0.02) % 1.0;
    const v = (Math.random() - 0.5) * 0.8;
    
    // Параметры ленты Мёбиуса
    const R = 1.8;
    const width = 0.7;
    
    // Океанские волны
    const wave1 = Math.sin(u * 3.0 * Math.PI * 2 + time * 0.6) * 0.2;
    const wave2 = Math.cos(u * 5.0 * Math.PI * 2 + time * 0.8) * 0.15;
    const turbulence = Math.sin(u * 12.0 * Math.PI + time * 1.5) * 0.08;
    
    const deformation = wave1 + wave2 + turbulence;
    const dynamicR = R + deformation;
    
    // Лента Мёбиуса
    const angle = u * Math.PI * 2;
    const twist = u * Math.PI;
    
    const x = (dynamicR + v * width * Math.cos(twist)) * Math.cos(angle);
    const y = (dynamicR + v * width * Math.cos(twist)) * Math.sin(angle) + 
              v * width * Math.sin(twist) * 0.5;
    const z = v * width * Math.sin(twist) + deformation * 0.3;
    
    points.push(new THREE.Vector3(x, y, z));
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
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 6.0);
    const baseFov = camera.fov;
    const baseZ = camera.position.z;

    // Освещение для объемного вида сфер
    const hemi = new THREE.HemisphereLight(0x88aaff, 0x0a0a12, 0.55);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(6, 9, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 40;
    key.shadow.radius = 2;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4aa0ff, 0.45);
    fill.position.set(-4, 3, -6);
    scene.add(fill);
    const rim = new THREE.PointLight(0x99ddff, 0.5, 50);
    rim.position.set(0, 0, 8);
    scene.add(rim);

    const COUNT = 0; // отключаем фоновую "вселенную"
    const MOBIUS_COUNT = 8400; // в 2 раза больше сфер
    const baseRadius = 1.45;
    const targetsA: THREE.Vector3[] = [];
    const targetsB: THREE.Vector3[] = [];
    
    // Инициализируем частицы Мёбиуса
    let mobiusPoints = generateMobiusPoints(MOBIUS_COUNT, 0);

    const group = new THREE.Group();
    scene.add(group);

    const sprites: THREE.Sprite[] = [];
    const materials: THREE.SpriteMaterial[] = [];
    // Данные и инстансы сфер ленты
    let uValues: Float32Array;
    let vValues: Float32Array;
    let radii: Float32Array;
    let speeds: Float32Array;
    let phiAngles: Float32Array;
    let phiSpeeds: Float32Array;
    let sphereGeo: THREE.SphereGeometry | null = null;
    let sphereMat: THREE.MeshStandardMaterial | null = null;
    let instancedSpheres: THREE.InstancedMesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null = null;
    const dummy = new THREE.Object3D();

    // Отключены обычные частицы

    // Инициализация параметров сфер на ленте
    uValues = new Float32Array(MOBIUS_COUNT);
    vValues = new Float32Array(MOBIUS_COUNT);
    radii = new Float32Array(MOBIUS_COUNT);
    speeds = new Float32Array(MOBIUS_COUNT);
    for (let i = 0; i < MOBIUS_COUNT; i++) {
      uValues[i] = i / MOBIUS_COUNT;
      vValues[i] = (Math.random() - 0.5) * 0.8; // шире полоса
      radii[i] = 0.003 + Math.random() * 0.012; // сферы меньше ~в 5 раз
      speeds[i] = 0.05 + Math.random() * 0.12; // разная скорость движения вдоль ленты
      // ориентация по окружности с небольшой собственной скоростью
      if (!phiAngles) phiAngles = new Float32Array(MOBIUS_COUNT);
      if (!phiSpeeds) phiSpeeds = new Float32Array(MOBIUS_COUNT);
      phiAngles[i] = Math.random() * Math.PI * 2;
      phiSpeeds[i] = (Math.random() * 2 - 1) * 0.8; // рад/с
    }

    // Геометрия и материал сфер
    sphereGeo = new THREE.SphereGeometry(1, 12, 12);
    sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x8fcaff,
      metalness: 0.0,
      roughness: 0.28,
      clearcoat: 0.55,
      clearcoatRoughness: 0.15,
      sheen: 0.0,
      emissive: 0x0a1118,
      emissiveIntensity: 0.12,
      transparent: false,
      opacity: 1.0,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NormalBlending
    });
    instancedSpheres = new THREE.InstancedMesh(sphereGeo, sphereMat, MOBIUS_COUNT);
    instancedSpheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    instancedSpheres.renderOrder = 2;
    instancedSpheres.castShadow = true;
    instancedSpheres.receiveShadow = true;
    group.add(instancedSpheres);

    // Параметры реакции на скролл (глобальные для семплинга и камеры)
    let velEMA = 0; // сглаженная скорость скролла
    let dirEMA = 0; // сглаженное направление
    let scrollAmp = 0; // амплитуда расширения ленты от скролла
    let zoomImpulse = 0; // импульс для резкого зума (быстро затухает)
    let persistentZoom = 0; // накопительный зум, не уменьшается
    let engaged = 0; // фиксируем, что скролл начался, и сохраняем «динамичный» режим

    // Вспомогательная функция для выборки точки ленты (без аллокаций)
    const wrap01 = (x: number) => (x % 1 + 1) % 1;
    const ringDist = (a: number, b: number) => {
      const d = Math.abs(a - b);
      return Math.min(d, 1 - d);
    };

    const sampleMobius = (u: number, v: number, phi: number, t: number, out: THREE.Vector3) => {
      const wave1 = Math.sin(u * 3.0 * Math.PI * 2 + t * 0.6) * 0.2;
      const wave2 = Math.cos(u * 5.0 * Math.PI * 2 + t * 0.8) * 0.15;
      const turbulence = Math.sin(u * 12.0 * Math.PI + t * 1.5) * 0.08;
      const deformation = wave1 + wave2 + turbulence;
      const R = 3.2 + deformation; // лента длиннее (больше радиус)
      const baseWidth = 1.6 * (1.0 + scrollAmp); // лента шире и динамически расширяется
      // утолщения ("трубы") вдоль ленты: несколько бегущих бамперов
      const c1 = wrap01(0.18 + 0.05 * Math.sin(t * 0.25));
      const c2 = wrap01(0.53 + 0.07 * Math.sin(t * 0.18 + 1.7));
      const c3 = wrap01(0.87 + 0.06 * Math.cos(t * 0.21 + 0.9));
      const sigma = 0.06;
      const amp = 1.4;
      const L = amp * (
        Math.exp(-(ringDist(u, c1) ** 2) / (2 * sigma * sigma)) +
        Math.exp(-(ringDist(u, c2) ** 2) / (2 * sigma * sigma)) +
        Math.exp(-(ringDist(u, c3) ** 2) / (2 * sigma * sigma))
      );
      const width = baseWidth * (1.0 + L); // локальное утолщение
      const ringScale = 0.6 * L; // круговая составляющая поперёк ленты
      const angle = u * Math.PI * 2;
      const twist = u * Math.PI;
      const cosTw = Math.cos(twist);
      const sinTw = Math.sin(twist);
      // эллиптическое сечение с дополнительным круговым "утолщением" по углу phi
      const vcos = v * (1 + ringScale * Math.cos(phi));
      const vsin = v * (1 + ringScale * Math.sin(phi));
      const base = R + vcos * width * cosTw;
      const x = base * Math.cos(angle);
      const y = base * Math.sin(angle) + vsin * width * sinTw * 0.5;
      const z = vsin * width * sinTw + deformation * 0.3;
      out.set(x, y, z);
    };

    // Первичная расстановка инстансов
    const tmpVec = new THREE.Vector3();
    for (let i = 0; i < MOBIUS_COUNT; i++) {
      sampleMobius(uValues[i], vValues[i], phiAngles[i], 0, tmpVec);
      dummy.position.copy(tmpVec);
      const r = radii[i];
      dummy.scale.set(r, r, r);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      instancedSpheres.setMatrixAt(i, dummy.matrix);
    }
    instancedSpheres.instanceMatrix.needsUpdate = true;

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
      const time = performance.now() * 0.001; // время в секундах
      // delta-время для стабильной физики
      if (!(animate as any)._prev) (animate as any)._prev = time;
      const prev = (animate as any)._prev as number;
      const dt = Math.min(0.05, Math.max(0.001, time - prev));
      (animate as any)._prev = time;
      // скорость скролла (привязываем динамику к скроллу)
      if ((animate as any)._lastS === undefined) (animate as any)._lastS = s;
      const lastS = (animate as any)._lastS as number;
      const ds = s - lastS;
      (animate as any)._lastS = s;
      const rawVel = ds / Math.max(0.001, dt); // может быть отрицательной (направление)
      // EMA сглаживание скорости и направления (плавная общая динамика)
      velEMA = THREE.MathUtils.lerp(velEMA, Math.abs(rawVel), 0.12);
      dirEMA = THREE.MathUtils.lerp(dirEMA, Math.sign(rawVel), 0.25);
      const baseSpeed = THREE.MathUtils.clamp(velEMA * 3.0, 0, 12) * 0.7; // -30% общая скорость
      // мгновенный джолт по началу скролла (взрыв) и затухание импульса
      const jolt = Math.min(1, Math.abs(rawVel) * 2.0);
      zoomImpulse = Math.max(zoomImpulse * 0.85, jolt);
      // накапливаем постоянный зум, не возвращается назад
      persistentZoom = Math.min(1, Math.max(persistentZoom, jolt, persistentZoom + 0.05 * jolt));
      // фиксируем активный режим после первого ощутимого скролла
      if (Math.abs(rawVel) > 0.001) {
        engaged = Math.min(1, engaged + 0.05);
      }
      // минимальный пол для скорости и амплитуды после активации
      const flowFloor = 2.2 * engaged; // не даём потоку вернуться к «тихому» режиму
      const flowFactor = Math.max(flowFloor, baseSpeed * (1 + 2.0 * zoomImpulse));
      // амплитуда ширины ленты от скорости (менее агрессивно)
      const ampTarget = THREE.MathUtils.clamp(velEMA * 0.35 + 0.4 * zoomImpulse, engaged * 0.35, 0.9);
      scrollAmp = THREE.MathUtils.lerp(scrollAmp, ampTarget, 0.12);

      // на старте почти неподвижно; при скролле ускоряем вращение + сохраняем базу при engaged
      group.rotation.y += (0.0003 + s * 0.002 + 0.002 * zoomImpulse + 0.0015 * engaged) * (1 + 0.5 * dirEMA);

      // кинематический «резкий зум» камеры (FOV и Z)
      const targetFov = baseFov * (1.0 - 0.30 * persistentZoom);
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.12);
      const targetZ = baseZ * (1.0 - 0.50 * persistentZoom);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.12);
      camera.updateProjectionMatrix();

      // Отключена анимация обычных частиц

      // Движение сфер вдоль ленты + простое взаимодействие (раздвижение соседей)
      if (instancedSpheres) {
        const baseSpacing = 0.06; // базовый зазор, чтобы сферы не были плотными
        const pA = new THREE.Vector3();
        const pB = new THREE.Vector3();
        const pI = new THREE.Vector3();

        for (let i = 0; i < MOBIUS_COUNT; i++) {
          // Продвижение вдоль ленты привязано к скорости скролла + хаос (умеренный при простое)
          const chaosU = 0.04 * (0.2 + flowFactor) * dt * (Math.sin(i * 17.11 + time * 2.3) + Math.cos(i * 9.97 + time * 1.7));
          uValues[i] = (uValues[i] + speeds[i] * dt * flowFactor + chaosU) % 1.0;
          // Поперечная дрожь по v (меньше разлёт)
          const chaosV = 0.002 * (0.3 + 0.7 * flowFactor) * (Math.sin(i * 13.37 + time * 2.1) + Math.cos(i * 7.21 + time * 1.6));
          vValues[i] = THREE.MathUtils.clamp(vValues[i] + chaosV, -0.8, 0.8);
          // Вращение по окружности сечения
          phiAngles[i] = (phiAngles[i] + phiSpeeds[i] * dt * (1 + 0.8 * flowFactor)) % (Math.PI * 2);
        }

        // Локальное столкновение только с соседями (кольцевой индекс)
        for (let i = 0; i < MOBIUS_COUNT; i++) {
          const jPrev = (i - 1 + MOBIUS_COUNT) % MOBIUS_COUNT;
          const jNext = (i + 1) % MOBIUS_COUNT;

          sampleMobius(uValues[i], vValues[i], phiAngles[i], time, pI);
          sampleMobius(uValues[jPrev], vValues[jPrev], phiAngles[jPrev], time, pA);
          sampleMobius(uValues[jNext], vValues[jNext], phiAngles[jNext], time, pB);

          const ri = radii[i];
          const rPrev = radii[jPrev];
          const rNext = radii[jNext];

          const minPrev = baseSpacing + (ri + rPrev) * 1.1;
          const minNext = baseSpacing + (ri + rNext) * 1.1;

          const dPrev = pI.distanceTo(pA);
          const dNext = pI.distanceTo(pB);

          // если слишком близко к предыдущему — тормозим/сдвигаем назад по u
          if (dPrev < minPrev) {
            const overlap = (minPrev - dPrev) / minPrev;
            uValues[i] = (uValues[i] + overlap * -0.03 + 1.0) % 1.0;
            vValues[i] += (Math.random() - 0.5) * 0.002; // чуть больше поперечный уход
          }
          // если слишком близко к следующему — ускоряем/сдвигаем вперёд по u
          if (dNext < minNext) {
            const overlap = (minNext - dNext) / minNext;
            uValues[i] = (uValues[i] + overlap * 0.03) % 1.0;
            vValues[i] += (Math.random() - 0.5) * 0.002;
          }
        }

        // Обновляем инстансы
        for (let i = 0; i < MOBIUS_COUNT; i++) {
          sampleMobius(uValues[i], vValues[i], phiAngles[i], time, pI);
          dummy.position.copy(pI);
          const r = radii[i];
          dummy.scale.set(r, r, r);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          instancedSpheres.setMatrixAt(i, dummy.matrix);
        }
        instancedSpheres.instanceMatrix.needsUpdate = true;
        if (sphereMat) sphereMat.emissiveIntensity = 0.4 + 0.2 * Math.sin(time * 1.3);
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      // no regular sprite materials anymore
      if (instancedSpheres) {
        group.remove(instancedSpheres);
      }
      if (sphereGeo) sphereGeo.dispose();
      if (sphereMat) sphereMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

"use client";

import React from "react";
import * as THREE from "three";

function getScrollNorm(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
}

export const UniverseBackgroundThree: React.FC = () => {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const mountedRef = React.useRef<boolean>(false);
  
  // Версия для принудительного обновления
  const version = "v2.1";

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
    renderer.domElement.style.pointerEvents = "none";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    
    // Адаптивная настройка камеры для мобильных устройств
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const baseFov = isSmallMobile ? 75 : (isMobile ? 70 : 60); // Умеренный угол обзора
    const baseZ = isSmallMobile ? 8.0 : (isMobile ? 7.0 : 6.0); // Умеренное расстояние
    
    // Логирование для отладки
    console.log(`Mobile settings - width: ${window.innerWidth}, isMobile: ${isMobile}, isSmallMobile: ${isSmallMobile}, FOV: ${baseFov}, Z: ${baseZ}`);
    
    const camera = new THREE.PerspectiveCamera(baseFov, 1, 0.1, 100);
    
    // Позиционирование камеры с учетом мобильных устройств
    if (isSmallMobile) {
      camera.position.set(-1.0, 1.5, baseZ); // Смещение влево и вверх для маленьких экранов
      camera.lookAt(-0.5, 0.5, 0); // Смотрим на центр ленты
    } else if (isMobile) {
      camera.position.set(-0.8, 1.2, baseZ); // Смещение влево и вверх для мобильных
      camera.lookAt(-0.4, 0.4, 0); // Смотрим на центр ленты
    } else {
      camera.position.set(0, 0, baseZ);
      camera.lookAt(0, 0, 0); // Смотрим в центр
    }

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

    // Адаптивное количество частиц в зависимости от размера экрана
    const getParticleCount = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      
      // Базовое количество для разных разрешений (оптимизировано для мобильных)
      if (width < 480) {
        return 2000; // очень маленькие мобильные
      } else if (width < 768) {
        return 2500; // мобильные устройства
      } else if (width < 1024) {
        return 4000; // планшеты
      } else if (width < 1440) {
        return 6000; // ноутбуки
      } else {
        return 8000; // большие мониторы
      }
    };
    
    const MOBIUS_COUNT = getParticleCount();
    
    // Инициализируем частицы Мёбиуса (инстансами)
    const group = new THREE.Group();
    scene.add(group);

    // Данные и инстансы сфер ленты
    const uValues = new Float32Array(MOBIUS_COUNT);
    const vValues = new Float32Array(MOBIUS_COUNT);
    const radii = new Float32Array(MOBIUS_COUNT);
    const speeds = new Float32Array(MOBIUS_COUNT);
    const phiAngles = new Float32Array(MOBIUS_COUNT);
    const phiSpeeds = new Float32Array(MOBIUS_COUNT);
    // Адаптивный размер сфер для мобильных устройств
    const sphereRadius = isSmallMobile ? 0.7 : (isMobile ? 0.8 : 1.0);
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 12, 12);
    const sphereMat = new THREE.MeshPhysicalMaterial({
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
    const instancedSpheres = new THREE.InstancedMesh(sphereGeo, sphereMat, MOBIUS_COUNT);
    instancedSpheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    instancedSpheres.renderOrder = 2;
    instancedSpheres.castShadow = true;
    instancedSpheres.receiveShadow = true;
    group.add(instancedSpheres);

    // Инициализация параметров сфер на ленте
    for (let i = 0; i < MOBIUS_COUNT; i++) {
      uValues[i] = i / MOBIUS_COUNT;
      vValues[i] = (Math.random() - 0.5) * 0.8; // шире полоса
      radii[i] = 0.003 + Math.random() * 0.012; // сферы меньше ~в 5 раз
      speeds[i] = 0.05 + Math.random() * 0.12; // разная скорость движения вдоль ленты
      // ориентация по окружности с небольшой собственной скоростью
      phiAngles[i] = Math.random() * Math.PI * 2;
      phiSpeeds[i] = (Math.random() * 2 - 1) * 0.8; // рад/с
    }

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
      
      // Адаптивный масштаб для мобильных устройств
      const scaleFactor = isSmallMobile ? 0.8 : (isMobile ? 0.85 : 1.0); // Нормальный размер
      const R = (3.2 + deformation) * scaleFactor; // лента длиннее (больше радиус)
      const baseWidth = 1.6 * (1.0 + scrollAmp) * scaleFactor; // лента шире и динамически расширяется
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
    const dummy = new THREE.Object3D();
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

    // Внутреннее состояние анимации без any
    const animState: { prev: number | null; lastS: number | null; mousePos: { x: number; y: number } | null } = { prev: null, lastS: null, mousePos: null };

    // Обработчики мыши и тапов для черной дыры
    const handleMouseMove = (event: MouseEvent) => {
      animState.mousePos = { x: event.clientX, y: event.clientY };
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        animState.mousePos = { x: touch.clientX, y: touch.clientY };
      }
    };
    
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        animState.mousePos = { x: touch.clientX, y: touch.clientY };
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);

    const animate = () => {
      if (!mountedRef.current) return;
      const s = getScrollNorm();
      const time = performance.now() * 0.001; // время в секундах
      // delta-время для стабильной физики
      if (animState.prev === null) animState.prev = time;
      const prev = animState.prev as number;
      const dt = Math.min(0.05, Math.max(0.001, time - prev));
      animState.prev = time;
      // скорость скролла (привязываем динамику к скроллу)
      if (animState.lastS === null) animState.lastS = s;
      const lastS = animState.lastS as number;
      const ds = s - lastS;
      animState.lastS = s;
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

      // Движение сфер вдоль ленты + простое взаимодействие (раздвижение соседей)
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

      // Применяем гравитацию от курсора к координатам сфер ПЕРЕД обновлением позиций
      if (animState.mousePos) {
        const mousePos = animState.mousePos;
        
        for (let i = 0; i < MOBIUS_COUNT; i++) { // применяем ко всем сферам
          // Сначала получаем текущую позицию сферы
          sampleMobius(uValues[i], vValues[i], phiAngles[i], time, pI);
          
          // Конвертируем 3D позицию сферы в 2D экранные координаты
          const tempVector = pI.clone();
          tempVector.project(camera);
          const screenX = (tempVector.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (tempVector.y * -0.5 + 0.5) * window.innerHeight;
          
          // Вычисляем расстояние от курсора до сферы на экране
          const dx = screenX - mousePos.x;
          const dy = screenY - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Адаптивный радиус влияния черной дыры
          const getMaxDistance = () => {
            const width = window.innerWidth;
            if (width < 768) {
              return 80; // мобильные устройства
            } else if (width < 1024) {
              return 100; // планшеты
            } else {
              return 120; // десктопы
            }
          };
          const maxDistance = getMaxDistance();
          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.12; // умеренная сила
            const angle = Math.atan2(dy, dx);
            
            // Применяем силу притягивания К курсору
            const forceU = -Math.cos(angle) * force * dt;
            const forceV = -Math.sin(angle) * force * dt * 0.7;
            
            uValues[i] = (uValues[i] + forceU + 1.0) % 1.0;
            vValues[i] = THREE.MathUtils.clamp(vValues[i] + forceV, -0.8, 0.8);
          }
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
      sphereMat.emissiveIntensity = 0.4 + 0.2 * Math.sin(time * 1.3);

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      group.remove(instancedSpheres);
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />;
};
"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Математическая функция для создания ленты Мёбиуса с динамическими деформациями
 * @param u - параметр вдоль ленты (0-1)
 * @param v - параметр поперек ленты (-0.5 до 0.5)
 * @param time - время для анимации деформаций
 * @param target - целевой вектор для результата
 */
function mobiusStripWithDeformation(
  u: number, 
  v: number, 
  time: number, 
  target: THREE.Vector3
): THREE.Vector3 {
  // Основные параметры ленты Мёбиуса
  const R = 2.2; // радиус центральной окружности
  const width = 0.9; // ширина ленты
  
  // Многослойные динамические деформации для создания океанского течения
  const primaryWave = {
    amplitude: 0.25,
    frequency: 2.8,
    speed: 0.6,
    phase: time * 0.6
  };
  
  const secondaryWave = {
    amplitude: 0.18,
    frequency: 4.2,
    speed: 0.8,
    phase: time * 0.8 + Math.PI * 0.3
  };
  
  const tertiaryWave = {
    amplitude: 0.12,
    frequency: 6.5,
    speed: 1.2,
    phase: time * 1.2 + Math.PI * 0.7
  };
  
  // Создаем сложную волновую деформацию (как в океанских течениях)
  const wave1 = Math.sin(u * primaryWave.frequency * Math.PI * 2 + primaryWave.phase) * primaryWave.amplitude;
  const wave2 = Math.cos(u * secondaryWave.frequency * Math.PI * 2 + secondaryWave.phase) * secondaryWave.amplitude;
  const wave3 = Math.sin(u * tertiaryWave.frequency * Math.PI + tertiaryWave.phase) * tertiaryWave.amplitude;
  
  // Добавляем турбулентность для более реалистичного эффекта
  const turbulence1 = Math.sin(u * 11.3 * Math.PI + time * 1.5) * 0.08;
  const turbulence2 = Math.cos(u * 13.7 * Math.PI + time * 1.8 + Math.PI * 0.5) * 0.06;
  
  // Вертикальные волны для создания объемного эффекта
  const verticalWave = Math.sin(u * 3.2 * Math.PI + time * 0.9) * 0.15;
  
  // Комбинированная деформация
  const radialDeformation = wave1 + wave2 + wave3 + turbulence1 + turbulence2;
  const verticalDeformation = verticalWave + wave2 * 0.3;
  
  // Угол поворота для ленты Мёбиуса
  const angle = u * Math.PI * 2;
  const twist = u * Math.PI; // классический поворот Мёбиуса
  
  // Динамический радиус с волновой деформацией
  const dynamicR = R + radialDeformation;
  
  // Динамическая ширина для создания эффекта "дыхания" ленты
  const dynamicWidth = width * (1.0 + Math.sin(u * 8.0 * Math.PI + time * 0.7) * 0.15);
  
  // Вычисляем позицию точки на деформированной ленте Мёбиуса
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const cosTwist = Math.cos(twist);
  const sinTwist = Math.sin(twist);
  
  const x = (dynamicR + v * dynamicWidth * cosTwist) * cosAngle;
  const y = (dynamicR + v * dynamicWidth * cosTwist) * sinAngle + 
            v * dynamicWidth * sinTwist * 0.6 + verticalDeformation;
  const z = v * dynamicWidth * sinTwist + radialDeformation * 0.4;
  
  return target.set(x, y, z);
}

// Кэш для оптимизации вычислений
const particleDataCache = new Map<number, { u: number; v: number; offset: number }>();

/**
 * Генерирует позиции частиц вдоль ленты Мёбиуса с оптимизацией
 */
function generateMobiusParticles(count: number, time: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const tempVector = new THREE.Vector3();
  
  for (let i = 0; i < count; i++) {
    // Используем кэшированные данные для стабильности частиц
    let particleData = particleDataCache.get(i);
    if (!particleData) {
      particleData = {
        u: i / count,
        v: (Math.random() - 0.5) * 0.8,
        offset: Math.random() * Math.PI * 2
      };
      particleDataCache.set(i, particleData);
    }
    
    // Медленное движение вдоль ленты с индивидуальным смещением
    const u = (particleData.u + time * 0.015 + particleData.offset * 0.001) % 1.0;
    const v = particleData.v;
    
    mobiusStripWithDeformation(u, v, time, tempVector);
    
    const idx = i * 3;
    positions[idx] = tempVector.x;
    positions[idx + 1] = tempVector.y;
    positions[idx + 2] = tempVector.z;
  }
  
  return positions;
}

/**
 * Создает дополнительные частицы для эффекта океанского течения
 */
function generateFlowParticles(count: number, time: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const tempVector = new THREE.Vector3();
  
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = (Math.random() - 0.5) * 1.2;
    
    mobiusStripWithDeformation(u, v, time, tempVector);
    
    // Добавляем случайные отклонения для создания эффекта течения
    const flowOffset = 0.3;
    tempVector.x += (Math.random() - 0.5) * flowOffset;
    tempVector.y += (Math.random() - 0.5) * flowOffset;
    tempVector.z += (Math.random() - 0.5) * flowOffset;
    
    const idx = i * 3;
    positions[idx] = tempVector.x;
    positions[idx + 1] = tempVector.y;
    positions[idx + 2] = tempVector.z;
  }
  
  return positions;
}

/**
 * Компонент основных частиц ленты Мёбиуса
 */
const MobiusParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  
  // Адаптивное количество частиц в зависимости от производительности
  const particleCount = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? 1500 : 2200;
  }, []);
  
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    
    timeRef.current += delta;
    frameCountRef.current++;
    
    // Обновляем позиции частиц только каждый второй кадр для оптимизации
    if (frameCountRef.current % 2 === 0) {
      const newPositions = generateMobiusParticles(particleCount, timeRef.current);
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(newPositions, 3)
      );
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Медленное вращение всей системы
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.015;
  });
  
  const initialPositions = useMemo(() => 
    generateMobiusParticles(particleCount, 0), [particleCount]
  );
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={0x0088dd}
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
        fog={false}
      />
    </points>
  );
};

/**
 * Компонент частиц течения для создания океанского эффекта
 */
const FlowParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  
  // Меньше частиц течения для оптимизации
  const particleCount = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile ? 600 : 900;
  }, []);
  
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    
    timeRef.current += delta;
    frameCountRef.current++;
    
    // Обновляем позиции частиц течения каждые 3 кадра для экономии производительности
    if (frameCountRef.current % 3 === 0) {
      const newPositions = generateFlowParticles(particleCount, timeRef.current);
      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(newPositions, 3)
      );
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Более быстрое вращение для создания эффекта турбулентности
    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.z += delta * 0.025;
  });
  
  const initialPositions = useMemo(() => 
    generateFlowParticles(particleCount, 0), [particleCount]
  );
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={0x66bbff}
        size={0.006}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
        fog={false}
      />
    </points>
  );
};

/**
 * Компонент дополнительных эффектов свечения
 */
const GlowEffects: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= delta * 0.03;
    groupRef.current.rotation.x += delta * 0.01;
  });
  
  const glowParticles = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    const tempVector = new THREE.Vector3();
    
    for (let i = 0; i < 300; i++) {
      const u = Math.random();
      const v = (Math.random() - 0.5) * 0.6;
      
      mobiusStripWithDeformation(u, v, 0, tempVector);
      
      const idx = i * 3;
      positions[idx] = tempVector.x;
      positions[idx + 1] = tempVector.y;
      positions[idx + 2] = tempVector.z;
    }
    
    return positions;
  }, []);
  
  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={300}
            array={glowParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color={0xaaffcc}
          size={0.025}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
          fog={false}
        />
      </points>
    </group>
  );
};

/**
 * Основной компонент эффекта океанского течения в ленте Мёбиуса (только для клиента)
 */
export const MobiusOceanFlowCore: React.FC = () => {
  return (
    <div 
      style={{ 
        position: "fixed", 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(0,20,40,0.3) 0%, rgba(0,5,15,0.8) 100%)"
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 60 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* Океаническое освещение с глубиной */}
        <ambientLight intensity={0.4} color={0x001122} />
        <directionalLight 
          position={[8, 12, 6]} 
          intensity={0.8} 
          color={0x3388ff}
          castShadow={false}
        />
        <directionalLight 
          position={[-8, -6, -4]} 
          intensity={0.4} 
          color={0x66aaff}
        />
        <pointLight 
          position={[0, 0, 0]} 
          intensity={0.6} 
          color={0x88ccff}
          distance={10}
          decay={2}
        />
        
        {/* Основные частицы ленты Мёбиуса */}
        <MobiusParticles />
        
        {/* Частицы течения */}
        <FlowParticles />
        
        {/* Эффекты свечения */}
        <GlowEffects />
      </Canvas>
    </div>
  );
};
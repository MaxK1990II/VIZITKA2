"use client";

import { UniverseBackgroundThree } from "@/components/universe-background-three";
import { CustomCursor } from "@/components/custom-cursor";
import { useState, useEffect, useCallback } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const name = "Максим Каночкин";
  
  // Массив возможных амплуа
  const roles = [
    "Робототехник",
    "3D-дизайнер",
    "Программист",
    "Инженер",
    "Разработчик",
    "Автоматизатор",
    "ИИ-специалист",
    "Визуализатор",
    "Кодер",
    "Системщик",
    "Дизайнер",
    "Художник",
    "Креатор",
    "Изобретатель",
    "Новатор",
    "Наставник",
    "Педагог",
    "Руководитель",
    "Исследователь",
    "Аналитик",
    "Эксперт",
    "Специалист"
  ];

  // Состояние для каждой из 3 надписей
  const [role1, setRole1] = useState(roles[0]);
  const [role2, setRole2] = useState(roles[1]);
  const [role3, setRole3] = useState(roles[2]);
  const [isAnimating1, setIsAnimating1] = useState(false);
  const [isAnimating2, setIsAnimating2] = useState(false);
  const [isAnimating3, setIsAnimating3] = useState(false);

  // Функция для случайного выбора новой роли
  const getRandomRole = (currentRole: string) => {
    const availableRoles = roles.filter(role => role !== currentRole);
    return availableRoles[Math.floor(Math.random() * availableRoles.length)];
  };

  // Функция для анимации смены роли
  const animateRoleChange = useCallback((setRole: (role: string) => void, setIsAnimating: (animating: boolean) => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      setRole(getRandomRole(role1)); // Используем role1 как базовую для фильтрации
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  }, [role1]);

  // Автоматическая смена ролей с разными интервалами
  useEffect(() => {
    const interval1 = setInterval(() => animateRoleChange(setRole1, setIsAnimating1), 3000 + Math.random() * 2000);
    const interval2 = setInterval(() => animateRoleChange(setRole2, setIsAnimating2), 4000 + Math.random() * 3000);
    const interval3 = setInterval(() => animateRoleChange(setRole3, setIsAnimating3), 3500 + Math.random() * 2500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [animateRoleChange]);

  const getLetterStyle = (index: number, total: number, roleOffset: number) => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') {
      return {
        transform: 'translate(0px, 0px) scale(1)',
        transition: 'transform 0.1s ease-out'
      };
    }

    const elementCenterX = window.innerWidth / 2;
    const elementCenterY = window.innerHeight / 2;
    
    // Позиция буквы в одной линии (горизонтально)
    const letterOffset = (index - total / 2) * 8;
    const letterX = elementCenterX + roleOffset + letterOffset;
    const letterY = elementCenterY + 40; // все на одной высоте
    
    // Расстояние от курсора до буквы
    const dx = letterX - mousePos.x;
    const dy = letterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Эффект притягивания
    const maxDistance = 150;
    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * 0.3;
      const angle = Math.atan2(dy, dx);
      
      const offsetX = -Math.cos(angle) * force * 8;
      const offsetY = -Math.sin(angle) * force * 8;
      
      return {
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${1 + force * 0.1})`,
        transition: 'transform 0.1s ease-out'
      };
    }
    
    return {
      transform: 'translate(0px, 0px) scale(1)',
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <>
      <UniverseBackgroundThree />
      <CustomCursor />
      <main style={{ 
        position: "relative", 
        zIndex: 1, 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "2rem",
        cursor: "default",
        pointerEvents: "auto"
      }}>
        <div style={{ 
          textAlign: "center", 
          color: "white", 
          fontFamily: "Arial, sans-serif"
        }}>
          <h1 style={{ 
            fontSize: "4rem", 
            fontWeight: "bold", 
            margin: "0 0 1rem 0",
            textShadow: "0 0 20px rgba(143, 202, 255, 0.5)",
            letterSpacing: "0.1em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {name.split('').map((letter, index) => (
              <span 
                key={index}
                style={{
                  display: "inline-block",
                  ...getLetterStyle(index, name.length, 0)
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
          {/* Три роли в одну линию с фиксированной шириной */}
          <div style={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            fontSize: "1.1rem",
            fontWeight: "300",
            letterSpacing: "0.05em",
            color: "rgba(255, 255, 255, 0.85)",
            marginTop: "1rem"
          }}>
            {/* Первая роль - фиксированная ширина */}
            <div style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              height: "1.5rem",
              width: "180px"
            }}>
              {role1.split('').map((letter, index) => (
                <span 
                  key={index}
                  style={{
                    display: "inline-block",
                    transform: `${isAnimating1 ? 'translateY(-100%)' : 'translateY(0%)'}`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>

            {/* Минималистичный разделитель */}
            <div style={{
              width: "1px",
              height: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              position: "relative",
              flexShrink: 0
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "3px",
                height: "3px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)"
              }} />
            </div>

            {/* Вторая роль - фиксированная ширина */}
            <div style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              height: "1.5rem",
              width: "180px"
            }}>
              {role2.split('').map((letter, index) => (
                <span 
                  key={index}
                  style={{
                    display: "inline-block",
                    transform: `${isAnimating2 ? 'translateY(-100%)' : 'translateY(0%)'}`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>

            {/* Минималистичный разделитель */}
            <div style={{
              width: "1px",
              height: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              position: "relative",
              flexShrink: 0
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "3px",
                height: "3px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)"
              }} />
            </div>

            {/* Третья роль - фиксированная ширина */}
            <div style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              height: "1.5rem",
              width: "180px"
            }}>
              {role3.split('').map((letter, index) => (
                <span 
                  key={index}
                  style={{
                    display: "inline-block",
                    transform: `${isAnimating3 ? 'translateY(-100%)' : 'translateY(0%)'}`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
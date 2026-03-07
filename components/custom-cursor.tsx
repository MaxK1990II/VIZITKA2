"use client";

import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const isInteractiveElement = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return false;
      }

      return Boolean(target.closest('h1, h2, h3, button, a, [data-hover]'));
    };

    const handlePointerOver = (event: MouseEvent) => {
      setIsHovering(isInteractiveElement(event.target));
    };

    const handlePointerOut = (event: MouseEvent) => {
      const nextTarget = event.relatedTarget;
      setIsHovering(isInteractiveElement(nextTarget));
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`cursor-sphere ${isHovering ? 'hover' : ''}`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
      }}
    />
  );
};
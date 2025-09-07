"use client";

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    
    const springConfig = { damping: 25, stiffness: 300 } as const;

    const cursorX = useSpring(-100, springConfig);
    const cursorY = useSpring(-100, springConfig);
    
    const dotX = useSpring(-100, { damping: 35, stiffness: 800 });
    const dotY = useSpring(-100, { damping: 35, stiffness: 800 });


    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            dotX.set(e.clientX - 4);
            dotY.set(e.clientY - 4);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as Element | null;
            if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button'))) {
                setIsHoveringLink(true);
            }
        };
        
        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as Element | null;
            if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button'))) {
                setIsHoveringLink(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorX, cursorY, dotX, dotY]);

    return (
        <>
            <motion.div
                style={{ translateX: cursorX, translateY: cursorY, scale: isHoveringLink ? 2 : 1 }}
                className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-200"
            />
            <motion.div
                style={{ translateX: dotX, translateY: dotY }}
                className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50"
            />
        </>
    );
};

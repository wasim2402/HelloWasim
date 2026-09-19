"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add a style tag to dynamically handle cursor states
    const style = document.createElement("style");
    document.head.appendChild(style);

    let lastClientX = 0;
    let lastClientY = 0;
    let hasMoved = false;

    const checkActiveSection = (target: Element | null) => {
      if (!target) {
        setIsVisible(false);
        if (style.innerHTML !== '') style.innerHTML = '';
        return;
      }

      // Check if mouse is over specific sections
      const isActiveSection = !!(
        target.closest('#experience') || 
        target.closest('#services') || 
        target.closest('#skills')
      );

      if (isActiveSection) {
        setIsVisible(true);
        if (style.innerHTML === '') {
          style.innerHTML = `* { cursor: none !important; }`;
        }
        
        // Check if hovering over clickable elements
        if (
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button')
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      } else {
        setIsVisible(false);
        if (style.innerHTML !== '') {
          style.innerHTML = '';
        }
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      hasMoved = true;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      checkActiveSection(e.target as Element);
    };

    const handleScroll = () => {
      if (!hasMoved) return;
      const target = document.elementFromPoint(lastClientX, lastClientY);
      checkActiveSection(target);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      style.innerHTML = '';
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 z-[10000] pointer-events-none flex flex-col items-start"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 50,
            mass: 0.1,
          }}
        >
          {/* SVG Blue Pointer */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500 drop-shadow-md"
            style={{ transform: 'translate(-4px, -4px)' }}
          >
            <path 
              d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 00-.85.36z" 
              fill="currentColor" 
              stroke="white" 
              strokeWidth="1.5"
            />
          </svg>
          
          {/* Pill */}
          <div className="bg-blue-500 text-white rounded-full flex items-center px-2 py-1.5 shadow-xl whitespace-nowrap ml-3 mt-1 pointer-events-none">
            <div className="w-5 h-5 rounded-full overflow-hidden mr-2 border-2 border-white/30">
              <Image
                src="/profile.jpg"
                alt="Wasim"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold pr-1 tracking-wide">Wasim</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

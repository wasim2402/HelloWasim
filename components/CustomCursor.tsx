"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Inject global cursor: none style for desktop
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let isClicked = false;
    let isVisible = false;
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      // High-performance lerp (0.75 gives near-instant response with butter-smooth interpolation)
      currentX = lerp(currentX, targetX, 0.75);
      currentY = lerp(currentY, targetY, 0.75);

      if (cursor) {
        const scale = isClicked ? 0.85 : isHovered ? 1.2 : 1;
        cursor.style.transform = `translate3d(${currentX - 5.5}px, ${currentY - 2.85}px, 0) scale(${scale})`;
        cursor.style.opacity = isVisible ? "1" : "0";
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        // Snap immediately on first entrance so it doesn't fly across screen
        currentX = e.clientX;
        currentY = e.clientY;
        isVisible = true;
      }
      targetX = e.clientX;
      targetY = e.clientY;

      // Check if hovering clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("a, button, [role='button'], input, textarea, select");
        isHovered = !!clickable;
      }
    };

    const onMouseDown = () => {
      isClicked = true;
    };

    const onMouseUp = () => {
      isClicked = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = (e: MouseEvent) => {
      isVisible = true;
      targetX = e.clientX;
      targetY = e.clientY;
      currentX = e.clientX;
      currentY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[100000] pointer-events-none will-change-transform transition-opacity duration-150 ease-out opacity-0"
      style={{ transformOrigin: "5.5px 2.85px" }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#C8102E] drop-shadow-[0_2px_10px_rgba(200,16,46,0.55)]"
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 00-.85.36z"
          fill="currentColor"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

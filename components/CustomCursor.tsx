"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable completely on touchscreens
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const inner = innerRef.current;
    if (!cursor || !inner) return;

    // Inject global cursor: none style for desktop
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let isVisible = false;

    // Offset for 30px arrow cursor tip (SVG tip at 5.5, 2.85 in 24x24 viewBox scaled by 1.25)
    const TIP_OFFSET_X = 6.9;
    const TIP_OFFSET_Y = 3.6;

    const updatePosition = (clientX: number, clientY: number) => {
      // Direct hardware-accelerated transform without RAF queue delay = 0ms latency
      cursor.style.transform = `translate3d(${clientX - TIP_OFFSET_X}px, ${clientY - TIP_OFFSET_Y}px, 0)`;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest("a, button, [role='button'], input, textarea, select");
        if (isClickable) {
          inner.style.transform = "scale(1.22)";
        } else {
          inner.style.transform = "scale(1)";
        }
      }
    };

    const onMouseDown = () => {
      inner.style.transform = "scale(0.85)";
    };

    const onMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isClickable = target ? !!target.closest("a, button, [role='button'], input, textarea, select") : false;
      inner.style.transform = isClickable ? "scale(1.22)" : "scale(1)";
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = "0";
    };

    const onMouseEnter = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
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
      className="fixed top-0 left-0 z-[100000] pointer-events-none will-change-transform opacity-0 transition-opacity duration-150 ease-out"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      <div
        ref={innerRef}
        className="origin-[6.9px_3.6px] transition-transform duration-150 ease-out"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C8102E] drop-shadow-[0_2px_12px_rgba(200,16,46,0.6)]"
        >
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.85a.5.5 0 00-.85.36z"
            fill="currentColor"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

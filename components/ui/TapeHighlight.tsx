"use client"

import React from "react"

interface TapeHighlightProps {
  children: React.ReactNode
  className?: string
  textClassName?: string
}

export function TapeHighlight({
  children,
  className = "",
  textClassName = "text-white font-normal",
}: TapeHighlightProps) {
  return (
    <span
      className={`relative inline-block mx-1 px-2.5 sm:px-3 py-0.5 sm:py-1 align-baseline select-none whitespace-nowrap ${className}`}
    >
      {/* Authentic Torn Highlighter Block */}
      <svg
        viewBox="0 0 200 50"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full -z-0 pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.18)]"
        fill="#C8102E"
        aria-hidden="true"
      >
        <path d="M 5 6 L 15 4.5 L 30 5.5 L 50 3.5 L 75 5 L 100 3 L 130 4.5 L 160 3 L 185 4.5 L 194 5.5 L 196 10 L 193 15 L 197 21 L 194 27 L 198 33 L 193 39 L 197 45 L 193 48 L 180 47 L 155 48.5 L 130 47 L 105 48 L 80 46.5 L 55 48 L 30 46.5 L 15 48 L 5 47 L 7 42 L 3 36 L 8 30 L 4 24 L 7 18 L 3 12 L 6 7 Z" />
      </svg>

      {/* Text Content */}
      <span className={`relative z-10 leading-none ${textClassName}`}>
        {children}
      </span>
    </span>
  )
}

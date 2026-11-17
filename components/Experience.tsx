"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Compass, Flag, Milestone } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ExperienceItem {
  id: number
  milestone: string
  year: string
  title: string
  stageTag: string
  bullets: string[]
  alignment: "left" | "right"
  stopProgress: number
  note: string
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    milestone: "01",
    year: "2018 - 2020",
    title: "GUIDANCE ACADEMY",
    stageTag: "WAYPOINT 01 · FOUNDATION",
    bullets: ["MATRICULATION", "PERCENTAGE: 74%", "MSD, WB, India"],
    alignment: "left",
    stopProgress: 0.18,
    note: "The journey kicks off with academic discipline and foundational science.",
  },
  {
    id: 2,
    milestone: "02",
    year: "2020 - 2022",
    title: "GUIDANCE ACADEMY",
    stageTag: "WAYPOINT 02 · INTERMEDIATE",
    bullets: ["INTERMEDIATE", "PERCENTAGE: 92.8%", "MSD, WB, India"],
    alignment: "right",
    stopProgress: 0.41,
    note: "Major acceleration: graduating top of class with 92.8% and embracing computing.",
  },
  {
    id: 3,
    milestone: "03",
    year: "2022 - 2026",
    title: "MAKAUT (WBUT)",
    stageTag: "WAYPOINT 03 · ENGINEERING",
    bullets: [
      "BACHELOR OF TECHNOLOGY - IT",
      "CGPA: 8.2",
      "NADIA, WB, India",
    ],
    alignment: "left",
    stopProgress: 0.65,
    note: "Full-stack architecture, algorithms, interactive frontends & scalable systems.",
  },
  {
    id: 4,
    milestone: "04",
    year: "July 2026 - Present",
    title: "NAPPLIED",
    stageTag: "WAYPOINT 04 · CURRENT EXPEDITION",
    bullets: ["AI FRONTEND ENGINEER", "Bangalore, Karnataka, India"],
    alignment: "right",
    stopProgress: 0.88,
    note: "Architecting autonomous AI interfaces, frontend architectures & digital products.",
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const roadSvgRef = useRef<SVGSVGElement>(null)
  const roadActiveRef = useRef<SVGPathElement>(null)
  const bikeRef = useRef<HTMLDivElement>(null)
  const [activeStop, setActiveStop] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const currentProgressRef = useRef<number>(0)

  // Track responsive mode
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Desktop S-curve highway coordinates vs Mobile streamlined highway coordinates
  // Restored full dramatic curving S-path concluding at Y = 2120 right before the finish terminal
  const roadD = isMobile
    ? "M 44 50 C 44 180, 36 280, 44 420 C 52 580, 36 740, 44 920 C 52 1080, 36 1240, 44 1420 C 52 1580, 36 1740, 44 1920 C 52 2010, 44 2060, 44 2120"
    : "M 500 50 C 500 180, 400 280, 400 420 C 390 580, 610 740, 600 920 C 590 1080, 390 1240, 400 1420 C 410 1580, 610 1740, 600 1920 C 590 2010, 500 2060, 500 2120"

  const viewBox = isMobile ? "0 0 360 2250" : "0 0 1000 2250"

  // Position bike accurately in the middle of the road
  const updateBike = useCallback(
    (progress: number) => {
      const container = containerRef.current
      const activePath = roadActiveRef.current
      const bike = bikeRef.current
      if (!container || !activePath || !bike) return

      const totalLength = activePath.getTotalLength()
      const currentDist = progress * totalLength
      const pt = activePath.getPointAtLength(currentDist)

      // Sample two nearby points for smooth screen-space tangent angle
      const p1 = activePath.getPointAtLength(Math.max(0, currentDist - 2))
      const p2 = activePath.getPointAtLength(Math.min(totalLength, currentDist + 2))

      const containerW = container.clientWidth
      const containerH = container.clientHeight
      const vbW = isMobile ? 360 : 1000
      const vbH = 2250

      const scaleX = containerW / vbW
      const scaleY = containerH / vbH

      // Real screen coordinates matching exact SVG road center
      const screenX = pt.x * scaleX
      const screenY = pt.y * scaleY

      // Tangent vector scaled to screen aspect ratio
      const screenDx = (p2.x - p1.x) * scaleX
      const screenDy = (p2.y - p1.y) * scaleY
      const angle = Math.atan2(screenDy, screenDx) * (180 / Math.PI)

      // Center bike directly on the road center
      bike.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) rotate(${angle}deg)`

      // Active illuminated crimson trail drawn directly up to bike
      activePath.style.strokeDashoffset = `${totalLength * (1 - progress)}`
    },
    [isMobile]
  )

  // GSAP ScrollTrigger path-following animation
  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const activePath = roadActiveRef.current
    const bike = bikeRef.current
    if (!section || !container || !activePath || !bike) return

    const totalLength = activePath.getTotalLength()

    // Initialize stroke dash for active red road trail
    activePath.style.strokeDasharray = `${totalLength} ${totalLength}`
    activePath.style.strokeDashoffset = `${totalLength}`

    // Set initial position at start line
    updateBike(0)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1,
        onUpdate: (self) => {
          const progress = self.progress
          currentProgressRef.current = progress

          // Update bike position dead center on road
          updateBike(progress)

          // Determine currently active milestone
          let currentActive = 0
          for (let i = experienceData.length - 1; i >= 0; i--) {
            if (progress >= experienceData[i].stopProgress - 0.05) {
              currentActive = experienceData[i].id
              break
            }
          }
          setActiveStop(currentActive)
        },
      })
    }, sectionRef)

    // Window resize handler keeps bike centered even when viewport size changes
    const handleWindowResize = () => {
      updateBike(currentProgressRef.current)
    }
    window.addEventListener("resize", handleWindowResize)

    return () => {
      ctx.revert()
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [isMobile, updateBike])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-[#111111] text-white py-16 md:py-24 relative border-t border-white/10 overflow-hidden select-none"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-white/60 uppercase font-mono">
                Career Expedition · 2018 ──► 2026+
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-light tracking-tighter leading-none text-white">
              JOURNEY
            </h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-400 w-fit">
            <Compass className="w-4 h-4 text-[#C8102E] animate-spin [animation-duration:12s]" />
            <span>INTERACTIVE ROAD TRIP · SCROLL TO NAVIGATE</span>
          </div>
        </div>

        {/* Top border line */}
        <div className="w-full h-[1px] bg-white/10 mb-8 md:mb-12" />

        {/* Road Trip Stage Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[2250px] overflow-visible"
        >
          {/* SVG Road Surface, Markings & Active Trail */}
          <svg
            ref={roadSvgRef}
            viewBox={viewBox}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Automotive Headlight Beam Gradient */}
              <linearGradient
                id="bikeHeadlightBeam"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#FFF1B8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
              </linearGradient>

              {/* Waypoint Marker Pulse Glow */}
              <radialGradient id="waypointPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C8102E" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C8102E" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 1. Outer Road Bed / Curbs */}
            <path
              d={roadD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth={isMobile ? "28" : "36"}
              strokeLinecap="round"
            />

            {/* 2. Main Dark Asphalt Surface */}
            <path
              d={roadD}
              fill="none"
              stroke="#181818"
              strokeWidth={isMobile ? "22" : "28"}
              strokeLinecap="round"
            />

            {/* 3. Highway Lane Center Markings (Dashed Line) */}
            <path
              d={roadD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
              strokeDasharray="10 14"
              strokeLinecap="round"
            />

            {/* 4. Active Traveled Highway Trail (Illuminated Crimson Line) */}
            <path
              ref={roadActiveRef}
              d={roadD}
              fill="none"
              stroke="#C8102E"
              strokeWidth={isMobile ? "3" : "3.5"}
              strokeLinecap="round"
              className="drop-shadow-[0_0_12px_rgba(200,16,46,0.85)]"
            />

            {/* 5. Start Line Marking */}
            <line
              x1={isMobile ? "24" : "476"}
              y1="50"
              x2={isMobile ? "64" : "524"}
              y2="50"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="4 4"
            />

            {/* 6. Finish Line Marking (At Y = 2120 where road concludes) */}
            <line
              x1={isMobile ? "24" : "476"}
              y1="2120"
              x2={isMobile ? "64" : "524"}
              y2="2120"
              stroke="#C8102E"
              strokeWidth="4"
              strokeDasharray="4 4"
            />
            <line
              x1={isMobile ? "24" : "476"}
              y1="2124"
              x2={isMobile ? "64" : "524"}
              y2="2124"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Start Point Marker (Top of Highway) */}
          <div
            className={`absolute z-10 flex items-center gap-2.5 ${
              isMobile
                ? "left-[64px] top-[40px]"
                : "left-1/2 -translate-x-1/2 top-[12px]"
            }`}
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1c1c] border border-white/15 text-[10px] md:text-xs font-mono text-neutral-300 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="font-bold">STARTING POINT · 2018</span>
              <span className="text-neutral-500">— THE TRIP BEGINS</span>
            </div>
          </div>

          {/* Traveling Motorcycle & Rider (Centered Exactly in Road Middle) */}
          <div
            ref={bikeRef}
            className="absolute top-0 left-0 w-[68px] h-[34px] pointer-events-none z-30 will-change-transform"
            style={{
              transformOrigin: "center center",
            }}
          >
            <svg
              viewBox="0 0 100 40"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Conical Headlight Beam (Cast forward onto road) */}
              <polygon
                points="78,20 168,2 168,38"
                fill="url(#bikeHeadlightBeam)"
              />

              {/* Rear Tire (Centered horizontally around 50) */}
              <rect
                x="20"
                y="15"
                width="14"
                height="10"
                rx="3"
                fill="#161616"
                stroke="#333"
                strokeWidth="1.5"
              />

              {/* Front Tire */}
              <rect
                x="68"
                y="16"
                width="12"
                height="8"
                rx="3"
                fill="#161616"
                stroke="#333"
                strokeWidth="1.5"
              />

              {/* Rear Fender & Red Taillight */}
              <rect x="26" y="17" width="8" height="6" rx="2" fill="#222" />
              <circle
                cx="21"
                cy="20"
                r="2.5"
                fill="#C8102E"
                className="drop-shadow-[0_0_6px_#C8102E]"
              />

              {/* Bike Chassis / Engine Block */}
              <rect x="34" y="14" width="28" height="12" rx="4" fill="#252525" />

              {/* Crimson Bodywork / Fuel Tank */}
              <path
                d="M 40 13 C 52 13, 62 15, 62 20 C 62 25, 52 27, 40 27 C 34 27, 30 25, 30 20 C 30 15, 34 13, 40 13 Z"
                fill="#C8102E"
              />
              <path
                d="M 38 17 L 54 17 C 56 18, 56 22, 54 23 L 38 23 Z"
                fill="#99001A"
              />

              {/* Handlebars */}
              <line
                x1="63"
                y1="8"
                x2="63"
                y2="32"
                stroke="#888"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Handlebar Grips */}
              <rect x="61" y="7" width="4" height="4" rx="1" fill="#111" />
              <rect x="61" y="29" width="4" height="4" rx="1" fill="#111" />

              {/* Rider Gear: Arms gripping handlebars */}
              <path
                d="M 40 11 L 61 10 L 59 14 L 42 16 Z"
                fill="#1f1f1f"
                stroke="#111"
              />
              <path
                d="M 40 29 L 61 30 L 59 26 L 42 24 Z"
                fill="#1f1f1f"
                stroke="#111"
              />

              {/* Rider Torso & Riding Jacket */}
              <ellipse
                cx="41"
                cy="20"
                rx="9"
                ry="7.5"
                fill="#121212"
                stroke="#2a2a2a"
                strokeWidth="1.2"
              />

              {/* Rider Helmet */}
              <circle
                cx="46"
                cy="20"
                r="6.5"
                fill="#080808"
                stroke="#C8102E"
                strokeWidth="1.5"
              />
              {/* Visor */}
              <path
                d="M 49 17 Q 52 20, 49 23"
                stroke="#bbb"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Headlight bulb */}
              <circle cx="76" cy="20" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Road Trip Waypoints & Destination Cards */}
          {experienceData.map((item, idx) => {
            const isActive = activeStop >= item.id

            // Vertical position along the 2250px highway
            const topPositions = [420, 920, 1420, 1920]
            const topY = topPositions[idx]

            // Waypoint coordinates along the restored older sweeping curve:
            // Y=420 -> X=400 (40%), Y=920 -> X=600 (60%), Y=1420 -> X=400 (40%), Y=1920 -> X=600 (60%)
            const pinX = isMobile
              ? 44
              : item.alignment === "left"
              ? 400
              : 600

            return (
              <div
                key={item.id}
                className="absolute w-full"
                style={{ top: `${topY}px` }}
              >
                {/* Subtle horizontal dashed connector line between road waypoint and station card */}
                {!isMobile && (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-[1px] border-b border-dashed transition-all duration-500 pointer-events-none z-10 ${
                      item.alignment === "left"
                        ? "left-[28%] right-[60%]"
                        : "left-[60%] right-[28%]"
                    } ${
                      isActive
                        ? "border-[#C8102E]/70 shadow-[0_0_8px_rgba(200,16,46,0.45)]"
                        : "border-white/10"
                    }`}
                  />
                )}

                {/* 1. Milestone Waypoint Pin on the Road */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none"
                  style={{
                    left: isMobile ? "44px" : `${pinX / 10}%`,
                  }}
                >
                  {/* Waypoint Pulse Ring */}
                  {isActive && (
                    <div className="absolute w-12 h-12 rounded-full bg-[#C8102E]/25 animate-ping [animation-duration:2.5s]" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isActive
                        ? "border-[#C8102E] bg-[#111] text-[#C8102E] shadow-[0_0_15px_rgba(200,16,46,0.6)]"
                        : "border-neutral-700 bg-[#080808] text-neutral-500"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">
                      {item.milestone}
                    </span>
                  </div>
                </div>

                {/* 2. Destination Station Card - Positioned far to the side to NEVER cross the curving road */}
                <div
                  className={`absolute -translate-y-1/2 transition-all duration-500 ${
                    isMobile
                      ? "left-[74px] right-2"
                      : item.alignment === "left"
                      ? "left-0 md:left-2 lg:left-4 xl:left-6 w-[30%] md:w-[28%] lg:w-[27%] max-w-[350px] lg:max-w-[370px]"
                      : "right-0 md:right-2 lg:right-4 xl:right-6 w-[30%] md:w-[28%] lg:w-[27%] max-w-[350px] lg:max-w-[370px]"
                  }`}
                >
                  <div
                    className={`rounded-2xl p-5 md:p-7 backdrop-blur-md transition-all duration-500 shadow-2xl relative ${
                      isActive
                        ? "bg-[#181818]/95 border border-[#C8102E]/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                        : "bg-[#141414]/70 border border-white/10 opacity-40 hover:opacity-75"
                    }`}
                  >
                    {/* Top Row: Milestone Tag + Year */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors ${
                          isActive ? "text-[#C8102E]" : "text-neutral-500"
                        }`}
                      >
                        <Milestone className="w-3.5 h-3.5" />
                        {item.stageTag}
                      </span>

                      <span className="text-xs font-mono font-medium text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">
                        {item.year}
                      </span>
                    </div>

                    {/* Institution / Company Headline */}
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-serif italic tracking-wide mb-5 leading-tight transition-colors ${
                        isActive ? "text-[#C8102E]" : "text-white/80"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Bullet Points */}
                    <div className="flex flex-col gap-2.5 mb-5">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2.5">
                          <div
                            className={`w-1.5 h-1.5 transition-colors shrink-0 ${
                              isActive ? "bg-[#C8102E]" : "bg-neutral-600"
                            }`}
                          />
                          <span className="font-mono text-xs md:text-sm text-neutral-300 uppercase tracking-widest">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Route Story Note */}
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed pt-4 border-t border-white/5 font-sans">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Journey Finish Destination (Terminus right below the finish line) */}
          <div
            className={`absolute z-20 flex flex-col items-center pointer-events-auto ${
              isMobile
                ? "left-[44px] -translate-x-1/2 top-[2142px]"
                : "left-1/2 -translate-x-1/2 top-[2142px]"
            }`}
          >
            <div
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border transition-all duration-300 shadow-xl ${
                activeStop >= 4
                  ? "bg-[#111111] border-[#C8102E] text-white shadow-[0_0_20px_rgba(200,16,46,0.45)]"
                  : "bg-[#141414] border-white/15 text-neutral-400"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  activeStop >= 4
                    ? "bg-[#C8102E]/20 border border-[#C8102E] text-[#C8102E]"
                    : "bg-white/5 border border-white/10 text-neutral-500"
                }`}
              >
                <Flag className="w-3 h-3" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-white leading-tight">
                  NEXT STOP: WHAT&apos;S NEXT?
                </span>
                <span
                  className={`text-[9px] md:text-[10px] font-mono font-semibold flex items-center gap-1 transition-colors leading-tight ${
                    activeStop >= 4 ? "text-[#C8102E]" : "text-neutral-500"
                  }`}
                >
                  <span>THE JOURNEY CONTINUES</span>
                  <span className="text-[10px] leading-none">──►</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

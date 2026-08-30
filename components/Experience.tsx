"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const experienceData = [
  {
    id: 1,
    year: "2018 - 2020",
    title: "GUIDANCE ACADEMY",
    bullets: [
      "MATRICULATION",
      "PERCENTAGE: 74%",
      "MSD, WB, India"
    ]
  },
  {
    id: 2,
    year: "2020 - 2022",
    title: "GUIDANCE ACADEMY",
    bullets: [
      "INTERMEDIATE",
      "PERCENTAGE: 92.8%",
      "MSD, WB, India"
    ]
  },
  {
    id: 3,
    year: "2022 - 2026",
    title: "MAKAUT (WBUT)",
    bullets: [
      "BACHELOR OF TECHNOLOGY - IT",
      "CGPA: 8.2",
      "NADIA, WB, India"
    ]
  },
  {
    id: 4,
    year: "July 2026 - Present",
    title: "NAPPLIED",
    bullets: [
      "AI FRONTEND ENGINEER",
      "Bangalore, Karnataka, India"
    ]
  }
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // The red line fills up based on scroll progress
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="bg-[#050505] text-white py-24 md:py-40 relative border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C084FC]"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Experience</span>
          </div>
          <div className="flex justify-between items-baseline">
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-light tracking-tighter leading-none">
              JOURNEY
            </h2>
          </div>
        </div>

        {/* Top border line */}
        <div className="w-full h-[1px] bg-white/10 mb-20 md:mb-32"></div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full pb-20">

          {/* Base Gray Line */}
          <div className="absolute left-[8px] top-0 bottom-0 w-[1px] bg-white/10"></div>

          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[8px] top-0 bottom-0 w-[1px] bg-[#C084FC] origin-top"
          ></motion.div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-24 md:gap-40">
            {experienceData.map((item) => (
              <div key={item.id} className="relative flex flex-col md:flex-row md:items-start group">

                {/* Timeline Dot & Year */}
                <div className="flex items-center gap-6 md:gap-12 md:w-1/3 mb-6 md:mb-0">
                  <div className="relative z-10 w-[17px] h-[17px] rounded-full border border-neutral-600 bg-[#050505] flex items-center justify-center transition-colors duration-300 group-hover:border-[#C084FC]">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-[#C084FC] transition-colors duration-300"></div>
                  </div>
                  <span className="text-xl md:text-2xl font-light tracking-wider">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="md:w-2/3 pl-[40px] md:pl-0 flex flex-col pt-[-10px]">
                  <h3 className="text-3xl md:text-5xl text-[#C084FC] font-serif italic tracking-wide mb-8">
                    {item.title}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {item.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-[#C084FC]"></div>
                        <span className="font-mono text-xs md:text-sm text-neutral-400 uppercase tracking-widest">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import { Archivo } from "next/font/google"
import { motion, useScroll, useTransform } from "framer-motion"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800']
})

const baseRow1 = ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "TAILWIND CSS", "THREE.JS", "GSAP", "LENIS"]
const baseRow2 = ["POSTMAN", "MONGODB", "FRAMER", "EXPRESS", "JAVASCRIPT", "HTML", "CSS", "GIT"]

// Duplicate rows to ensure they cover the screen width entirely
const row1 = [...baseRow1, ...baseRow1, ...baseRow1]
const row2 = [...baseRow2, ...baseRow2, ...baseRow2]

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scrub animations tied to scroll position
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"])

  return (
    <section ref={containerRef} id="skills" className="py-32 relative overflow-hidden bg-[#0a0a0a] min-h-screen flex flex-col justify-center text-white">
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Title Area */}
        <div className="text-center mb-12 flex flex-col items-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Skills</span>
          </div>
          <h2 className={`text-white text-5xl md:text-7xl lg:text-[110px] font-medium uppercase tracking-tighter leading-none ${archivo.className}`}>
            TOOLING &
          </h2>
          
          <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-400 to-neutral-800 text-5xl md:text-7xl lg:text-[120px] font-instrument italic lowercase tracking-tight leading-none mt-[-5px] md:mt-[-15px] mb-12">
            methodology
          </h2>
          
          <p className={`max-w-2xl mx-auto text-sm md:text-base text-neutral-400 mt-4 leading-relaxed ${archivo.className} font-normal tracking-wide`}>
            We don't just use frameworks; we understand their underlying mechanics. By composing raw primitives and modern abstractions, we build resilient systems.
          </p>
        </div>
      </div>

      {/* Skills Pills */}
      <div className="w-[150%] -ml-[25%] flex flex-col gap-6 md:gap-8 pb-10 -rotate-[4deg] origin-center mt-4 relative z-10">
        {/* Row 1 */}
        <motion.div 
          className="flex gap-4 md:gap-6 w-max px-4"
          style={{ x: x1 }}
        >
          {row1.map((skill, i) => (
            <div 
              key={i} 
              className={`px-6 py-3 md:px-10 md:py-4 rounded-full border border-white/10 text-white text-sm md:text-lg whitespace-nowrap tracking-wider bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors ${archivo.className}`}
            >
              {skill}
            </div>
          ))}
        </motion.div>
        
        {/* Row 2 */}
        <motion.div 
          className="flex gap-4 md:gap-6 w-max px-4"
          style={{ x: x2 }}
        >
          {row2.map((skill, i) => (
            <div 
              key={i} 
              className={`px-6 py-3 md:px-10 md:py-4 rounded-full border border-white/10 text-white text-sm md:text-lg whitespace-nowrap tracking-wider bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors ${archivo.className}`}
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
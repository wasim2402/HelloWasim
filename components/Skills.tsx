"use client"

import { useRef } from "react"
import { Archivo } from "next/font/google"
import { motion, useScroll, useTransform } from "framer-motion"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800']
})

const baseRow1 = ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "TAILWIND CSS"]
const baseRow2 = ["THREE.JS", "GSAP", "LENIS", "FRAMER", "MONGODB"]
const baseRow3 = ["POSTMAN", "EXPRESS", "JAVASCRIPT", "HTML", "CSS", "GIT"]

// Duplicate rows to ensure they cover the screen width entirely, especially on mobile where items are smaller
const row1 = [...baseRow1, ...baseRow1, ...baseRow1, ...baseRow1]
const row2 = [...baseRow2, ...baseRow2, ...baseRow2, ...baseRow2]
const row3 = [...baseRow3, ...baseRow3, ...baseRow3, ...baseRow3]

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scrub animations tied to scroll position (alternating directions)
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"])
  const x3 = useTransform(scrollYProgress, [0, 1], ["-5%", "-20%"])

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
      <div className="w-[200%] -ml-[50%] flex flex-col gap-4 md:gap-6 lg:gap-8 pb-10 -rotate-[4deg] origin-center mt-8 relative z-10">
        {/* Row 1 */}
        <motion.div 
          className="flex gap-3 md:gap-4 lg:gap-6 w-max px-4"
          style={{ x: x1 }}
        >
          {row1.map((skill, i) => (
            <div 
              key={`r1-${i}`} 
              className={`px-5 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-full border border-white/10 text-white text-xs md:text-sm lg:text-lg whitespace-nowrap tracking-wider bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors ${archivo.className}`}
            >
              {skill}
            </div>
          ))}
        </motion.div>
        
        {/* Row 2 */}
        <motion.div 
          className="flex gap-3 md:gap-4 lg:gap-6 w-max px-4"
          style={{ x: x2 }}
        >
          {row2.map((skill, i) => (
            <div 
              key={`r2-${i}`} 
              className={`px-5 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-full border border-white/10 text-white text-xs md:text-sm lg:text-lg whitespace-nowrap tracking-wider bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors ${archivo.className}`}
            >
              {skill}
            </div>
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div 
          className="flex gap-3 md:gap-4 lg:gap-6 w-max px-4"
          style={{ x: x3 }}
        >
          {row3.map((skill, i) => (
            <div 
              key={`r3-${i}`} 
              className={`px-5 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-full border border-white/10 text-white text-xs md:text-sm lg:text-lg whitespace-nowrap tracking-wider bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors ${archivo.className}`}
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
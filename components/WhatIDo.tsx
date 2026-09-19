"use client"

import { useRef } from "react"
import { Archivo } from "next/font/google"
import { motion, useScroll, useTransform } from "framer-motion"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const services = [
  {
    id: "001",
    title: "AI-Powered Web Experiences",
    description: "Building smart, modern web applications leveraging the latest AI technologies to deliver personalized and dynamic user experiences."
  },
  {
    id: "002",
    title: "Modern Frontend Engineering",
    description: "Crafting highly interactive, fast, and accessible user interfaces using cutting-edge frameworks like React and Next.js."
  },
  {
    id: "003",
    title: "Full-Stack Product Development",
    description: "Architecting scalable and resilient end-to-end solutions, from robust backend systems to intuitive client-side applications."
  },
  {
    id: "004",
    title: "UI/UX & Responsive Interfaces",
    description: "Designing intuitive, user-centric interfaces that provide seamless and pixel-perfect experiences across all devices and screen sizes."
  },
  {
    id: "005",
    title: "API Integrations & Automation",
    description: "Optimizing business processes by connecting third-party services and integrating automation tools to reduce manual work."
  }
]

export default function WhatIDo() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 1. Counter-Scroll Pinning (Bulletproof)
  // Instead of relying on CSS sticky or GSAP fixed positioning (which both break easily), 
  // we physically translate the container down exactly as much as the user scrolls down!
  // Since the wrapper is 300vh and the viewport is 100vh, the total scroll distance is 200vh.
  const pinY = useTransform(scrollYProgress, [0, 1], ["0vh", "200vh"])

  // 2. Right Column Animation
  // It moves up relative to the pinned container.
  const rightColumnY = useTransform(scrollYProgress, [0, 1], ["20vh", "-120vh"])

  return (
    <section id="services" className="bg-[#171717] text-white relative border-t border-white/10">
      
      {/* 
        Desktop View (Pinned Scroll)
        Hidden on mobile, block on tablet and up.
      */}
      <div ref={containerRef} className="hidden md:block h-[300vh] relative w-full overflow-hidden">
        <motion.div 
          style={{ y: pinY }} 
          className="absolute top-0 left-0 w-full h-screen overflow-hidden flex items-center"
        >
          <div className="absolute top-12 left-6 md:left-12 lg:left-16 flex items-center gap-3 z-20">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Services</span>
          </div>

          <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start relative h-full">
            <div className="md:col-span-5 lg:col-span-4 flex flex-col pt-[15vh] md:pt-[25vh]">
              <h2 className={`text-6xl md:text-7xl lg:text-[100px] font-semibold leading-[0.9] tracking-tighter mb-10 ${archivo.className}`}>
                WHAT I<br />DO.
              </h2>
              <p className="text-neutral-300 text-lg md:text-xl max-w-[400px] leading-relaxed font-light">
                From brand identity to AI-powered websites<br className="hidden lg:block" />
                — I deliver clean, fast, and user-friendly<br className="hidden lg:block" />
                solutions that help businesses grow.
              </p>
            </div>

            <div className="md:col-span-7 lg:col-span-8 md:pl-10 lg:pl-20 h-full relative md:border-l border-white/10">
              <motion.div 
                style={{ y: rightColumnY }}
                className="flex flex-col gap-12 md:gap-16 pt-[25vh] w-full absolute top-0 left-0"
              >
                {services.map((service) => (
                  <div key={service.id} className="flex flex-col border-b border-white/10 pb-12 md:pb-16">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-6">
                      <span className="text-purple-400 text-lg md:text-xl font-mono tracking-wider font-semibold">
                        {service.id}
                      </span>
                      <h3 className={`text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white ${archivo.className}`}>
                        {service.title}
                      </h3>
                    </div>
                    <div className="md:pl-[5.5rem]">
                      <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 
        Mobile View (Static Stack)
        Block on mobile, hidden on tablet and up.
      */}
      <div className="block md:hidden relative w-full pt-28 pb-20 px-6">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Services</span>
        </div>

        <h2 className={`text-5xl font-semibold leading-[1] tracking-tighter mb-6 ${archivo.className}`}>
          WHAT I<br />DO.
        </h2>

        <p className="text-neutral-300 text-lg leading-relaxed font-light mb-16">
          From brand identity to AI-powered websites
          — I deliver clean, fast, and user-friendly
          solutions that help businesses grow.
        </p>

        <div className="flex flex-col gap-12">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col border-b border-white/10 pb-8">
              <span className="text-purple-400 text-lg font-mono tracking-wider font-semibold mb-3">
                {service.id}
              </span>
              <h3 className={`text-2xl font-medium tracking-tight text-white mb-4 ${archivo.className}`}>
                {service.title}
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

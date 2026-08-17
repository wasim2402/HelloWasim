"use client"

import { useTheme } from "./ThemeProvider"
import FloatingSkills from "./FloatingSkills"
import Starfield from "./Starfield"
import { Archivo } from "next/font/google"
import { useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '800']
})

export default function Skills() {
  const { getAccentColor } = useTheme()



  return (
    <section id="skills" className="py-20 relative overflow-hidden min-h-screen flex flex-col justify-center bg-[#0a0a0a] z-0">
      <Starfield />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Side: Title and Stats */}
          <div className="flex flex-col justify-center lg:pr-8">
            <div className="text-center lg:text-left mb-12 lg:mb-16">
              <h2
                className={`font-semibold mb-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-tighter ${archivo.className}`}
                style={{ fontSize: 'clamp(3rem, 6vw, 76px)', lineHeight: '1' }}
              >
                Expertise
              </h2>
              <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
                Technologies and tools I use to bring ideas to life.
              </p>
            </div>

            {/* Skills Summary */}
            <div className="relative z-20">
              <div className="grid grid-cols-2 gap-3 max-w-[360px] mx-auto lg:mx-0">
                {[
                  { number: "2+", label: "Years Experience" },
                  { number: "10+", label: "Projects Completed" },
                  { number: "15+", label: "Technologies" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${getAccentColor()} bg-clip-text text-white/80 mb-1`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs text-white/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Floating Skills */}
          <div className="flex items-center justify-center relative w-full">
            <FloatingSkills />
          </div>

        </div>
      </div>
    </section>
  )
}
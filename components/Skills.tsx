"use client"

import { useTheme } from "./ThemeProvider"
import FloatingSkills from "./FloatingSkills"

export default function Skills() {
  const { getAccentColor } = useTheme()

  return (
    <section id="skills" className="py-20 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Expertise
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <FloatingSkills />

        {/* Skills Summary */}
        <div className="mt-16 text-center relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { number: "2+", label: "Years Experience" },
              { number: "10+", label: "Projects Completed" },
              { number: "15+", label: "Technologies" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${getAccentColor()} bg-clip-text text-white/80 mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
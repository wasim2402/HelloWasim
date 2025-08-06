"use client"

import { Code, Database, Palette, Smartphone, Globe, Zap } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Skills() {
  const { getAccentColor } = useTheme()

  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React.js, Next.js, TypeScript, Tailwind CSS",
      level: 85,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Node.js, PostgreSQL, MongoDB",
      level: 80,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Figma, Responsive Design",
      level: 90,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "React Native",
      level: 20,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "HTML5, CSS3, JavaScript, WebGL",
      level: 95,
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Tools & Platforms",
      description: "Git, Github, Firebase, Vercel",
      level: 80,
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={`bg-gradient-to-r ${getAccentColor()} bg-clip-text text-transparent`}>
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life</p>
        </div>

        {/* Mobile-Optimized Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 will-change-transform"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
              />

              {/* Icon - Mobile Optimized */}
              <div className="relative mb-2 sm:mb-3 md:mb-4">
                <div
                  className={`inline-flex p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${skill.color} shadow-lg will-change-transform`}
                >
                  <skill.icon size={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
              </div>

              {/* Content - Mobile Optimized */}
              <div className="relative">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 text-white leading-tight">
                  {skill.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4 text-gray-300 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* Progress Bar - Mobile Optimized */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-400">Proficiency</span>
                    <span className="text-xs font-bold text-white">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 sm:h-1.5 md:h-2 rounded-full bg-gray-700">
                    <div
                      className={`h-1 sm:h-1.5 md:h-2 bg-gradient-to-r ${skill.color} rounded-full will-change-transform`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div
                className={`absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r ${skill.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left will-change-transform`}
              />
            </div>
          ))}
        </div>

        {/* Skills Summary - Mobile Optimized */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
            {[
              { number: "2+", label: "Years Experience" },
              { number: "10+", label: "Projects Completed" },
              { number: "15+", label: "Technologies" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-2 sm:p-3 md:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r ${getAccentColor()} bg-clip-text text-transparent mb-1 md:mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-gray-400 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
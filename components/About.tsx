"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "./ThemeProvider"

export default function About() {
  const { getAccentColor } = useTheme()

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={`bg-gradient-to-r ${getAccentColor()} bg-clip-text text-transparent`}>About Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              >
                <Image
                  src="/profile.jpg?height=320&width=320"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className={`absolute -inset-4 bg-gradient-to-r ${getAccentColor()} rounded-full opacity-20 -z-10`}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Passionate Full-Stack Developer</h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a full-stack developer with over 2 years of experience creating digital solutions that combine
              beautiful design with robust functionality. I specialize in React, Next.js, and modern web technologies.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { number: "10+", label: "Projects Completed" },
                { number: "1+", label: "Years Experience" },
                { number: "10+", label: "Happy Clients" },
                { number: "100%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${getAccentColor()} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

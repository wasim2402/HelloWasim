"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Hero() {
  const { getAccentColor } = useTheme()

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Simplified Hero Particles - Main background now handled by AnimatedBackground */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full will-change-transform"
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Hi, I'm </span>
            <span className={`bg-gradient-to-r ${getAccentColor()} bg-clip-text text-transparent`}>Wasim Aktar</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Full-Stack Developer & UI/UX Designer crafting beautiful digital experiences
          </motion.p>

        <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-8 py-3 bg-gradient-to-r ${getAccentColor()} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 will-change-transform`}
          >
            View My Work
          </motion.button> 

          <motion.a
           whileHover={{ scale: 1.03 }}
           whileTap={{ scale: 0.97 }}
           transition={{ duration: 0.15 }}
           href="/Wasim_Resume.pdf" 
           download 
           className="inline-block px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 will-change-transform"
          >
           Download CV
          </motion.a>

          </motion.div>

          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {[
              { icon: Github, href: "https://github.com/wasim2402" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/wasim-aktar-aa7a5a256/" },
              { icon: Mail, href: "#contact" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 will-change-transform"
              >
                <social.icon size={24} className="text-white" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

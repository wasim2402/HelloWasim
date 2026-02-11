"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import CodeEditor from "./CodeEditor"
import HackerText from "./ui/HackerText"
import MagneticButton from "./ui/MagneticButton"

export default function Hero() {
  const { getAccentColor } = useTheme()

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-20 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <span className="font-bold text-white">Hi, I'm </span>
              <br className="block sm:hidden lg:block" />
              <HackerText text="Wasim Aktar" className="font-bold text-white block sm:inline" />
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl font-instrument text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Full-Stack Developer & UI/UX Designer crafting beautiful, functional, and scalable digital experiences.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3 bg-white text-black border-2 border-black font-semibold rounded-[3px] shadow-lg hover:shadow-xl transition-all duration-200 will-change-transform"
                >
                  View My Work
                </motion.button>
              </MagneticButton>

              <MagneticButton>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  href="/Wasim_Resume2026.pdf"
                  download
                  className="inline-block px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-[3px] hover:bg-white hover:text-black transition-all duration-200 will-change-transform"
                >
                  Download CV
                </motion.a>
              </MagneticButton>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-start space-x-6"
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
                  className="p-3 bg-transparent rounded-full hover:bg-white/20 transition-all duration-200 will-change-transform"
                >
                  <social.icon size={24} className="text-white" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Code Editor Visual */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <CodeEditor />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

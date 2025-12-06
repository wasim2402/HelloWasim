"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { TextGenerateEffect } from "./ui/TextGenerateEffect"
import { useTheme } from "./ThemeProvider"

export default function About() {
  const { getAccentColor } = useTheme()

  const aboutText = `I'm a full-stack developer with a passion for building beautiful and functional digital experiences. I specialize in React, Next.js, and modern web technologies, always eager to learn and create something new.`

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl relative z-10"
              >
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </motion.div>
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${getAccentColor()} rounded-full opacity-20 blur-xl -z-10`}
              />
            </div>
          </div>

          <div className="space-y-8 text-center md:text-left">
            <TextGenerateEffect words={aboutText} className="font-instrument italic font-normal text-[rgb(213,219,230)]" />

            <Link href="/about" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-none hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-medium"
              >
                About More
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
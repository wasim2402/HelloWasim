"use client"

import { motion } from "framer-motion"
import { Archivo } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '800']
})

const StarGraphic = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-24 md:h-24">
    <defs>
      <radialGradient id="star3D" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#7c3aed" /> {/* Purple highlight */}
        <stop offset="40%" stopColor="#1a1525" /> {/* Dark purple/black base */}
        <stop offset="100%" stopColor="#0a0810" /> {/* Deep shadow */}
      </radialGradient>
    </defs>
    <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="url(#star3D)" />
  </svg>
)

const LightningGraphic = () => (
  <svg width="60" height="80" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-16 md:w-12 md:h-20">
    <path d="M12 0L0 20H10L8 36L24 14H14L16 0H12Z" fill="#111" />
  </svg>
)

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-[#F3F2EE] flex items-center justify-center relative overflow-hidden text-[#111111] pt-32 pb-20 selection:bg-[#111111] selection:text-[#F3F2EE]">
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="w-full relative flex flex-col items-center justify-center h-full z-10 mt-0">

        {/* Giant Typography Background */}
        <div className={`relative w-full flex flex-col items-center justify-center pointer-events-none z-10 font-extrabold text-[#111111] tracking-tighter ${archivo.className}`} style={{ fontSize: 'clamp(4rem, 13.2vw, 184px)', lineHeight: '0.9' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="whitespace-nowrap uppercase translate-x-[4%] relative inline-block"
          >
            {/* Decorative Star - Top Left of 'S' */}
            <motion.div
              className="absolute -top-[15%] -left-[5%] md:-top-[20%] md:-left-[8%] lg:-top-[25%] lg:-left-[10%] drop-shadow-2xl z-10"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <StarGraphic />
            </motion.div>
            Software
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="whitespace-nowrap uppercase -translate-x-[4%] relative inline-block"
          >
            Engineer
            {/* Decorative Lightning Bolt - Bottom Right of 'R' */}
            <motion.div
              className="absolute -bottom-[17%] -right-[7%] md:-bottom-[12%] md:-right-[10%] lg:-bottom-[7%] lg:-right-[10%] drop-shadow-xl z-10"
              initial={{ opacity: 0, scale: 0, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <LightningGraphic />
            </motion.div>
          </motion.div>
        </div>

        {/* Center Profile Image Card Placeholder */}
        <div
          id="hero-profile-placeholder"
          className="absolute left-1/2 top-[113%] -translate-x-1/2 -translate-y-1/2 z-30 w-[140px] h-[160px] md:w-[180px] md:h-[200px] lg:w-[220px] lg:h-[240px] rounded-2xl pointer-events-none opacity-0"
        />

      </div>

      {/* Bottom Corner Elements */}
      <div className="absolute -bottom-2 left-16 md:bottom-0 md:left-32 lg:bottom-2 lg:left-36 z-30">
        <motion.p
          className={`tracking-tighter text-[#111111] ${archivo.className}`}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 68px)', lineHeight: '1', fontWeight: 600 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ©2026
        </motion.p>
      </div>

      <div className="absolute bottom-2 right-4 md:bottom-8 md:right-10 lg:right-12 z-30 flex flex-col items-end gap-2">


        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-2 w-32 md:w-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/about"
            className="px-4 py-2 md:py-2.5 bg-[#111111] text-white rounded-lg md:rounded-xl font-semibold text-[10px] md:text-xs hover:bg-[#333] hover:scale-105 transition-all w-full text-center whitespace-nowrap shadow-xl"
          >
            About More
          </Link>
          <a
            href="/Wasim_Resume2026.pdf"
            download
            className="px-4 py-2 md:py-2.5 bg-[#111111] text-white rounded-lg md:rounded-xl font-semibold text-[10px] md:text-xs hover:bg-[#333] hover:scale-105 transition-all w-full text-center whitespace-nowrap shadow-xl"
          >
            Download Resume
          </a>
        </motion.div>

      </div>

    </section>
  )
}

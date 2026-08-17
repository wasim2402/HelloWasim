"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { TextGenerateEffect } from "./ui/TextGenerateEffect"
import { useTheme } from "./ThemeProvider"
import { Archivo } from "next/font/google"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600']
})

export default function About() {
  const { getAccentColor } = useTheme()

  const aboutText = `I'm a full-stack developer with a passion for building beautiful and functional digital experiences. I specialize in React, Next.js, and modern web technologies, always eager to learn and create something new.`

  return (
    <section id="about" className="min-h-screen bg-[#F3F2EE] relative py-20 md:py-32 flex items-center overflow-hidden z-10 shadow-2xl">
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 min-h-[500px] lg:min-h-[600px]">

          {/* Left Column: 'Hey!' and Bio intro */}
          <div className="md:col-span-4 flex flex-col justify-between h-full pt-4 md:pt-10 pb-4">
            <h2
              className={`font-semibold text-[#111111] tracking-tighter ${archivo.className}`}
              style={{ fontSize: 'clamp(3rem, 6vw, 76px)', lineHeight: '1' }}
            >
              Hey!
            </h2>

            <p className="text-[#111111] text-lg md:text-xl leading-relaxed mt-12 md:mt-0 mb-6 md:mb-12 max-w-[340px]">
              I&apos;m Wasim, a <strong>Founding Engineer at Napplied</strong>, where I build AI-powered digital experiences with a focus on modern frontend architecture, intuitive interfaces, and scalable products.
            </p>
          </div>

          {/* Center Column: Image Placeholder */}
          <div className="md:col-span-4 flex justify-center items-center h-full">
            <div
              id="about-profile-placeholder"
              className="w-full max-w-[280px] md:max-w-[300px] lg:max-w-[320px] aspect-[2/3] rounded-[2rem] opacity-0 pointer-events-none"
            />
          </div>

          {/* Right Column: More Bio and Link */}
          <div className="md:col-span-4 flex flex-col justify-end h-full pb-4 pt-12 md:pt-0">
            <div className="flex flex-col gap-6 max-w-[360px]">
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                I enjoy bringing together design, frontend engineering, and AI to create products that are both intuitive and impactful.
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Alongside my work, I&apos;m actively exploring Agentic AI, learning how autonomous AI systems can reason, use tools, and create smarter product experiences.
              </p>

              <Link
                href="/about"
                className="mt-4 flex items-center gap-2 text-[#111111] font-medium hover:bg-black/5 transition-colors w-fit px-5 py-2.5 border border-[#111111] rounded-full"
              >
                About More
                <span className="flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
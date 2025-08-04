"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import { ThemeProvider } from "@/components/ThemeProvider"
import AnimatedBackground from "@/components/AnimatedBackground"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Optimized smooth scrolling with throttling
    const handleScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const id = target.getAttribute("href")?.slice(1)
      if (id) {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => link.addEventListener("click", handleScroll, { passive: false }))

    // Prevent horizontal scroll
    document.body.style.overflowX = "hidden"
    document.documentElement.style.overflowX = "hidden"

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleScroll))
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-pulse-optimized text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <AnimatedBackground />
      <div className="min-h-screen transition-all duration-500 overflow-x-hidden relative z-10">
        <ScrollProgress />
        <Navbar />

        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

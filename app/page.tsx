"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

import { ThemeProvider } from "@/components/ThemeProvider"
import ScrollProfileCard from "@/components/ScrollProfileCard"
import LoadingScreen from "@/components/LoadingScreen"
import SmoothScroll from "@/components/SmoothScroll"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem("hasVisited")

    if (hasVisited) {
      setMounted(true)
    } else {
      // Simulate a slightly longer load time to show off the animation
      const timer = setTimeout(() => {
        setMounted(true)
        sessionStorage.setItem("hasVisited", "true")
      }, 4000)
      return () => clearTimeout(timer)
    }

    // Prevent horizontal scroll
    document.body.style.overflowX = "hidden"
    document.documentElement.style.overflowX = "hidden"
  }, [])

  if (!mounted) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="min-h-screen transition-all duration-500 relative z-10">

          <Navbar />
          <ScrollProfileCard />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import WhatIDo from "@/components/WhatIDo"
import Skills from "@/components/Skills"
import InteractiveFallingTypography from "@/components/InteractiveFallingTypography"
import Projects from "@/components/Projects"
import GitHubContributions from "@/components/GitHubContributions"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Experience from "@/components/Experience"

import { ThemeProvider } from "@/components/ThemeProvider"
import ScrollProfileCard from "@/components/ScrollProfileCard"
import LoadingScreen from "@/components/LoadingScreen"
import SmoothScroll from "@/components/SmoothScroll"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Prevent horizontal scroll without breaking position: sticky
    document.body.style.overflowX = "clip"
    document.documentElement.style.overflowX = "clip"
  }, [])

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <SmoothScroll>
        <div className="min-h-screen transition-all duration-500 relative z-10">

          <Navbar />
          <ScrollProfileCard />

          <main>
            <Hero />
            <About />
            <Experience />
            <WhatIDo />
            <Skills />
            <InteractiveFallingTypography />
            <GitHubContributions />
            <Projects />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

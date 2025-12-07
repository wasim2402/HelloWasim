"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Chat from "@/components/Chat"
import ScrollProgress from "@/components/ScrollProgress"
import { ThemeProvider } from "@/components/ThemeProvider"

import LoadingScreen from "@/components/LoadingScreen"

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
      }, 6000)
      return () => clearTimeout(timer)
    }

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
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-500 overflow-x-hidden relative z-10">
        <ScrollProgress />
        <Navbar />

        <main className="overflow-x-hidden">
          <Hero />
          <Chat />
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

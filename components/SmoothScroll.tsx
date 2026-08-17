"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with custom parameters for a "slower, smoother" feel
    const lenis = new Lenis({
      lerp: 0.05, // Lower value = slower, heavier momentum (default is 0.1)
      wheelMultiplier: 0.8, // Slightly reduces scroll speed per wheel notch
      smoothWheel: true,
    })

    // Synchronize GSAP ScrollTrigger with Lenis scroll
    lenis.on("scroll", ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    // This ensures both run on the same clock and prevents jitter
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP's lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return <>{children}</>
}

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

    // Expose lenis globally for programmatic scrolling
    if (typeof window !== "undefined") {
      ;(window as any).lenis = lenis
    }

    // Synchronize GSAP ScrollTrigger with Lenis scroll
    lenis.on("scroll", ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    // This ensures both run on the same clock and prevents jitter
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP's lag smoothing to prevent conflicts with Lenis
    gsap.ticker.lagSmoothing(0)

    // Force ScrollTrigger to recalculate positions after layout is fully rendered
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    // Scroll to hash target on initial load if provided
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash)
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 })
        }
      }, 600)
    }

    // Refresh ScrollTrigger if the body height changes (e.g. images load)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    resizeObserver.observe(document.body)

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).lenis
      }
      resizeObserver.disconnect()
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return <>{children}</>
}

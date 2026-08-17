"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export default function ScrollProfileCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const heroPlaceholder = document.getElementById("hero-profile-placeholder")
    const aboutPlaceholder = document.getElementById("about-profile-placeholder")
    const card = containerRef.current
    const inner = innerRef.current

    if (!heroPlaceholder || !aboutPlaceholder || !card || !inner) return

    const updateAnimation = () => {
      // Clear previous scroll triggers
      ScrollTrigger.getAll().forEach(t => t.kill())

      const heroRect = heroPlaceholder.getBoundingClientRect()
      const aboutRect = aboutPlaceholder.getBoundingClientRect()
      const scrollY = window.scrollY || window.pageYOffset

      const startX = heroRect.left
      const startY = heroRect.top + scrollY
      const startWidth = heroRect.width
      const startHeight = heroRect.height

      const endX = aboutRect.left
      const endY = aboutRect.top + scrollY
      const endWidth = aboutRect.width
      const endHeight = aboutRect.height

      // Reset any transforms before setting new ones
      gsap.set(card, { clearProps: "all" })
      gsap.set(inner, { clearProps: "all" })

      gsap.set(card, {
        position: "absolute",
        top: 0,
        left: 0,
        x: startX,
        y: startY,
        width: startWidth,
        height: startHeight,
        zIndex: 50,
      })

      // Set initial border radius on the faces
      gsap.set(".profile-face", {
        borderRadius: "16px",
      })

      // The 3D rotation happens on the inner element
      gsap.set(inner, {
        rotationY: 0,
        transformStyle: "preserve-3d"
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 90%", // Start animating when About is 10% into view from bottom
          end: "center center", // Finish when About center hits viewport center
          scrub: 1,
        }
      })

      tl.to(card, {
        x: endX,
        y: endY,
        width: endWidth,
        height: endHeight,
        ease: "power2.inOut"
      }, 0)

      tl.to(".profile-face", {
        borderRadius: "32px", // Matches About placeholder rounded-[2rem]
        ease: "power2.inOut"
      }, 0)

      tl.to(inner, {
        rotationY: 180,
        ease: "power2.inOut"
      }, 0)
    }

    // Wait a frame for React to render placeholders
    const timeout = setTimeout(updateAnimation, 200)

    window.addEventListener("resize", updateAnimation)
    return () => {
      window.removeEventListener("resize", updateAnimation)
      clearTimeout(timeout)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none"
      style={{ perspective: "800px" }}
    >
      <div
        ref={innerRef}
        className="w-full h-full relative"
      >
        {/* Front Face (Hero Profile) */}
        <div
          className="profile-face absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/profile.jpg"
            alt="Profile Front"
            fill
            className="object-cover grayscale contrast-125 brightness-90"
            priority
          />
        </div>

        {/* Back Face (About Profile) */}
        <div
          className="profile-face absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            src="/profile2.jpg"
            alt="Profile Back"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  )
}


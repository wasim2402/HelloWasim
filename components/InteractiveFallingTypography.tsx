"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Archivo } from "next/font/google"
import { ArrowDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["800", "900"],
})

interface RawLine {
  words: {
    text: string
    isAccent?: boolean
  }[]
}

const RAW_LINES: RawLine[] = [
  {
    words: [{ text: "I" }, { text: "DON'T" }, { text: "JUST" }],
  },
  {
    words: [{ text: "WRITE" }, { text: "CODE." }],
  },
  {
    words: [{ text: "I" }, { text: "BUILD." }],
  },
  {
    words: [{ text: "I" }, { text: "BREAK." }],
  },
  {
    words: [{ text: "I" }, { text: "LEARN." }],
  },
  {
    words: [{ text: "I" }, { text: "ITERATE." }],
  },
  {
    words: [{ text: "I" }, { text: "SHIP.", isAccent: true }],
  },
]

interface CharModel {
  char: string
  flatIndex: number
  lineIdx: number
  wordIdx: number
  isAccent?: boolean
  isGray?: boolean
  // Deterministic motion parameters
  breakX: number
  breakRotate: number
  midX: number
  midRotate: number
  finalX: number
  finalY: number
  finalRotate: number
  startTime: number
  origin: string
}

// Deterministic pseudo-random number generator for consistent physics
function pseudoRand(flatIdx: number, seed: number): number {
  const x = Math.sin(flatIdx * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export default function InteractiveFallingTypography() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)
  const finalMessageRef = useRef<HTMLDivElement>(null)

  // Flatten lines into individual letter models with deterministic physics profiles
  const { linesData, allChars } = useMemo(() => {
    let globalIndex = 0
    const totalLines = RAW_LINES.length

    const charList: CharModel[] = []

    // Block rotation presets like fallen physical typography in reference image:
    // Some flat, some upright, some turned 90°, -90°, 45°, -45°, 180°
    const blockRotations = [0, 90, -90, 45, -45, 180, 0, 90, -90, -15, 15]

    const formattedLines = RAW_LINES.map((lineObj, lineIdx) => {
      const words = lineObj.words.map((wordObj, wordIdx) => {
        const chars = wordObj.text.split("").map((ch) => {
          const idx = globalIndex++

          // Multi-layer physical pile heights like in reference image:
          // Tier 0 (bottom floor baseline): layerOffset = 0
          // Tier 1 (mid pile, stacked): layerOffset = -55px
          // Tier 2 (top tumbled letters like A, O, L in image): layerOffset = -110px
          const layerRand = pseudoRand(idx, 12)
          const layerOffset = layerRand > 0.78 ? -110 : layerRand > 0.42 ? -55 : 0

          const baseFloorY = 175 + (totalLines - 1 - lineIdx) * 55
          const yVariation = (pseudoRand(idx, 1) - 0.5) * 30
          const finalY = baseFloorY + layerOffset + yVariation

          // Horizontal scatter across wide bottom floor (-420px to +420px)
          const finalX = (pseudoRand(idx, 2) - 0.5) * 840

          // Physical block landing rotation (flat, upright, 90°, -90°, 45°, -45°, 180°)
          const finalRotate =
            blockRotations[Math.floor(pseudoRand(idx, 3) * blockRotations.length)]

          // Mid-flight trajectory parameters
          const midX = finalX * 0.65 + (pseudoRand(idx, 4) - 0.5) * 70
          const midRotate = finalRotate * 0.7 + (pseudoRand(idx, 5) - 0.5) * 35

          // Initial breakaway drift & tilt
          const breakX = (pseudoRand(idx, 6) - 0.5) * 35
          const breakRotate = (pseudoRand(idx, 7) - 0.5) * 20

          // Staggered breakaway timing (starts after a little scroll: between 0.12 and 0.36)
          const lineBaseTime = 0.12 + lineIdx * 0.032
          const charJitter = pseudoRand(idx, 8) * 0.12
          const startTime = lineBaseTime + charJitter

          // Two-tone color: ~40% silver/gray letters matching reference image
          const isGray = !wordObj.isAccent && pseudoRand(idx, 11) > 0.58

          // Natural rotation pivot corners
          const origins = [
            "left top",
            "right top",
            "center bottom",
            "left bottom",
            "right bottom",
            "center top",
          ]
          const origin = origins[Math.floor(pseudoRand(idx, 9) * origins.length)]

          const model: CharModel = {
            char: ch,
            flatIndex: idx,
            lineIdx,
            wordIdx,
            isAccent: wordObj.isAccent,
            isGray,
            breakX,
            breakRotate,
            midX,
            midRotate,
            finalX,
            finalY,
            finalRotate,
            startTime,
            origin,
          }

          charList.push(model)
          return model
        })

        return {
          text: wordObj.text,
          isAccent: wordObj.isAccent,
          chars,
        }
      })

      return { words }
    })

    return { linesData: formattedLines, allChars: charList }
  }, [])

  // Dual-layer element references:
  // scrollRefs: controlled 100% by the ScrollTrigger falling timeline
  // cursorRefs: controlled 100% by cursor collision pushing letters sideways
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const pinContainer = pinContainerRef.current
    const finalMessage = finalMessageRef.current
    const scrollPrompt = scrollPromptRef.current

    if (!section || !pinContainer || !finalMessage) return

    const isDesktop = window.innerWidth >= 1024
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

    // Responsive scaling
    const scale = isDesktop ? 1 : isTablet ? 0.72 : 0.5
    const rotScale = isDesktop ? 1 : isTablet ? 0.75 : 0.55
    const scrollDistance = isDesktop ? 2600 : isTablet ? 2200 : 1800

    // Master Scroll-Driven Falling Timeline (synchronized with smooth scroll & Lenis)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
        invalidateOnRefresh: true,
      },
    })

    // 1. Initial scroll prompt fades away within the first 6% of scroll
    if (scrollPrompt) {
      tl.to(
        scrollPrompt,
        {
          opacity: 0,
          y: -20,
          duration: 0.06,
          ease: "power1.out",
        },
        0
      )
    }

    // 2. Individual letter-by-letter falling physics driven smoothly by scroll
    allChars.forEach((charModel) => {
      const scrollEl = scrollRefs.current[charModel.flatIndex]
      if (!scrollEl) return

      gsap.set(scrollEl, {
        transformOrigin: charModel.origin,
        willChange: "transform, opacity",
      })

      // 3-Stage curve: Detachment -> Acceleration -> Settles at bottom floor
      tl.to(
        scrollEl,
        {
          keyframes: [
            {
              // Stage 1: Individual letter breakaway & lean
              x: charModel.breakX * scale,
              y: 40 * scale,
              rotation: charModel.breakRotate * rotScale,
              duration: 0.08,
              ease: "power1.in",
            },
            {
              // Stage 2: Heavy gravity fall with increasing momentum
              x: charModel.midX * scale,
              y: (charModel.finalY * 0.55) * scale,
              rotation: charModel.midRotate * rotScale,
              duration: 0.14,
              ease: "power2.in",
            },
            {
              // Stage 3: Lands in resting position at bottom (letters stay active & visible)
              x: charModel.finalX * scale,
              y: charModel.finalY * scale,
              rotation: charModel.finalRotate * rotScale,
              opacity: 0.85,
              duration: 0.12,
              ease: "power2.out",
            },
          ],
        },
        charModel.startTime
      )
    })

    // 3. Final calm message revealed in center while fallen letters rest below
    gsap.set(finalMessage, {
      opacity: 0,
      y: 35,
      scale: 0.94,
      filter: "blur(14px)",
      pointerEvents: "none",
    })

    tl.to(
      finalMessage,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.18,
        ease: "power2.out",
        pointerEvents: "auto",
      },
      0.48
    )

    // 4. Generous rest and interaction zone (0.65 to 1.00):
    // All letters stay fully settled at the bottom floor, allowing the user to
    // interact with hover without the next section immediately coming up!
    tl.to(
      finalMessage,
      {
        opacity: 1,
        duration: 0.35,
      },
      0.65
    )

    // ==============================================================
    // Cursor Sideways Pushing Physics on Letters (Independent Layer)
    // ==============================================================
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    let cleanupPointer: (() => void) | undefined

    if (hasFinePointer) {
      interface LetterPhysicsState {
        cursorEl: HTMLDivElement
        xTo: (value: number) => void
        yTo: (value: number) => void
        rotTo: (value: number) => void
        isPushed: boolean
      }

      const activeLetters: LetterPhysicsState[] = []

      cursorRefs.current.forEach((el) => {
        if (!el) return
        activeLetters.push({
          cursorEl: el,
          xTo: gsap.quickTo(el, "x", { duration: 0.28, ease: "power3.out" }),
          yTo: gsap.quickTo(el, "y", { duration: 0.28, ease: "power3.out" }),
          rotTo: gsap.quickTo(el, "rotation", { duration: 0.35, ease: "power3.out" }),
          isPushed: false,
        })
      })

      let mouseX = -9999
      let mouseY = -9999
      let isInside = false
      let rafId: number | null = null

      const updateCursorForces = () => {
        rafId = null
        if (!isInside) return

        // Larger interaction radius and punchier sideways displacement
        const radius = isDesktop ? 220 : 150
        const maxSidePush = isDesktop ? 180 : 100

        activeLetters.forEach((letter) => {
          const rect = letter.cursorEl.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          const dx = centerX - mouseX
          const dy = centerY - mouseY
          const dist = Math.hypot(dx, dy)

          if (dist < radius) {
            letter.isPushed = true
            const norm = dist / radius
            // Exponential repulsion force: maximum when close
            const force = Math.pow(1 - norm, 1.4)

            // Powerful SIDEWAYS push
            const sidePushX = (dx >= 0 ? 1 : -1) * maxSidePush * force
            // Upward pop/hop when kicked
            const liftY = -Math.abs(maxSidePush * 0.42) * force
            // Dynamic rotational impulse
            const rotImpulse = (dx >= 0 ? 1 : -1) * (1 - norm) * 45

            letter.xTo(sidePushX)
            letter.yTo(liftY)
            letter.rotTo(rotImpulse)
          } else if (letter.isPushed) {
            // Elastic recoil with springy physical overshoot returning to original fallen position
            letter.isPushed = false
            gsap.to(letter.cursorEl, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1.0,
              ease: "elastic.out(1.15, 0.4)",
              overwrite: "auto",
            })
          }
        })
      }

      const onPointerMove = (e: PointerEvent) => {
        mouseX = e.clientX
        mouseY = e.clientY
        isInside = true
        if (!rafId) {
          rafId = requestAnimationFrame(updateCursorForces)
        }
      }

      const onPointerLeave = () => {
        isInside = false
        activeLetters.forEach((letter) => {
          if (letter.isPushed) {
            letter.isPushed = false
            gsap.to(letter.cursorEl, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1.0,
              ease: "elastic.out(1.15, 0.4)",
              overwrite: "auto",
            })
          }
        })
      }

      window.addEventListener("pointermove", onPointerMove, { passive: true })
      pinContainer.addEventListener("pointerleave", onPointerLeave)

      cleanupPointer = () => {
        window.removeEventListener("pointermove", onPointerMove)
        pinContainer.removeEventListener("pointerleave", onPointerLeave)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }

    return () => {
      if (cleanupPointer) cleanupPointer()
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [allChars])

  return (
    <section
      ref={sectionRef}
      id="kinetic-philosophy"
      className="relative w-full h-[220vh] min-h-[220vh] bg-[#111111] text-white selection:bg-white selection:text-black"
    >
      {/* Sticky 100vh Stage Container */}
      <div
        ref={pinContainerRef}
        className="sticky top-0 w-full h-screen h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8 md:px-12"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(200,16,46,0.08)_0%,transparent_70%)] z-0" />

        {/* Subtle Grid Accent Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Section Metadata Tag */}
        <div className="absolute top-10 left-6 md:left-14 flex items-center gap-3 z-10 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-white/50 uppercase">
            Engineering Creed
          </span>
        </div>

        {/* Primary Letter-Level Typography Composition (Centered Horizontally) */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full mx-auto select-none text-center">
          {linesData.map((line, lineIdx) => (
            <div
              key={lineIdx}
              className="flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-6 md:gap-x-8 leading-[0.92] md:leading-[0.88] tracking-tighter w-full text-center"
            >
              {line.words.map((wordObj, wordIdx) => (
                <div key={wordIdx} className="inline-flex items-center justify-center">
                  {wordObj.chars.map((charObj) => {
                    const currentIdx = charObj.flatIndex
                    return (
                      <div
                        key={currentIdx}
                        className="relative inline-block py-0.5 md:py-1"
                      >
                        {/* Layer 1: Controlled by ScrollTrigger Timeline */}
                        <div
                          ref={(el) => {
                            scrollRefs.current[currentIdx] = el
                          }}
                          className="inline-block"
                        >
                          {/* Layer 2: Controlled by Cursor Collision Physics */}
                          <div
                            ref={(el) => {
                              cursorRefs.current[currentIdx] = el
                            }}
                            className="inline-block cursor-grab active:cursor-grabbing transition-colors duration-200"
                          >
                            <span
                              className={`font-black uppercase inline-block select-none ${
                                archivo.className
                              } ${
                                charObj.isAccent
                                  ? "bg-gradient-to-r from-[#FF4D6D] via-[#C8102E] to-[#99001A] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(200,16,46,0.5)]"
                                  : charObj.isGray
                                  ? "text-neutral-400 hover:text-neutral-300"
                                  : "text-white hover:text-neutral-100"
                              }`}
                              style={{
                                fontSize: "clamp(2.3rem, 5.8vw, 5.4rem)",
                                letterSpacing: "-0.035em",
                              }}
                            >
                              {charObj.char}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Scroll Prompt (Fades as soon as falling starts) */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10 text-white/40"
        >
          <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase">
            Scroll down to release gravity
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#C8102E]" />
        </div>

        {/* Final Transition Statement (Revealed in center after typography falls) */}
        <div
          ref={finalMessageRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
            <span className="text-xs font-mono tracking-[0.3em] text-neutral-400 uppercase">
              What Matters Most
            </span>
          </div>

          <h2
            className={`text-white font-extrabold tracking-tighter uppercase leading-[0.92] ${archivo.className}`}
            style={{ fontSize: "clamp(2.2rem, 5.4vw, 5rem)" }}
          >
            LET&apos;S BUILD
            <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-[#C8102E] bg-clip-text text-transparent">
              SOMETHING USEFUL.
            </span>
          </h2>

          <p className="text-neutral-400 text-sm md:text-base font-medium max-w-md mt-6 tracking-wide">
            Turning bold ideas into scalable, intuitive digital realities.
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase">
            <span>Explore GitHub Activity</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C8102E]" />
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Archivo } from "next/font/google"

import { Star, Send } from "lucide-react"

import { useRef, useEffect } from "react"

import { gsap } from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const archivo = Archivo({

  subsets: ['latin'],

  weight: ['400', '500', '600', '700', '800']

})

const QuoteIcon = ({ className = "" }: { className?: string }) => (

  <svg

    xmlns="http://www.w3.org/2000/svg"

    viewBox="0 0 24 24"

    fill="none"

    stroke="currentColor"

    strokeWidth="1.5"

    strokeLinecap="round"

    strokeLinejoin="round"

    className={className}

  >

    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />

    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />

  </svg>

)

export default function Testimonials() {

  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {

    let ctx = gsap.context(() => {

      ScrollTrigger.create({

        trigger: containerRef.current,

        start: "top top",

        end: "+=100%",

        pin: true,

        pinSpacing: false,

      })

    }, containerRef)

    return () => ctx.revert()

  }, [])

  return (

    <section ref={containerRef} id="testimonials" className="bg-[#f5f5f5] text-black py-12 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden min-h-screen flex flex-col justify-center relative z-0">

      <div className="max-w-[1100px] mx-auto w-full">

        {/* Top Section */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">

          <div>

            <div className="flex items-center gap-3 mb-6">

              <span className="w-2 h-2 rounded-full bg-purple-500"></span>

              <span className="text-xs font-bold tracking-[0.2em] text-black/60 uppercase">Testimonials</span>

            </div>

            <h2 className={`text-4xl md:text-5xl lg:text-[56px] font-bold leading-[0.9] tracking-tighter uppercase ${archivo.className}`}>

              WHAT CLIENTS<br />SAY.

            </h2>

          </div>

          <div className="flex flex-col gap-6 max-w-sm">

            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">

              What our clients say about working with us. Real feedback from real partnerships that drive exceptional results.

            </p>

          </div>

        </div>

        {/* Main Grid Container */}

        <div className="rounded-[2rem] overflow-hidden border border-black/5 bg-[#0a0a0a]">

          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* Card 1 (Black) */}

            <div className="bg-[#0a0a0a] text-white px-6 md:px-8 py-5 md:py-6 flex flex-col justify-between">

              <div>

                <QuoteIcon className="w-6 h-6 text-neutral-500 mb-4" />

                <div className="flex gap-1 mb-3">

                  {[...Array(5)].map((_, i) => (

                    <Star key={i} className="w-3 h-3 fill-white text-white" />

                  ))}

                </div>

                <p className="text-xs md:text-sm leading-relaxed text-neutral-200">

                  "Wasim did an excellent job turning our ideas into a clean, modern, and highly functional product. He was proactive, detail-oriented, and made sure every part of the experience felt smooth and intuitive."

                </p>

              </div>

              <div className="flex items-center justify-between mt-6">

                <div>

                  <h4 className="font-medium text-white text-sm">Priya Sharma</h4>

                  <p className="text-xs text-neutral-400">Founder, TechNova Solutions</p>

                </div>

                <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden shrink-0">

                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500" />

                </div>

              </div>

            </div>

            {/* Card 2 (White) */}

            <div className="bg-white text-black px-6 md:px-8 py-5 md:py-6 flex flex-col">

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0">

                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500" />

                  </div>

                  <div>

                    <h4 className="font-medium text-black text-sm">Rahul Verma</h4>

                    <p className="text-xs text-neutral-500">CTO, FinEdge India</p>

                  </div>

                </div>

              </div>

              <div className="flex gap-1 mb-3">

                {[...Array(5)].map((_, i) => (

                  <Star key={i} className="w-3 h-3 fill-black text-black" />

                ))}

              </div>

              <p className="text-xs md:text-sm leading-relaxed text-neutral-700">

                "Working with Wasim was a great experience. He quickly understood our requirements and transformed them into a polished interface with thoughtful interactions and strong attention to detail. The final result felt professional and exceeded our expectations."

              </p>

            </div>

            {/* Card 3 (Black) */}

            <div className="bg-[#0a0a0a] text-white px-6 md:px-8 py-5 md:py-6 flex flex-col justify-between">

              <div>

                <QuoteIcon className="w-6 h-6 text-neutral-500 mb-4" />

                <div className="flex gap-1 mb-3">

                  {[...Array(5)].map((_, i) => (

                    <Star key={i} className="w-3 h-3 fill-white text-white" />

                  ))}

                </div>

                <p className="text-xs md:text-sm leading-relaxed text-neutral-200">

                  "Wasim brings a strong combination of technical skills and design thinking. He delivered a responsive, well-structured product while paying close attention to performance, usability, and the small details that make a difference."

                </p>

              </div>

              <div className="flex items-center justify-between mt-6">

                <div>

                  <h4 className="font-medium text-white text-sm">Ananya Iyer</h4>

                  <p className="text-xs text-neutral-400">Director, GreenLeaf Organics</p>

                </div>

                <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden shrink-0">

                  <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500" />

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Bar Stats */}

          <div className="grid grid-cols-1 md:grid-cols-3">

            <div className="p-6 md:p-8">

              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-1 tracking-tighter ${archivo.className}`}>

                98<span className="text-lg md:text-xl text-neutral-400">%</span>

              </h3>

              <p className="text-xs text-neutral-400">Average Lighthouse performance score</p>

            </div>

            <div className="p-6 md:p-8">

              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-1 tracking-tighter ${archivo.className}`}>

                18<span className="text-lg md:text-xl text-neutral-400">+</span>

              </h3>

              <p className="text-xs text-neutral-400">Countries where our designs are used</p>

            </div>

            <div className="p-6 md:p-8">

              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-1 tracking-tighter ${archivo.className}`}>

                72<span className="text-lg md:text-xl text-neutral-400">%</span>

              </h3>

              <p className="text-xs text-neutral-400">Average conversion rate improvement</p>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}
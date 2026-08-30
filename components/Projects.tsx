"use client"

import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Archivo } from "next/font/google"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '800']
})

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const gap = 40; // Increased gap from mouse
      const imageWidth = window.innerWidth >= 1024 ? 400 : 300;
      const imageHeight = window.innerWidth >= 1024 ? 260 : 200;

      let targetX = e.clientX + gap;
      let targetY = e.clientY + gap;

      // Flip to left side if it overflows the right edge
      if (targetX + imageWidth > window.innerWidth) {
        targetX = e.clientX - imageWidth - gap;
      }

      // Flip to top if it overflows the bottom edge
      if (targetY + imageHeight > window.innerHeight) {
        targetY = e.clientY - imageHeight - gap;
      }

      cursorX.set(targetX)
      cursorY.set(targetY)
    }
    window.addEventListener("mousemove", moveCursor)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [cursorX, cursorY])

  const projects = [
    {
      title: "ShopX Clothing Brand",
      category: "FULL-STACK E-COMMERCE",
      year: "2024",
      image: "/shopx-project.png?height=160&width=240",
      link: "https://shopx-forntend.vercel.app/",
      github: "https://github.com/wasim2402/ShopX-MERN-Stack",
    },
    {
      title: "Real Time Chat App",
      category: "REAL-TIME CHAT PLATFORM",
      year: "2024",
      image: "/chat-app-project.png?height=160&width=240",
      link: "https://chat-app-weld-gamma-64.vercel.app/",
      github: "https://github.com/wasim2402/Chat-App",
    },
    {
      title: "Tic Tac Toe",
      category: "BROWSER GAME",
      year: "2023",
      image: "/tic-tac-toe-project.jpg?height=160&width=240",
      link: "https://wasim2402.github.io/Tic-Tac-Toe/",
      github: "https://github.com/wasim2402/Tic-Tac-Toe",
    },
    {
      title: "Portfolio Website",
      category: "PERSONAL PORTFOLIO",
      year: "2023",
      image: "/portfolio-project.png?height=160&width=240",
      link: "https://wasim2402.github.io/My_Portfolio/",
      github: "https://github.com/wasim2402/My_Portfolio",
    },
    {
      title: "Amazon Clone",
      category: "UI/UX REPLICA",
      year: "2023",
      image: "/amazon-project.png?height=160&width=240",
      link: "https://github.com/wasim2402/HTML-and-CSS-projects/tree/main/AMAZON%20CLONE",
      github: "https://github.com/wasim2402/HTML-and-CSS-projects/tree/main/AMAZON%20CLONE",
    },
    {
      title: "Simple Calculator",
      category: "WEB UTILITY",
      year: "2023",
      image: "/calculator-project.jpg?height=160&width=240",
      link: "https://wasim2402.github.io/Simple-Calculator/",
      github: "https://github.com/wasim2402/Simple-Calculator",
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden bg-[#B2C248] min-h-screen flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-black/60 uppercase">Projects</span>
            </div>
            <h2
              className={`tracking-tighter ${archivo.className} text-black`}
              style={{ fontSize: 'clamp(3rem, 6vw, 76px)', lineHeight: '1' }}
            >
              <span className="font-light">Featured</span>{" "}
              <span className="font-light inline-block bg-gradient-to-r from-[#F7F4ED] to-[#9646E0] px-2 rounded-lg">
                Projects
              </span>
            </h2>
          </div>
          <p className="text-black/70 text-lg max-w-sm">A curated selection of my recent work and digital experiences.</p>
        </div>

        <div className="flex flex-col border-t border-black/20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-black/20 hover:bg-black/[0.03] transition-colors relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                <span className="text-black/50 font-mono text-sm md:text-base">{(index + 1).toString().padStart(2, '0')}</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-3xl lg:text-4xl font-medium text-black tracking-tight group-hover:translate-x-3 transition-transform duration-500"
                >
                  {project.title}
                </a>
              </div>
              <div className="flex items-center gap-6 md:gap-12 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <span className="text-black/60 text-xs md:text-sm tracking-widest uppercase hidden md:block">
                  {project.category}
                </span>
                <span className="text-black/50 font-mono text-sm hidden md:block">
                  {project.year}
                </span>
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/50 hover:text-black transition-colors"
                      title="View Source on GitHub"
                    >
                      <Github size={24} strokeWidth={1.5} />
                    </a>
                  )}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300"
                    title="Visit Project"
                  >
                    <ArrowUpRight size={28} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Container (Desktop Only) */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="relative w-[300px] h-[200px] lg:w-[400px] lg:h-[260px] bg-black/10">
          {projects.map((project, index) => (
            <Image
              key={index}
              src={project.image.split('?')[0]} // Remove query params to ensure proper loading if they are local static files
              alt={project.title}
              fill
              className={`object-cover transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
"use client"

import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTheme } from "./ThemeProvider"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

export default function Projects() {
  const { getAccentColor } = useTheme()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const projects = [
    {
      title: "ShopX Clothing Brand",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      image: "/shopx-project.png?height=160&width=240",
      github: "https://github.com/wasim2402/ShopX-MERN-Stack",
      demo: "https://shopx-forntend.vercel.app/",
      tags: ["MongoDB", "Express js", "React", "Node.js"],
    },
    {
      title: "Real Time Chat App",
      description: "Collaborative task management tool with real-time updates",
      image: "/chat-app-project.png?height=160&width=240",
      github: "https://github.com/wasim2402/Chat-App",
      demo: "https://chat-app-weld-gamma-64.vercel.app/",
      tags: ["React Js", "CSS", "Firebase"],
    },
    {
      title: "Tic Tac Toe ",
      description: "A simple and interactive Tic Tac Toe game allowing two players to compete in turns on a 3x3 grid.",
      image: "/tic-tac-toe-project.jpg?height=160&width=240",
      github: "https://github.com/wasim2402/Tic-Tac-Toe",
      demo: "https://wasim2402.github.io/Tic-Tac-Toe/",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio with smooth Scrolling",
      image: "/portfolio-project.png?height=160&width=240",
      github: "https://github.com/wasim2402/My_Portfolio",
      demo: "https://wasim2402.github.io/My_Portfolio/",
      tags: ["HTML", "CSS", "JavaCript"],
    },
    {
      title: "Amazon Clone",
      description: "An Amazon website clone highlighting its user interface and layout design.",
      image: "/amazon-project.png?height=160&width=240",
      github: "https://github.com/wasim2402/HTML-and-CSS-projects/tree/main/AMAZON%20CLONE",
      demo: "https://github.com/wasim2402/HTML-and-CSS-projects/tree/main/AMAZON%20CLONE",
      tags: ["HTML", "CSS",],
    },
    {
      title: "Simple Calculator",
      description: "An interactive calculator for performing standard mathematical calculations.",
      image: "/calculator-project.jpg?height=160&width=240",
      github: "https://github.com/wasim2402/Simple-Calculator",
      demo: "https://wasim2402.github.io/Simple-Calculator/",
      tags: ["HTML", "CSS", "JavaScript"],
    },
  ]

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : 320
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })

      if (direction === "right" && currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (direction === "left" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (canScrollRight) {
        scroll("right")
      } else {
        // Reset to beginning
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
          setCurrentIndex(0)
        }
      }
    }, 4000) // Auto-scroll every 4 seconds

    return () => clearInterval(autoScroll)
  }, [canScrollRight, currentIndex])

  useEffect(() => {
    checkScrollButtons()
    const handleScroll = () => checkScrollButtons()

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll, { passive: true })
      return () => scrollRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const visibleProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Featured Projects
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">A showcase of my recent work and personal projects</p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="hidden lg:flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-none hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-medium"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>

        {/* Mobile/Tablet Horizontal Scroll View */}
        <div className="lg:hidden relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full transition-all duration-200 ${canScrollLeft ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/5 text-gray-500"
                }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex space-x-2">
              {projects.slice(0, Math.ceil(projects.length / 2)).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / 2) === index ? `bg-gradient-to-r ${getAccentColor()}` : "bg-white/20"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-2 rounded-full transition-all duration-200 ${canScrollRight ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/5 text-gray-500"
                }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto projects-slider pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <div key={index} className="flex-shrink-0 w-64 md:w-72">
                <ProjectCard project={project} index={index} isMobile />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isMobile = false,
}: {
  project: any
  index: number
  isMobile?: boolean
}) {
  const { getAccentColor } = useTheme()

  // 3D Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        className={`bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors duration-200 group relative ${isMobile ? "h-80" : "h-auto"
          }`}
      >
        <div className="relative overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={isMobile ? 240 : 300}
            height={isMobile ? 140 : 200}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${isMobile ? "h-32" : "h-48"
              }`}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-4">
            <a
              href={project.github}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <Github size={18} className="text-white" />
            </a>
            <a
              href={project.demo}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <ExternalLink size={18} className="text-white" />
            </a>
          </div>
        </div>

        <div className={`p-4 ${isMobile ? "p-3" : "p-6"}`} style={{ transform: "translateZ(30px)" }}>
          <h3 className={`font-semibold text-white mb-2 ${isMobile ? "text-lg" : "text-xl"} drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}>{project.title}</h3>
          <p className={`text-gray-300 mb-3 ${isMobile ? "text-xs line-clamp-2" : "text-sm"}`}>{project.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.map((tag: string, tagIndex: number) => (
              <span
                key={tagIndex}
                className={`px-2 py-1 bg-white/70 text-black rounded-lg ${isMobile ? "text-xs" : "text-xs"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            <a
              href={project.github}
              className={`flex items-center text-gray-300 hover:text-white transition-colors duration-200 ${isMobile ? "text-xs" : "text-sm"
                }`}
            >
              <Github size={14} className="mr-1" />
              Code
            </a>
            <a
              href={project.demo}
              className={`flex items-center text-gray-300 hover:text-white transition-colors duration-200 ${isMobile ? "text-xs" : "text-sm"
                }`}
            >
              <ExternalLink size={14} className="mr-1" />
              Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
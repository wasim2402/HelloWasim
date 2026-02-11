"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Palette } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import Image from "next/image"
import { usePathname } from "next/navigation"
import HackerClock from "./HackerClock"
import SpotifyWidget from "./SpotifyWidget"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const themes = ["dark", "blue"] as const

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [])

  const pathname = usePathname()

  const navItems = [
    { name: "About", href: pathname === "/" ? "#about" : "/#about" },
    { name: "Skills", href: pathname === "/" ? "#skills" : "/#skills" },
    { name: "Projects", href: pathname === "/" ? "#projects" : "/#projects" },
    { name: "Contact", href: pathname === "/" ? "#contact" : "/#contact" },
  ]

  const handleThemeChange = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "dark":
        return "Dark"
      case "blue":
        return "Blue"
      default:
        return "Theme"
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center font-medium z-10"
          >
            <Image src="/logo-as.png" alt="AS Logo" width={48} height={48} className="w-36 h-auto object-contain" priority />
          </motion.a>

          {/* Center Clock - Absolute Positioned for fixed height */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none ml-10 md:ml-0">
            <HackerClock />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-medium transition-colors duration-200 hover:text-white navbar-link"
              >
                {item.name}
              </a>
            ))}



            {/* Themes Button */}
            <motion.button
              onClick={handleThemeChange}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
              aria-label={getThemeLabel()}
            >
              <Palette size={20} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={handleThemeChange}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label={getThemeLabel()}
            >
              <Palette size={20} />
            </motion.button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/30 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-white transition-colors duration-200 border-b border-white/10 last:border-b-0"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}

        {/* Spotify Widget - Hanging Tab Position */}
        <div className="absolute top-full right-4 md:right-8 mt-2">
          <SpotifyWidget className="!bg-black/40 !backdrop-blur-xl !border-white/10 !shadow-xl !py-2 !px-4" />
        </div>
      </div>
    </motion.nav>
  )
}

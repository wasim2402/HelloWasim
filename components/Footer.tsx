"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react"
import { useTheme } from "./ThemeProvider"

import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
  weight: ['800']
})

export default function Footer() {
  const { getAccentColor } = useTheme()


  return (
    <footer className="pt-12 border-t border-white/10 relative overflow-hidden flex flex-col bg-[#050505]">
      {/* Square Dots Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='2' fill='%231a1a1a'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col items-center space-y-8 pb-0">

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-white/70 font-semibold tracking-wider text-base uppercase">Quick Links</h2>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.1 }}
                  className="text-white hover:text-white transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-white/70 text-sm">
            <p className="flex items-center justify-center space-x-1">
              <span>© {new Date().getFullYear()} Wasim Aktar. Made with</span>
              <Heart size={16} className={`text-red-500 animate-pulse`} />
              <span>and lots of coffee</span>
            </p>
          </div>
        </div>
      </div>

      {/* Watermark Branding */}
      <div className="w-full flex justify-center -mt-6 pointer-events-none select-none overflow-hidden relative z-10">
        <span
          className={`text-[18vw] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/0 to-white/20 tracking-tighter leading-none ${inter.className}`}
          style={{ marginBottom: '-4.5vw' }}
        >
          Wasim
        </span>
      </div>
    </footer>
  )
}
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreHorizontal, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "About", href: pathname === "/" ? "#about" : "/#about" },
    { name: "Skills", href: pathname === "/" ? "#skills" : "/#skills" },
    { name: "Projects", href: pathname === "/" ? "#projects" : "/#projects" },
    { name: "Contact", href: pathname === "/" ? "#contact" : "/#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-8 left-1/2 z-[100]"
    >
      <motion.div 
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#111111] rounded-2xl p-2 flex flex-col shadow-2xl w-[280px] md:w-[320px] overflow-hidden"
      >
        {/* Top Row: Logo & Button */}
        <div className="flex items-center justify-between pl-4">
          <motion.a
            href="#hero"
            layout
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })
              setIsMobileMenuOpen(false)
            }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <div className="h-5 md:h-6 flex items-center justify-start">
               <Image src="/logo-as.png" alt="AS Logo" width={80} height={24} className="object-contain h-full w-auto" priority />
            </div>
          </motion.a>

          <motion.button 
            layout
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="w-[44px] h-[36px] md:w-[48px] md:h-[40px] bg-[#F3F2EE] rounded-lg flex items-center justify-center text-[#111111] hover:bg-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={18} /> : <MoreHorizontal size={20} />}
          </motion.button>
        </div>

        {/* Expanded Nav Links */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-2 mt-4 mb-2 px-3"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3, ease: "easeOut" }}
                  className="bg-[#F3F2EE] text-[#111111] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-white transition-colors w-fit"
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}

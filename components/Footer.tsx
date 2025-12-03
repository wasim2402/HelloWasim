"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function Footer() {
  const { getAccentColor } = useTheme()

  const socialLinks = [
    { icon: Github, href: "https://github.com/wasim2402", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/wasim-aktar-aa7a5a256/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/wasimaktar_?t=AMbuiTqL7k2GGtzBXp6zMA&s=08", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/_wasim.aktar/?igsh=YTM3b2IwaDF2YzJm", label: "Instagram" },
    { icon: Mail, href: "#contact", label: "Email" },
  ]

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon
                  size={20}
                  className={`text-gray-400 group-hover:text-white transition-colors duration-300`}
                />
              </motion.a>
            ))}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p className="flex items-center justify-center space-x-1">
              <span>© {new Date().getFullYear()} Wasim Aktar. Made with</span>
              <Heart size={16} className={`text-red-500 animate-pulse`} />
              <span>and lots of coffee</span>
            </p>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-2 bg-gradient-to-r ${getAccentColor()} text-white font-medium rounded-[15px] text-sm hover:shadow-lg transition-all duration-300`}
          >
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
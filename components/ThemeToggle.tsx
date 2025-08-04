"use client"

import { motion } from "framer-motion"
import { Palette } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: "purple", color: "from-purple-500 to-pink-500" },
    { name: "blue", color: "from-blue-500 to-cyan-500" },
    { name: "green", color: "from-emerald-500 to-teal-500" },
    { name: "orange", color: "from-orange-500 to-red-500" },
  ]

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="fixed top-20 right-4 z-50">
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-2 border border-white/10">
        <div className="flex items-center space-x-2 mb-2">
          <Palette size={16} className="text-white" />
          <span className="text-white text-xs font-medium">Themes</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {themes.map((themeOption) => (
            <motion.button
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name as any)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-8 h-8 rounded-full bg-gradient-to-r ${themeOption.color} ${
                theme === themeOption.name ? "ring-2 ring-white" : ""
              } transition-all duration-200`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

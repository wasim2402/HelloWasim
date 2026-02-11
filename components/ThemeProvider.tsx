"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "dark" | "blue"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  getGradientClasses: () => string
  getAccentColor: () => string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes = {
  dark: {
    gradient: "bg-black",
    accent: "from-gray-400 to-gray-600",
  },
  blue: {
    gradient: "bg-gradient-to-br from-blue-900 via-gray-900 to-cyan-900",
    accent: "from-blue-500 to-cyan-500",
  },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  const getGradientClasses = () => themes[theme].gradient
  const getAccentColor = () => themes[theme].accent

  // Apply theme to body when theme changes, but preserve existing utility classes (fonts, etc.)
  useEffect(() => {
    const body = document.body
    const gradient = themes[theme].gradient.split(" ")
    const otherTheme = theme === "dark" ? "blue" : "dark"
    const otherGradient = themes[otherTheme].gradient.split(" ")

    body.classList.remove(...otherGradient)
    body.classList.add(...gradient, "min-h-screen", "transition-all", "duration-500")

    return () => {
      body.classList.remove(...gradient, "min-h-screen", "transition-all", "duration-500")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getGradientClasses, getAccentColor }}>
      <div className={`${getGradientClasses()} min-h-screen transition-all duration-500`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}

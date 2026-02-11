"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface HackerTextProps {
  text: string
  className?: string
  characters?: string
  speed?: number
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

export default function HackerText({
  text,
  className = "",
  characters = DEFAULT_CHARS,
  speed = 50,
}: HackerTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const controls = useAnimation()
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    let iteration = 0
    
    const animate = () => {
      interval = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join("")
        )
        
        if (iteration >= text.length) {
          clearInterval(interval)
        }
        
        iteration += 1 / 3 // Slow down the reveal
      }, speed)
    }

    animate()

    return () => clearInterval(interval)
  }, [text, characters, speed])

  return (
    <span className={className}>
      {displayText}
    </span>
  )
}

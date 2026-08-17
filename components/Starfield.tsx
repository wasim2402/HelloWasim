"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Starfield() {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, delay: number, duration: number }[]>([])
  const [shootingStars, setShootingStars] = useState<{ id: number, top: number, left: number, delay: number, duration: number, repeatDelay: number }[]>([])

  useEffect(() => {
    // Generate static/twinkling stars
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5, // 0.5px to 3px
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2, // 2s to 5s twinkle
    }))
    setStars(newStars)

    // Generate shooting stars
    const newShootingStars = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: Math.random() * 40 - 20, // Start higher up (-20% to 20%)
      left: Math.random() * 40 - 20, // Start further left (-20% to 20%)
      delay: Math.random() * 15, // Stagger them
      duration: Math.random() * 1.5 + 1, // Fast zip
      repeatDelay: Math.random() * 8 + 5, // Wait between shoots
    }))
    setShootingStars(newShootingStars)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.1,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute h-[2px] bg-gradient-to-r from-transparent via-white/50 to-white rounded-full shadow-[0_0_10px_#fff]"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: "150px",
          }}
          initial={{ opacity: 0, rotate: 45, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: 1000, // Move right
            y: 1000, // Move down
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: star.repeatDelay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

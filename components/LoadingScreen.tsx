"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const GREETINGS = [
    "환영합니다", // Korean
    "स्वागत है",   // Hindi
    "স্বাগতম",      // Bengali
    "Welcome",    // English
    "ಸ್ವಾಗತ",      // Kannada
]

interface LoadingScreenProps {
    onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [index, setIndex] = useState(0)
    const [isShutterUp, setIsShutterUp] = useState(false)

    useEffect(() => {
        if (index < GREETINGS.length - 1) {
            const timer = setTimeout(() => {
                setIndex((prev) => prev + 1)
            }, 600)
            return () => clearTimeout(timer)
        } else {
            // Once the last language (Kannada) finishes showing, trigger the shutter-up reveal
            const timer = setTimeout(() => {
                setIsShutterUp(true)
            }, 750)
            return () => clearTimeout(timer)
        }
    }, [index])

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: isShutterUp ? "-100%" : 0 }}
            transition={{
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1], // Smooth cinematic shutter-up easing
            }}
            onAnimationComplete={() => {
                if (isShutterUp) {
                    onComplete?.()
                }
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        >
            <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-center px-4"
                style={{
                    background: "linear-gradient(to right, #4b5563 20%, #ffffff 50%, #4b5563 80%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                }}
                animate={{
                    backgroundPosition: ["200% center", "-200% center"],
                    opacity: isShutterUp ? 0 : 1,
                    y: isShutterUp ? -30 : 0,
                }}
                transition={{
                    backgroundPosition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "linear",
                    },
                    opacity: {
                        duration: 0.35,
                        ease: "easeOut",
                    },
                    y: {
                        duration: 0.35,
                        ease: "easeOut",
                    },
                }}
            >
                {GREETINGS[index]}
            </motion.h1>
        </motion.div>
    )
}

"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
            <motion.h1
                className="text-xl md:text-2xl font-bold tracking-wider"
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
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "linear",
                }}
            >
                Loading...
            </motion.h1>
        </div>
    )
}

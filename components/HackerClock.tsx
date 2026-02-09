"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function HackerClock() {
    const [time, setTime] = useState<string>("")
    const [mounted, setMounted] = useState(false)

    // Location and Timezone constants based on user request
    // Display format: 11:36:44 AM (GMT+5:30) Kalyani, Nadia
    const location = "Kolkata"
    const timezone = "(GMT+5:30)"

    useEffect(() => {
        setMounted(true)
        const updateTime = () => {
            const now = new Date()
            // Manually format to match requested format exactly: HH:MM:SS AM/PM
            // Using en-US with hour12: true ensures AM/PM
            const timeString = now.toLocaleTimeString("en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            setTime(timeString)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex flex-col md:flex-row items-center justify-center font-mono tracking-widest leading-none pointer-events-auto">
            <motion.div
                className="flex flex-col md:flex-row items-center md:space-x-3 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Time */}
                <span className="text-[11px] sm:text-xs md:text-sm font-bold whitespace-nowrap mb-0.5 md:mb-0">
                    {time}
                </span>

                {/* Timezone & Location Group */}
                <div className="flex space-x-1.5 md:space-x-2 text-[9px] sm:text-[10px] md:text-sm text-gray-400 dark:text-gray-500 font-normal whitespace-nowrap">
                    <span>{timezone}</span>
                    <span className="hidden md:inline-block">{location}</span>
                </div>
            </motion.div>
        </div>
    )
}

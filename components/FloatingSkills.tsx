"use client"

import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import { useEffect, useState } from "react"
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt
} from "react-icons/fa"
import {
    SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiFramer, SiExpress
} from "react-icons/si"

const innerSkills = [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
]

const outerSkills = [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Framer", icon: SiFramer, color: "#0055FF" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    { name: "HTML", icon: FaHtml5, color: "#E34F26" },
    { name: "JS", icon: FaJs, color: "#F7DF1E" },
    { name: "Express", icon: SiExpress, color: "#FFFFFF" },
]

export default function FloatingSkills() {
    const { theme } = useTheme()
    const isDark = theme === "dark" || theme === "blue"
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return (
        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
            {/* Center Text */}
            <div className="absolute z-10 flex flex-col items-center justify-center">
                <h3 className={`text-2xl md:text-4xl font-bold tracking-wider text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}>
                    SKILLS
                </h3>
                <div className={`w-12 md:w-16 h-1 mt-2 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`} />
            </div>

            {/* Inner Orbit */}
            <OrbitRing
                radius={isMobile ? 100 : 160}
                duration={20}
                skills={innerSkills}
                isDark={isDark}
                clockwise={true}
                isMobile={isMobile}
            />

            {/* Outer Orbit */}
            <OrbitRing
                radius={isMobile ? 160 : 260}
                duration={30}
                skills={outerSkills}
                isDark={isDark}
                clockwise={false}
                isMobile={isMobile}
            />
        </div>
    )
}

function OrbitRing({ radius, duration, skills, isDark, clockwise, isMobile }: any) {
    const iconSize = isMobile ? "w-8 h-8" : "w-14 h-14"
    const iconInnerSize = isMobile ? "w-4 h-4" : "w-7 h-7"
    const offset = isMobile ? 16 : 28 // Half of w-8 (32px) or w-14 (56px)

    return (
        <div className="absolute flex items-center justify-center">
            {/* Orbit Path (Visual Ring) */}
            <div
                className={`absolute rounded-full border ${isDark ? "border-white/10" : "border-black/10"}`}
                style={{ width: radius * 2, height: radius * 2 }}
            />

            {/* Rotating Container */}
            <motion.div
                className="absolute flex items-center justify-center"
                style={{ width: radius * 2, height: radius * 2 }}
                animate={{ rotate: clockwise ? 360 : -360 }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {skills.map((skill: any, index: number) => {
                    const angle = (index / skills.length) * 360
                    const radian = (angle * Math.PI) / 180
                    // Position on the circle
                    const x = Math.cos(radian) * radius
                    const y = Math.sin(radian) * radius

                    return (
                        <motion.div
                            key={index}
                            className={`absolute flex items-center justify-center ${iconSize} rounded-full shadow-lg backdrop-blur-md border ${isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-black/5"
                                }`}
                            style={{
                                left: `calc(50% + ${x}px - ${offset}px)`,
                                top: `calc(50% + ${y}px - ${offset}px)`,
                            }}
                            // Counter-rotate to keep icon upright
                            animate={{ rotate: clockwise ? -360 : 360 }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            whileHover={{ scale: 1.2, zIndex: 50 }}
                        >
                            <skill.icon
                                className={iconInnerSize}
                                style={{ color: skill.color }}
                            />
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}

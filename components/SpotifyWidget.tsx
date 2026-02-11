"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BsSpotify } from "react-icons/bs"

interface SpotifyData {
    isPlaying: boolean
    title?: string
    artist?: string
    album?: string
    albumImageUrl?: string
    songUrl?: string
}

export default function SpotifyWidget({ className = "" }: { className?: string }) {
    const [data, setData] = useState<SpotifyData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/spotify")
                const json = await res.json()
                setData(json)
            } catch (error) {
                console.error("Error fetching Spotify data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // Poll every 30 seconds
        const interval = setInterval(fetchData, 30000)
        return () => clearInterval(interval)
    }, [])

    if (loading) return null

    return (
        <AnimatePresence>
            {data?.isPlaying ? (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className={`flex items-center gap-3 p-2 pr-4 rounded-xl shadow-2xl bg-black/60 backdrop-blur-2xl border border-white/10 transition-all duration-300 group hover:bg-black/80 hover:border-white/20 hover:shadow-green-900/20 ${className}`}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-lg shrink-0"
                    >
                        {data.albumImageUrl && (
                            <Image
                                src={data.albumImageUrl}
                                alt={data.album || "Album Art"}
                                fill
                                className="object-cover"
                            />
                        )}
                    </motion.div>

                    <Link href={data.songUrl || "#"} target="_blank" className="flex flex-col overflow-hidden min-w-[100px]">
                        <span className="text-xs font-bold text-white truncate max-w-[140px] group-hover:text-green-400 transition-colors">{data.title}</span>
                        <span className="text-[10px] text-gray-400 truncate max-w-[140px] group-hover:text-gray-300 transition-colors">{data.artist}</span>
                    </Link>

                    <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/5 transition-colors hover:bg-black/60 ${className}`}
                >
                    <BsSpotify className="text-[#1DB954]" size={16} />
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase whitespace-nowrap">Offline</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

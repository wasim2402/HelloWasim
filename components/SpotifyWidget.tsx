"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SpotifyData {
    isPlaying: boolean
    title?: string
    artist?: string
    album?: string
    albumImageUrl?: string
    songUrl?: string
}

export default function SpotifyWidget() {
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
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed top-1/2 right-4 -translate-y-1/2 z-40 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-2 pr-6 flex items-center gap-3 shadow-lg max-w-xs"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20"
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

                    <Link href={data.songUrl || "#"} target="_blank" className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold text-white truncate max-w-[150px]">{data.title}</span>
                        <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{data.artist}</span>
                    </Link>

                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-1/2 right-4 -translate-y-1/2 z-40 bg-black/50 backdrop-blur-sm border border-white/5 rounded-full px-4 py-2 flex items-center gap-2"
                >
                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-xs text-gray-400 font-mono">Spotify Offline</span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

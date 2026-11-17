"use client"

import React, { useEffect, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, GitCommit, Calendar, Flame, Trophy, RotateCw } from "lucide-react"

interface DayContribution {
  date: string
  count: number
  level: number
}

interface GitHubProfile {
  login: string
  name: string
  avatar_url: string
  public_repos: number
  followers: number
}

interface ApiResponse {
  success: boolean
  profile?: GitHubProfile
  total?: {
    lastYear?: number
    [key: string]: any
  }
  contributions?: DayContribution[]
  error?: string
}

export default function GitHubContributions() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hoveredCell, setHoveredCell] = useState<{
    day: DayContribution
    x: number
    y: number
  } | null>(null)

  const fetchData = useCallback(async (isManual = false) => {
    try {
      if (isManual) {
        setIsRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      // Always bust browser and intermediary caches with timestamp + cache: "no-store"
      const res = await fetch(`/api/github-contributions?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`)
      }

      const json: ApiResponse = await res.json()
      if (json.success && json.contributions) {
        setData(json)
      } else {
        setError(json.error || "Unable to load contribution data.")
      }
    } catch (err: any) {
      console.error("Error loading GitHub contributions:", err)
      setError(err.message || "Failed to load GitHub data.")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // 1. Group into columns of 7 days (Sunday - Saturday), strictly sorted chronologically
  const weeks = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) return []

    // Guarantee strictly chronological order
    const sorted = [...data.contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    const result: (DayContribution | null)[][] = []
    let currentWeek: (DayContribution | null)[] = []

    const firstDate = new Date(sorted[0].date + "T00:00:00")
    const firstDayOfWeek = firstDate.getDay() // 0 = Sun, 1 = Mon ...

    // Pad beginning of first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null)
    }

    for (const day of sorted) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        result.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      result.push(currentWeek)
    }

    return result
  }, [data])

  // 2. Month label positions across columns (spaced with at least 3 weeks minimum gap to prevent overlap)
  const monthLabels = useMemo(() => {
    if (weeks.length === 0) return []
    const months: { month: string; colIndex: number }[] = []
    let lastMonth = -1

    weeks.forEach((week, colIdx) => {
      const firstValidDay = week.find((d) => d !== null)
      if (firstValidDay) {
        const d = new Date(firstValidDay.date + "T00:00:00")
        const monthIdx = d.getMonth()
        if (
          monthIdx !== lastMonth &&
          (months.length === 0 || colIdx - months[months.length - 1].colIndex >= 3)
        ) {
          lastMonth = monthIdx
          months.push({
            month: d.toLocaleString("en-US", { month: "short" }),
            colIndex: colIdx,
          })
        }
      }
    })

    return months
  }, [weeks])

  // 3. Derived Statistics
  const stats = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) {
      return {
        total: 0,
        activeWeeks: 0,
        bestDay: "—",
        currentStreak: 0,
        year: 2026,
      }
    }

    const total =
      data.total?.lastYear ??
      data.contributions.reduce((acc, d) => acc + d.count, 0)

    let maxCount = 0
    let bestDayDate = ""
    data.contributions.forEach((d) => {
      if (d.count > maxCount) {
        maxCount = d.count
        bestDayDate = d.date
      }
    })

    let bestDayStr = "—"
    if (maxCount > 0 && bestDayDate) {
      const d = new Date(bestDayDate + "T00:00:00")
      const dayNum = d.getDate()
      const monthShort = d.toLocaleString("en-US", { month: "short" })
      bestDayStr = `${dayNum} ${monthShort} (${maxCount})`
    }

    // Active weeks (weeks with at least one commit)
    let activeWeeksCount = 0
    weeks.forEach((w) => {
      if (w.some((day) => day !== null && day.count > 0)) {
        activeWeeksCount++
      }
    })

    // Current Streak
    let currentStreak = 0
    const sorted = [...data.contributions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    for (const day of sorted) {
      if (day.count > 0) {
        currentStreak++
      } else {
        if (currentStreak === 0) continue
        break
      }
    }

    // Determine representative year
    const lastDay = data.contributions[data.contributions.length - 1]
    const year = lastDay
      ? new Date(lastDay.date + "T00:00:00").getFullYear()
      : 2026

    return {
      total,
      activeWeeks: activeWeeksCount,
      bestDay: bestDayStr,
      currentStreak,
      year,
    }
  }, [data, weeks])

  // Get color for contribution level (Level 0 to 4 in crimson #C8102E)
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#4A0A14] border border-[#C8102E]/25"
      case 2:
        return "bg-[#800D1F] border border-[#C8102E]/40"
      case 3:
        return "bg-[#C8102E] border border-[#E62343]/60 shadow-[0_0_8px_rgba(200,16,46,0.4)]"
      case 4:
        return "bg-[#FF3355] border border-white/50 shadow-[0_0_12px_rgba(255,51,85,0.65)]"
      default:
        return "bg-[#181818] border border-white/[0.04]"
    }
  }

  const formatTooltipDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00")
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section
      id="github-contributions"
      className="py-20 md:py-32 bg-[#111111] text-white relative border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase font-mono">
                ACTIVITY — LIVE FETCHED FROM GITHUB API
              </span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tighter uppercase leading-[0.95] text-white font-sans"
            >
              GITHUB CONTRIBUTIONS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(true)}
              disabled={loading || isRefreshing}
              title="Fetch latest live commits from GitHub"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50"
            >
              <RotateCw
                className={`w-3.5 h-3.5 transition-transform duration-500 ${
                  isRefreshing ? "animate-spin text-[#C8102E]" : ""
                }`}
              />
              <span className="hidden sm:inline">
                {isRefreshing ? "SYNCING..." : "SYNC"}
              </span>
            </button>

            <a
              href="https://github.com/wasim2402"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 w-fit group"
            >
              <span>VIEW PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Main Dashboard Card */}
        <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient subtle crimson glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8102E]/[0.05] blur-[120px] pointer-events-none rounded-full" />

          {/* Profile Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full border border-white/20 overflow-hidden bg-neutral-900 flex-shrink-0">
                {data?.profile?.avatar_url ? (
                  <Image
                    src={data.profile.avatar_url}
                    alt={data.profile.name || "Wasim Aktar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold font-mono text-[#C8102E] text-sm">
                    WA
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight">
                  {data?.profile?.name || "Wasim Aktar"}
                </h3>
                <a
                  href={`https://github.com/${data?.profile?.login || "wasim2402"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-neutral-400 font-mono hover:text-[#C8102E] transition-colors"
                >
                  github.com/{data?.profile?.login || "wasim2402"}
                </a>
              </div>
            </div>

            {/* Year / Total Badge */}
            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-1.5 rounded-full border border-[#C8102E]/30 bg-[#C8102E]/10 text-xs font-mono font-medium text-[#C8102E]">
              <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
              <span>
                {stats.year} · {stats.total.toLocaleString()} CONTRIBUTIONS
              </span>
            </div>
          </div>

          {/* Contribution Heatmap Stage */}
          {loading ? (
            /* Skeleton Loading State */
            <div className="py-6 flex flex-col gap-3 animate-pulse">
              <div className="h-4 w-48 bg-white/5 rounded" />
              <div className="h-36 w-full bg-white/5 rounded-xl" />
              <div className="h-4 w-32 bg-white/5 rounded self-end mt-2" />
            </div>
          ) : error ? (
            /* Graceful Error State */
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <p className="text-neutral-400 text-sm font-mono mb-4">
                GitHub activity unavailable right now.
              </p>
              <a
                href="https://github.com/wasim2402"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C8102E] hover:underline font-mono"
              >
                View directly on GitHub ↗
              </a>
            </div>
          ) : (
            /* Heatmap Grid */
            <div className="relative">
              {/* Horizontally scrollable container on smaller screens */}
              <div className="overflow-x-auto pb-4 pt-1 [scrollbar-width:none] -mx-2 px-2">
                <div className="min-w-[780px] select-none">
                  {/* Month Labels Header aligned with week columns */}
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-6 sm:w-7 flex-shrink-0" />
                    <div
                      className="grid gap-[3px] h-4 relative"
                      style={{
                        gridTemplateColumns: `repeat(${weeks.length}, 13px)`,
                      }}
                    >
                      {monthLabels.map(({ month, colIndex }, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-[11px] font-mono text-neutral-400 whitespace-nowrap overflow-visible pointer-events-none"
                          style={{
                            gridColumnStart: colIndex + 1,
                          }}
                        >
                          {month}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Heatmap Matrix: Weekdays + 7 Rows */}
                  <div className="flex gap-1.5">
                    {/* Weekday Labels (Mon, Wed, Fri) */}
                    <div className="flex flex-col justify-between py-[1px] text-[10px] font-mono text-neutral-500 w-6 sm:w-7 flex-shrink-0 leading-none" style={{ height: `${7 * 13 + 6 * 3}px` }}>
                      <span className="opacity-0">Sun</span>
                      <span>Mon</span>
                      <span className="opacity-0">Tue</span>
                      <span>Wed</span>
                      <span className="opacity-0">Thu</span>
                      <span>Fri</span>
                      <span className="opacity-0">Sat</span>
                    </div>

                    {/* Columns of Weeks */}
                    <div
                      className="grid gap-[3px]"
                      style={{
                        gridTemplateColumns: `repeat(${weeks.length}, 13px)`,
                      }}
                    >
                      {weeks.map((week, colIdx) => (
                        <div
                          key={colIdx}
                          className="flex flex-col gap-[3px]"
                        >
                          {week.map((day, rowIdx) => {
                            if (!day) {
                              return (
                                <div
                                  key={rowIdx}
                                  className="w-[13px] h-[13px] opacity-0 pointer-events-none"
                                />
                              )
                            }

                            return (
                              <div
                                key={day.date}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect()
                                  setHoveredCell({
                                    day,
                                    x: rect.left + rect.width / 2,
                                    y: rect.top,
                                  })
                                }}
                                onMouseLeave={() => setHoveredCell(null)}
                                className={`w-[13px] h-[13px] rounded-[2px] cursor-pointer transition-all duration-150 hover:scale-125 hover:z-20 ${getCellColor(
                                  day.level
                                )}`}
                              />
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tooltip */}
              {hoveredCell && (
                <div
                  className="fixed z-[10000] pointer-events-none -translate-x-1/2 -translate-y-full pb-2.5"
                  style={{
                    left: hoveredCell.x,
                    top: hoveredCell.y,
                  }}
                >
                  <div className="bg-[#181818] border border-white/20 text-white rounded-lg px-3 py-1.5 shadow-2xl text-center whitespace-nowrap backdrop-blur-md">
                    <p className="text-xs font-semibold tracking-wide">
                      {hoveredCell.day.count === 0
                        ? "No contributions"
                        : `${hoveredCell.day.count} contribution${
                            hoveredCell.day.count === 1 ? "" : "s"
                          }`}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                      {formatTooltipDate(hoveredCell.day.date)}
                    </p>
                  </div>
                </div>
              )}

              {/* Legend (Bottom Right) */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs font-mono text-neutral-400">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#181818] border border-white/[0.04]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#4A0A14] border border-[#C8102E]/25" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#800D1F] border border-[#C8102E]/40" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#C8102E] border border-[#E62343]/60" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FF3355] border border-white/50" />
                </div>
                <span>More</span>
              </div>
            </div>
          )}

          {/* Contribution Statistics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-white/10">
            {/* Total Contributions */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5 text-[#C8102E]" />
                TOTAL COMMITS
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {loading ? "—" : stats.total.toLocaleString()}
              </span>
            </div>

            {/* Active Weeks */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
                ACTIVE WEEKS
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {loading ? "—" : stats.activeWeeks}
              </span>
            </div>

            {/* Best Day */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#C8102E]" />
                BEST DAY
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight truncate">
                {loading ? "—" : stats.bestDay}
              </span>
            </div>

            {/* Current Streak */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C8102E]" />
                CURRENT STREAK
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {loading ? "—" : `${stats.currentStreak} ${stats.currentStreak === 1 ? "day" : "days"}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

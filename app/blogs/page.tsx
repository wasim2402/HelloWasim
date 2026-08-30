"use client"

import Link from "next/link"
import { Archivo } from "next/font/google"
import { motion } from "framer-motion"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '800']
})

const blogs = [
  {
    id: 1,
    title: "The Future of Agentic AI in Web Development",
    date: "August 24, 2026",
    excerpt: "Exploring how autonomous AI agents are reshaping the way we build, deploy, and maintain frontend architectures...",
    readTime: "5 min read",
    tag: "AI & Engineering"
  },
  {
    id: 2,
    title: "Building Micro-Animations with Framer Motion",
    date: "July 12, 2026",
    excerpt: "A deep dive into creating seamless, physics-based micro-interactions that elevate the user experience without sacrificing performance.",
    readTime: "8 min read",
    tag: "Design Systems"
  },
  {
    id: 3,
    title: "Why I Chose Next.js for Large Scale Enterprise Apps",
    date: "June 03, 2026",
    excerpt: "An architectural overview of scaling Next.js, managing server components, and optimizing the critical rendering path.",
    readTime: "6 min read",
    tag: "Architecture"
  }
]

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 md:px-12 lg:px-16 selection:bg-purple-500 selection:text-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-semibold">
            ← Back to Home
          </Link>
          <h1 className={`text-5xl md:text-7xl lg:text-[90px] font-bold tracking-tighter leading-none ${archivo.className}`}>
            WRITINGS & <br/> THOUGHTS.
          </h1>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {blogs.map((blog, idx) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer border-b border-white/10 pb-8 hover:border-white/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <span className="text-purple-400 font-mono text-xs md:text-sm uppercase tracking-widest">{blog.tag}</span>
                <span className="text-white/40 font-mono text-xs md:text-sm">{blog.date} • {blog.readTime}</span>
              </div>
              <h2 className={`text-2xl md:text-4xl font-semibold mb-4 group-hover:text-purple-300 transition-colors ${archivo.className}`}>
                {blog.title}
              </h2>
              <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
                {blog.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                Read Article 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

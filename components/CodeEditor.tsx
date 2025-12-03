"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const files = [
    {
        name: "Profile.tsx",
        language: "typescript",
        content: `const developer = {
  name: "Wasim Aktar",
  role: "Full Stack Developer",
  skills: [
    "React", "Next.js",
    "Node.js", "TypeScript"
  ],
  hardWorker: true,
  quickLearner: true
};`,
    },
    {
        name: "Skills.json",
        language: "json",
        content: `{
  "frontend": [
    "React", "Tailwind",
    "Framer Motion"
  ],
  "backend": [
    "Node.js", "Express",
    "MongoDB", "PostgreSQL"
  ],
  "tools": ["Git", "Docker"]
}`,
    },
    {
        name: "Contact.css",
        language: "css",
        content: `.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: glass-blur;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`,
    },
]

export default function CodeEditor() {
    const [activeTab, setActiveTab] = useState(0)
    const [displayedContent, setDisplayedContent] = useState("")
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % files.length)
            setDisplayedContent("")
            setIsTyping(true)
        }, 5000) // Switch every 5 seconds

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (isTyping) {
            const fullContent = files[activeTab].content
            let currentIndex = 0

            const typingInterval = setInterval(() => {
                if (currentIndex <= fullContent.length) {
                    setDisplayedContent(fullContent.slice(0, currentIndex))
                    currentIndex++
                } else {
                    setIsTyping(false)
                    clearInterval(typingInterval)
                }
            }, 30) // Typing speed

            return () => clearInterval(typingInterval)
        }
    }, [activeTab, isTyping])

    // Simple syntax highlighting helper
    const highlightCode = (code: string, lang: string) => {
        if (lang === "json") {
            return code.replace(/"([^"]+)":/g, '<span class="text-blue-400">"$1"</span>:')
                .replace(/"([^"]+)"/g, '<span class="text-green-400">"$1"</span>')
                .replace(/([\[\]\{\}])/g, '<span class="text-yellow-500">$1</span>')
        }
        if (lang === "typescript") {
            return code.replace(/(const|let|var|function|return|true|false)/g, '<span class="text-purple-400">$1</span>')
                .replace(/"([^"]+)"/g, '<span class="text-green-400">"$1"</span>')
                .replace(/([\{\}\[\]\(\)])/g, '<span class="text-yellow-500">$1</span>')
                .replace(/(name|role|skills|hardWorker|quickLearner)/g, '<span class="text-blue-400">$1</span>')
        }
        if (lang === "css") {
            return code.replace(/([a-z-]+):/g, '<span class="text-blue-400">$1</span>:')
                .replace(/([^:;]+);/g, '<span class="text-green-400">$1</span>;')
                .replace(/(\.)([a-z-]+)/g, '<span class="text-yellow-500">$1$2</span>')
        }
        return code
    }

    return (
        <div className="w-full max-w-md mx-auto bg-black/50 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl border border-white/10 font-mono text-xs">
            {/* Window Controls & Tabs */}
            <div className="flex items-center bg-white/5 px-3 py-1.5 border-b border-white/5">
                <div className="flex space-x-1.5 mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
                    {files.map((file, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveTab(index)
                                setDisplayedContent("")
                                setIsTyping(true)
                            }}
                            className={`px-2 py-0.5 rounded-t text-[10px] transition-colors ${activeTab === index
                                    ? "bg-white/10 text-white"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            {file.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Code Area */}
            <div className="p-3 h-[240px] overflow-auto">
                <pre className="text-gray-300 font-mono leading-relaxed">
                    <code
                        dangerouslySetInnerHTML={{
                            __html: highlightCode(displayedContent, files[activeTab].language),
                        }}
                    />
                    <span className="animate-pulse inline-block w-1.5 h-3 bg-blue-400/80 align-middle ml-0.5" />
                </pre>
            </div>

            {/* Status Bar */}
            <div className="bg-blue-600/20 px-2 py-0.5 text-white/70 text-[10px] flex justify-between items-center backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                    <span>main*</span>
                    <span>{files[activeTab].language.toUpperCase()}</span>
                </div>
                <span>Ln {displayedContent.split('\n').length}, Col {displayedContent.length}</span>
            </div>
        </div>
    )
}

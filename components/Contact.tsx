"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Instagram, Linkedin, Youtube, CheckCircle, Github, Mail } from "lucide-react"
import { Archivo } from "next/font/google"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['800', '900']
})

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `New Project Inquiry — ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setShowSuccess(true)
        setFormData({ name: "", email: "", message: "" })

        // Auto-hide success popup after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      } else {
        window.alert(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error(error)
      window.alert("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 min-h-screen flex items-center relative overflow-hidden bg-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Left Side */}
          <div className="lg:col-span-6 flex flex-col justify-start self-start mt-0 lg:-mt-24 py-4">
            <div>
              {/* Mail Icon like in the attached image */}
              <div className="relative w-12 h-12 mt-6 mb-6 -ml-4">
                <div className="absolute inset-x-0 -bottom-1 h-2 bg-blue-500 blur-md opacity-60"></div>
                <div className="relative w-full h-full bg-[#111111] border border-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="text-blue-500" size={24} />
                </div>
              </div>

              <h2 className={`text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-medium text-white leading-[1.05] tracking-tighter mb-8 ${archivo.className}`}>
                Let's build something<br />
                <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">extraordinary.</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl max-w-md font-medium tracking-tight mb-8">
                Have a project or need help? Fill out the form, and we'll get back to you soon.
              </p>

              {/* Map Section */}
              <div className="relative w-full max-w-[420px] mt-8 pointer-events-none select-none">
                {/* SVG map with styling to make it dark and faint */}
                <img src="/world-map.svg" alt="World Map" className="w-full h-auto opacity-[0.25] invert grayscale" />
                
                {/* Location Marker (Bangalore, India) */}
                <div className="absolute flex flex-col items-center" style={{ top: '55.5%', left: '71.5%', transform: 'translate(-50%, -100%)' }}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="bg-[#1A1A1A] border border-white/10 text-white/90 text-[10px] tracking-wide font-medium px-2.5 py-1 rounded-full mb-1 shadow-2xl backdrop-blur-md"
                  >
                    I'm here
                  </motion.div>
                  
                  {/* The glowing line */}
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 32, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="w-[1px] bg-gradient-to-t from-blue-500 via-blue-500/50 to-transparent relative origin-bottom"
                  ></motion.div>
                  
                  {/* The dot */}
                  <div className="relative flex items-center justify-center -mt-0.5">
                    <div className="absolute w-8 h-8 bg-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute w-3.5 h-3.5 bg-blue-500/40 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                    <div className="relative w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_2px_rgba(59,130,246,0.8)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-5 lg:col-start-8 flex justify-end w-full">
            <div className="w-full max-w-[500px] relative group">
              <div className="w-full bg-[#0A0A0A] rounded-3xl p-8 md:p-10 relative overflow-hidden z-10 shadow-2xl [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
                {/* Glowing subtle light in top right */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>

                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
                
                {/* Specific glowing cells to match Aceternity look */}
                <div className="absolute right-0 top-0 w-[72px] h-[72px] bg-white/[0.02] border-b border-l border-white/5 pointer-events-none"></div>
                <div className="absolute right-[24px] top-[24px] w-[24px] h-[24px] bg-white/[0.04] pointer-events-none"></div>
                <div className="absolute right-[48px] top-[48px] w-[24px] h-[24px] bg-white/[0.03] pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-transparent rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-transparent rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Your Project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-transparent rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-200 resize-none"
                      placeholder="Tell us about your project"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-fit py-2.5 px-8 mt-2 bg-[#222222] hover:bg-[#333333] border border-white/10 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </motion.button>
                </form>

                {/* Social Links */}
                <div className="relative z-10 flex space-x-3 mt-8 pt-8 border-t border-white/5">
                  {[
                    { icon: Github, href: "https://github.com/wasim2402", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/wasim-aktar-aa7a5a256/", label: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/wasimaktar_?t=AMbuiTqL7k2GGtzBXp6zMA&s=08", label: "Twitter" },
                    { icon: Instagram, href: "https://www.instagram.com/_wasim.aktar/?igsh=YTM3b2IwaDF2YzJm", label: "Instagram" },
                    { icon: Mail, href: "#contact", label: "Email" },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-[#111111] border border-white/5 rounded-xl flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                      aria-label={item.label}
                    >
                      <item.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#111111] border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={32} className="text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Message Sent!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-white/60 leading-relaxed"
              >
                Thank you for reaching out! I'll get back to you as soon as possible.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
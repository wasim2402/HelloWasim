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
    <section id="contact" className="py-24 min-h-screen flex items-center relative overflow-hidden bg-[#F7F4ED] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Left Side */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-4">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-black/60 uppercase">Contact</span>
              </div>
              <h2 className={`text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-medium text-black leading-[1.05] tracking-tighter mb-8 ${archivo.className}`}>
                Let's build something<br />
                <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800">extraordinary.</span>
              </h2>
              <p className="text-black/70 text-lg md:text-xl max-w-md font-medium tracking-tight">
                Have a project or need help? Fill out the form, and we'll get back to you soon.
              </p>
            </div>

            <div className="flex space-x-4 mt-20 lg:mt-0">
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
                  className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center text-black/70 hover:bg-black/10 hover:text-black transition-colors"
                  aria-label={item.label}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-5 flex justify-end w-full">
            <div className="relative w-full max-w-md group">
              {/* Glowing Ambient Backlight */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[28px] blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              <div className="w-full bg-[#111111] rounded-[20px] p-8 md:p-10 relative overflow-hidden z-10">
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
                      className="w-full px-5 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-0 focus:border-white/30 transition-all duration-200"
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
                      className="w-full px-5 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-0 focus:border-white/30 transition-all duration-200"
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
                      rows={5}
                      className="w-full px-5 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-0 focus:border-white/30 transition-all duration-200 resize-none"
                      placeholder="Tell us about your project"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 bg-[#F5F5F5] text-black font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </motion.button>
                </form>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-r from-black to-gray-900 border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
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
                className="text-gray-300 leading-relaxed"
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
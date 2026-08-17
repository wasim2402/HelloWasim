"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Twitter, Instagram, Linkedin, Youtube, CheckCircle } from "lucide-react"
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
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // Auto-hide success popup after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        window.alert('Please fill all fields correctly.');
      }
    } catch (error) {
      console.error(error);
      window.alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Side */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full py-4">
            <div>
              <h2 className={`text-[4rem] md:text-[6rem] font-bold text-black leading-tight tracking-tighter mb-4 ${archivo.className}`}>
                Let's talk.
              </h2>
              <p className="text-black/70 text-lg md:text-xl max-w-md font-medium tracking-tight">
                Have a project or need help? Fill out the form, and we'll get back to you soon.
              </p>
            </div>

            <div className="flex space-x-4 mt-20 lg:mt-0">
              {[
                { icon: Twitter, href: "https://x.com/wasimaktar_?t=AMbuiTqL7k2GGtzBXp6zMA&s=08", label: "Twitter" },
                { icon: Instagram, href: "https://www.instagram.com/_wasim.aktar/?igsh=YTM3b2IwaDF2YzJm", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/wasim-aktar-aa7a5a256/", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "Youtube" },
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
            <div className="w-full max-w-md bg-[#111111] rounded-[20px] p-8 md:p-10 relative overflow-hidden">
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
                  className="w-full px-5 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200"
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
                  className="w-full px-5 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200"
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
                  className="w-full px-5 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 resize-none"
                  placeholder="Tell us about your project"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 bg-[#F5F5F5] text-black font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
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
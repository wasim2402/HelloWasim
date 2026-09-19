"use client"

import { useState, useEffect } from "react"
import { Archivo } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const allTestimonials = [
  {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    name: "XYZ",
    role: "Client",
    image: "/profile.jpg"
  },
  {
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    name: "XYZ",
    role: "Client",
    image: "/profile2.jpg"
  },
  {
    quote: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    name: "XYZ",
    role: "Client",
    image: "/profile.jpg"
  },
  {
    quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    name: "XYZ",
    role: "Client",
    image: "/profile2.jpg"
  },
  {
    quote: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
    name: "XYZ",
    role: "Client",
    image: "/profile.jpg"
  },
  {
    quote: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo?",
    name: "XYZ",
    role: "Client",
    image: "/profile2.jpg"
  }
]

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(2)
      } else {
        setCardsPerPage(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(allTestimonials.length / cardsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Ensure current page is valid when switching screen sizes
  const validCurrentPage = currentPage >= totalPages ? 0 : currentPage

  const displayedTestimonials = allTestimonials.slice(
    validCurrentPage * cardsPerPage,
    (validCurrentPage + 1) * cardsPerPage
  )

  return (
    <section id="testimonials" className="bg-[#111111] text-white py-12 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden sticky top-0 h-[100dvh] md:min-h-screen flex flex-col justify-center z-0">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6">
          <div>
            <p className="text-neutral-400 font-mono text-sm mb-2 md:mb-4">Testimonials</p>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight ${archivo.className}`}>
              Kind words from colleagues
            </h2>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevPage}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={20} className="text-neutral-400" />
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="relative min-h-[260px]">
          {mounted && (
            <AnimatePresence mode="wait">
              <motion.div
                key={validCurrentPage + '-' + cardsPerPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
              >
                {displayedTestimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-transparent border border-white/10 rounded-2xl p-5 md:p-8 flex flex-col justify-between h-full min-h-[200px]"
                  >
                    <p className="text-neutral-200 text-base md:text-xl leading-relaxed mb-6 md:mb-8 line-clamp-4">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-neutral-800">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold">{testimonial.name}</h4>
                        <p className="text-neutral-500 text-[11px] uppercase tracking-wider mt-0.5">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

      </div>
    </section>
  )
}
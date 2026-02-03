import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display, Instrument_Serif } from "next/font/google"

import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" })
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700", variable: "--font-playfair" })
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument" })

export const metadata: Metadata = {
  title: "HelloWasim",
  description:
    "Modern portfolio website showcasing full-stack development and UI/UX design skills. Built with Next.js, React, and Tailwind CSS.",
  keywords: "portfolio, full-stack developer, UI/UX designer, React, Next.js, web development, Wasim Aktar",
  authors: [{ name: "Wasim Aktar" }],
  creator: "Wasim Aktar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wasimaktar.dev",
    title: "Wasim Aktar",
    description: "Modern portfolio website showcasing full-stack development and UI/UX design skills.",
    siteName: "Wasim Aktar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wasim Aktar",
    description: "Modern portfolio website showcasing full-stack development and UI/UX design skills.",
    creator: "@wasimaktar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.className} ${playfair.variable} ${instrument.variable} antialiased`}>

        {children}
      </body>
    </html>
  )
}

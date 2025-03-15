"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CountdownPage() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const targetDate = new Date('March 31, 2025 00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Update state
      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)

      // When countdown is over
      if (distance < 0) {
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Overlay particles */}
      <div className="absolute inset-0 light-particles-sunset opacity-10"></div>
      
      {/* Sun gradient - made more subtle */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#ff7e54]/20 via-[#ff7e54]/10 to-transparent opacity-20 blur-3xl"></div>
      
      {/* Horizontal lines simulating sunset - made more subtle */}
      <div className="absolute inset-0 flex flex-col justify-evenly opacity-5">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="h-px w-full bg-gradient-to-r from-transparent via-[#ff7e54]/50 to-transparent"
            style={{ opacity: 0.3 - i * 0.01 }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link href="/" className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text">So</span>
              <span className="text-white">Journ</span>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 text-shadow-sunset"
          >
            Coming Soon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-16 max-w-2xl"
          >
            We're working on something amazing. Our new features will be available on March 31st, 2025.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {/* Days */}
            <div className="bg-black/50 backdrop-blur-md border border-[#ff7e54]/20 p-6 rounded-2xl text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#ff7e54] mb-2">{days}</div>
              <div className="text-white/70 text-sm md:text-base">Days</div>
            </div>

            {/* Hours */}
            <div className="bg-black/50 backdrop-blur-md border border-[#ff7e54]/20 p-6 rounded-2xl text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#ff7e54] mb-2">{hours}</div>
              <div className="text-white/70 text-sm md:text-base">Hours</div>
            </div>

            {/* Minutes */}
            <div className="bg-black/50 backdrop-blur-md border border-[#ff7e54]/20 p-6 rounded-2xl text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#ff7e54] mb-2">{minutes}</div>
              <div className="text-white/70 text-sm md:text-base">Minutes</div>
            </div>

            {/* Seconds */}
            <div className="bg-black/50 backdrop-blur-md border border-[#ff7e54]/20 p-6 rounded-2xl text-center">
              <div className="text-4xl md:text-6xl font-bold text-[#ff7e54] mb-2">{seconds}</div>
              <div className="text-white/70 text-sm md:text-base">Seconds</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white rounded-full
                     font-semibold text-lg hover:bg-gradient-to-r hover:from-[#ff7e54]/80 hover:to-[#cf4b6c]/80 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
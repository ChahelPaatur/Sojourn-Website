"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState, useRef, useEffect, Suspense, memo } from 'react'
import TeamMember from '@/components/TeamMember'
import MapLoading from '@/components/MapLoading'
import SubscribeCard from '@/components/SubscribeCard'
import EarthGlobe from '@/components/EarthGlobe'
import FloatingElement from '@/components/FloatingElement'
import PinterestInspiration from '@/components/PinterestInspiration'

// Preload team member images for faster rendering
const teamMembers = [
  {
    name: "Chahel Paatur",
    role: "Lead Fullstack Developer and AI Specialist",
    bio: "Expert in creating innovative, AI-driven travel experiences",
    image: "/team/CHAP.jpg",
    social: [
      { type: 'github' as const, url: "https://github.com/chahelpaatur" },
      { type: 'instagram' as const, url: "https://instagram.com/chahelpaatur" }
    ]
  },
  {
    name: "Harshith Chemudugunta",
    role: "Lead Marketer and Backend",
    bio: "Passionate about growth strategies and robust backend architecture",
    image: "/team/Harshith.JPG",
    social: [
      { type: 'github' as const, url: "https://github.com/harshithc" },
      { type: 'instagram' as const, url: "https://instagram.com/harshithc" }
    ]
  },
  {
    name: "Venkat Kutti",
    role: "UX Designer",
    bio: "Creating beautiful and intuitive interfaces for the modern traveler",
    image: "/team/Venkat.JPG",
    social: [
      { type: 'github' as const, url: "https://github.com/venkatkutti" },
      { type: 'instagram' as const, url: "https://instagram.com/venkatkutti" }
    ]
  }
]

// Dynamically import components
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <MapLoading />
})

const Phone3DModel = dynamic(() => import('@/components/Phone3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-[#0a0a0a] animate-pulse rounded-xl flex items-center justify-center">
      <div className="loading-spinner" />
    </div>
  ),
})

// Animated Globe Component - optimized
const AnimatedGlobe = memo(() => {
  return (
    <div className="relative w-full h-full">
      {/* Glow effect - reduced animation complexity */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff7e54]/10 to-[#cf4b6c]/10 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }}
      />
      
      {/* Globe background */}
      <div
        className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-sm"
        style={{
          border: '2px solid rgba(255, 126, 84, 0.1)',
        }}
      />

      {/* Rotating map layer - simplified */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden rotate-animate"
        style={{
          animation: 'rotate 60s linear infinite',
          willChange: 'transform',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `url('/world-map.svg') repeat-x center`,
            backgroundSize: '200% 100%',
            opacity: 0.4,
            filter: 'brightness(0.7) sepia(1) hue-rotate(5deg) saturate(0.8)',
          }}
        />
      </div>

      {/* Grid lines - simplified */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(255,126,84,0.05) 60px,
              rgba(255,126,84,0.05) 61px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(255,126,84,0.05) 60px,
              rgba(255,126,84,0.05) 61px
            )
          `
        }}
      />

      {/* Shine effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 126, 84, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  )
});

export default function Home() {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Only track scroll for visible elements with more performant config
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // More performant spring config with reduced motion
  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.05 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0]), springConfig)
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.9]), springConfig)

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const parallaxSpring = useSpring(parallaxY, springConfig)

  // Defer loading of heavy components based on viewport visibility
  const [shouldLoadMap, setShouldLoadMap] = useState(false)
  const [shouldLoadPhone, setShouldLoadPhone] = useState(false)
  const mapSectionRef = useRef<HTMLDivElement>(null)
  const phoneSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver !== 'undefined') {
      const mapObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoadMap(true)
            mapObserver.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      const phoneObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoadPhone(true)
            phoneObserver.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      if (mapSectionRef.current) {
        mapObserver.observe(mapSectionRef.current)
      }

      if (phoneSectionRef.current) {
        phoneObserver.observe(phoneSectionRef.current)
      }

      return () => {
        mapObserver.disconnect()
        phoneObserver.disconnect()
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setShouldLoadMap(true)
      setShouldLoadPhone(true)
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0e1a2b] relative overflow-hidden will-change-transform hardware-accelerated">
      {/* Background Floating Elements - reduced for performance */}
      <FloatingElement
        type="circle"
        color="#ff7e54"
        size={150}
        opacity={0.05}
        blur={40}
        speed="slow"
        style={{ top: '15%', left: '10%' }}
      />
      <FloatingElement
        type="square"
        color="#cf4b6c"
        size={120}
        opacity={0.04}
        blur={30}
        speed="medium"
        delay={2}
        style={{ top: '40%', right: '8%' }}
      />
      <FloatingElement
        type="triangle"
        color="#ffb44d"
        size={90}
        opacity={0.03}
        blur={25}
        speed="slow"
        delay={1.5}
        style={{ bottom: '20%', left: '15%' }}
      />
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e1a2b]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text">So</span>
                <span className="text-white">Journ</span>
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#pinterest" className="text-white/70 hover:text-[#ff7e54] transition-colors">Integrations</a>
              <a href="#booking" className="text-white/70 hover:text-[#ff7e54] transition-colors">Booking</a>
              <a href="#map" className="text-white/70 hover:text-[#ff7e54] transition-colors">Experience</a>
              <a href="#pricing" className="text-white/70 hover:text-[#ff7e54] transition-colors">Pricing</a>
              <a href="#newsletter" className="text-white/70 hover:text-[#0ea5c6] transition-colors">Subscribe</a>
              <a href="#team" className="text-white/70 hover:text-[#ff7e54] transition-colors">Team</a>
            </nav>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white rounded-full font-medium"
              >
                Download App
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Globe */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 light-particles">
        {/* Background Globe - more efficient rendering */}
        <motion.div
          style={{ y: parallaxSpring }}
          className="absolute inset-0 z-0 will-change-transform"
          initial={false}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a2b] to-[#081221]" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
              <AnimatedGlobe />
            </div>
          </div>
          {/* Main background globe */}
          <div className="absolute top-20 right-20 w-[300px] h-[300px] opacity-20">
            <AnimatedGlobe />
          </div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Earth Globe */}
              <div className="w-48 h-48 mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ff7e54] to-[#cf4b6c] opacity-20 blur-xl animate-pulse" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <EarthGlobe size={180} />
                </div>
              </div>
            </motion.div>
            <motion.h2
              className="text-6xl sm:text-8xl font-bold mb-8 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI-Planned Trips
            </motion.h2>
            <motion.p
              className="text-xl sm:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your intelligent travel companion that creates personalized adventures just for you.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a
                href="/countdown"
                className="px-8 py-4 bg-[#ff7e54] text-black rounded-full font-semibold text-lg
                         hover:bg-[#cf4b6c] transition-colors animate-pulse-glow flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <span>Download Now</span>
              </motion.a>
              <motion.a
                href="#features"
                className="px-8 py-4 border-2 border-[#ff7e54] text-[#ff7e54] rounded-full
                         font-semibold text-lg hover:bg-[#ff7e54]/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </div>
        
        {/* Restored floating globes - original design with more globes */}
        {/* Remove large floating globe as requested */}
        
        {/* Bottom right globe */}
        <div className="absolute bottom-[15%] right-[10%] z-10 hidden lg:block transform rotate-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="floating-medium"
          >
            <EarthGlobe size={120} />
          </motion.div>
        </div>
        
        {/* Top left globe */}
        <div className="absolute top-[20%] left-[5%] z-10 hidden lg:block transform -rotate-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="floating-slow"
          >
            <EarthGlobe size={80} />
          </motion.div>
        </div>
        
        {/* Small top right globe */}
        <div className="absolute top-[35%] right-[20%] z-10 hidden lg:block transform rotate-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            className="floating-medium"
          >
            <EarthGlobe size={60} />
          </motion.div>
        </div>
        
        {/* Additional top left small globe */}
        <div className="absolute top-[40%] left-[15%] z-10 hidden lg:block transform rotate-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.4, delay: 1.7 }}
            className="floating-medium"
          >
            <EarthGlobe size={40} />
          </motion.div>
        </div>
        
        {/* Left middle globe */}
        <div className="absolute bottom-[25%] left-[15%] z-10 hidden lg:block transform -rotate-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="floating-slow"
          >
            <EarthGlobe size={70} />
          </motion.div>
        </div>
        
        {/* Bottom left globe - per user request */}
        <div className="absolute bottom-[10%] left-[7%] z-10 hidden lg:block transform rotate-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="floating-medium"
          >
            <EarthGlobe size={90} />
          </motion.div>
        </div>
      </section>

      {/* Features Grid - reduced animations */}
      <section id="features" className="py-20 px-4 md:px-8 relative glow-light">
        <FloatingElement
          type="circle"
          color="#ff7e54"
          size={80}
          opacity={0.07}
          blur={20}
          speed="medium"
          style={{ top: '10%', right: '15%' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-4">
              Intelligent Travel Planning
            </h2>
            <p className="text-xl text-white/70">
              Powered by ChatGPT-4 and your personal preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                // Reduced delay to improve perceived performance
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass rounded-xl p-6 hover:bg-[#ff7e54]/5 transition-colors"
              >
                <motion.div
                  className="text-[#ff7e54] mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Separator - Keep this */}
      <div className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a2b] via-[#ff7e54]/20 to-[#0e1a2b] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#ff7e54]/50 to-transparent"></div>
        </div>
      </div>

      {/* Pinterest Integration Section */}
      <Suspense fallback={
        <div className="py-20 bg-[#2a1218] flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      }>
        <PinterestInspiration />
      </Suspense>

      {/* Booking Integration - reduced floating elements */}
      <section id="booking" className="py-20 bg-[#0e1a2b] relative">
        <FloatingElement
          type="square"
          color="#cf4b6c"
          size={60}
          opacity={0.08}
          blur={15}
          speed="fast"
          style={{ top: '20%', left: '10%' }}
        />
        <FloatingElement
          type="circle"
          color="#ff7e54"
          size={45}
          opacity={0.06}
          blur={12}
          speed="medium"
          style={{ bottom: '30%', right: '12%' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-4">
              Seamless Booking Experience
            </h2>
            <p className="text-xl text-white/70">
              Book your entire trip through our trusted partners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookingPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-8 hover:bg-[#ff7e54]/5 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {partner.name}
                </h3>
                <p className="text-white/70 mb-6">
                  {partner.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#ff7e54]">{partner.deals}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-[#ff7e54] text-black rounded-full font-semibold"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Globe Section - reduced floating elements */}
      <section className="py-20 bg-[#0e1a2b]/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7e54]/5 via-[#cf4b6c]/5 to-[#9d4881]/5 pointer-events-none" />
        
        <FloatingElement
          type="circle"
          color="#ffb44d"
          size={55}
          opacity={0.07}
          blur={15}
          speed="medium"
          style={{ top: '15%', right: '30%' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-4">
              Explore The World
            </h2>
            <p className="text-xl text-white/70">
              Discover new destinations with our interactive Earth visualization
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Your Journey Begins Here</h3>
                <p className="text-white/70 mb-6">
                  Explore our beautiful planet and discover your next adventure. Our AI analyzes your preferences and travel history to recommend destinations you'll love.
                </p>
                <ul className="space-y-4 mb-8">
                  {['Real-time weather data', 'Cultural insights', 'Travel advisories', 'Visa requirements'].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      viewport={{ once: true }}
                      className="flex items-center text-white/70"
                    >
                      <span className="text-[#ff7e54] mr-3">✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white rounded-full font-semibold text-lg"
                >
                  Start Exploring
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <FloatingElement
                  type="circle"
                  color="#ff7e54"
                  size={40}
                  opacity={0.2}
                  blur={10}
                  speed="medium"
                  style={{ top: '-5%', right: '-5%' }}
                />
                <FloatingElement
                  type="circle"
                  color="#cf4b6c"
                  size={30}
                  opacity={0.15}
                  blur={8}
                  speed="fast"
                  style={{ bottom: '10%', left: '-10%' }}
                />
                <EarthGlobe size={350} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" ref={mapSectionRef} className="py-20 px-4 md:px-8 relative glow-light">
        {/* 3D Globe Background - only show when in viewport */}
        {shouldLoadMap && (
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="w-full h-full">
              <AnimatedGlobe />
            </div>
          </div>
        )}

        <FloatingElement
          type="triangle"
          color="#ff7e54"
          size={50}
          opacity={0.07}
          blur={15}
          speed="slow"
          style={{ top: '25%', left: '20%' }}
        />
        <FloatingElement
          type="circle"
          color="#cf4b6c"
          size={35}
          opacity={0.06}
          blur={10}
          speed="medium"
          style={{ bottom: '30%', right: '15%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7e54]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-4">
              Experience Our App
            </h2>
            <p className="text-xl text-white/70">
              Plan your journey with our interactive map and route visualization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Map - only load when in viewport */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden glass h-[600px] border border-white/10"
            >
              {shouldLoadMap ? (
                <MapComponent onLoad={() => setIsMapLoaded(true)} />
              ) : (
                <div className="w-full h-full bg-[#0e1a2b] flex items-center justify-center">
                  <div className="loading-spinner" />
                </div>
              )}
              <div className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-[#ff7e54]" />
                    <div>
                      <h4 className="text-white font-medium">Current Route</h4>
                      <p className="text-white/70 text-sm">San Francisco → Tokyo</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <span className="text-[#ff7e54] block">10h 50m</span>
                      <span className="text-white/50 text-sm">Flight Time</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[#ff7e54] block">6,530 mi</span>
                      <span className="text-white/50 text-sm">Distance</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Small Earth Globe in corner - only when map is loaded */}
              {shouldLoadMap && (
                <div className="absolute top-5 right-5 z-20">
                  <EarthGlobe size={100} />
                </div>
              )}
            </motion.div>

            {/* 3D Phone Display - only load when in viewport */}
            <motion.div
              ref={phoneSectionRef}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              {shouldLoadPhone ? (
                <Phone3DModel />
              ) : (
                <div className="w-full h-[600px] bg-[#0a0a0a] animate-pulse rounded-xl flex items-center justify-center">
                  <div className="loading-spinner" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 md:px-8 relative glow-light">
        <FloatingElement
          type="triangle"
          color="#ff7e54"
          size={70}
          opacity={0.06}
          blur={18}
          speed="slow"
          style={{ bottom: '10%', right: '5%' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-4">
              Choose Your Journey
            </h2>
            <p className="text-xl text-white/70">
              Start for free or unlock premium features for the ultimate experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border border-white/10 hover:border-[#ff7e54]/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <p className="text-4xl font-bold text-[#ff7e54] mb-8">$0<span className="text-lg text-white/50">/forever</span></p>
              <ul className="space-y-4 mb-8">
                {freeTierFeatures.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-white/70"
                  >
                    <span className="text-[#ff7e54] mr-3">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 border-2 border-[#ff7e54] text-[#ff7e54] rounded-full
                         font-semibold text-lg hover:bg-[#ff7e54]/10 transition-colors"
              >
                <a href="/countdown">Get Started</a>
              </motion.button>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border-2 border-[#ff7e54] relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-[#ff7e54] text-black px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <p className="text-4xl font-bold text-[#ff7e54] mb-8">$30<span className="text-lg text-white/50">/year</span></p>
              <ul className="space-y-4 mb-8">
                {premiumTierFeatures.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-white/70"
                  >
                    <span className="text-[#ff7e54] mr-3">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-[#ff7e54] text-black rounded-full font-semibold text-lg"
              >
                <a href="/countdown">Start Premium</a>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - reduced animations */}
      <section id="newsletter" className="py-24 bg-[#0e1a2b] relative overflow-hidden">
        {/* Sun element - reduced size and opacity */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[20%] h-16 bg-gradient-to-t from-[#ffb44d]/20 to-transparent opacity-30 blur-xl rounded-t-full"></div>
        
        {/* Reduced horizontal lines */}
        <div className="absolute inset-0 flex flex-col-reverse justify-evenly opacity-5">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="h-px w-full bg-gradient-to-r from-transparent via-[#ff7e54]/50 to-transparent"
              style={{ opacity: 0.3 - i * 0.05 }}
            ></div>
          ))}
        </div>
        
        {/* Reduced floating elements */}
        <FloatingElement
          type="circle"
          color="#ffb44d"
          size={60}
          opacity={0.1}
          blur={15}
          speed="medium"
          style={{ top: '30%', right: '15%' }}
        />
        <FloatingElement
          type="square"
          color="#ff7e54"
          size={45}
          opacity={0.08}
          blur={12}
          speed="slow"
          style={{ bottom: '20%', left: '10%' }}
        />
        <div className="absolute inset-0 light-particles-sunset opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#ffb44d] via-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-6 text-shadow-sunset">
              Stay Updated
            </h2>
            <p className="text-2xl bg-gradient-to-r from-[#ff7e54]/90 via-[#cf4b6c]/90 to-[#cf4b6c]/80 text-transparent bg-clip-text max-w-3xl mx-auto font-medium">
              Join our AI travel community and be the first to experience new features.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <SubscribeCard 
              title="Stay Connected" 
              subtitle="Get fresh travel adventures to your inbox every week."
              bannerText="JOIN"
              bannerHoverText="WANDER"
              buttonText="Join Now"
            />
          </div>
        </div>
      </section>

      {/* Team Section - simplified animations */}
      <section id="team" className="py-20 px-4 md:px-8 relative">
        <FloatingElement
          type="circle"
          color="#9d4881"
          size={50}
          opacity={0.1}
          blur={12}
          speed="fast"
          style={{ top: '20%', left: '5%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff7e54]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-white/70">
              The minds behind your next adventure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.name} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer with ChatGPT-4 Attribution */}
      <footer className="py-12 bg-[#0e1a2b] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[#ff7e54] font-bold text-lg mb-4">SoJourn</h3>
              <p className="text-white/70">Your AI-powered travel companion</p>
            </div>
            <div>
              <h3 className="text-[#ff7e54] font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/countdown" className="text-white/70 hover:text-[#ff7e54]">About</a></li>
                <li><a href="/countdown" className="text-white/70 hover:text-[#ff7e54]">Careers</a></li>
                <li><a href="/countdown" className="text-white/70 hover:text-[#ff7e54]">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#ff7e54] font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/countdown" className="text-white/70 hover:text-[#ff7e54]">Privacy</a></li>
                <li><a href="/countdown" className="text-white/70 hover:text-[#ff7e54]">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#ff7e54] font-bold text-lg mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-[#ff7e54]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-[#ff7e54]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/50">Powered by ChatGPT-4 • © 2024 SoJourn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "AI Travel Planning",
    description: "Personalized itineraries created by analyzing your Pinterest boards and preferences",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    title: "Smart Navigation",
    description: "Premium navigation powered by Apple Maps with offline support and real-time updates",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Instant Booking",
    description: "Seamless hotel and activity booking through Booking.com and Expedia integrations",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const freeTierFeatures = [
  "Basic trip planning",
  "Essential packing lists",
  "Basic weather alerts",
  "Community support",
  "Limited route optimization"
]

const premiumTierFeatures = [
  "Everything in Free tier",
  "Advanced AI trip planning",
  "Unlimited Pinterest board analysis",
  "Full offline map access",
  "Priority customer support",
  "Real-time weather warnings",
  "Smart stop planning",
  "Comprehensive packing assistant",
  "Past trip photo organization",
  "Route optimization with real-time traffic",
  "Emergency travel alerts",
  "Exclusive hotel deals"
]

const pinterestFeatures = [
  "Smart travel style detection",
  "Personalized destination matching",
  "Custom itinerary generation",
  "Activity recommendations",
  "Photo spot suggestions",
  "Local cuisine recommendations"
]

// Pinterest Grid Images
const pinterestImages = [
  "/pinterest/mountain-valley.jpg",     // Mountain valley with sunset
  "/pinterest/mountain-meadow.jpg",     // Person in green meadow with snowy mountains
  "/pinterest/campfire-mountains.jpg",  // Person at campfire with mountain view
  "/pinterest/lake-backpack.jpg",       // Lake with pine trees and backpack
  "/pinterest/city-skyline.jpg",        // Brooklyn Bridge with NYC skyline
  "/pinterest/forest-road.jpg"          // Tree-lined forest road
]

const bookingPartners = [
  {
    name: "Booking.com Integration",
    description: "Access to over 28 million accommodation listings worldwide with exclusive SoJourn discounts",
    deals: "Special rates available",
  },
  {
    name: "Expedia Integration",
    description: "Book flights, cars, and activities with our premium travel partner",
    deals: "Member-only deals",
  },
] 
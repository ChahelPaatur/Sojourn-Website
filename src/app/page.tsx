"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'
import TeamMember from '@/components/TeamMember'
import MapLoading from '@/components/MapLoading'

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

// Animated Globe Component
const AnimatedGlobe = () => {
  return (
    <div className="relative w-full h-full">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700]/10 to-[#B8860B]/10 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Globe background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-sm"
        style={{
          border: '2px solid rgba(255, 215, 0, 0.1)',
        }}
      />

      {/* Rotating map layer */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
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
      </motion.div>

      {/* Grid lines */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(255,215,0,0.05) 40px,
              rgba(255,215,0,0.05) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255,215,0,0.05) 40px,
              rgba(255,215,0,0.05) 41px
            )
          `
        }}
      />

      {/* Shine effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}

export default function Home() {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0]), springConfig)
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.8]), springConfig)

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const parallaxSpring = useSpring(parallaxY, springConfig)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      

      {/* Hero Section with Animated Globe */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Background Globe */}
        <motion.div
          style={{ y: parallaxSpring }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
              <AnimatedGlobe />
            </div>
          </div>
          {/* Additional floating globes */}
          <div className="absolute top-20 right-20 w-[300px] h-[300px] opacity-20">
            <AnimatedGlobe />
          </div>
          <div className="absolute bottom-40 left-20 w-[400px] h-[400px] opacity-25">
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
              {/* Placeholder Logo */}
              <div className="w-48 h-48 mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] opacity-20 blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-full border-4 border-[#FFD700] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <span className="text-6xl font-bold text-[#FFD700]">S</span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-[#FFD700] border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
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
                href="#download"
                className="px-8 py-4 bg-[#FFD700] text-black rounded-full font-semibold text-lg
                         hover:bg-[#B8860B] transition-colors animate-pulse-glow flex items-center justify-center space-x-2"
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
                className="px-8 py-4 border-2 border-[#FFD700] text-[#FFD700] rounded-full
                         font-semibold text-lg hover:bg-[#FFD700]/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
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
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:bg-[#FFD700]/5 transition-colors"
              >
                <motion.div
                  className="text-[#FFD700] mb-4"
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

      {/* Pinterest Integration */}
      <section id="pinterest" className="py-20 bg-[#0a0a0a]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E60023]/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="flex items-center space-x-4 mb-6">
                <svg className="w-12 h-12 text-[#E60023]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.217-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
                <h2 className="text-4xl font-bold text-[#FFD700]">
                  Pinterest Integration
                </h2>
              </div>
              <p className="text-xl text-white/70 mb-12">
                Transform your travel dreams into reality. Connect your Pinterest boards and let our AI create personalized adventures that match your unique style.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
                {pinterestImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-lg overflow-hidden aspect-square bg-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={image}
                      alt={`Travel inspiration ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#E60023] text-white rounded-full font-semibold text-lg
                         hover:bg-[#ad001b] transition-colors flex items-center space-x-2"
              >
                <span>Connect Pinterest</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass p-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[1, 2, 3, 4].map((index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden bg-white/10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="aspect-square bg-gradient-to-br from-[#E60023]/20 to-[#FFD700]/20" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Integration */}
      <section id="booking" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
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
                className="glass rounded-xl p-8 hover:bg-[#FFD700]/5 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {partner.name}
                </h3>
                <p className="text-white/70 mb-6">
                  {partner.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFD700]">{partner.deals}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-[#FFD700] text-black rounded-full font-semibold"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-20 bg-[#0a0a0a]/50 relative overflow-hidden">
        {/* 3D Globe Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full">
            <AnimatedGlobe />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
              Experience Our App
            </h2>
            <p className="text-xl text-white/70">
              Plan your journey with our interactive map and route visualization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden glass h-[600px] border border-white/10"
            >
              <MapComponent onLoad={() => setIsMapLoaded(true)} />
              <div className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-[#FFD700]" />
                    <div>
                      <h4 className="text-white font-medium">Current Route</h4>
                      <p className="text-white/70 text-sm">Tokyo → San Francisco</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <span className="text-[#FFD700] block">13h 25m</span>
                      <span className="text-white/50 text-sm">Flight Time</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[#FFD700] block">6,530 mi</span>
                      <span className="text-white/50 text-sm">Distance</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3D Phone Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <Phone3DModel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
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
              className="glass rounded-2xl p-8 border border-white/10 hover:border-[#FFD700]/30 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <p className="text-4xl font-bold text-[#FFD700] mb-8">$0<span className="text-lg text-white/50">/forever</span></p>
              <ul className="space-y-4 mb-8">
                {freeTierFeatures.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-white/70"
                  >
                    <span className="text-[#FFD700] mr-3">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 border-2 border-[#FFD700] text-[#FFD700] rounded-full
                         font-semibold text-lg hover:bg-[#FFD700]/10 transition-colors"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border-2 border-[#FFD700] relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-[#FFD700] text-black px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <p className="text-4xl font-bold text-[#FFD700] mb-8">$30<span className="text-lg text-white/50">/year</span></p>
              <ul className="space-y-4 mb-8">
                {premiumTierFeatures.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-white/70"
                  >
                    <span className="text-[#FFD700] mr-3">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-[#FFD700] text-black rounded-full font-semibold text-lg"
              >
                Start Premium
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-white/70">
              The minds behind your next adventure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.name} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer with ChatGPT-4 Attribution */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-4">SoJourn</h3>
              <p className="text-white/70">Your AI-powered travel companion</p>
            </div>
            <div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white/70 hover:text-[#FFD700]">About</a></li>
                <li><a href="#careers" className="text-white/70 hover:text-[#FFD700]">Careers</a></li>
                <li><a href="#press" className="text-white/70 hover:text-[#FFD700]">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#privacy" className="text-white/70 hover:text-[#FFD700]">Privacy</a></li>
                <li><a href="#terms" className="text-white/70 hover:text-[#FFD700]">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#FFD700] font-bold text-lg mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-[#FFD700]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-[#FFD700]">
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
    description: "Seamless hotel and activity booking through Booking.com and Expedia partnerships",
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
  "/pinterest/travel1.jpg",
  "/pinterest/food1.jpg",
  "/pinterest/hotel1.jpg",
  "/pinterest/activity1.jpg",
  "/pinterest/scenery1.jpg",
  "/pinterest/restaurant1.jpg"
]

const bookingPartners = [
  {
    name: "Booking.com Integration",
    description: "Access to over 28 million accommodation listings worldwide with exclusive SoJourn discounts",
    deals: "Special rates available",
  },
  {
    name: "Expedia Partnership",
    description: "Book flights, cars, and activities with our premium travel partner",
    deals: "Member-only deals",
  },
]

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Lead Developer",
    bio: "Full-stack developer with a passion for creating seamless travel experiences",
    image: "/team/alex.jpg",
    social: [
      { type: 'github' as const, url: "https://github.com/alexchen" },
      { type: 'instagram' as const, url: "https://instagram.com/alexchen" }
    ]
  },
  {
    name: "Sarah Johnson",
    role: "AI Specialist",
    bio: "Expert in machine learning and AI-driven travel recommendations",
    image: "/team/sarah.jpg",
    social: [
      { type: 'github' as const, url: "https://github.com/sarahj" },
      { type: 'instagram' as const, url: "https://instagram.com/sarahj" }
    ]
  },
  {
    name: "Michael Park",
    role: "UX Designer",
    bio: "Creating beautiful and intuitive interfaces for the modern traveler",
    image: "/team/michael.jpg",
    social: [
      { type: 'github' as const, url: "https://github.com/michaelpark" },
      { type: 'instagram' as const, url: "https://instagram.com/michaelpark" }
    ]
  }
] 
"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Integrations', href: '#pinterest' },
    { name: 'Booking', href: '#booking' },
    { name: 'Experience', href: '#map' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Subscribe', href: '#newsletter' },
    { name: 'Team', href: '#team' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Always visible */}
          <div className="flex items-center">
            <Link href="#" className="text-xl font-extrabold">
              <span className="bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text">So</span>
              <span className="text-white">Journ</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-white/70 hover:text-[#ff7e54] transition-colors"
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Dropdown Button */}
          <div className="flex items-center md:hidden">
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1 text-white bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] px-3 py-1.5 rounded-md"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <span className="text-sm font-medium">Menu</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-md shadow-lg py-1 z-50"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-[#ff7e54]/10 hover:text-[#ff7e54]"
                      onClick={(e) => handleScroll(e, item.href)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-[#ff7e54]/10 hover:text-[#ff7e54]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Download App
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white rounded-full font-medium text-sm"
            >
              Download App
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 
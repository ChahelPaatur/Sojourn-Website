"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
    { name: 'Map', href: '#map' },
    { name: 'Team', href: '#team' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 mr-auto"
          >
            <Link 
              href="/" 
              className="text-3xl font-bold text-primary-dark dark:text-primary-light"
              onClick={(e) => handleScroll(e, '#')}
              style={{
                textShadow: theme === 'dark' 
                  ? '0 0 5px rgba(255, 126, 84, 0.3), 0 0 8px rgba(255, 126, 84, 0.2)' 
                  : '0 0 4px rgba(255, 126, 84, 0.2), 0 0 7px rgba(255, 126, 84, 0.1)',
                animation: 'subtle-pulse 4s ease-in-out infinite',
                fontFamily: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              }}
            >
              SoJourn
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-light dark:text-gray-300 dark:hover:text-primary-light
                             transition-colors duration-200 font-medium"
                    onClick={(e) => handleScroll(e, item.href)}
                    style={{
                      textShadow: theme === 'dark' 
                        ? '0 0 3px rgba(255, 126, 84, 0.2), 0 0 5px rgba(255, 126, 84, 0.1)' 
                        : '0 0 3px rgba(255, 126, 84, 0.15), 0 0 5px rgba(255, 126, 84, 0.05)',
                      animation: 'subtle-pulse 4s ease-in-out infinite',
                      fontFamily: "'SF Pro Text', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300
                         hover:text-primary-light dark:hover:text-primary-light focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300
                       hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200"
              onClick={(e) => handleScroll(e, item.href)}
              style={{
                textShadow: theme === 'dark' 
                  ? '0 0 3px rgba(255, 126, 84, 0.2), 0 0 5px rgba(255, 126, 84, 0.1)' 
                  : '0 0 3px rgba(255, 126, 84, 0.15), 0 0 5px rgba(255, 126, 84, 0.05)',
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}

export default Navigation 
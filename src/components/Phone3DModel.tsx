import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Phone3DModel() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoMounted, setIsVideoMounted] = useState(false)

  useEffect(() => {
    setIsVideoMounted(true)
    
    // Ensure the component is visible
    const loadVideo = setTimeout(() => {
      setIsVideoLoaded(true)
    }, 500)
    
    return () => clearTimeout(loadVideo)
  }, [])

  return (
    <div className="relative w-[300px] h-[600px] mx-auto">
      {/* Phone frame - increased z-index and added shadow to make it more visible */}
      <div className="absolute inset-0 rounded-[3rem] bg-black shadow-2xl border-[14px] border-black overflow-hidden z-10">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-3xl z-20" />
        
        {/* Video container */}
        <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden">
          {!isVideoLoaded && (
            <motion.div 
              className="absolute inset-0 bg-[#1a1a1a] rounded-[2rem] flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[#FFD700]">Loading...</span>
            </motion.div>
          )}
          {isVideoMounted && (
            <video 
              className="w-full h-full object-cover rounded-[2rem]"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              style={{ 
                opacity: isVideoLoaded ? 1 : 0,
                objectPosition: '50% 15%'
              }}
              preload="auto"
            >
              <source src="/app-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Side buttons */}
        <div className="absolute right-[-14px] top-[120px] w-[3px] h-[100px] bg-gray-700 rounded" />
        <div className="absolute left-[-14px] top-[80px] w-[3px] h-[60px] bg-gray-700 rounded" />
        <div className="absolute left-[-14px] top-[160px] w-[3px] h-[60px] bg-gray-700 rounded" />
      </div>
      
      {/* Additional outer frame to make it more visible */}
      <div className="absolute inset-[-10px] rounded-[3.5rem] bg-gradient-to-r from-gray-800 via-gray-900 to-black -z-10"></div>
      
      {/* Phone glare overlay */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20"></div>
    </div>
  )
} 
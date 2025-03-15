import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Phone3DModel() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoMounted, setIsVideoMounted] = useState(false)

  useEffect(() => {
    setIsVideoMounted(true)
  }, [])

  return (
    <div className="relative w-[300px] h-[600px] mx-auto">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[3rem] bg-black shadow-xl border-[14px] border-black overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-3xl z-20" />
        
        {/* Video container */}
        <div className="relative w-full h-full bg-[#1a1a1a]">
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
    </div>
  )
} 
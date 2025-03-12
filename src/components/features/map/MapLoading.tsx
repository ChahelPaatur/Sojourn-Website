import { motion } from 'framer-motion';

export default function MapLoading() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent" />
      
      {/* Grid background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(255,215,0,0.03) 40px,
              rgba(255,215,0,0.03) 41px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255,215,0,0.03) 40px,
              rgba(255,215,0,0.03) 41px
            )
          `
        }}
      />

      {/* Loading animation */}
      <div className="relative z-10">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-[#FFD700]/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-[#FFD700]/50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-[#FFD700]/70"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#FFD700] font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Loading map...
      </motion.p>
    </div>
  );
} 
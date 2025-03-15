import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface InteractiveGlobeProps {
  size?: number;
  className?: string;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ 
  size = 400,
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 }; 
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Initial position values
  const initialX = useRef(0);
  const initialY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

  // Handle auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      const currentY = rotateY.get();
      rotateY.set(currentY + 0.2);
    }, 16);
    
    return () => clearInterval(interval);
  }, [autoRotate, rotateY]);

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    initialX.current = e.clientX;
    initialY.current = e.clientY;
    lastX.current = rotateY.get();
    lastY.current = rotateX.get();
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - initialX.current;
    const deltaY = e.clientY - initialY.current;
    
    // Adjust rotation based on mouse movement
    rotateY.set(lastX.current + deltaX * 0.5);
    rotateX.set(lastY.current - deltaY * 0.5);
  };

  // Handle mouse up/leave
  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      if (!isDragging) setAutoRotate(true);
    }, 2000);
  };

  return (
    <div 
      className={`interactive-globe select-none ${className}`}
      style={{ width: size, height: size }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{ 
          rotateX: springRotateX, 
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Globe background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-sm"
          style={{
            border: '2px solid rgba(255, 126, 84, 0.2)',
          }}
        />

        {/* Rotating map layer */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `url('/world-map.svg') repeat-x center`,
            backgroundSize: '200% 100%',
            opacity: 0.4,
            filter: 'brightness(0.7) sepia(1) hue-rotate(5deg) saturate(0.8)',
          }}
        />

        {/* Grid lines */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(255,126,84,0.05) 40px,
                rgba(255,126,84,0.05) 41px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                rgba(255,126,84,0.05) 40px,
                rgba(255,126,84,0.05) 41px
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
        
        {/* Hotspots - Add locations */}
        <div className="absolute w-3 h-3 rounded-full bg-[#ff7e54] animate-pulse-glow"
             style={{ 
               top: '30%', 
               left: '30%',
               transform: 'translate(-50%, -50%)',
               boxShadow: '0 0 10px rgba(255, 126, 84, 0.8)'
             }} 
        />
        <div className="absolute w-3 h-3 rounded-full bg-[#cf4b6c] animate-pulse-glow"
             style={{ 
               top: '40%', 
               left: '70%', 
               transform: 'translate(-50%, -50%)',
               boxShadow: '0 0 10px rgba(207, 75, 108, 0.8)',
               animationDelay: '0.5s'
             }} 
        />
        <div className="absolute w-3 h-3 rounded-full bg-[#9d4881] animate-pulse-glow"
             style={{ 
               top: '65%', 
               left: '55%', 
               transform: 'translate(-50%, -50%)',
               boxShadow: '0 0 10px rgba(157, 72, 129, 0.8)',
               animationDelay: '1s'
             }} 
        />
      </motion.div>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-white/50 text-center text-xs">
        Drag to rotate
      </div>
    </div>
  );
};

export default InteractiveGlobe; 
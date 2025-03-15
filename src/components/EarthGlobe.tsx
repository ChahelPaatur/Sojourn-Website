import React, { useRef, memo } from 'react';
import { motion } from 'framer-motion';

interface EarthGlobeProps {
  size?: number;
  className?: string;
}

// Add CSS to global.css for better performance
// .earth-globe-night {
//   animation: rotate-night 100s linear infinite;
//   background-size: 200%;
//   height: 100%;
//   position: absolute;
//   width: 100%;
//   z-index: 2;
// }
// 
// .earth-globe-day {
//   animation: rotate-day 100s linear infinite;
//   background-size: 200%;
//   border-left: solid 1px rgba(0, 0, 0, 0.5);
//   border-radius: 50%;
//   box-shadow: 5px 0 20px 10px rgba(4, 6, 21, 0.8) inset;
//   height: 100%;
//   margin-left: 22%;
//   position: absolute;
//   width: 100%;
//   z-index: 3;
// }

const EarthGlobe: React.FC<EarthGlobeProps> = ({ 
  size = 500,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = size / 500; // Base scale relative to original 500px size

  // Use hardware acceleration and reduce animation frames
  return (
    <div 
      className={`relative ${className}`}
      ref={containerRef}
      style={{
        width: size,
        height: size,
      }}
    >
      <motion.div 
        className="planet-container"
        style={{ 
          width: size, 
          height: size,
          boxShadow: `5px -3px 10px 3px rgba(94, 144, 241, 0.8)`,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* Night layer - simplified */}
        <div 
          style={{
            animation: 'rotate-night 120s linear infinite',
            backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg)',
            backgroundSize: '200%',
            height: 500,
            position: 'absolute',
            width: 500,
            zIndex: 2,
            willChange: 'transform',
          }}
        />
        {/* Day layer - simplified */}
        <div 
          style={{
            animation: 'rotate-day 120s linear infinite',
            backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg)',
            backgroundSize: '200%',
            borderLeft: 'solid 1px rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            boxShadow: '5px 0 20px 10px rgba(4, 6, 21, 0.8) inset',
            height: 500,
            marginLeft: 110,
            position: 'absolute',
            width: 500,
            zIndex: 3,
            willChange: 'transform',
          }}
        />
        {/* Removed clouds layer for performance */}
        {/* Inner shadow */}
        <div 
          style={{
            background: 'transparent',
            borderRadius: '50%',
            boxShadow: '-5px 0 10px 1px rgba(21, 43, 87, 0.6) inset, 5px 0 10px 1px rgba(4, 6, 21, 0.6) inset',
            height: 500,
            position: 'absolute',
            width: 500,
            zIndex: 5
          }}
        />
      </motion.div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(EarthGlobe); 
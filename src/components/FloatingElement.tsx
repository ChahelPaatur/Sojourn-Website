import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  className?: string;
  children?: React.ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  delay?: number;
  size?: number;
  color?: string;
  type?: 'circle' | 'square' | 'triangle' | 'custom';
  opacity?: number;
  blur?: number;
  style?: React.CSSProperties;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  className = '',
  children,
  speed = 'medium',
  delay = 0,
  size = 40,
  color = '#ff7e54',
  type = 'circle',
  opacity = 0.2,
  blur = 20,
  style = {},
}) => {
  // Map speed to animation class
  const animationClass = {
    slow: 'floating-slow',
    medium: 'floating-medium',
    fast: 'floating-fast',
  }[speed];
  
  // Generate the shape based on type
  const renderShape = () => {
    if (children) {
      return children;
    }
    
    switch (type) {
      case 'circle':
        return (
          <div 
            className="rounded-full" 
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              opacity,
              filter: `blur(${blur}px)`,
            }} 
          />
        );
      case 'square':
        return (
          <div 
            className="rounded-lg" 
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              opacity,
              filter: `blur(${blur}px)`,
              transform: 'rotate(15deg)',
            }} 
          />
        );
      case 'triangle':
        return (
          <div 
            style={{ 
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              opacity,
              filter: `blur(${blur}px)`,
            }} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      className={`absolute pointer-events-none ${animationClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        zIndex: 0,
        ...style,
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

export default FloatingElement; 
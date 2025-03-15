"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Pinterest image data
const pinterestImages = [
  {
    path: "/pinterest/mountain-valley.jpg",
    alt: "Scenic mountain valley at sunset",
    location: "Glacier National Park, Montana",
    placeholder: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
  },
  {
    path: "/pinterest/mountain-meadow.jpg", 
    alt: "Person in field with snow mountains in background",
    location: "Chugach Mountains, Alaska",
    placeholder: "bg-gradient-to-br from-green-400 to-blue-500"
  },
  {
    path: "/pinterest/campfire-mountains.jpg",
    alt: "Person tending campfire with mountain backdrop",
    location: "Yosemite National Park, California",
    placeholder: "bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500"
  },
  {
    path: "/pinterest/lake-backpack.jpg",
    alt: "Alpine lake with pine trees and backpack",
    location: "Banff National Park, Canada",
    placeholder: "bg-gradient-to-br from-cyan-500 to-blue-500"
  },
  {
    path: "/pinterest/city-skyline.jpg",
    alt: "Brooklyn Bridge with NYC skyline at night",
    location: "New York City, New York",
    placeholder: "bg-gradient-to-br from-gray-700 via-gray-900 to-black"
  },
  {
    path: "/pinterest/forest-road.jpg",
    alt: "Tree-lined forest road in golden light",
    location: "Redwood National Park, California",
    placeholder: "bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-500"
  }
];

export default function PinterestInspiration() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Precheck if images exist
    const checkImages = async () => {
      const imageStatus: Record<string, boolean> = {};
      
      await Promise.all(
        pinterestImages.map(async (image) => {
          try {
            const response = await fetch(image.path, { method: 'HEAD' });
            // Consider an image loaded if it exists and has content
            imageStatus[image.path] = response.ok && (response.headers.get('content-length') || '0') !== '0';
          } catch (e) {
            imageStatus[image.path] = false;
          }
        })
      );
      
      setImagesLoaded(imageStatus);
    };
    
    checkImages();
  }, []);
  
  return (
    <section id="pinterest" className="py-20 relative overflow-hidden glow-light bg-gradient-to-b from-[#2a1218] via-[#582431] to-[#2a1218]">
      {/* Light particles effect with different color for this section */}
      <div className="absolute inset-0 light-particles-sunset"></div>
      
      {/* Subtle accent glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff7e54]/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff7e54]/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#ff7e54] mb-4 shimmer-accent">
            Travel Inspiration
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Connect your Pinterest boards to discover destinations that match your travel aesthetic and create AI-powered itineraries
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {pinterestImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden aspect-square bg-white/5 border border-white/10 group"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                zIndex: 10
              }}
              onHoverStart={() => setActiveImage(index)}
              onHoverEnd={() => setActiveImage(null)}
              transition={{ duration: 0.2 }}
            >
              {imagesLoaded[image.path] ? (
                <img
                  src={image.path}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              ) : (
                <div className={`w-full h-full ${image.placeholder} animate-gradient-x flex items-center justify-center`}>
                  <div className="text-white/80 text-center p-4">
                    <svg className="w-10 h-10 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <p>{image.alt}</p>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeImage === index ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-black/50 backdrop-blur-md rounded-lg px-4 py-3"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff7e54] mr-2"></div>
                    <span className="text-white font-medium">{image.location}</span>
                  </div>
                  <p className="text-white/80 text-sm">{image.alt}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white rounded-full font-semibold text-lg
                     shadow-lg shadow-[#ff7e54]/20 flex items-center space-x-3"
          >
            <a href="/countdown" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,0a12,12,0,1,0,12,12A12,12,0,0,0,12,0Zm1,15.93A.93.93,0,0,1,12,17a1,1,0,0,1-1-1c0-1.57-.15-2.2-.93-3a3.8,3.8,0,0,1-1.57-3.61,3.5,3.5,0,0,1,7,0,4.2,4.2,0,0,1-1.5,3.68c-.77.8-.77,1.28-.77,3A.93.93,0,0,1,13,15.93ZM12,8.8a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,12,8.8Z"/>
              </svg>
              <span>Connect Pinterest</span>
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-[#ff7e54] text-[#ff7e54] rounded-full font-semibold text-lg
                     hover:bg-[#ff7e54]/10 transition-colors flex items-center space-x-3"
          >
            <a href="/countdown" className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
              <span>Explore Sample Trips</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
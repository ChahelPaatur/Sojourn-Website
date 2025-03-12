import { motion } from 'framer-motion';
import { useState } from 'react';

interface Social {
  type: 'github' | 'instagram';
  url: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: Social[];
  index: number;
}

export default function TeamMember({ name, role, bio, image, social, index }: TeamMemberProps) {
  const [isGlowing, setIsGlowing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, delay: index * 0.2 }
      }}
      viewport={{ once: true }}
      onClick={() => setIsGlowing(true)}
      onAnimationComplete={() => setIsGlowing(false)}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-lg bg-black/20 p-6 cursor-pointer transition-all duration-500
        ${isGlowing ? 'ring-4 ring-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.5)]' : 'ring-1 ring-white/10'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <motion.div
        className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#FFD700] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover relative z-10"
          loading="lazy"
        />
      </motion.div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-[#FFD700] mb-4">{role}</p>
        <p className="text-white/70 mb-6">{bio}</p>
      </div>

      <div className="flex justify-center space-x-4">
        {social.map((link) => (
          <motion.a
            key={link.type}
            href={link.url}
            className="text-white/70 hover:text-[#FFD700] transition-colors relative"
            whileHover={{ scale: 1.1 }}
          >
            {link.type === 'github' ? (
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            )}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
} 
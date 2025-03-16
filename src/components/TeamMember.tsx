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
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if this is Chahel's card
  const isChahel = name === "Chahel Paatur";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, delay: index * 0.2 }
      }}
      viewport={{ once: true }}
      className="card relative"
      style={{
        width: '280px',
        height: '350px',
        background: 'rgba(10, 22, 37, 0.7)',
        borderRadius: '60px',
        padding: '3px',
        position: 'relative',
        boxShadow: 'rgba(96, 75, 74, 0.188) 0px 70px 30px -50px',
        transition: 'all 0.5s ease-in-out',
        margin: '0 auto',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={`mailto:${name.toLowerCase().replace(/\s/g, '')}@sojournapp.com`}
        className="mail"
        style={{
          position: 'absolute',
          right: '2rem',
          top: '1.4rem',
          background: 'transparent',
          border: 'none',
          zIndex: 20
        }}
        whileHover={{ scale: 1.1 }}
      >
        <svg
          className="lucide lucide-mail"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="3"
          stroke="#ff7e54"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect rx="2" y="4" x="2" height="16" width="20"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      </motion.a>

      <motion.div
        className="profile-pic"
        style={{
          position: 'absolute',
          width: isHovered ? '100px' : 'calc(100% - 6px)',
          height: isHovered ? '100px' : 'calc(100% - 6px)',
          top: isHovered ? '10px' : '3px',
          left: isHovered ? '10px' : '3px',
          borderRadius: isHovered ? '50%' : '55px 55px 0 0',
          zIndex: isHovered ? 3 : 1,
          border: isHovered ? '7px solid #ff7e54' : '0px solid #ff7e54',
          overflow: 'hidden',
          boxShadow: isHovered ? 'rgba(96, 75, 74, 0.188) 0px 5px 5px 0px' : 'none',
          transition: 'all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s'
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            // Special positioning for CHAP's picture
            objectPosition: isHovered 
              ? 'center top' 
              : isChahel ? 'center 30%' : 'center center',
            transform: isHovered ? 'scale(1.5)' : 'scale(1.05)',
            transition: 'all 0.5s ease-in-out'
          }}
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      <div
        className="bottom"
        style={{
          position: 'absolute',
          bottom: '3px',
          left: '3px',
          right: '3px',
          // Increased bottom bar height by setting top position to 85% instead of 95%
          top: isHovered ? '20%' : '85%',
          borderRadius: isHovered ? '80px 55px 55px 55px' : '55px',
          zIndex: 2,
          background: '#ff7e54',
          boxShadow: 'rgba(96, 75, 74, 0.188) 0px 5px 5px 0px inset',
          overflow: 'hidden',
          transition: isHovered 
            ? 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s'
            : 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
        }}
      >
        <div
          className="content"
          style={{
            position: 'absolute',
            bottom: isHovered ? 'auto' : '0',
            top: isHovered ? '55px' : 'auto',
            left: '1.5rem',
            right: '1.5rem',
            height: 'auto',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-in-out',
            pointerEvents: isHovered ? 'auto' : 'none'
          }}
        >
          <span
            className="name"
            style={{
              display: 'block',
              fontSize: '1.1rem',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '0.4rem'
            }}
          >
            {name}
          </span>
          <span
            className="about-me"
            style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'white'
            }}
          >
            {role}
          </span>
        </div>

        <div
          className="bottom-bottom"
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div
            className="social-links-container"
            style={{
              display: 'flex',
              gap: '1rem'
            }}
          >
            {social.map((link) => (
              <motion.a
                key={link.type}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
              >
                {link.type === 'github' ? (
                  <svg 
                    viewBox="0 0 496 512" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: '18px',
                      fill: 'white',
                      filter: 'drop-shadow(0 5px 5px rgba(165, 132, 130, 0.133))'
                    }}
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                ) : (
                  <svg 
                    viewBox="0 0 16 15.999" 
                    height="18" 
                    width="18" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fill: 'white',
                      filter: 'drop-shadow(0 5px 5px rgba(165, 132, 130, 0.133))'
                    }}
                  >
                    <path
                      transform="translate(6 598)"
                      d="M6-582H-2a4,4,0,0,1-4-4v-8a4,4,0,0,1,4-4H6a4,4,0,0,1,4,4v8A4,4,0,0,1,6-582ZM2-594a4,4,0,0,0-4,4,4,4,0,0,0,4,4,4,4,0,0,0,4-4A4.005,4.005,0,0,0,2-594Zm4.5-2a1,1,0,0,0-1,1,1,1,0,0,0,1,1,1,1,0,0,0,1-1A1,1,0,0,0,6.5-596ZM2-587.5A2.5,2.5,0,0,1-.5-590,2.5,2.5,0,0,1,2-592.5,2.5,2.5,0,0,1,4.5-590,2.5,2.5,0,0,1,2-587.5Z"
                      data-name="Subtraction 4"
                      id="Subtraction_4"
                    ></path>
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
          
          <motion.button
            className="button"
            style={{
              background: 'white',
              color: '#ff7e54',
              border: 'none',
              borderRadius: '50px',
              fontSize: '0.55rem',
              padding: '0.4rem 0.8rem',
              boxShadow: 'rgba(165, 132, 130, 0.133) 0px 5px 5px 0px',
              cursor: 'pointer'
            }}
            whileHover={{ 
              backgroundColor: '#f55d56',
              color: 'white'
            }}
          >
            Contact Me
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 
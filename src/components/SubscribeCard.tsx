import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SubscribeCardProps {
  title: string;
  subtitle: string;
  bannerText: string;
  bannerHoverText: string;
  buttonText: string;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({
  title,
  subtitle = "Get personalized travel plans and exclusive deals delivered to your inbox.",
  bannerText,
  bannerHoverText,
  buttonText = "Join",
}) => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Send to the backend API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          timestamp: new Date().toISOString(), // Add timestamp for admin display
          source: 'newsletter_signup'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }
      
      // Successfully added to admin dashboard
      setIsSubmitted(true);
      setEmail('');
      
      // Optional: Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'newsletter'
        });
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -10, rotateY: 5 }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 16px 70px -12px rgba(255, 126, 84, 0.25)",
        rotateY: -2,
        translateY: -8
      }}
      className="card-container w-full max-w-xl mx-auto relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff7e54] via-[#cf4b6c] to-[#ff7e54] opacity-40 blur-sm" />
      
      <div className="relative bg-[#0e1a2b]/90 backdrop-blur-md p-10 border-2 border-[#ff7e54]/50 min-h-[420px] flex flex-col z-10">
        {/* Banner in the corner */}
        <div className="absolute -top-2 -right-12 w-48 h-10 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] rotate-45 flex items-center justify-center text-white font-bold shadow-lg z-20 overflow-hidden">
          <motion.span 
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -30 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            {bannerText}
          </motion.span>
          <motion.span 
            initial={{ y: 30 }}
            animate={{ y: isHovered ? 0 : 30 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            {bannerHoverText}
          </motion.span>
        </div>
        
        {/* Random line decorations in the background */}
        <div className="absolute left-0 top-1/4 w-2/3 h-px bg-[#ff7e54]/20"></div>
        <div className="absolute right-0 top-2/3 w-2/3 h-px bg-[#cf4b6c]/20"></div>
        <div className="absolute left-1/4 top-0 w-px h-1/2 bg-[#ff7e54]/20"></div>
        <div className="absolute right-3/4 bottom-0 w-px h-2/3 bg-[#cf4b6c]/20"></div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#ff7e54]/5 blur-2xl"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#cf4b6c]/5 blur-2xl"></div>
        
        <h3 className="text-3xl font-bold text-white mb-4 relative">
          <span className="relative z-10">{title}</span>
          <span className="absolute -left-2 top-0 w-10 h-10 bg-[#ff7e54]/10 rounded-full blur-xl"></span>
        </h3>
        
        <p className="text-white/70 mb-8 text-lg">{subtitle}</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col mt-auto space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSubmitted}
              className="w-full p-4 bg-[#081221]/80 border border-[#ff7e54]/30 text-white/90 rounded-md focus:outline-none focus:border-[#ff7e54] focus:ring-1 focus:ring-[#cf4b6c] transition-all text-lg"
            />
            
            {/* Visual element */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border border-[#ff7e54]/50"></div>
          </div>
          
          {error && (
            <p className="text-[#ff5454] text-sm">{error}</p>
          )}
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-[#081221]/70 border border-[#ff7e54]/30 rounded-md text-center"
            >
              <p className="text-[#ff7e54] font-medium">
                Thanks for subscribing! Check your inbox soon.
              </p>
            </motion.div>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white font-medium rounded-md text-lg hover:shadow-lg hover:shadow-[#ff7e54]/20 transition-all ${isSubmitting ? 'opacity-70' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                buttonText
              )}
            </motion.button>
          )}
          
          <p className="text-[#ff7e54]/50 text-sm text-center mt-4">
            Embrace the journey. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default SubscribeCard; 
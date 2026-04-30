import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useEffect } from 'react';

export default function RoyalCrest() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="flex justify-center mb-12 perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.05 }}
        className="relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center cursor-default group"
      >

        {/* Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ 
            opacity: 1, 
            scale: 1.2,
            transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
          }}
          className="absolute inset-0 bg-wedding-gold/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Shadow Layer */}
        <div 
          className="absolute inset-0 bg-black/40 rounded-full blur-2xl translate-z-[-20px]" 
          style={{ transform: 'translateZ(-20px)' }}
        />

        {/* Outer Ring */}
        <motion.div 
          whileHover={{ 
            boxShadow: "0 0 40px rgba(212,175,55,0.8)",
            borderColor: "rgba(212,175,55,1)"
          }}
          className="absolute inset-0 border-4 border-wedding-gold/60 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300" 
        />
        
        {/* Inner Plate */}
        <div className="absolute inset-2 bg-stone-900 border-2 border-wedding-gold/40 rounded-full flex items-center justify-center overflow-hidden">
          {/* Shimmer Effect */}
          <motion.div 
            animate={{ x: [-200, 200] }}
            whileHover={{ transition: { duration: 1, repeat: Infinity, ease: "linear" } }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />
          
          <div className="relative w-full h-full p-1">
            <img 
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"
              alt="Bride and Groom"
              className="w-full h-full object-cover rounded-full z-10 select-none grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-full z-20 pointer-events-none" />
          </div>
        </div>

        {/* Decorative Ornaments (3D-ish) */}
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-wedding-gold/80"
          style={{ transform: 'translateZ(20px)' }}
        >
          <svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor">
             <path d="M20 0C25 8 35 10 40 10V12C35 12 25 10 20 18C15 10 5 12 0 12V10C5 10 15 8 20 0Z" />
          </svg>
        </div>

        {/* Orbiting Elements (Crezy!) */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
                z: [-20, 20, -20]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
              className="absolute top-0 left-1/2 w-2 h-2 bg-wedding-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              style={{ transform: 'translateX(-50%) translateZ(40px)' }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

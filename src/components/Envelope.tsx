import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MousePointer2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeProps {
  onOpen: () => void;
  lang: 'en' | 'hi';
}

export default function Envelope({ onOpen, lang }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const handleOpen = () => {
    if (hasClicked) return;
    setHasClicked(true);
    
    // Trigger celebratory confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#d4af37', '#ffffff', '#aa8439']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#d4af37', '#ffffff', '#aa8439']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Sequence the reveal
    setTimeout(() => {
      setIsOpening(true);
      setTimeout(onOpen, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-deep p-4 overflow-hidden">
      {/* Background Ambient Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)]"
      />

      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative cursor-pointer group flex flex-col items-center justify-center h-full w-full"
            onClick={handleOpen}
          >
            {/* The Sacred Mandala Bloom */}
            <div className="relative w-64 h-64 sm:w-[380px] sm:h-[380px] flex items-center justify-center">
              
              {/* Outer Ring - Counter Clockwise */}
              <motion.div
                animate={hasClicked ? { scale: 1.5, opacity: 0, rotate: -180 } : { rotate: -360 }}
                transition={hasClicked ? { duration: 1 } : { duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-40"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-wedding-gold fill-none">
                  <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  {[...Array(24)].map((_, i) => (
                    <path
                      key={i}
                      d="M50 2 L52 8 L50 14 L48 8 Z"
                      fill="currentColor"
                      transform={`rotate(${i * 15} 50 50)`}
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Middle Ring - Clockwise */}
              <motion.div
                animate={hasClicked ? { scale: 1.8, opacity: 0, rotate: 180 } : { rotate: 360 }}
                transition={hasClicked ? { duration: 1.2 } : { duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 opacity-60"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-wedding-gold fill-none">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
                  {[...Array(12)].map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                      <circle cx="50" cy="18" r="4" fill="currentColor" opacity="0.5" />
                      <path d="M50 10 Q55 15 50 20 Q45 15 50 10" fill="currentColor" />
                    </g>
                  ))}
                </svg>
              </motion.div>

              {/* Inner Mandala Core */}
              <motion.div
                animate={hasClicked ? { scale: 2.2, opacity: 0 } : { scale: [1, 1.05, 1] }}
                transition={hasClicked ? { duration: 0.8 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-16 sm:inset-24 flex items-center justify-center z-10"
              >
                <div className="w-full h-full bg-wedding-gold rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] border-2 border-stone-800 transition-transform duration-500">
                  <span className="font-serif text-sm sm:text-lg font-bold uppercase tracking-[0.2em] text-white drop-shadow-lg text-center px-4 leading-tight">
                    {lang === 'en' ? 'Tap to open' : 'खोलने के लिए टैप करें'}
                  </span>
                </div>
              </motion.div>

              {/* Interactive Pulse Rings */}
              <AnimatePresence>
                {!hasClicked && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border border-wedding-gold rounded-full"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 border border-wedding-gold/30 rounded-full"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Tap Instructions */}
            <motion.div 
              animate={hasClicked ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <h2 className="font-serif italic text-wedding-gold text-2xl sm:text-4xl tracking-widest mb-4">
                {lang === 'en' ? 'Eternal Ties' : 'अनंत बंधन'}
              </h2>
              <div className="flex items-center justify-center gap-4 text-wedding-accent/70 uppercase tracking-[0.5em] text-[10px] sm:text-xs">
                 <span className="w-12 h-px bg-wedding-gold/30"></span>
                 {lang === 'en' ? 'Touch to Bloom' : 'खिलने के लिए स्पर्श करें'}
                 <span className="w-12 h-px bg-wedding-gold/30"></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpening && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-wedding-deep"
        />
      )}
    </div>
  );
}

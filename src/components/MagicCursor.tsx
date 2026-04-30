import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  isPetal?: boolean;
}

export default function MagicCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback((x: number, y: number, isPetal = false) => {
    const id = Date.now() + Math.random();
    const newSparkle: Sparkle = {
      id,
      x,
      y,
      size: isPetal ? Math.random() * 15 + 10 : Math.random() * 8 + 4,
      color: isPetal 
        ? (Math.random() > 0.5 ? '#ec4899' : '#f472b6') 
        : (Math.random() > 0.5 ? '#d4af37' : '#ffffff'),
      isPetal
    };
    setSparkles((prev) => [...prev.slice(-40), newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, isPetal ? 2000 : 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => addSparkle(e.clientX, e.clientY);
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => addSparkle(e.clientX, e.clientY, true), i * 50);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [addSparkle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              opacity: 1, 
              scale: 0, 
              rotate: 0,
              x: sparkle.isPetal ? (Math.random() * 100 - 50) : 0,
              y: sparkle.isPetal ? (Math.random() * 100 - 50) : 0
            }}
            animate={{ 
              opacity: 0, 
              scale: sparkle.isPetal ? 1.5 : 1.2, 
              rotate: 360, 
              y: sparkle.y + (sparkle.isPetal ? 200 : 50),
              x: sparkle.x + (sparkle.isPetal ? (Math.random() * 200 - 100) : 0)
            }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              borderRadius: sparkle.isPetal ? '10px 0 10px 0' : '50%',
              boxShadow: `0 0 10px ${sparkle.color}`,
              filter: sparkle.isPetal ? 'blur(1px)' : 'none'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

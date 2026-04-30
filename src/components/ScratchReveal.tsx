import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchRevealProps {
  children: React.ReactNode;
  onReveal?: () => void;
  lang: 'en' | 'hi';
}

export default function ScratchReveal({ children, onReveal, lang }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [revealPercentage, setRevealPercentage] = useState(0);
  const revealTriggeredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
        const container = containerRef.current;
        if (container) {
            const size = Math.min(container.clientWidth, container.clientHeight, 500);
            canvas.width = size;
            canvas.height = size;
            initCanvas();
        }
    };

    const initCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const size = Math.min(canvas.width, canvas.height) * 0.45;

        ctx.save();
        ctx.beginPath();
        // More precise heart shape
        ctx.moveTo(centerX, centerY + size * 0.7);
        ctx.bezierCurveTo(centerX - size * 1.1, centerY - size * 0.4, centerX - size * 0.6, centerY - size * 1.1, centerX, centerY - size * 0.3);
        ctx.bezierCurveTo(centerX + size * 0.6, centerY - size * 1.1, centerX + size * 1.1, centerY - size * 0.4, centerX, centerY + size * 0.7);
        ctx.closePath();
        
        ctx.fillStyle = '#991b1b';
        ctx.fill();

        // Aesthetic petals texture
        for (let i = 0; i < 3000; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * size * 1.3;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            if (isPointInHeart(x, y, centerX, centerY, size)) {
                // Variation in red/pink/ruby
                const r = 150 + Math.random() * 80;
                const g = 20 + Math.random() * 40;
                const b = 20 + Math.random() * 40;
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                
                ctx.beginPath();
                // Randomly sized petals
                const petalWidth = 2 + Math.random() * 5;
                const petalHeight = 1 + Math.random() * 3;
                ctx.ellipse(x, y, petalWidth, petalHeight, Math.random() * Math.PI, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glitter/shimmer
                if (Math.random() > 0.97) {
                    ctx.fillStyle = i % 2 === 0 ? '#ffd700' : '#ffffff'; // Gold or white
                    ctx.beginPath();
                    ctx.arc(x, y, 0.4 + Math.random() * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        ctx.restore();
    };

    const isPointInHeart = (x: number, y: number, cx: number, cy: number, size: number) => {
        const dx = (x - cx) / (size * 1.1);
        const dy = -(y - (cy + size * 0.2)) / (size * 1.1);
        return (dx * dx + dy * dy - 1) ** 3 - dx * dx * dy * dy * dy <= 0;
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const triggerReveal = () => {
    if (revealTriggeredRef.current) return;
    revealTriggeredRef.current = true;
    
    setIsRevealed(true);
    
    // Confetti effect
    const end = Date.now() + 2 * 1000;
    const colors = ['#d4af37', '#ffffff', '#dc2626'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    if (onReveal) onReveal();
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    calculatePercentage();
  };

  const calculatePercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    let totalNonTransparent = 0;

    // Only count pixels in the heart area
    for (let i = 3; i < pixels.length; i += 4) {
      // In destination-out mode, scratched areas are transparent (alpha 0)
      if (pixels[i] === 0) transparentPixels++;
      totalNonTransparent++; // Simplifying here, ideally only count heart pixels
    }

    const percentage = (transparentPixels / totalNonTransparent) * 100;
    // Lower threshold for "starting" reveal because we only care about the center part mostly
    if (percentage > 15 && !revealTriggeredRef.current) {
      triggerReveal();
    }
    setRevealPercentage(percentage);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching || isRevealed) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  return (
    <div className="relative group flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
      >
        <AnimatePresence>
          {isRevealed && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="absolute inset-0 flex items-center justify-center p-12 text-center z-10"
             >
               {children}
             </motion.div>
          )}
        </AnimatePresence>

        <canvas
          ref={canvasRef}
          onPointerDown={() => setIsScratching(true)}
          onPointerUp={() => setIsScratching(false)}
          onPointerLeave={() => setIsScratching(false)}
          onPointerMove={handlePointerMove}
          className={cn(
            "absolute inset-0 cursor-crosshair transition-all duration-1000 touch-none z-20",
            isRevealed ? "opacity-0 scale-110 pointer-events-none blur-xl" : "opacity-100"
          )}
        />
      </div>

      <AnimatePresence>
        {!isRevealed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-col items-center"
          >
            <p className="text-wedding-gold tracking-[0.2em] uppercase text-xs sm:text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              {lang === 'en' ? 'Brush the petals to reveal' : 'सामने लाने के लिए पंखुड़ियों को ब्रश करें'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

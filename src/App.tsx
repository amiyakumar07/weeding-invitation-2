/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Clock, Heart, Moon, Sun, Languages, Sparkles, Music, Volume2, VolumeX } from 'lucide-react';
import Envelope from './components/Envelope';
import Countdown from './components/Countdown';
import RSVPForm from './components/RSVPForm';
import ScratchReveal from './components/ScratchReveal';
import MagicCursor from './components/MagicCursor';
import FallingPetals from './components/FallingPetals';
import RoyalCrest from './components/RoyalCrest';
import { WEDDING_DATA } from './constants';
import { Language } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const audioUrl = "https://www.image2url.com/r2/default/audio/1777528308160-be53ade2-8719-4acd-92a2-a04de121d3cb.mp3"; 

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      if (isAudioMuted) {
        audio.pause();
      } else {
        audio.play().catch(e => console.log("Audio play blocked", e));
      }
    }
  }, [isAudioMuted]);

  useEffect(() => {
    if (isOpen && !isAudioMuted) {
      const audio = document.getElementById('bg-music') as HTMLAudioElement;
      if (audio) audio.play().catch(e => console.log("Audio play blocked", e));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const data = WEDDING_DATA;

  const toggleLanguage = () => setLang(l => l === 'en' ? 'hi' : 'en');

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 selection:bg-wedding-gold/30 bg-wedding-deep text-stone-100 relative overflow-x-hidden"
    )}>
      <audio id="bg-music" loop src={audioUrl} />
      <MagicCursor />
      <FallingPetals />
      
      {/* Scroll Progress Bar */}
      <div className="fixed right-2 top-0 bottom-0 w-1 z-[60] py-20 pointer-events-none hidden sm:block">
        <div className="h-full w-full bg-wedding-gold/10 rounded-full relative overflow-hidden">
          <motion.div 
            style={{ height: `${scrollProgress}%` }}
            className="w-full bg-wedding-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" 
          />
        </div>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <Envelope onOpen={() => setIsOpen(true)} lang={lang} />
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative"
        >
          {/* Decorative floating elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
             {/* Dynamic Starfield */}
             {[...Array(50)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  animate={{
                    opacity: [0.1, 0.5, 0.1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
             ))}

             {/* Royal Lanterns */}
             {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`lantern-${i}`}
                  initial={{ 
                    y: '110vh', 
                    x: `${Math.random() * 100}vw`,
                    opacity: 0,
                    scale: 0.5 + Math.random() * 0.5
                  }}
                  animate={{ 
                    y: '-10vh',
                    opacity: [0, 0.4, 0.4, 0],
                    x: [
                      `${Math.random() * 100}vw`, 
                      `${Math.random() * 100}vw`
                    ]
                  }}
                  transition={{ 
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 20,
                    ease: "linear"
                  }}
                  className="absolute z-0"
                >
                   <div className="w-6 h-8 sm:w-10 sm:h-14 bg-wedding-gold/30 rounded-t-full rounded-b-lg border border-wedding-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.4)] relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-4 sm:w-4 sm:h-8 bg-wedding-gold animate-pulse rounded-full blur-[2px]" />
                   </div>
                </motion.div>
             ))}

             {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  animate={{
                    y: [0, -1200],
                    x: [0, Math.sin(i) * 150],
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 15 + i * 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 3
                  }}
                  className="absolute bottom-[-200px] opacity-[0.07]"
                  style={{ left: `${(i + 1) * 12}%` }}
                >
                   <Heart className="text-wedding-gold w-12 h-12 fill-wedding-gold" />
                </motion.div>
             ))}
          </div>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-4 py-20 relative z-10">
            
            {/* Controls */}
            <div className="fixed top-6 right-6 z-40 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="p-4 rounded-full bg-stone-800/80 backdrop-blur-md border border-wedding-gold/20 shadow-lg hover:scale-110 transition-transform active:scale-95"
                title={isAudioMuted ? "Unmute" : "Mute"}
              >
                {isAudioMuted ? <VolumeX className="w-5 h-5 text-wedding-gold" /> : <Volume2 className="w-5 h-5 text-wedding-gold animate-pulse text-wedding-gold" />}
              </button>
              <button
                onClick={toggleLanguage}
                className="p-4 rounded-full bg-stone-800/80 backdrop-blur-md border border-wedding-gold/20 shadow-lg hover:scale-110 transition-transform active:scale-95"
                title="Switch Language"
              >
                <Languages className="w-5 h-5 text-wedding-gold" />
              </button>
            </div>

            {/* Hero Section */}
            <section className="text-center mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <RoyalCrest />
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-px bg-wedding-gold/40 self-center"></div>
                  <Heart className="mx-6 text-wedding-gold w-8 h-8 fill-wedding-gold/10" />
                  <div className="w-24 h-px bg-wedding-gold/40 self-center"></div>
                </div>
                
                <h1 className="text-7xl sm:text-[11rem] font-serif mb-8 text-white leading-none drop-shadow-2xl">
                  {lang === 'en' ? data.couple.brideName : data.couple.brideNameHi}
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="block italic text-wedding-gold text-5xl sm:text-8xl my-6"
                  >
                    &
                  </motion.span>
                  {lang === 'en' ? data.couple.groomName : data.couple.groomNameHi}
                </h1>
                
                <p className="text-wedding-accent tracking-[0.3em] uppercase text-sm sm:text-base font-medium mb-12">
                   {lang === 'en' ? 'Are getting married' : 'शादी के बंधन में बंध रहे हैं'}
                </p>
                
                <Countdown targetDate={data.countdownDate} lang={lang} />
                
                <div className="mt-16 mb-24">
                  <ScratchReveal lang={lang}>
                    <div className="space-y-6">
                      <p className="text-xs tracking-[0.3em] uppercase text-wedding-accent font-semibold">
                        {lang === 'en' ? 'Join us to celebrate' : 'उत्सव मनाने के लिए हमारे साथ जुड़ें'}
                      </p>
                      <p className="font-serif text-2xl sm:text-3xl leading-relaxed text-stone-200">
                        {lang === 'en' 
                          ? 'We joyfully invite you to witness the beginning of our forever' 
                          : 'हम आपको हमारी अनंत यात्रा की शुरुआत के साक्षी बनने के लिए खुशी-खुशी आमंत्रित करते हैं'}
                      </p>
                      <div className="h-px bg-wedding-gold/40 w-16 mx-auto"></div>
                      <p className="font-serif text-4xl text-wedding-gold italic">
                        {lang === 'en' ? '14 December 2026' : '14 दिसंबर 2026'}
                      </p>
                    </div>
                  </ScratchReveal>
                </div>

                <div className="mt-12 flex flex-col items-center gap-6">
                   <a 
                    href="#rsvp"
                    className="px-10 py-4 bg-transparent border border-wedding-gold text-wedding-gold rounded-full font-serif text-lg hover:bg-wedding-gold hover:text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] relative overflow-hidden group active:scale-95"
                   >
                     {lang === 'en' ? 'Join the Celebration' : 'उत्सव में शामिल हों'}
                   </a>

                </div>
              </motion.div>
            </section>

            {/* Story Section */}
            <section className="mb-40 text-center relative px-4">
               <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-wedding-gold/5 rounded-full blur-3xl" />
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24 mb-16">
                  {/* Bride */}
                  <motion.div 
                    initial={{ opacity: 0, x: -100, rotate: -20 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="flex flex-col items-center gap-6 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-wedding-gold/20 rounded-full blur-2xl group-hover:bg-wedding-gold/40 transition-colors" />
                      <div className="w-44 h-44 sm:w-64 sm:h-64 rounded-full border-2 border-wedding-gold/60 p-2 relative bg-wedding-deep">
                         <img 
                          src="https://images.unsplash.com/photo-1549417229-aa67d3263c39?q=80&w=2070&auto=format&fit=crop" 
                          alt="Bride" 
                          className="w-full h-full object-cover rounded-full filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                         />
                      </div>
                    </div>
                    <p className="font-serif text-3xl text-wedding-gold italic drop-shadow-md">
                      {lang === 'en' ? data.couple.brideName : data.couple.brideNameHi}
                    </p>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  >
                    <Heart className="text-wedding-gold w-12 h-12 hidden sm:block drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                  </motion.div>

                  {/* Groom */}
                  <motion.div 
                    initial={{ opacity: 0, x: 100, rotate: 20 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="flex flex-col items-center gap-6 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-wedding-gold/20 rounded-full blur-2xl group-hover:bg-wedding-gold/40 transition-colors" />
                      <div className="w-44 h-44 sm:w-64 sm:h-64 rounded-full border-2 border-wedding-gold/60 p-2 relative bg-wedding-deep">
                         <img 
                          src="https://images.unsplash.com/photo-1520156555182-1209b5523450?q=80&w=2070&auto=format&fit=crop" 
                          alt="Groom" 
                          className="w-full h-full object-cover rounded-full filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                         />
                      </div>
                    </div>
                    <p className="font-serif text-3xl text-wedding-gold italic drop-shadow-md">
                      {lang === 'en' ? data.couple.groomName : data.couple.groomNameHi}
                    </p>
                  </motion.div>
               </div>

               <h2 className="text-4xl font-serif mb-8 italic">
                  {lang === 'en' ? 'Our Love Story' : 'हमारी कहानी'}
               </h2>
               <p className="max-w-2xl mx-auto text-lg leading-relaxed text-wedding-accent serif font-light italic">
                  "{lang === 'en' ? data.couple.story : data.couple.storyHi}"
               </p>
            </section>

            {/* Events Section */}
            <section className="mb-40">
               <h2 className="text-4xl font-serif text-center mb-16 underline underline-offset-8 decoration-wedding-gold/30">
                  {lang === 'en' ? 'Event Details' : 'कार्यक्रम का विवरण'}
               </h2>
               <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {data.events.map((event, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className={cn(
                        "p-8 rounded-3xl border border-wedding-gold/10 relative overflow-hidden group bg-stone-800/50 shadow-xl"
                      )}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-wedding-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125" />
                      
                      <h3 className="text-2xl font-serif text-wedding-gold mb-6">
                        {lang === 'en' ? event.name : event.nameHi}
                      </h3>
                      
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-wedding-gold" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-wedding-gold" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-wedding-gold shrink-0 mt-1" />
                          <span>{lang === 'en' ? event.venue : event.venueHi}</span>
                        </div>
                      </div>
                      
                      <a 
                        href={event.googleMapsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-wedding-gold/10 border border-wedding-gold/30 rounded-xl text-[10px] uppercase tracking-widest text-wedding-gold font-bold hover:bg-wedding-gold hover:text-white transition-all shadow-lg active:scale-95"
                      >
                         <MapPin className="w-3 h-3" />
                         {lang === 'en' ? 'Get Directions' : 'दिशा-निर्देश प्राप्त करें'}
                      </a>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* Gallery Section */}
            <section className="mb-40">
               <h2 className="text-4xl font-serif text-center mb-16">
                  {lang === 'en' ? 'Our Moments' : 'हमारी यादें'}
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.galleryImages.map((img, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="relative aspect-square overflow-hidden rounded-3xl"
                    >
                      <img 
                        src={img.url} 
                        alt={img.caption} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm tracking-widest uppercase">{img.caption}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* RSVP Section */}
            <section className="mb-40" id="rsvp">
              <RSVPForm lang={lang} />
            </section>

            {/* Footer */}
            <footer className="text-center py-20 border-t border-wedding-gold/10">
               <p className="font-serif text-3xl text-wedding-gold mb-4 italic">Riya & Aman</p>
               <p className="text-wedding-accent text-xs uppercase tracking-[0.4em] mb-12">
                  {lang === 'en' ? 'Happily Ever After' : 'खुशी-खुशी हमेशा के लिए'}
               </p>
               <div className="flex justify-center gap-6">
                  <div className="w-10 h-px bg-wedding-gold/20 self-center"></div>
                  <div className="w-3 h-3 rounded-full bg-wedding-gold/20"></div>
                  <div className="w-10 h-px bg-wedding-gold/20 self-center"></div>
               </div>
            </footer>

          </main>
        </motion.div>
      )}
    </div>
  );
}

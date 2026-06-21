import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import GalleryCanvas from './GalleryCanvas';
import { ChevronDown, Sparkles } from 'lucide-react';
import '../cinematic-enhancements.css';

export const HeroSectionEnhanced: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <GalleryCanvas />
      </div>

      {/* Aurora Background */}
      <div className="absolute inset-0 z-[1] aurora-background pointer-events-none"></div>

      {/* Gradient Vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"></div>

      {/* Top Accent Line */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(0,102,255,0.5)]"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Brand Badge */}
      <motion.div
        className="absolute top-28 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 glass-morphism rounded-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-blue-300 text-xs uppercase tracking-[0.3em] font-bold">
          Premium Portfolio
        </span>
        <Sparkles className="w-4 h-4 text-blue-400" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Kinetic Typography Heading */}
        <motion.div className="mb-6 text-center">
          <h1
            className="text-7xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 40px rgba(0,102,255,0.3), 0 0 80px rgba(0,102,255,0.1)',
            }}
          >
            {'ORTECH'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + i * 0.08,
                  type: 'spring',
                  stiffness: 120,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.3,
                  color: ['#0066FF', '#7C3AED', '#10B981', '#F59E0B'][i % 4],
                  transition: { duration: 0.2 },
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* 3D Parallax Subtitle */}
        <motion.div
          className="mb-12 text-center max-w-2xl"
          style={{
            transform: `translateX(${mousePosition.x * 8}px) translateY(${mousePosition.y * 8}px)`,
            transition: 'transform 0.1s ease-out',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p
            className="text-2xl md:text-3xl text-blue-200 font-light tracking-wide italic mb-4"
            style={{ textShadow: '0 0 30px rgba(0,102,255,0.2)' }}
          >
            "Simplicity in Excellence"
          </p>
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="w-16 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, #0066FF)',
                boxShadow: '0 0 10px rgba(0,102,255,0.5)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
            <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">Digital Innovation</p>
            <motion.div
              className="w-16 h-[1px]"
              style={{
                background: 'linear-gradient(270deg, transparent, #0066FF)',
                boxShadow: '0 0 10px rgba(0,102,255,0.5)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            className="group relative px-8 py-4 text-white font-semibold uppercase tracking-widest text-sm overflow-hidden glass-morphism rounded-lg"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors rounded-lg"></div>
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300 rounded-lg"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 -z-10 rounded-lg"></div>
            <span className="relative flex items-center gap-3">
              Explore Portfolio
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>
          <motion.button
            className="group relative px-8 py-4 text-blue-300 font-semibold uppercase tracking-widest text-sm glass-morphism rounded-lg"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="absolute inset-0 border-2 border-blue-500/30 group-hover:border-blue-400/50 transition-colors rounded-lg"></div>
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 rounded-lg"></div>
            <span className="relative">View Work</span>
          </motion.button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {['3D Interactive', 'Luxury Design', 'Fluid Motion'].map((feature, i) => (
            <motion.div
              key={i}
              className="px-4 py-2 border border-blue-500/20 rounded-full bg-blue-500/5 text-blue-300 text-xs uppercase tracking-widest backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.15, type: 'spring' }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(0,102,255,0.6)' }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating 3D Parallax Elements */}
      {[
        { text: 'Innovation', className: 'top-1/3 left-12 text-blue-500/15', delay: 0 },
        { text: 'Excellence', className: 'bottom-1/3 right-12 text-purple-500/15', delay: 1 },
        { text: 'Digital', className: 'top-2/3 left-1/4 text-emerald-500/10', delay: 2 },
      ].map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.className} text-sm uppercase tracking-[0.4em] font-bold pointer-events-none select-none`}
          style={{
            transform: `translateX(${mousePosition.x * (i + 1) * 10}px) translateY(${mousePosition.y * (i + 1) * 10}px)`,
            transition: 'transform 0.15s ease-out',
          }}
          animate={{
            y: [0, (i % 2 === 0 ? -15 : 15), 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: el.delay }}
        >
          {el.text}
        </motion.div>
      ))}

      {/* Scroll Indicator */}
      <motion.div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-500 ${isScrolling ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        animate={{ y: isScrolling ? 20 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400/50">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-blue-500/50" />
        </motion.div>
        <motion.div
          className="w-8 h-8 rounded-full border border-blue-500/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSectionEnhanced;

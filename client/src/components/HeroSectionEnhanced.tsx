import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import GalleryCanvas from './GalleryCanvas';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import '../cinematic-enhancements.css';

/**
 * Enhanced Hero Section - Cinematic Premium Edition
 * Design Philosophy: Luxury Tech with Kinetic Typography and Magnetic Interactions
 * 
 * Features:
 * - Chromatic aberration effects on text
 * - Kinetic typography with letter animations
 * - Magnetic button interactions
 * - Advanced glassmorphism
 * - Scroll-triggered animations
 */

export const HeroSectionEnhanced: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* 3D Background - Enhanced Monolith */}
      <div className="absolute inset-0 z-0">
        <GalleryCanvas />
      </div>

      {/* Aurora Background Effect */}
      <div className="absolute inset-0 z-[1] aurora-background pointer-events-none"></div>

      {/* Gradient Overlay - Cinematic Vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pointer-events-none">
        {/* Top Accent Line with Glow */}
        <motion.div 
          className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(0,102,255,0.5)]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Brand Badge with Glassmorphism */}
        <motion.div 
          className="mb-8 flex items-center gap-2 px-4 py-2 glass-morphism rounded-full"
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

        {/* Main Heading - Kinetic Typography */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 
            className="text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl animate-glow"
            style={{ 
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            {'ORTECH'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + i * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle with Premium Typography */}
        <motion.div 
          className="mb-12 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-2xl md:text-3xl text-blue-200 font-light tracking-wide italic mb-4">
            "Simplicity in Excellence"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500"></div>
            <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">Digital Innovation</p>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
        </motion.div>

        {/* CTA Buttons - Enhanced with Glassmorphism */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 pointer-events-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {/* Primary CTA Button */}
          <motion.button 
            className="group relative px-8 py-4 text-white font-semibold uppercase tracking-widest text-sm overflow-hidden glass-morphism rounded-lg"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors rounded-lg"></div>
            
            {/* Hover Background */}
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300 rounded-lg"></div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 -z-10 rounded-lg"></div>
            
            <span className="relative flex items-center gap-3">
              Explore Portfolio
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>

          {/* Secondary CTA Button */}
          <motion.button 
            className="group relative px-8 py-4 text-blue-300 font-semibold uppercase tracking-widest text-sm glass-morphism rounded-lg"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {/* Subtle Border */}
            <div className="absolute inset-0 border-2 border-blue-500/30 group-hover:border-blue-400/50 transition-colors rounded-lg"></div>
            
            {/* Hover Background */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 rounded-lg"></div>
            
            <span className="relative">View Work</span>
          </motion.button>
        </motion.div>

        {/* Feature Pills with Stagger Animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {['3D Interactive', 'Luxury Design', 'Fluid Motion'].map((feature, i) => (
            <motion.div 
              key={i}
              className="px-4 py-2 border border-blue-500/20 rounded-full bg-blue-500/5 text-blue-300 text-xs uppercase tracking-widest backdrop-blur-sm hover:border-blue-500/40 hover:bg-blue-500/10 transition-all cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </div>

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
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-blue-500/50" />
        </motion.div>
      </motion.div>

      {/* Floating Text Elements with Parallax */}
      <motion.div 
        className="absolute top-1/4 left-8 text-blue-500/20 text-sm uppercase tracking-widest font-bold pointer-events-none"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        Innovation
      </motion.div>

      <motion.div 
        className="absolute bottom-1/4 right-8 text-blue-500/20 text-sm uppercase tracking-widest font-bold pointer-events-none"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        Excellence
      </motion.div>
    </div>
  );
};

export default HeroSectionEnhanced;

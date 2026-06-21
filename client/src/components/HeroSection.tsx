import React, { useEffect, useRef, useState } from 'react';
import GalleryCanvas from './GalleryCanvas';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

/**
 * Hero Section - Luxury Tech Premium Edition
 * Design Philosophy: Minimalist Elegance with Maximum Impact
 * - Floating Crystalline Monolith as centerpiece
 * - Premium typography and spacing
 * - Fluid interactions and cinematic transitions
 */

export const HeroSection: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Background - Luxury Monolith */}
      <div className="absolute inset-0 z-0">
        <GalleryCanvas />
      </div>

      {/* Gradient Overlay - Subtle Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pointer-events-none">
        {/* Top Accent Line */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        {/* Brand Badge */}
        <div className="mb-8 flex items-center gap-2 text-blue-300 text-xs uppercase tracking-[0.3em] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Premium Portfolio</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Main Heading */}
        <h1 
          className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter text-center drop-shadow-2xl"
          style={{ 
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 40px rgba(0, 102, 255, 0.3)'
          }}
        >
          ORTECH
        </h1>

        {/* Subtitle with Premium Typography */}
        <div className="mb-12 text-center max-w-2xl">
          <p className="text-2xl md:text-3xl text-blue-200 font-light tracking-wide italic mb-4">
            "Simplicity in Excellence"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-500"></div>
            <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">Digital Innovation</p>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto mb-16">
          <button className="group relative px-8 py-4 text-white font-semibold uppercase tracking-widest text-sm overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 border border-blue-500/50 group-hover:border-blue-400 transition-colors"></div>
            
            {/* Hover Background */}
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300"></div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10"></div>
            
            <span className="relative flex items-center gap-3">
              Explore Portfolio
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button className="group relative px-8 py-4 text-blue-300 font-semibold uppercase tracking-widest text-sm">
            {/* Subtle Border */}
            <div className="absolute inset-0 border border-blue-500/30 group-hover:border-blue-400/50 transition-colors"></div>
            
            {/* Hover Background */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300"></div>
            
            <span className="relative">View Work</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['3D Interactive', 'Luxury Design', 'Fluid Motion'].map((feature, i) => (
            <div 
              key={i}
              className="px-4 py-2 border border-blue-500/20 rounded-full bg-blue-500/5 text-blue-300 text-xs uppercase tracking-widest backdrop-blur-sm hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-500 ${isScrolling ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400/50">Scroll to Explore</span>
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-blue-500/50" />
        </div>
      </div>

      {/* Floating Text Elements */}
      <div className="absolute top-1/4 left-8 text-blue-500/20 text-sm uppercase tracking-widest font-bold pointer-events-none">
        <div className="animate-pulse">Innovation</div>
      </div>
      <div className="absolute bottom-1/4 right-8 text-blue-500/20 text-sm uppercase tracking-widest font-bold pointer-events-none">
        <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>Excellence</div>
      </div>
    </div>
  );
};

export default HeroSection;

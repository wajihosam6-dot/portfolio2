import React, { useEffect, useRef, useState } from 'react';
import GalleryCanvas from './GalleryCanvas';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

/**
 * Hero Section Component - Cinematic 3D Edition
 * Inspired by ORTECH Portfolio with advanced 3D Stage
 * - Integrates GalleryCanvas for the 3D background
 * - Cinematic text overlays with premium micro-interactions
 * - Dark theme for high-end professional feel
 */

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Background Stage */}
      <div className="absolute inset-0 z-0">
        <GalleryCanvas />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
        <div className="flex items-center gap-4 mb-6 animate-pulse">
          <div className="w-16 h-[2px] bg-blue-500"></div>
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Innovation & Excellence</span>
          <div className="w-16 h-[2px] bg-blue-500"></div>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter drop-shadow-2xl" style={{ fontFamily: 'var(--font-display)' }}>
          ORTECH
        </h1>
        
        <p className="text-2xl md:text-3xl text-blue-200 max-w-3xl font-light tracking-wide italic mb-12">
          "Simplicity in Excellence"
        </p>

        <div className="flex flex-wrap justify-center gap-6 pointer-events-auto">
          <div className="px-6 py-2 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-300 text-xs uppercase tracking-widest backdrop-blur-sm">
            Digital Showroom
          </div>
          <div className="px-6 py-2 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-300 text-xs uppercase tracking-widest backdrop-blur-sm">
            Interactive 3D
          </div>
        </div>

        <div className="mt-16 pointer-events-auto">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full flex items-center gap-3 group transition-all">
            Explore Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-blue-400/50">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Experience</span>
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]"></div>
    </div>
  );
};

export default HeroSection;

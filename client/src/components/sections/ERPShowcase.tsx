import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ERPModule {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

interface ERPShowcaseProps {
  modules: ERPModule[];
}

export const ERPShowcase: React.FC<ERPShowcaseProps> = ({ modules }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('[data-module]');
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40, rotateX: 20, scale: 0.9 },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const positionStyles: Record<string, string> = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-black to-transparent" />

      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs uppercase tracking-[0.2em] font-bold">ERP Solutions</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">ERP</span>
          </h2>
          <p className="text-lg text-gray-400">Integrated business management solutions</p>
        </motion.div>

        {/* Isometric Grid */}
        <div className="relative max-w-4xl mx-auto h-[500px] md:h-[600px]">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 400 500">
            <motion.path
              d="M200,250 L50,80 M200,250 L350,80 M200,250 L50,420 M200,250 L350,420"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Modules */}
          {modules.map((mod) => (
            <div
              key={mod.id}
              data-module
              className={`absolute ${positionStyles[mod.position]} z-10`}
            >
              <motion.div
                className="group relative w-44 h-44 md:w-52 md:h-52 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer border border-white/5 bg-white/[0.02] backdrop-blur-sm text-center"
                whileHover={{ scale: 1.1, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${mod.color}20` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div style={{ color: mod.color }}>{mod.icon}</div>
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">{mod.name}</h3>
                <p className="text-xs text-gray-400">{mod.description}</p>

                {/* Border glow */}
                <div
                  className="absolute inset-0 rounded-3xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ borderColor: `${mod.color}40` }}
                />
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: mod.color }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ERPShowcase;

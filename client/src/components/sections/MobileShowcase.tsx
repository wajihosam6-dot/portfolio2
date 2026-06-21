import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Sparkles, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MobileApp {
  id: number;
  name: string;
  description: string;
  features: string[];
  color: string;
  screens: number;
}

interface MobileShowcaseProps {
  apps: MobileApp[];
}

export const MobileShowcase: React.FC<MobileShowcaseProps> = ({ apps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phones = containerRef.current?.querySelectorAll('[data-phone]');
      phones?.forEach((phone, i) => {
        gsap.fromTo(
          phone,
          { opacity: 0, y: 60, rotateY: 25 },
          {
            opacity: 1, y: 0, rotateY: 0, duration: 1,
            delay: i * 0.25, ease: 'power4.out',
            scrollTrigger: { trigger: phone, start: 'top 85%' },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-transparent" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-xs uppercase tracking-[0.2em] font-bold">Mobile Applications</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Native & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Cross-Platform</span>
          </h2>
          <p className="text-lg text-gray-400">iOS & Android solutions with premium UX</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {apps.map((app, index) => (
            <div key={app.id} data-phone className="relative group">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 h-full">
                {/* Phone Mockup Container */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="relative w-64 h-[28rem] rounded-[2.5rem] border-4 border-white/10 bg-gradient-to-b from-gray-900 to-black overflow-hidden shadow-2xl group-hover:shadow-[0_0_60px_rgba(124,58,237,0.15)] transition-shadow duration-500"
                    style={{ borderColor: `${app.color}30` }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    {/* Screen Content */}
                    <div className="absolute inset-0 p-4">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs text-white/60 font-semibold">9:41</span>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: app.color }} />
                          ))}
                        </div>
                      </div>

                      {/* App Icon */}
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style={{ backgroundColor: `${app.color}30` }}
                        whileHover={{ rotate: 15 }}
                      >
                        <Smartphone className="w-8 h-8" style={{ color: app.color }} />
                      </motion.div>

                      <h4 className="text-white font-bold text-center mb-2">{app.name}</h4>
                      <p className="text-xs text-gray-400 text-center mb-6">{app.description}</p>

                      {/* Feature Tags */}
                      <div className="space-y-2">
                        {app.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                            <Sparkles className="w-3 h-3" style={{ color: app.color }} />
                            <span className="text-xs text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl" />
                  </motion.div>

                  {/* App Info */}
                  <div className="mt-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{app.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{app.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {app.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${app.color}15`,
                            color: app.color,
                            border: `1px solid ${app.color}30`,
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: app.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileShowcase;

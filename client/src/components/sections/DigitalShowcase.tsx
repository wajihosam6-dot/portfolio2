import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Cpu, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DigitalService {
  id: number;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface DigitalShowcaseProps {
  services: DigitalService[];
}

export const DigitalShowcase: React.FC<DigitalShowcaseProps> = ({ services }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (scanRef.current) {
        gsap.to(scanRef.current, {
          top: '100%', duration: 3, repeat: -1, ease: 'power1.inOut',
          scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'bottom center', scrub: 1 },
        });
      }
      const items = containerRef.current?.querySelectorAll('[data-digital]');
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-black to-transparent" />

      {/* Scanning Line Effect */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)',
          boxShadow: '0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)',
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-xs uppercase tracking-[0.2em] font-bold">Digital Marketing</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Transformation</span>
          </h2>
          <p className="text-lg text-gray-400">Data-driven marketing strategies for growth</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} data-digital className="group relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 h-full">
                {/* Tech Grid Background */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
                  style={{ backgroundColor: `${service.color}20` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Cpu className="w-7 h-7" style={{ color: service.color }} />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors relative">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 relative">{service.description}</p>

                {/* Features */}
                <div className="space-y-3 relative">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      whileHover={{ x: 4, borderColor: `${service.color}30` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Glow */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: service.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalShowcase;

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, DollarSign, BarChart3, Activity, ArrowUpRight, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AccountingSystem {
  id: number;
  name: string;
  description: string;
  features: string[];
  color: string;
  metrics: { label: string; value: string }[];
}

interface AccountingShowcaseProps {
  systems: AccountingSystem[];
}

function AnimatedCounter({ value, color, delay = 0 }: { value: string; color: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numeric = parseFloat(value.replace(/[^0-9.-]/g, ''));
    if (isNaN(numeric)) { el.textContent = value; return; }

    const prefix = value.startsWith('+') ? '+' : value.startsWith('$') ? '$' : '';
    const suffix = value.includes('M') ? 'M' : value.includes('K') ? 'K' : '';

    gsap.fromTo(
      el,
      { textContent: 0 },
      {
        textContent: numeric,
        duration: 2,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        snap: { textContent: 1 },
        onUpdate: function () {
          const val = Math.round(Number(this.targets()[0].textContent));
          el.textContent = prefix + val.toLocaleString() + suffix;
        },
      }
    );
  }, [value, delay]);

  return <span ref={ref} className="text-4xl font-black" style={{ color }}>{value}</span>;
}

function SparklineChart({ color }: { color: string }) {
  return (
    <svg className="w-full h-12" viewBox="0 0 200 40" preserveAspectRatio="none">
      <motion.path
        d="M0,30 Q20,35 40,25 T80,20 T120,15 T160,10 T200,5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.path
        d="M0,30 Q20,35 40,25 T80,20 T120,15 T160,10 T200,5 L200,40 L0,40 Z"
        fill={`${color}15`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />
    </svg>
  );
}

export const AccountingShowcase: React.FC<AccountingShowcaseProps> = ({ systems }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('[data-card]');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 10, scale: 0.95 },
          {
            opacity: 1, y: 0, rotateX: 0, scale: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-emerald-950/20" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-xs uppercase tracking-[0.2em] font-bold">Financial Intelligence</span>
          </motion.div>
          <h2
            className="text-5xl md:text-7xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Accounting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Systems</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive financial management and real-time reporting solutions
          </p>
        </motion.div>

        <div className="space-y-16">
          {systems.map((system, index) => (
            <div key={system.id} data-card className="relative">
              {/* Glassmorphism Card Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl">
                {/* Animated Gradient Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: `linear-gradient(135deg, ${system.color}20, transparent 50%, ${system.color}10)`,
                  }}
                />

                {/* Header */}
                <div className="relative p-8 md:p-10 border-b border-white/5">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                        style={{ backgroundColor: system.color }}
                      >
                        <Activity className="w-3 h-3" />
                        Live Dashboard
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{system.name}</h3>
                      <p className="text-gray-400">{system.description}</p>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Secured</span>
                    </motion.div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="relative p-8 md:p-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    {system.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: system.color }}
                            />
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                              {metric.label}
                            </span>
                          </div>
                          <AnimatedCounter value={metric.value} color={system.color} delay={idx * 0.2} />
                          <motion.div
                            className="flex items-center gap-1 mt-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 + idx * 0.1 }}
                          >
                            <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-xs font-semibold">+12.5%</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sparkline Chart */}
                  <div className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400 font-medium">Revenue Trend</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-bold">+23.4%</span>
                      </div>
                    </div>
                    <SparklineChart color={system.color} />
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {system.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        className="group/feature p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        <motion.div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${system.color}20` }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <DollarSign className="w-4 h-4" style={{ color: system.color }} />
                        </motion.div>
                        <p className="text-sm font-semibold text-white group-hover/feature:text-emerald-300 transition-colors">
                          {feature}
                        </p>
                        <motion.div
                          className="h-1 rounded-full mt-2"
                          style={{
                            background: `linear-gradient(90deg, ${system.color}, transparent)`,
                          }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1, delay: 0.8 + idx * 0.15 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Glow */}
                <div
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-3xl opacity-20"
                  style={{ backgroundColor: system.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountingShowcase;

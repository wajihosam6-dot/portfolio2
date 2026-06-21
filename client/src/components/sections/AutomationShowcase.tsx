import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowRight, Repeat, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AutomationFlow {
  id: number;
  name: string;
  steps: string[];
  color: string;
}

interface AutomationShowcaseProps {
  flows: AutomationFlow[];
}

export const AutomationShowcase: React.FC<AutomationShowcaseProps> = ({ flows }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const flowEls = containerRef.current?.querySelectorAll('[data-flow]');
      flowEls?.forEach((flow, i) => {
        gsap.fromTo(flow,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
          { opacity: 1, x: 0, duration: 0.9, delay: i * 0.2, ease: 'power4.out',
            scrollTrigger: { trigger: flow, start: 'top 80%' } }
        );
        const steps = flow.querySelectorAll('[data-step]');
        steps.forEach((step, si) => {
          gsap.fromTo(step,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.5, delay: si * 0.15,
              scrollTrigger: { trigger: flow, start: 'top 75%' } }
          );
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-950/10 via-black to-transparent" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Repeat className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-xs uppercase tracking-[0.2em] font-bold">Automation</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Workflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Automation</span>
          </h2>
          <p className="text-lg text-gray-400">Streamline operations with intelligent automation</p>
        </motion.div>

        <div className="space-y-12">
          {flows.map((flow, flowIndex) => (
            <div key={flow.id} data-flow className="group">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10">
                {/* Flow Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${flow.color}20` }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Zap className="w-5 h-5" style={{ color: flow.color }} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{flow.name}</h3>
                      <p className="text-sm text-gray-400">{flow.steps.length} automated steps</p>
                    </div>
                  </div>
                </div>

                {/* Flow Diagram */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4">
                  {flow.steps.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      <div
                        data-step={stepIndex}
                        className="flex-shrink-0 relative"
                      >
                        <motion.div
                          className="w-28 h-28 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer"
                          style={{
                            background: `linear-gradient(135deg, ${flow.color}25, ${flow.color}08)`,
                            border: `1px solid ${flow.color}30`,
                          }}
                          whileHover={{ scale: 1.1, y: -4 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Zap className="w-6 h-6 mb-1" style={{ color: flow.color }} />
                          <span className="text-xs font-bold text-white text-center leading-tight">{step}</span>
                        </motion.div>
                        <div
                          className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: flow.color }}
                        >
                          {stepIndex + 1}
                        </div>
                      </div>

                      {stepIndex < flow.steps.length - 1 && (
                        <motion.div
                          className="flex-shrink-0"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ArrowRight className="w-5 h-5" style={{ color: flow.color }} />
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Benefits */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Time Saved', value: '80%' },
                    { label: 'Error Reduction', value: '95%' },
                    { label: 'Efficiency', value: '70%' },
                    { label: 'Scalability', value: '100%' },
                  ].map((benefit, i) => (
                    <motion.div
                      key={benefit.label}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ y: -4, borderColor: `${flow.color}30` }}
                    >
                      <div className="text-2xl font-black mb-1" style={{ color: flow.color }}>{benefit.value}</div>
                      <div className="text-xs text-gray-500">{benefit.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Glow */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: flow.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationShowcase;

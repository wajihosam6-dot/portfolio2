import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HorizontalScrollProps {
  items: ScrollItem[];
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;

    gsap.to(scrollRef.current, {
      x: -(scrollWidth - containerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: `+=${scrollWidth}`,
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const colors = ['#0066FF', '#7C3AED', '#10B981', '#F59E0B'];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div ref={containerRef} className="relative overflow-hidden">
        <div ref={scrollRef} className="flex gap-8 px-6" style={{ width: 'fit-content' }}>
          {items.map((item, index) => {
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={item.id || index}
                className="group relative flex-shrink-0 w-[28rem] h-[28rem] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Gradient Background */}
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${color}10, transparent)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, ${color}40 0%, transparent 60%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-10">
                  <div>
                    {/* Number */}
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl font-black text-white mb-6"
                      style={{ backgroundColor: `${color}25`, border: `1px solid ${color}30` }}
                    >
                      {`0${index + 1}`}
                    </div>

                    {/* Icon */}
                    <div className="mb-4" style={{ color }}>
                      {item.icon}
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:tracking-tighter transition-all"
                      style={{ fontFamily: 'var(--font-display)' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold transition-all"
                    style={{ color }}>
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-12 text-gray-500 text-sm"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="uppercase tracking-[0.2em] text-xs">Scroll horizontally</span>
        <ArrowRight className="w-4 h-4 animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HorizontalScroll;

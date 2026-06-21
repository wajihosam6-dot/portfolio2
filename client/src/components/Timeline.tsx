import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  color: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !line || !wrapper) return;

    const cards = wrapper.querySelectorAll<HTMLDivElement>('[data-timeline-card]');
    const dots = wrapper.querySelectorAll<HTMLDivElement>('[data-timeline-dot]');

    // Single master timeline — everything syncs to one scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.2,
      },
    });

    // Line grows full height
    tl.to(line, { height: '100%', ease: 'none' }, 0);

    // Each card fades in sequentially as the line grows
    const seg = 1 / items.length;
    cards.forEach((card, i) => {
      const entry = i * seg + seg * 0.05;   // 5% into segment
      const full = i * seg + seg * 0.45;    // 45% into segment
      tl.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.85, rotateX: 12 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, ease: 'power2.out' },
        entry
      );
      // keep visible until after the segment passes
      tl.to(card, { opacity: 1 }, full);
    });

    // Dots pulse as they're reached
    dots.forEach((dot, i) => {
      const entry = i * seg + seg * 0.1;
      const peak = i * seg + seg * 0.3;
      tl.fromTo(
        dot,
        { scale: 0.3, opacity: 0, borderWidth: '4px' },
        { scale: 1.5, opacity: 1, duration: 0.15, ease: 'back.out(2)' },
        entry
      );
      tl.to(dot, { scale: 1, borderWidth: '2px', duration: 0.2 }, peak);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [items.length]);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-black to-blue-950/10" />

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-xs uppercase tracking-[0.2em] font-bold">Milestones</span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Journey</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A timeline of innovation, growth, and successful digital transformations.
          </p>
        </motion.div>

        {/* Timeline Track */}
        <div
          ref={wrapperRef}
          className="relative max-w-5xl mx-auto"
          style={{ height: `${items.length * 500}px` }}
        >
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 w-[2px] h-0 -translate-x-1/2 z-0"
            style={{
              background: 'linear-gradient(180deg, #7C3AED, #0066FF, #10B981, #F59E0B, #EC4899)',
              boxShadow: '0 0 20px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1)',
            }}
          />

          {/* Timeline Items */}
          <div className="relative z-10">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`absolute flex items-center gap-6 md:gap-12 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  style={{ top: `${index * 500 + 50}px` }}
                >
                  {/* Card */}
                  <div className="w-full md:w-5/12" data-timeline-card>
                    <div
                      className="group relative overflow-hidden rounded-2xl p-6 md:p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/10 transition-all duration-500 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}08, transparent)`,
                      }}
                    >
                      <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:tracking-wide transition-all"
                          style={{ fontFamily: 'var(--font-display)' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                      <div
                        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl pointer-events-none"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="w-full md:w-2/12 flex justify-center">
                    <div
                      data-timeline-dot
                      className="w-5 h-5 rounded-full border-4 border-black shadow-lg"
                      style={{ backgroundColor: item.color, transform: 'scale(0.3)', opacity: 0 }}
                    />
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

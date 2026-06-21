import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  color: string;
  side?: 'left' | 'right';
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  subtitle?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, title, subtitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    gsap.to(lineRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const isLeft = index % 2 === 0;

      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          rotateY: isLeft ? 20 : -20,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );

      item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 px-6">
      {title && (
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400 transform -translate-x-1/2 h-0" ref={lineRef}></div>

        <div className="space-y-12">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-full md:w-5/12`}>
                  <div
                    className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                      boxShadow: `0 8px 32px ${item.color}15`,
                    }}
                  >
                    <div
                      className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-3"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.year}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>

                    <div
                      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                      style={{ backgroundColor: item.color, zIndex: -1 }}
                    ></div>
                  </div>
                </div>

                <div className="w-full md:w-2/12 flex justify-center">
                  <div
                    className="w-6 h-6 rounded-full border-4 border-white bg-blue-600 shadow-lg hover:scale-150 transition-transform duration-300 cursor-pointer"
                    style={{ backgroundColor: item.color, borderColor: 'white' }}
                  ></div>
                </div>

                <div className="w-full md:w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

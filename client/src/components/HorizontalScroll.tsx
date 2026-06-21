import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon?: string;
  image?: string;
}

interface HorizontalScrollProps {
  items: ScrollItem[];
  title?: string;
  subtitle?: string;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  items,
  title,
  subtitle,
}) => {
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
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Header */}
      {title && (
        <div className="container max-w-7xl mx-auto px-6 mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-8 px-6"
          style={{ width: 'fit-content' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex-shrink-0 w-96 h-96 rounded-3xl overflow-hidden cursor-pointer"
              style={{
                perspective: '1200px',
              }}
            >
              {/* Background Layer */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                }}
              >
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(0deg, transparent 24%, ${item.color}20 25%, ${item.color}20 26%, transparent 27%, transparent 74%, ${item.color}20 75%, ${item.color}20 76%, transparent 77%, transparent),
                                       linear-gradient(90deg, transparent 24%, ${item.color}20 25%, ${item.color}20 26%, transparent 27%, transparent 74%, ${item.color}20 75%, ${item.color}20 76%, transparent 77%, transparent)`,
                      backgroundSize: '50px 50px',
                    }}
                  ></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {/* Top Section */}
                <div>
                  <div
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
                    style={{ backgroundColor: item.color }}
                  >
                    {`0${index + 1}`}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.subtitle}</p>
                </div>

                {/* Bottom Section */}
                <div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                    <span>View Project</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: item.color, zIndex: -1 }}
              ></div>

              {/* Border Gradient */}
              <div
                className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderImage: `linear-gradient(135deg, ${item.color}40, ${item.color}10) 1`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="container max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
          <span>Scroll horizontally</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;

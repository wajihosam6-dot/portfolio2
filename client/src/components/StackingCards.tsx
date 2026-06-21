import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StackCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon?: string;
  details?: string[];
}

interface StackingCardsProps {
  cards: StackCard[];
  title?: string;
  subtitle?: string;
}

export const StackingCards: React.FC<StackingCardsProps> = ({
  cards,
  title,
  subtitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const isLastCard = index === cardsRef.current.length - 1;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
          rotateX: 20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 55%',
            scrub: false,
          },
        }
      );

      // Stacking effect on scroll
      if (!isLastCard) {
        gsap.to(card, {
          y: index * 20,
          scale: 1 - index * 0.02,
          opacity: 1 - index * 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${index * 200}px center`,
            end: `top+=${(index + 1) * 200}px center`,
            scrub: 1,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative py-32 bg-black">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        {title && (
          <div className="text-center mb-20">
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Stacking Container */}
        <div
          ref={containerRef}
          className="relative"
          style={{
            perspective: '1200px',
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative mb-8 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                perspective: '1200px',
              }}
            >
              {/* Card Background */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${card.color}25, ${card.color}05)`,
                }}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background: `radial-gradient(circle at 20% 50%, ${card.color}40 0%, transparent 50%),
                                   radial-gradient(circle at 80% 80%, ${card.color}30 0%, transparent 50%)`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div
                      className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4"
                      style={{ backgroundColor: card.color }}
                    >
                      {`Step ${index + 1}`}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <span className="text-2xl font-bold" style={{ color: card.color }}>
                      {index + 1}
                    </span>
                  </div>
                </div>

                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  {card.description}
                </p>

                {card.details && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {card.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ backgroundColor: `${card.color}10` }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: card.color }}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Border Gradient */}
              <div
                className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderImage: `linear-gradient(135deg, ${card.color}60, ${card.color}10) 1`,
                }}
              ></div>

              {/* Hover Glow */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: card.color, zIndex: -1 }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackingCards;

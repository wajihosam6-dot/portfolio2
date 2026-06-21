import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Database, Users, Zap } from 'lucide-react';

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
  const isoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isoRef.current) return;

    // Isometric rotation on scroll
    gsap.to(isoRef.current, {
      rotateX: 20,
      rotateY: 45,
      rotateZ: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    // Animate modules
    const moduleElements = isoRef.current.querySelectorAll('[data-module]');
    moduleElements.forEach((module, index) => {
      gsap.fromTo(
        module,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const getPositionClass = (position: string) => {
    const positions: Record<string, string> = {
      'top-left': 'top-0 left-0',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    };
    return positions[position] || '';
  };

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          ERP Solutions
        </h2>
        <p className="text-lg text-gray-600 mb-16">Integrated enterprise resource planning systems</p>

        {/* Isometric Container */}
        <div
          ref={containerRef}
          className="relative h-96 flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          <div
            ref={isoRef}
            className="relative w-80 h-80"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {modules.map((module) => (
              <div
                key={module.id}
                data-module={module.id}
                className={`absolute ${getPositionClass(module.position)} group`}
              >
                <div
                  className="w-32 h-32 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${module.color}30, ${module.color}10)`,
                    border: `2px solid ${module.color}40`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="text-4xl mb-2" style={{ color: module.color }}>
                    {module.icon}
                  </div>
                  <div className="text-xs font-bold text-gray-900 text-center">{module.name}</div>
                </div>

                {/* Tooltip */}
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
                  style={{ backgroundColor: module.color }}
                >
                  {module.description}
                </div>
              </div>
            ))}

            {/* Center Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.2 }}
            >
              <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="#0066FF" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="#0066FF" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="#0066FF" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="#0066FF" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Module Details */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${module.color}20` }}
                >
                  <div style={{ color: module.color }}>{module.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{module.name}</h4>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ERPShowcase;

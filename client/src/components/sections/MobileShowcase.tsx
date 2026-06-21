import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone } from 'lucide-react';

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
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScreen, setActiveScreen] = useState<number[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    phoneRefs.current.forEach((phone, index) => {
      if (!phone) return;

      gsap.fromTo(
        phone,
        { opacity: 0, scale: 0.8, rotateY: -30 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: phone,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );

      // Screen rotation animation
      const screens = phone.querySelectorAll('[data-screen]');
      gsap.to(phone, {
        rotateY: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: phone,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Cycle through screens
      gsap.to({}, {
        onUpdate: function () {
          const progress = this.progress() * (screens.length - 1);
          const currentScreen = Math.floor(progress);
          setActiveScreen((prev) => {
            const newState = [...prev];
            newState[index] = currentScreen;
            return newState;
          });
        },
        scrollTrigger: {
          trigger: phone,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Mobile Applications
        </h2>
        <p className="text-lg text-gray-600 mb-16">Native and cross-platform mobile solutions for iOS and Android</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {apps.map((app, index) => (
            <div
              key={app.id}
              ref={(el) => {
                phoneRefs.current[index] = el;
              }}
              className="group flex flex-col items-center"
              style={{ perspective: '1200px' }}
            >
              {/* Phone Mockup */}
              <div
                className="relative w-48 h-96 rounded-3xl shadow-2xl overflow-hidden group-hover:shadow-3xl transition-shadow"
                style={{
                  background: `linear-gradient(135deg, ${app.color}20, ${app.color}10)`,
                  border: `2px solid ${app.color}40`,
                }}
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

                {/* Screen Container */}
                <div className="relative w-full h-full bg-white overflow-hidden pt-8">
                  {/* Screens */}
                  {Array.from({ length: app.screens }).map((_, screenIndex) => (
                    <div
                      key={screenIndex}
                      data-screen={screenIndex}
                      className={`absolute inset-0 pt-8 p-4 transition-opacity duration-300 ${
                        activeScreen[index] === screenIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${app.color}05, ${app.color}02)`,
                      }}
                    >
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="h-8 bg-gray-200 rounded-lg mb-4"></div>
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-4 bg-gray-100 rounded-lg"></div>
                            ))}
                          </div>
                        </div>
                        <div className="h-12 bg-blue-600 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Screen Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-30">
                  {Array.from({ length: app.screens }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{
                        backgroundColor: activeScreen[index] === i ? app.color : '#ccc',
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* App Info */}
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{app.name}</h3>
                <p className="text-gray-600 mb-4">{app.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {app.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: app.color }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileShowcase;

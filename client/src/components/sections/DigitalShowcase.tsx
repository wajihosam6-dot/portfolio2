import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Cpu } from 'lucide-react';

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
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scanning effect animation
    if (scanRef.current) {
      gsap.to(scanRef.current, {
        y: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }

    // Animate service items
    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50, rotateX: 20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Digital Transformation
        </h2>
        <p className="text-lg text-gray-600 mb-16">Modernize your business with cutting-edge digital solutions</p>

        {/* Scanning Effect Container */}
        <div
          ref={containerRef}
          className="relative mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-12"
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, #0066FF20 25%, #0066FF20 26%, transparent 27%, transparent 74%, #0066FF20 75%, #0066FF20 76%, transparent 77%, transparent),
                               linear-gradient(90deg, transparent 24%, #0066FF20 25%, #0066FF20 26%, transparent 27%, transparent 74%, #0066FF20 75%, #0066FF20 76%, transparent 77%, transparent)`,
              backgroundSize: '50px 50px',
            }}
          ></div>

          {/* Scanning Line */}
          <div
            ref={scanRef}
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{
              boxShadow: '0 0 20px #0066FF, 0 0 40px #0066FF',
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Advanced Technology Stack</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Leveraging the latest technologies and best practices to deliver transformative solutions
            </p>

            {/* Tech Icons */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                <Cpu className="w-8 h-8 text-blue-400" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/40">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
              }}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: service.color }}
              ></div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${service.color}25` }}
              >
                <Zap className="w-6 h-6" style={{ color: service.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: service.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                style={{ backgroundColor: service.color, zIndex: -1 }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalShowcase;

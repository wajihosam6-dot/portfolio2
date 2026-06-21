import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

export const AccountingShowcase: React.FC<AccountingShowcaseProps> = ({ systems }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const rows = item.querySelectorAll('[data-row]');

      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );

      // Animate rows with stagger
      rows.forEach((row, rowIndex) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: rowIndex * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              end: 'top 45%',
              scrub: false,
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Accounting Systems
        </h2>
        <p className="text-lg text-gray-600 mb-16">Comprehensive financial management and reporting solutions</p>

        <div className="space-y-12">
          {systems.map((system, index) => (
            <div
              key={system.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{system.name}</h3>
                <p className="text-gray-600">{system.description}</p>
              </div>

              {/* Data Table */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 group-hover:border-gray-300 transition-colors">
                {/* Table Header */}
                <div
                  className="grid grid-cols-4 gap-4 p-6"
                  style={{ backgroundColor: `${system.color}15` }}
                >
                  <div className="font-bold text-gray-900">Metric</div>
                  <div className="font-bold text-gray-900">Value</div>
                  <div className="font-bold text-gray-900">Change</div>
                  <div className="font-bold text-gray-900">Status</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-200">
                  {system.metrics.map((metric, rowIndex) => (
                    <div
                      key={rowIndex}
                      data-row={rowIndex}
                      className="grid grid-cols-4 gap-4 p-6 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-gray-900 font-medium">{metric.label}</div>
                      <div className="text-gray-900 font-bold">{metric.value}</div>
                      <div className="text-green-600 font-semibold">+12.5%</div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: system.color }}
                        ></div>
                        <span className="text-sm text-gray-600">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {system.features.map((feature) => (
                  <div
                    key={feature}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group/feature"
                  >
                    <div
                      className="w-3 h-3 rounded-full mb-2 group-hover/feature:scale-150 transition-transform"
                      style={{ backgroundColor: system.color }}
                    ></div>
                    <p className="text-sm font-medium text-gray-900">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountingShowcase;

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowRight } from 'lucide-react';

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
  const flowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    flowsRef.current.forEach((flow, flowIndex) => {
      if (!flow) return;

      const steps = flow.querySelectorAll('[data-step]');

      // Animate flow container
      gsap.fromTo(
        flow,
        { opacity: 0, x: flowIndex % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: flow,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );

      // Animate steps with stagger
      steps.forEach((step, stepIndex) => {
        gsap.fromTo(
          step,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: stepIndex * 0.15,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            scrollTrigger: {
              trigger: flow,
              start: 'top 75%',
              end: 'top 45%',
              scrub: false,
            },
          }
        );

        // Pulse animation on scroll
        gsap.to(step, {
          boxShadow: `0 0 20px ${flows[flowIndex].color}60, 0 0 40px ${flows[flowIndex].color}30`,
          ease: 'none',
          scrollTrigger: {
            trigger: flow,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });
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
          Automation & Integration
        </h2>
        <p className="text-lg text-gray-600 mb-16">Streamline workflows and connect your business systems</p>

        <div className="space-y-12">
          {flows.map((flow, flowIndex) => (
            <div
              key={flow.id}
              ref={(el) => {
                flowsRef.current[flowIndex] = el;
              }}
              className="group"
            >
              {/* Flow Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{flow.name}</h3>
                <p className="text-gray-600">Automated workflow with {flow.steps.length} integrated steps</p>
              </div>

              {/* Flow Diagram */}
              <div className="relative">
                <div className="flex items-center gap-4 overflow-x-auto pb-4">
                  {flow.steps.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      {/* Step Node */}
                      <div
                        data-step={stepIndex}
                        className="flex-shrink-0 relative group/step"
                      >
                        <div
                          className="w-32 h-32 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                          style={{
                            background: `linear-gradient(135deg, ${flow.color}30, ${flow.color}10)`,
                            border: `2px solid ${flow.color}40`,
                            boxShadow: `0 0 0 ${flow.color}20`,
                          }}
                        >
                          <Zap className="w-8 h-8 mb-2" style={{ color: flow.color }} />
                          <div className="text-xs font-bold text-gray-900 text-center">{step}</div>
                        </div>

                        {/* Step Number */}
                        <div
                          className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: flow.color }}
                        >
                          {stepIndex + 1}
                        </div>
                      </div>

                      {/* Arrow */}
                      {stepIndex < flow.steps.length - 1 && (
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
                          <ArrowRight className="w-6 h-6" style={{ color: flow.color }} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Connection Line */}
                <div
                  className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2"
                  style={{
                    background: `linear-gradient(90deg, ${flow.color}30, transparent)`,
                    zIndex: -1,
                  }}
                ></div>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Time Saved', 'Error Reduction', 'Efficiency', 'Scalability'].map((benefit, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-1">{[80, 95, 70, 100][i]}%</div>
                    <div className="text-xs text-gray-600">{benefit}</div>
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

export default AutomationShowcase;

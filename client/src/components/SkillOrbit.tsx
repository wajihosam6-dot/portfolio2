import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
  level: number;
}

interface SkillOrbitProps {
  skills: Skill[];
  title?: string;
  subtitle?: string;
}

export const SkillOrbit: React.FC<SkillOrbitProps> = ({
  skills,
  title,
  subtitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !orbitRef.current) return;

    // Mouse tracking animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 50;
      const y = (e.clientY - rect.top - rect.height / 2) / 50;

      setMousePos({ x, y });

      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotationX: y,
          rotationY: x,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    // Scroll-driven rotation
    gsap.to(orbitRef.current, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', () => {
      gsap.to(orbitRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const orbitRadius = 150;

  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        {title && (
          <div className="text-center mb-20">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Orbit Container */}
        <div
          ref={containerRef}
          className="relative w-full h-96 flex items-center justify-center"
          style={{
            perspective: '1200px',
          }}
        >
          {/* Center Circle */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl flex items-center justify-center z-20">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">Skills</div>
              <div className="text-xs opacity-80">{skills.length}</div>
            </div>
          </div>

          {/* Orbit Container */}
          <div
            ref={orbitRef}
            className="absolute w-96 h-96"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              const angle = (index / skills.length) * Math.PI * 2;
              const x = Math.cos(angle) * orbitRadius;
              const y = Math.sin(angle) * orbitRadius;

              return (
                <div
                  key={skill.name}
                  className="group absolute w-24 h-24 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    background: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`,
                    border: `2px solid ${skill.color}40`,
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    gsap.to(target, {
                      scale: 1.3,
                      boxShadow: `0 0 30px ${skill.color}60`,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    gsap.to(target, {
                      scale: 1,
                      boxShadow: 'none',
                      duration: 0.3,
                    });
                  }}
                >
                  <div className="text-center">
                    <Icon
                      className="w-8 h-8 mx-auto mb-1"
                      style={{ color: skill.color }}
                    />
                    <div className="text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.level}%
                    </div>
                  </div>

                  {/* Tooltip */}
                  <div
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    style={{ backgroundColor: skill.color }}
                  >
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Orbit Rings */}
          <div className="absolute w-80 h-80 rounded-full border border-blue-200/30"></div>
          <div className="absolute w-96 h-96 rounded-full border border-blue-200/20"></div>
        </div>

        {/* Skill List */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    className="w-6 h-6"
                    style={{ color: skill.color }}
                  />
                  <h4 className="font-bold text-gray-900">{skill.name}</h4>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-2">{skill.level}% Proficiency</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillOrbit;

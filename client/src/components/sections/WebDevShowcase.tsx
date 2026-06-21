import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WebProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  color: string;
}

interface WebDevShowcaseProps {
  projects: WebProject[];
}

export const WebDevShowcase: React.FC<WebDevShowcaseProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const layers = item.querySelectorAll('[data-layer]');

      gsap.fromTo(
        item,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
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

      layers.forEach((layer, layerIndex) => {
        gsap.to(layer, {
          y: -50 * (layerIndex + 1),
          ease: 'none',
          scrollTrigger: {
            trigger: item,
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
          Web Development
        </h2>
        <p className="text-lg text-gray-600 mb-16">Modern web solutions with stunning interfaces and seamless interactions</p>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-3xl"
              style={{ perspective: '1200px' }}
            >
              {/* Base Layer */}
              <div
                data-layer="base"
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                }}
              ></div>

              {/* Grid Layer */}
              <div
                data-layer="grid"
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(0deg, transparent 24%, ${project.color}20 25%, ${project.color}20 26%, transparent 27%, transparent 74%, ${project.color}20 75%, ${project.color}20 76%, transparent 77%, transparent),
                                   linear-gradient(90deg, transparent 24%, ${project.color}20 25%, ${project.color}20 26%, transparent 27%, transparent 74%, ${project.color}20 75%, ${project.color}20 76%, transparent 77%, transparent)`,
                  backgroundSize: '50px 50px',
                }}
              ></div>

              {/* Content Layer */}
              <div data-layer="content" className="relative z-10 p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${project.color}25` }}
                  >
                    <span className="text-2xl font-bold" style={{ color: project.color }}>
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Border */}
              <div
                className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: project.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevShowcase;

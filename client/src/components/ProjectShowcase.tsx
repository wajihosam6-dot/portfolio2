import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  color: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

/**
 * ProjectShowcase Component
 * Advanced cinematic showcase with parallax and scroll animations
 * Each project card has unique animations and interactions
 */

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
      // Staggered entrance animation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: 10,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );

      // Parallax effect on scroll
      gsap.to(card, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="project-card group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
          style={{
            perspective: '1000px',
          }}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 ${
                hoveredId === project.id ? 'opacity-100' : ''
              }`}
            >
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-2"
                  style={{ backgroundColor: project.color }}
                >
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* CTA Button */}
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform group-hover:translate-x-1"
              style={{
                backgroundColor: hoveredId === project.id ? project.color : '#2563eb',
              }}
            >
              View Project
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Accent Border */}
          <div
            className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500"
            style={{ backgroundColor: project.color }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectShowcase;

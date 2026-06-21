import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  color: string;
  index: number;
  variant?: 'default' | 'featured' | 'minimal' | 'glassmorphic';
}

/**
 * Advanced Project Card Component
 * Multiple design variants with premium micro-interactions
 * - Glassmorphic variant with backdrop blur
 * - Featured variant with 3D perspective
 * - Minimal variant with editorial styling
 * - Default variant with smooth transitions
 */

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  category,
  image,
  technologies,
  color,
  index,
  variant = 'default',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Scroll entrance animation
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 60,
        rotateX: 8,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        delay: index * 0.12,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          end: 'top 55%',
          scrub: false,
        },
      }
    );

    // Parallax effect
    gsap.to(cardRef.current, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  // Render based on variant
  if (variant === 'glassmorphic') {
    return (
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          perspective: '1200px',
          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
        }}
      >
        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden h-72 bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-8 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-3"
                style={{ backgroundColor: color, opacity: 0.9 }}
              >
                {category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {title}
              </h3>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>

          <p className="text-gray-200 text-sm mb-6 leading-relaxed">{description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/20 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform group-hover:scale-105 active:scale-95"
            style={{
              backgroundImage: `linear-gradient(135deg, ${color}, ${color}dd)`,
            }}
          >
            Explore Project
          </button>
        </div>

        {/* Accent Border Animation */}
        <div
          className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-700"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer md:col-span-2"
        style={{
          perspective: '1200px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative overflow-hidden h-96 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content Side */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                style={{ backgroundColor: color }}
              >
                {category}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">{description}</p>
            </div>

            <div>
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform group-hover:translate-x-1"
                style={{ backgroundColor: color }}
              >
                View Full Project
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-700" style={{ backgroundColor: color }} />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-56 bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-2 px-2 py-1 rounded"
            style={{ color, backgroundColor: `${color}15` }}
          >
            {category}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {technologies.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="text-sm font-semibold flex items-center gap-1 group/btn transition-all duration-300"
            style={{ color }}
          >
            Learn More
            <ArrowUpRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Left Border Accent */}
        <div className="absolute left-0 top-0 w-1 h-0 group-hover:h-full transition-all duration-500" style={{ backgroundColor: color }} />
      </div>
    );
  }

  // Default variant
  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      style={{
        perspective: '1000px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6`}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">+{technologies.length - 3}</span>
          )}
        </div>

        {/* CTA Button */}
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform group-hover:translate-x-1 text-white font-semibold"
          style={{
            backgroundColor: color,
          }}
        >
          View Project
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Accent Border */}
      <div
        className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default ProjectCard;

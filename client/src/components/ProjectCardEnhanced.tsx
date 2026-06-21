import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import '../cinematic-enhancements.css';

interface ProjectCardEnhancedProps {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  color: string;
  category?: string;
}

/**
 * Enhanced Project Card Component
 * Features:
 * - Glassmorphism design with liquid glass effect
 * - Magnetic hover interactions
 * - Parallax image shift on hover
 * - Technology tags with stagger animation
 * - Glow border effects
 */

export const ProjectCardEnhanced: React.FC<ProjectCardEnhancedProps> = ({
  id,
  title,
  description,
  image,
  technologies,
  color,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group h-full rounded-2xl overflow-hidden cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* Background Container with Glassmorphism */}
      <div className="absolute inset-0 glass-morphism-dark rounded-2xl z-0"></div>

      {/* Glow Border Effect */}
      <div 
        className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]"
        style={{
          borderImage: `linear-gradient(135deg, ${color}, transparent) 1`,
          boxShadow: isHovered ? `0 0 30px ${color}40` : 'none',
        }}
      />

      {/* Image Container with Parallax */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-[2]"></div>

        {/* Category Badge */}
        {category && (
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-white text-xs font-semibold uppercase tracking-widest z-[3]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {category}
          </motion.div>
        )}

        {/* Number Badge */}
        <motion.div
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white z-[3]"
          style={{ 
            backgroundColor: `${color}40`,
            border: `2px solid ${color}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {String(id).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative p-6 z-[2]">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-white mb-3 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm text-gray-300 mb-4 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Technology Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {technologies.slice(0, 3).map((tech, i) => (
            <motion.span
              key={i}
              className="px-2 py-1 text-xs font-semibold text-blue-300 border border-blue-500/30 rounded-md bg-blue-500/5 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {technologies.length > 3 && (
            <motion.span
              className="px-2 py-1 text-xs font-semibold text-gray-400 border border-gray-500/30 rounded-md bg-gray-500/5 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              +{technologies.length - 3} more
            </motion.span>
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="w-full px-4 py-2 mt-4 flex items-center justify-between rounded-lg border border-blue-500/30 bg-blue-600/10 text-blue-300 font-semibold text-sm uppercase tracking-widest hover:bg-blue-600/20 transition-colors"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View Project</span>
          <motion.svg
            className="w-4 h-4"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight />
          </motion.svg>
        </motion.button>
      </div>

      {/* Magnetic Glow Effect on Hover */}
      {isHovered && (
        <motion.div
          className="absolute rounded-2xl pointer-events-none"
          style={{
            width: '100px',
            height: '100px',
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            background: `radial-gradient(circle, ${color}40, transparent)`,
            filter: 'blur(40px)',
          }}
          animate={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}

      {/* Accent Line Animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
        style={{ backgroundImage: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ProjectCardEnhanced;

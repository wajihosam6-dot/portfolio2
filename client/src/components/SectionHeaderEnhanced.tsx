import React from 'react';
import { motion } from 'motion/react';
import '../cinematic-enhancements.css';

interface SectionHeaderEnhancedProps {
  title: string;
  subtitle?: string;
  description?: string;
  accentColor?: string;
  align?: 'left' | 'center' | 'right';
  showAccentLine?: boolean;
}

/**
 * Enhanced Section Header Component
 * Features:
 * - Kinetic typography with staggered letter animations
 * - Glassmorphism subtitle backgrounds
 * - Animated accent lines
 * - Responsive text sizing
 * - Accessibility-first design
 */

export const SectionHeaderEnhanced: React.FC<SectionHeaderEnhancedProps> = ({
  title,
  subtitle,
  description,
  accentColor = '#0066FF',
  align = 'center',
  showAccentLine = true,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const containerAlignment = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  };

  return (
    <motion.div
      className={`flex flex-col ${containerAlignment[align]} gap-4 mb-12`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Accent Line - Top */}
      {showAccentLine && (
        <motion.div
          className={`h-1 rounded-full ${align === 'left' ? 'w-12' : align === 'right' ? 'w-12 ml-auto' : 'w-16 mx-auto'}`}
          style={{ backgroundColor: accentColor }}
          initial={{ width: 0 }}
          whileInView={{ width: align === 'center' ? 64 : 48 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        />
      )}

      {/* Main Title - Kinetic Typography */}
      <motion.h2
        className={`text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter ${alignmentClasses[align]}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {title.split(' ').map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className="inline-block mr-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + wordIndex * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            viewport={{ once: true }}
          >
            {word.split('').map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.35 + wordIndex * 0.1 + letterIndex * 0.02,
                }}
                viewport={{ once: true }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.h2>

      {/* Subtitle with Glassmorphism */}
      {subtitle && (
        <motion.div
          className="glass-morphism px-6 py-3 rounded-full inline-block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p
            className="text-sm md:text-base font-semibold text-blue-300 uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            {subtitle}
          </p>
        </motion.div>
      )}

      {/* Description */}
      {description && (
        <motion.p
          className={`text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed ${alignmentClasses[align]}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      )}

      {/* Accent Line - Bottom */}
      {showAccentLine && (
        <motion.div
          className={`h-1 rounded-full ${align === 'left' ? 'w-12' : align === 'right' ? 'w-12 ml-auto' : 'w-16 mx-auto'}`}
          style={{
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: align === 'center' ? 64 : 48 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        />
      )}
    </motion.div>
  );
};

export default SectionHeaderEnhanced;

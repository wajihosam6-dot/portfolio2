import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle: string;
  accentColor: string;
  variant?: 'default' | 'centered' | 'split' | 'gradient';
}

/**
 * Premium Section Header Component
 * Multiple design variants with scroll-triggered animations
 * - Default: Icon + Title + Subtitle with left accent
 * - Centered: Centered layout with decorative elements
 * - Split: Title on left, subtitle on right
 * - Gradient: Gradient text effect with animated underline
 */

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  accentColor,
  variant = 'default',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger animation for title and subtitle
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
      },
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 40,
          rotateX: 10,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        0
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        0.2
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (variant === 'centered') {
    return (
      <div ref={containerRef} className="text-center mb-16">
        {Icon && (
          <div className="flex justify-center mb-6">
            <Icon className="w-12 h-12" style={{ color: accentColor }} />
          </div>
        )}
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-0.5" style={{ backgroundColor: accentColor }}></div>
          <p ref={subtitleRef} className="text-lg text-gray-600 font-light tracking-wide">
            {subtitle}
          </p>
          <div className="w-12 h-0.5" style={{ backgroundColor: accentColor }}></div>
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
        <div>
          {Icon && (
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-8 h-8" style={{ color: accentColor }} />
            </div>
          )}
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
        </div>
        <p ref={subtitleRef} className="text-lg text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div ref={containerRef} className="mb-16">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold mb-4 relative inline-block"
          style={{
            fontFamily: 'var(--font-display)',
            backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
          <div
            className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-700"
            style={{ backgroundColor: accentColor }}
          ></div>
        </h2>
        <p ref={subtitleRef} className="text-lg text-gray-600 mt-6 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    );
  }

  // Default variant
  return (
    <div ref={containerRef} className="mb-16 relative">
      {/* Left accent line */}
      <div
        className="absolute left-0 top-0 w-1 h-16"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div className="pl-8">
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon className="w-8 h-8" style={{ color: accentColor }} />}
        </div>
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <p ref={subtitleRef} className="text-lg text-gray-600 max-w-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SectionHeader;

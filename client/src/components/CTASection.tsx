import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  variant?: 'default' | 'gradient' | 'minimal';
  accentColor?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
  accentColor = '#0066FF',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'top 45%',
        scrub: false,
      },
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
        0
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.2
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.4
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (variant === 'gradient') {
    return (
      <section
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl py-24 px-8 md:px-16"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: `radial-gradient(circle at 20% 50%, ${accentColor}40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${accentColor}30 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <p ref={subtitleRef} className="text-xl text-white/90 mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {primaryCTA.text}
              <ArrowRight className="w-5 h-5" />
            </a>
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/20 text-white font-bold border border-white/40 hover:bg-white/30 transition-all duration-300"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'minimal') {
    return (
      <section
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl py-24 px-8 md:px-16 bg-white border-2 border-gray-200"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <p ref={subtitleRef} className="text-xl text-gray-600 mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              {primaryCTA.text}
              <ArrowRight className="w-5 h-5" />
            </a>
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-gray-900 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl py-24 px-8 md:px-16"
      style={{
        background: `linear-gradient(135deg, ${accentColor}f0, ${accentColor}dd)`,
      }}
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <p ref={subtitleRef} className="text-xl text-white/90 mb-10 leading-relaxed">
          {subtitle}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryCTA.href}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {primaryCTA.text}
            <ArrowRight className="w-5 h-5" />
          </a>
          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/20 text-white font-bold border border-white/40 hover:bg-white/30 transition-all duration-300"
            >
              {secondaryCTA.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;

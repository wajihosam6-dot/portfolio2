import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * ScrollReveal Component
 * Cinematic animation that reveals elements as they scroll into view
 * Uses GSAP ScrollTrigger for smooth, performance-optimized animations
 */

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Set initial state based on direction
    const initialState: Record<string, any> = {
      opacity: 0,
    };

    const distanceAmount = 60;

    switch (direction) {
      case 'up':
        initialState.y = distanceAmount;
        break;
      case 'down':
        initialState.y = -distanceAmount;
        break;
      case 'left':
        initialState.x = distanceAmount;
        break;
      case 'right':
        initialState.x = -distanceAmount;
        break;
    }

    gsap.set(element, initialState);

    // Create scroll animation
    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, direction]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;

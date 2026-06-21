import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-0 top-0 w-[3px] h-screen z-[9998] pointer-events-none">
      <div className="absolute inset-0 bg-white/[0.03]" />
      <motion.div
        className="relative w-full origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(180deg, #0066FF, #7C3AED, #10B981)',
          boxShadow: '0 0 12px rgba(0,102,255,0.3), 0 0 40px rgba(0,102,255,0.1)',
        }}
      />
    </div>
  );
}

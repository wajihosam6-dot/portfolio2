import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  once?: boolean;
}

const container = {
  hidden: {},
  visible: (custom: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: custom * 0.3 },
  }),
};

const wordVariant = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring' as const, damping: 15, stiffness: 120 },
  },
};

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  once = true,
}: TextRevealProps) {
  const words = children.split(' ');

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      custom={delay}
      className={className}
      aria-label={children}
    >
      <Tag className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            className="inline-block mr-[0.25em]"
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

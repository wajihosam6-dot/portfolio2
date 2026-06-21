import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Zap,
  Brain,
  Palette,
  Layers,
  Target,
  Cpu,
} from 'lucide-react';
import '../cinematic-enhancements.css';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: number;
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  color: string;
  description: string;
}

const skills: Skill[] = [
  {
    id: 1,
    name: 'Frontend',
    icon: <Code2 className="w-6 h-6" />,
    proficiency: 95,
    color: '#0066FF',
    description: 'React, Vue, Angular, TypeScript',
  },
  {
    id: 2,
    name: 'Backend',
    icon: <Database className="w-6 h-6" />,
    proficiency: 90,
    color: '#10B981',
    description: 'Node.js, Python, PostgreSQL',
  },
  {
    id: 3,
    name: 'DevOps',
    icon: <Zap className="w-6 h-6" />,
    proficiency: 85,
    color: '#F59E0B',
    description: 'Docker, Kubernetes, AWS',
  },
  {
    id: 4,
    name: 'AI/ML',
    icon: <Brain className="w-6 h-6" />,
    proficiency: 80,
    color: '#EC4899',
    description: 'TensorFlow, PyTorch, NLP',
  },
  {
    id: 5,
    name: 'Design',
    icon: <Palette className="w-6 h-6" />,
    proficiency: 88,
    color: '#8B5CF6',
    description: 'UI/UX, Figma, Animation',
  },
  {
    id: 6,
    name: '3D Graphics',
    icon: <Layers className="w-6 h-6" />,
    proficiency: 82,
    color: '#06B6D4',
    description: 'Three.js, WebGL, Blender',
  },
];

/**
 * Enhanced Skill Orbit Component
 * Features:
 * - 3D orbital animation with GSAP
 * - Scroll-triggered rotation
 * - Magnetic hover interactions
 * - Glassmorphism skill cards
 * - Proficiency indicators with animations
 */

export const SkillOrbitEnhanced: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    if (!orbitRef.current) return;

    // Scroll-triggered rotation
    gsap.to(orbitRef.current, {
      rotation: 360,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;

    setMousePosition({ x, y });
  };

  const calculatePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 150;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-background pointer-events-none"></div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Technical Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive skill set spanning modern web technologies, cloud
            infrastructure, and cutting-edge AI solutions.
          </p>
        </motion.div>

        {/* Orbit Container */}
        <div
          ref={containerRef}
          className="relative h-[500px] flex items-center justify-center"
          onMouseMove={handleMouseMove}
        >
          {/* Central Core */}
          <motion.div
            className="absolute w-24 h-24 rounded-full glass-morphism flex items-center justify-center z-20"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="text-center">
              <Cpu className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                Skills
              </p>
            </div>
          </motion.div>

          {/* Orbital Ring */}
          <div className="absolute w-80 h-80 border border-blue-500/20 rounded-full"></div>
          <div className="absolute w-96 h-96 border border-blue-500/10 rounded-full"></div>

          {/* Orbiting Skills */}
          <div
            ref={orbitRef}
            className="absolute w-80 h-80"
            style={{
              perspective: '1000px',
            }}
          >
            {skills.map((skill, index) => {
              const position = calculatePosition(index, skills.length);
              const isHovered = hoveredSkill === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  className="absolute w-24 h-24"
                  style={{
                    left: '50%',
                    top: '50%',
                    x: position.x,
                    y: position.y,
                    marginLeft: '-48px',
                    marginTop: '-48px',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <motion.button
                    className="w-full h-full rounded-full glass-morphism flex flex-col items-center justify-center border-2 transition-all"
                    style={{
                      borderColor: isHovered ? skill.color : `${skill.color}40`,
                      boxShadow: isHovered
                        ? `0 0 30px ${skill.color}40`
                        : 'none',
                    }}
                    whileHover={{
                      scale: 1.15,
                      z: 10,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div style={{ color: skill.color }}>{skill.icon}</div>
                    <p className="text-xs font-bold text-white mt-1 text-center">
                      {skill.name}
                    </p>
                  </motion.button>

                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      className="absolute top-full mt-4 left-1/2 -translate-x-1/2 glass-morphism rounded-lg p-3 w-48 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-xs font-semibold text-blue-300 mb-2">
                        {skill.description}
                      </p>
                      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {skill.proficiency}% Proficiency
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Proficiency Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="glass-morphism rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.05,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: skill.color }}>{skill.icon}</div>
                <h3 className="text-lg font-bold text-white">{skill.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">{skill.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-400 w-12 text-right">
                  {skill.proficiency}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillOrbitEnhanced;

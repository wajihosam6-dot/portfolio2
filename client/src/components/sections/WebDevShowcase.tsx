import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Globe, Layout, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WebProject {
  id: number;
  title: string;
  description: string;
  category?: string;
  technologies: string[];
  color: string;
}

interface WebDevShowcaseProps {
  projects: WebProject[];
}

export const WebDevShowcase: React.FC<WebDevShowcaseProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('[data-project]');
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 1,
            delay: i * 0.2, ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'top 85%' },
          }
        );
        gsap.to(item, {
          y: -30, ease: 'none',
          scrollTrigger: { trigger: item, start: 'top center', end: 'bottom center', scrub: 1.5 },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-black to-transparent" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Code2 className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-xs uppercase tracking-[0.2em] font-bold">Web Development</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Web Solutions</span>
          </h2>
          <p className="text-lg text-gray-400">Stunning interfaces with seamless interactions</p>
        </motion.div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div key={project.id} data-project className="group relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="absolute inset-0 transition-all duration-500 group-hover:bg-white/[0.02]"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}08, transparent)`,
                  }}
                />

                <div className="relative p-8 md:p-12">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${project.color}20` }}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <Globe className="w-6 h-6" style={{ color: project.color }} />
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-bold text-white/40">0{index + 1}</span>
                          <h3 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-gray-400">{project.description}</p>
                      </div>
                    </div>
                    <motion.div
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all"
                      whileHover={{ scale: 1.1, rotate: -45 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                    </motion.div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-white tracking-wider"
                        style={{
                          backgroundColor: `${project.color}20`,
                          border: `1px solid ${project.color}30`,
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevShowcase;

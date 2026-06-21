import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, TrendingUp, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AIModel {
  id: number;
  name: string;
  description: string;
  accuracy: number;
  color: string;
}

interface AIShowcaseProps {
  models: AIModel[];
}

export const AIShowcase: React.FC<AIShowcaseProps> = ({ models }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(236, 73, 153, ${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(236, 73, 153, 0.4)';
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const ctxGsap = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('[data-ai-card]');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' } }
        );
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(animId);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/10 via-black to-transparent" />

      {/* Neural Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-xs uppercase tracking-[0.2em] font-bold">AI & Machine Learning</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Artificial <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Intelligence</span>
          </h2>
          <p className="text-lg text-gray-400">Cutting-edge ML models and predictive analytics</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model) => (
            <div key={model.id} data-ai-card className="group relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 h-full">
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${model.color}20` }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <Cpu className="w-7 h-7" style={{ color: model.color }} />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                  {model.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{model.description}</p>

                {/* Accuracy Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Accuracy</span>
                    <motion.span
                      className="font-bold"
                      style={{ color: model.color }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      {model.accuracy}%
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: model.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${model.accuracy}%` }}
                      transition={{ duration: 1.5, delay: 0.3, ease: 'power3.out' }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Precision', value: `${model.accuracy - 2}%` },
                    { label: 'Recall', value: `${model.accuracy - 5}%` },
                  ].map((metric) => (
                    <div key={metric.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                      <div className="text-lg font-bold text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: model.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;

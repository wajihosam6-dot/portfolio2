import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Zap, TrendingUp } from 'lucide-react';

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
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
    }> = [];

    // Create particles
    models.forEach((model, index) => {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: model.color,
          size: Math.random() * 2 + 1,
        });
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Scroll-driven animation
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          AI & Machine Learning
        </h2>
        <p className="text-lg text-gray-600 mb-16">Advanced AI solutions and predictive analytics</p>

        {/* Particle Canvas */}
        <div
          ref={containerRef}
          className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-96"
            style={{ display: 'block' }}
          />
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <div
              key={model.id}
              className="group relative overflow-hidden rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${model.color}10, ${model.color}05)`,
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${model.color}25` }}
              >
                <Brain className="w-6 h-6" style={{ color: model.color }} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {model.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{model.description}</p>

              {/* Accuracy Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-600">Accuracy</span>
                  <span className="text-sm font-bold text-gray-900">{model.accuracy}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${model.accuracy}%`,
                      backgroundColor: model.color,
                    }}
                  ></div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex gap-2">
                <div className="flex-1 text-center p-2 rounded-lg bg-white/50">
                  <div className="text-xs text-gray-600">Training</div>
                  <div className="text-sm font-bold text-gray-900">Complete</div>
                </div>
                <div className="flex-1 text-center p-2 rounded-lg bg-white/50">
                  <div className="text-xs text-gray-600">Status</div>
                  <div className="text-sm font-bold" style={{ color: model.color }}>
                    Active
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;

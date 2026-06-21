import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Gauge, Activity, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AutomationFlow {
  id: number;
  name: string;
  steps: string[];
  color: string;
}

interface AutomationShowcaseProps {
  flows: AutomationFlow[];
}

/* ─── Particle Canvas Engine ─── */
function ParticleCanvas({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
    }[] = [];

    const spawnRate = 3;
    let frame = 0;

    const anim = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      frame++;

      // Spawn particles along top edge
      if (frame % spawnRate === 0 && particles.length < 120) {
        const path = Math.random();
        let x: number, y: number, vx: number, vy: number;
        if (path < 0.33) {
          x = Math.random() * canvas.offsetWidth * 0.3;
          y = Math.random() * canvas.offsetHeight;
          vx = 0.8 + Math.random() * 0.6;
          vy = (Math.random() - 0.5) * 0.3;
        } else if (path < 0.66) {
          x = canvas.offsetWidth * 0.7 + Math.random() * canvas.offsetWidth * 0.3;
          y = Math.random() * canvas.offsetHeight;
          vx = -0.8 - Math.random() * 0.6;
          vy = (Math.random() - 0.5) * 0.3;
        } else {
          x = Math.random() * canvas.offsetWidth;
          y = 0;
          vx = (Math.random() - 0.5) * 0.5;
          vy = 0.5 + Math.random() * 0.5;
        }

        particles.push({
          x, y, vx, vy,
          life: 0,
          maxLife: 120 + Math.random() * 80,
          size: 1 + Math.random() * 2,
        });
      }

      // Update & draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = p.life < 20 ? p.life / 20 : p.life > p.maxLife - 20 ? (p.maxLife - p.life) / 20 : 1;

        if (p.life > p.maxLife || p.x < -20 || p.x > canvas.offsetWidth + 20 || p.y < -20 || p.y > canvas.offsetHeight + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', `, ${alpha * 0.6})`).replace('rgb', 'rgba');
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', `, ${alpha * 0.15})`).replace('rgb', 'rgba');
        ctx.fill();
      }

      // Connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const alpha = 0.15 * (1 - dist / 60);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(anim);
    };
    const id = requestAnimationFrame(anim);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ─── Processing Node ─── */
function ProcessingNode({
  step,
  index,
  color,
}: {
  step: string;
  index: number;
  color: string;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: false, amount: 0.3 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setActive(true), index * 300);
      return () => clearTimeout(t);
    }
    setActive(false);
  }, [inView, index]);

  return (
    <div ref={nodeRef} className="flex flex-col items-center flex-shrink-0">
      {/* Node Circle */}
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}30, ${color}08)`,
          border: `2px solid ${active ? color : `${color}30`}`,
          boxShadow: active ? `0 0 40px ${color}40, inset 0 0 30px ${color}20` : 'none',
        }}
        whileHover={{ scale: 1.15 }}
        animate={active ? {
          scale: [1, 1.08, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        } : {}}
      >
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{ border: `1px solid ${color}20` }}
          animate={active ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Core */}
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: active ? color : `${color}50` }}
          animate={active ? {
            scale: [1, 1.5, 1],
            boxShadow: [`0 0 0px ${color}`, `0 0 20px ${color}`, `0 0 0px ${color}`],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Index badge */}
        <div
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {index + 1}
        </div>
      </motion.div>

      {/* Label */}
      <motion.span
        className="mt-3 text-xs font-bold text-center leading-tight px-2"
        style={{ color: active ? color : '#6B7280' }}
        animate={active ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.6 }}
      >
        {step}
      </motion.span>
    </div>
  );
}

/* ─── Gauge Meter ─── */
function GaugeMeter({ value, label, color }: { value: number; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.fromTo(
      el,
      { textContent: 0 },
      {
        textContent: value,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        snap: { textContent: 1 },
        onUpdate: function () {
          const v = Math.round(Number(this.targets()[0].textContent));
          setDisplayed(v);
        },
      }
    );
  }, [value]);

  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (displayed / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <motion.circle
          cx="36" cy="36" r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="36" textAnchor="middle" dominantBaseline="central"
          fill="white" fontSize="12" fontWeight="bold">
          {displayed}%
        </text>
      </svg>
      <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ─── Pipeline SVG ─── */
function PipelineSVG({ color, steps }: { color: string; steps: string[] }) {
  const totalWidth = steps.length * 96 + (steps.length - 1) * 40;
  const midY = 48;

  return (
    <svg width={totalWidth} height="96" className="w-full" style={{ minWidth: totalWidth }}>
      <defs>
        <linearGradient id={`pulse-${color.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="50%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Main pipeline */}
      <motion.path
        d={
          `M 0,${midY} ` +
          steps
            .map((_, i) => {
              const cx = i * 136 + 48;
              if (i < steps.length - 1) {
                const nextCx = (i + 1) * 136 + 48;
                const midCx = (cx + nextCx) / 2;
                return `C ${midCx},${midY - 20} ${midCx},${midY + 20} ${nextCx},${midY}`;
              }
              return '';
            })
            .join(' ')
        }
        fill="none"
        stroke={`${color}20`}
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Animated pulse along pipeline */}
      {steps.map((_, i) => {
        if (i >= steps.length - 1) return null;
        const x = i * 136 + 48 + 68;
        return (
          <motion.ellipse
            key={i}
            cx={x}
            cy={midY}
            rx="20"
            ry="6"
            fill={`url(#pulse-${color.replace('#', '')})`}
            animate={{
              x: [x - 68, x + 68],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Power nodes */}
      {steps.map((_, i) => (
        <motion.circle
          key={i}
          cx={i * 136 + 48}
          cy={midY}
          r="4"
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
        />
      ))}
    </svg>
  );
}

/* ─── Main Component ─── */
export const AutomationShowcase: React.FC<AutomationShowcaseProps> = ({ flows }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden min-h-[200vh]">
      {/* Deep tech background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/15 via-black to-red-950/10" />
        {/* Circuit grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Radial spotlight */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, #FF6B35, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Particle Canvas per flow */}
      {flows.map((f) => (
        <ParticleCanvas key={f.id} color={f.color} />
      ))}

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Cpu className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-xs uppercase tracking-[0.2em] font-bold">
              Automation Engine
            </span>
          </motion.div>
          <h2
            className="text-5xl md:text-7xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Workflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">Automation</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Intelligent orchestration engines powering your business processes in real-time
          </p>
        </motion.div>

        {/* Automation Flows */}
        <div className="space-y-24">
          {flows.map((flow, flowIndex) => (
            <div key={flow.id} className="relative">
              {/* Flow Engine Card */}
              <motion.div
                className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: flowIndex * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Engine glow border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  whileHover={{ boxShadow: `inset 0 0 60px ${flow.color}10` }}
                  transition={{ duration: 0.5 }}
                />

                {/* Header with engine stats */}
                <div className="relative p-8 md:p-10 border-b border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      {/* Engine Icon with spin */}
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${flow.color}30, ${flow.color}08)`,
                          border: `1px solid ${flow.color}30`,
                        }}
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Cpu className="w-8 h-8" style={{ color: flow.color }} />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{flow.name}</h3>
                        <div className="flex items-center gap-3">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 text-sm font-semibold">
                            {flow.steps.length} stages · Active
                          </span>
                          <motion.div
                            className="w-2 h-2 rounded-full bg-emerald-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="flex gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-black" style={{ color: flow.color }}>{flow.steps.length * 2.5}x</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Speed Boost</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-400">99.9%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pipeline visualization */}
                <div className="p-8 md:p-10">
                  {/* SVG Pipeline */}
                  <div className="overflow-x-auto pb-6">
                    <PipelineSVG color={flow.color} steps={flow.steps} />
                  </div>

                  {/* Processing Nodes */}
                  <div className="flex justify-between items-start gap-4 md:gap-8 overflow-x-auto pb-4">
                    {flow.steps.map((step, idx) => (
                      <ProcessingNode
                        key={idx}
                        step={step}
                        index={idx}
                        color={flow.color}
                      />
                    ))}
                  </div>

                  {/* Performance Gauges */}
                  <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-6">
                      <Gauge className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Performance Metrics
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <GaugeMeter value={95} label="Efficiency" color={flow.color} />
                      <GaugeMeter value={88} label="Throughput" color="#0066FF" />
                      <GaugeMeter value={92} label="Accuracy" color="#10B981" />
                      <GaugeMeter value={78} label="Latency" color="#7C3AED" />
                    </div>
                  </div>
                </div>

                {/* Bottom pipeline glow */}
                <div
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: flow.color }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationShowcase;

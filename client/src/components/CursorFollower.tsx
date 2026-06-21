import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouse = { x: -100, y: -100 };
    let trail: { x: number; y: number; age: number }[] = [];
    const MAX_TRAIL = 12;
    let lastMove = 0;
    let rafId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      lastMove = Date.now();
      if (!rafId) rafId = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', () => { mouse = { x: -100, y: -100 }; });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.unshift({ x: mouse.x, y: mouse.y, age: 0 });
      if (trail.length > MAX_TRAIL) trail.pop();

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.age++;
        const progress = 1 - p.age / MAX_TRAIL;
        ctx.beginPath();
        ctx.arc(p.x, p.y, progress * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${progress * 0.3})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 102, 255, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#0066FF';
      ctx.fill();

      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 30);
      g.addColorStop(0, 'rgba(0, 102, 255, 0.05)');
      g.addColorStop(1, 'rgba(0, 102, 255, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      if (Date.now() - lastMove < 2000) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}

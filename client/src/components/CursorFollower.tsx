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
    const MAX_TRAIL = 18;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', () => { mouse = { x: -100, y: -100 }; });

    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.unshift({ x: mouse.x, y: mouse.y, age: 0 });
      if (trail.length > MAX_TRAIL) trail.pop();

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.age++;
        const progress = 1 - p.age / MAX_TRAIL;
        const alpha = progress * 0.35;
        const radius = progress * 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${alpha})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 102, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#0066FF';
      ctx.fill();

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 40);
      gradient.addColorStop(0, 'rgba(0, 102, 255, 0.06)');
      gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

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

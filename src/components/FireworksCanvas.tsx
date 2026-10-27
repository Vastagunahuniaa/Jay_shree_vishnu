import React, { useEffect, useRef } from 'react';

interface FireworksProps {
  active?: boolean;
  onFinished?: () => void;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  trail: { x: number; y: number; alpha: number }[];
}

const GOLDEN_FIREWORK_COLORS = [
  '#FFF7E7', // Radiant White
  '#F7E6B0', // Champagne Gold
  '#D6B56D', // Antique Gold
  '#FFD700', // Imperial Gold
  '#F59E0B', // Saffron Spark
];

export const FireworksCanvas: React.FC<FireworksProps> = ({
  active = true,
  onFinished,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isMounted = true;
    let rockets: Rocket[] = [];
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createBurst = (x: number, y: number, baseColor: string) => {
      const particleCount = window.innerWidth < 640 ? 45 : 65;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 4.5 + 1.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.016,
          color: Math.random() > 0.3 ? baseColor : GOLDEN_FIREWORK_COLORS[Math.floor(Math.random() * GOLDEN_FIREWORK_COLORS.length)],
          size: Math.random() * 2.2 + 1.2,
        });
      }
    };

    const launchRocket = (fromLeft: boolean) => {
      const w = canvas.width;
      const h = canvas.height;
      const x = fromLeft ? w * 0.12 + Math.random() * (w * 0.18) : w * 0.88 - Math.random() * (w * 0.18);
      const targetY = h * (0.2 + Math.random() * 0.32);
      const targetX = fromLeft ? w * 0.28 + Math.random() * (w * 0.2) : w * 0.72 - Math.random() * (w * 0.2);
      const distanceY = h - targetY;
      const speed = Math.sqrt(2 * 0.1 * distanceY) * (0.95 + Math.random() * 0.1);
      const vx = (targetX - x) / (speed / 0.1);

      rockets.push({
        x,
        y: h,
        vx,
        vy: -speed,
        targetY,
        color: GOLDEN_FIREWORK_COLORS[Math.floor(Math.random() * GOLDEN_FIREWORK_COLORS.length)],
        trail: [],
      });
    };

    // Orchestrated celebration volley: Launch left and right
    const timeouts: NodeJS.Timeout[] = [
      setTimeout(() => launchRocket(true), 150),
      setTimeout(() => launchRocket(false), 380),
      setTimeout(() => launchRocket(true), 750),
      setTimeout(() => launchRocket(false), 1050),
      setTimeout(() => launchRocket(true), 1400),
      setTimeout(() => launchRocket(false), 1600),
    ];

    const render = () => {
      if (!isMounted) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';

      // Update and draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.shift();

        // Trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (t / r.trail.length) * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254, 240, 138, ${(t / r.trail.length) * 0.75})`;
          ctx.fill();
        }

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.1; // gravity

        // Rocket head spark
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF';
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= -0.5) {
          createBurst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update and draw burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07; // gentle gravity
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resize);
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, onFinished]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-25 ${className}`}
      style={{ transition: 'opacity 0.6s ease' }}
    />
  );
};

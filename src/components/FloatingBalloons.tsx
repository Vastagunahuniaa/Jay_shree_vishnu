import React, { useMemo } from 'react';

interface FloatingBalloonsProps {
  active?: boolean;
}

interface BalloonItem {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
}

const BALLOON_COLORS = [
  '#D6B56D', // Antique Gold
  '#F7E6B0', // Champagne Gold
  '#800020', // Royal Maroon
  '#D4AF37', // Metallic Gold
  '#F59E0B', // Saffron Gold
  '#E11D48', // Ruby Rose
];

export const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({ active = true }) => {
  // Tasteful small group of 6 balloons only
  const balloons = useMemo<BalloonItem[]>(() => {
    const positions = [12, 28, 48, 65, 80, 92];
    return positions.map((left, i) => ({
      id: i,
      left,
      duration: 4.8 + (i % 3) * 0.7,
      delay: i * 0.28,
      size: 40 + (i % 3) * 8,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-[-90px]"
          style={{
            left: `${b.left}%`,
            animation: `balloonFloatSingle ${b.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${b.delay}s forwards`,
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{
              animation: `balloonSwayLight ${2.5 + (b.id % 2)}s ease-in-out infinite alternate`,
            }}
          >
            {/* Balloon SVG */}
            <svg
              width={b.size}
              height={b.size * 1.25}
              viewBox="0 0 50 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
            >
              <defs>
                <radialGradient id={`balloonGrad-${b.id}`} cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                  <stop offset="35%" stopColor={b.color} />
                  <stop offset="100%" stopColor="#1E0206" />
                </radialGradient>
              </defs>
              <ellipse cx="25" cy="27" rx="22" ry="26" fill={`url(#balloonGrad-${b.id})`} />
              <polygon points="25,53 21,58 29,58" fill={b.color} />
              <path
                d="M25,58 Q22,65 25,72 T27,82"
                stroke="rgba(247, 230, 176, 0.5)"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes balloonFloatSingle {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          85% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(-115vh);
            opacity: 0;
          }
        }
        @keyframes balloonSwayLight {
          0% {
            transform: translateX(-10px) rotate(-4deg);
          }
          100% {
            transform: translateX(10px) rotate(4deg);
          }
        }
      `}</style>
    </div>
  );
};

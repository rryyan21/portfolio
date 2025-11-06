"use client";

import { useMemo } from "react";

export default function InteractiveBackground() {
  // Generate gradient orbs with variety of colors (deterministic to avoid hydration)
  const orbs = useMemo(() => {
    const positions = [
      { top: 20, left: 15, size: 300, color: 'blue' },
      { top: 60, left: 70, size: 280, color: 'purple' },
      { top: 80, left: 25, size: 320, color: 'teal' },
      { top: 30, left: 80, size: 290, color: 'blue' },
    ];
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: positions[i].size,
      top: positions[i].top,
      left: positions[i].left,
      delay: i * 2,
      color: positions[i].color,
    }));
  }, []);

  // Generate fewer floating shapes with color variety
  const floatingShapes = useMemo(() => {
    const positions = [
      { top: 15, left: 20, size: 100, anim: 'randomFloat', duration: 25, color: 'blue' },
      { top: 45, left: 8, size: 110, anim: 'randomFloat2', duration: 30, color: 'purple' },
      { top: 70, left: 35, size: 120, anim: 'randomFloat3', duration: 28, color: 'teal' },
      { top: 25, left: 65, size: 130, anim: 'randomFloat', duration: 32, color: 'blue' },
      { top: 55, left: 80, size: 140, anim: 'randomFloat2', duration: 27, color: 'purple' },
    ];
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      ...positions[i],
      delay: i * 1.5,
    }));
  }, []);

  const getColorGradient = (color: string) => {
    switch (color) {
      case 'blue':
        return 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 55%)';
      case 'purple':
        return 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(168, 85, 247, 0.1) 30%, transparent 55%)';
      case 'teal':
        return 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, rgba(45, 212, 191, 0.1) 30%, transparent 55%)';
      default:
        return 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 55%)';
    }
  };

  const getShapeColorGradient = (color: string) => {
    switch (color) {
      case 'blue':
        return 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)';
      case 'purple':
        return 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)';
      case 'teal':
        return 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(45, 212, 191, 0.08) 50%, transparent 70%)';
      default:
        return 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)';
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient orbs with less spread/fade */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
            background: getColorGradient(orb.color),
            transform: 'translate(-50%, -50%)',
            animation: `gentle-pulse ${8 + orb.id * 2}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Fewer floating shapes with color variety */}
      {floatingShapes.map((shape) => (
        <div
          key={`shape-${shape.id}`}
          className="absolute rounded-full"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            background: getShapeColorGradient(shape.color),
            animation: `${shape.anim} ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

import React, { useMemo } from 'react';

/**
 * PollenParticles
 * Partículas doradas flotantes que simulan polen iluminado por el sol del atardecer.
 * Totalmente ligeras y aceleradas por CSS / GPU.
 */
export const PollenParticles = () => {
  // Generar un conjunto estático de partículas para rendimiento óptimo
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.6 + (i % 5) * 3) % 96}%`,
      top: `${(i * 7.3 + (i % 4) * 8) % 92}%`,
      size: 3 + (i % 4) * 1.5,
      delay: `${(i * 0.45) % 6}s`,
      duration: `${6 + (i % 5) * 1.8}s`,
      opacity: 0.25 + (i % 3) * 0.25,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 animate-float-pollen shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

import React from 'react';

/**
 * WildflowerSVG
 * Florecilla silvestre delicada (tipo margarita de campo) para enriquecer
 * la base del jardín y darle vida y variedad natural a la pradera.
 */
export const WildflowerSVG = ({ flowerId = 1, height = 140, curve = 5, colorType = 'cream' }) => {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  
  const petalGradId = `wf-petal-${flowerId}`;
  const centerGradId = `wf-center-${flowerId}`;

  return (
    <svg
      viewBox="0 0 100 170"
      className="w-full h-full overflow-visible select-none pointer-events-none drop-shadow-sm"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id={petalGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          {colorType === 'cream' ? (
            <>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FEF9C3" />
              <stop offset="100%" stopColor="#FDE047" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="70%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </>
          )}
        </linearGradient>

        <radialGradient id={centerGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </radialGradient>
      </defs>

      {/* Tallo fino */}
      <path
        d={`M 50 170 Q ${50 + curve} ${170 - height * 0.5} 50 ${170 - height}`}
        fill="none"
        stroke="#15803D"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="animate-bloom-stem-stroke"
      />

      {/* Hojita lateral pequeña */}
      <path
        d={`M ${50 + curve * 0.3} ${170 - height * 0.38} Q ${50 + curve * 0.3 - 15} ${170 - height * 0.44} ${50 + curve * 0.3 - 18} ${170 - height * 0.46} Q ${50 + curve * 0.3 - 12} ${170 - height * 0.34} ${50 + curve * 0.3} ${170 - height * 0.38}`}
        fill="#16A34A"
        className="animate-leaf-left"
      />

      {/* Cabeza de la flor */}
      <g transform={`translate(50, ${170 - height})`}>
        {/* Pétalos de margarita silvestre */}
        {petals.map((angle, idx) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <g
              className="sunflower-single-petal"
              style={{
                animation: `organicPetalUnfurl 1.3s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + idx * 0.05}s both`,
                transformOrigin: '0px 0px',
              }}
            >
              <ellipse
                cx="0"
                cy="-13"
                rx="4.5"
                ry="12"
                fill={`url(#${petalGradId})`}
                opacity="0.95"
              />
            </g>
          </g>
        ))}

        {/* Centro de la florecilla */}
        <circle
          cx="0"
          cy="0"
          r="7"
          fill={`url(#${centerGradId})`}
          className="sunflower-center-disc"
          style={{
            animation: 'organicDiscBloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both',
            transformOrigin: '0px 0px',
          }}
        />
      </g>
    </svg>
  );
};

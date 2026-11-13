import React, { useMemo } from 'react';

/**
 * SunflowerSVG
 * Girasol vectorial multicapa con florecimiento orgánico y realista:
 * - Técnica inspirada en "Code With Anurag": capas concéntricas de pétalos con desfase angular
 * - Despliegue en espiral de cada pétalo con delay individualizado y jitter natural
 * - Tallo que brota orgánicamente desde la tierra
 * - Hojas que se despliegan en curvatura suave
 * - Halo cálido que respira e ilumina la flor
 * - Receptáculo central con espiral áurea de Fermat (Filotaxis)
 */

const PETAL_LAYERS = [
  {
    name: 'outer',
    count: 20,
    delayBase: 0.62,
    delayStep: 0.038,
    offset: 0,
    path: "M 0 -24 C -14 -48 -15 -84 0 -96 C 15 -84 14 -48 0 -24 Z",
    gradSuffix: "outer",
    scaleJitter: [0.96, 1.04, 0.98, 1.02, 0.95],
    opacity: 0.98,
  },
  {
    name: 'middle',
    count: 20,
    delayBase: 0.92,
    delayStep: 0.038,
    offset: 9, // Desfase para que los pétalos queden perfectamente intercalados
    path: "M 0 -22 C -12 -44 -13 -76 0 -86 C 13 -76 12 -44 0 -22 Z",
    gradSuffix: "middle",
    scaleJitter: [1.02, 0.96, 1.0, 0.97, 1.03],
    opacity: 0.96,
  },
  {
    name: 'inner',
    count: 16,
    delayBase: 1.22,
    delayStep: 0.042,
    offset: 4.5,
    path: "M 0 -20 C -10 -38 -11 -60 0 -68 C 11 -60 10 -38 0 -20 Z",
    gradSuffix: "inner",
    scaleJitter: [0.95, 1.02, 0.98, 1.01],
    opacity: 0.94,
  }
];

export const SunflowerSVG = ({
  flowerId = 1,
  stemHeight = 340,
  stemCurve = 0,
  headAngle = 0,
  isSelected = false
}) => {
  // Filotaxis / Espiral áurea de Fermat para las semillas del centro
  const seeds = useMemo(() => {
    const numSeeds = 52;
    const goldenAngle = 137.5 * (Math.PI / 180);
    return Array.from({ length: numSeeds }, (_, i) => {
      const r = Math.sqrt(i) * 3.7;
      const theta = i * goldenAngle;
      const cx = 100 + r * Math.cos(theta);
      const cy = 100 + r * Math.sin(theta);
      return { cx, cy, key: i };
    });
  }, []);

  const stemBaseY = 100 + stemHeight;
  const controlX = 100 + stemCurve;
  const controlY = 100 + stemHeight * 0.55;

  return (
    <svg
      viewBox={`0 0 200 ${stemBaseY + 30}`}
      className="w-full h-full overflow-visible select-none pointer-events-none drop-shadow-md"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        {/* Gradiente pétalos exteriores: sol brillante con matices cálidos */}
        <linearGradient id={`petal-outer-grad-${flowerId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FDE68A" />
          <stop offset="65%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Gradiente pétalos intermedios: oro dorado y ámbar */}
        <linearGradient id={`petal-middle-grad-${flowerId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="80%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Gradiente pétalos interiores: ámbar profundo terciopelo */}
        <linearGradient id={`petal-inner-grad-${flowerId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Gradiente tallo verde vivo */}
        <linearGradient id={`stem-grad-${flowerId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="50%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>

        {/* Gradiente hojas verdes radiantes */}
        <linearGradient id={`leaf-grad-${flowerId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="45%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>

        {/* Gradiente centro semillas */}
        <radialGradient id={`seed-center-grad-${flowerId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="60%" stopColor="#451A03" />
          <stop offset="92%" stopColor="#351402" />
          <stop offset="100%" stopColor="#1E0A02" />
        </radialGradient>

        {/* Halo resplandor cálido floral */}
        <radialGradient id={`head-glow-${flowerId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
        </radialGradient>

        {/* Filtro glow para selección o hover */}
        <filter id={`warm-glow-${flowerId}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. TALLO QUE CRECE ORGÁNICAMENTE DESDE EL SUELO */}
      <g>
        <path
          d={`M 100 ${stemBaseY} Q ${controlX} ${controlY} 100 100`}
          fill="none"
          stroke={`url(#stem-grad-${flowerId})`}
          strokeWidth="11"
          strokeLinecap="round"
          className="animate-bloom-stem-stroke"
        />
      </g>

      {/* 2. HOJA IZQUIERDA CON DESPLIEGUE SUAVE */}
      <g
        className="animate-leaf-left"
        transform={`translate(${100 + stemCurve * 0.35}, ${100 + stemHeight * 0.42}) rotate(${-30 + stemCurve * 0.3})`}
      >
        <path
          d="M 0 0 C -45 -10 -55 30 0 45 C -15 25 -25 10 0 0"
          fill={`url(#leaf-grad-${flowerId})`}
          className="opacity-95"
        />
        <path
          d="M 0 0 Q -25 15 -35 25"
          fill="none"
          stroke="#14532D"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </g>

      {/* 3. HOJA DERECHA CON DESPLIEGUE SUAVE */}
      <g
        className="animate-leaf-right"
        transform={`translate(${100 + stemCurve * 0.65}, ${100 + stemHeight * 0.68}) rotate(${35 - stemCurve * 0.2})`}
      >
        <path
          d="M 0 0 C 50 -12 60 32 0 48 C 18 28 28 12 0 0"
          fill={`url(#leaf-grad-${flowerId})`}
          className="opacity-95"
        />
        <path
          d="M 0 0 Q 30 16 40 28"
          fill="none"
          stroke="#14532D"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </g>

      {/* 4. CABEZA DEL GIRASOL Y PÉTALOS EN ESPIRAL MULTICAPA */}
      <g
        transform={`translate(100, 100) rotate(${headAngle})`}
        filter={isSelected ? `url(#warm-glow-${flowerId})` : undefined}
      >
        {/* Halo resplandeciente atmosférico detrás de los pétalos */}
        <circle
          cx="0"
          cy="0"
          r="92"
          fill={`url(#head-glow-${flowerId})`}
          className="sunflower-glow-aura"
        />

        {/* Sombra base suave */}
        <circle cx="0" cy="0" r="76" fill="rgba(69, 26, 3, 0.09)" />

        {/* CAPAS DE PÉTALOS MULTICAPA ANIMADAS INDIVIDUALMENTE */}
        {PETAL_LAYERS.map((layer) => {
          const angleStep = 360 / layer.count;
          return (
            <g key={`layer-${layer.name}`}>
              {Array.from({ length: layer.count }, (_, i) => {
                const angle = layer.offset + i * angleStep;
                const delay = layer.delayBase + (i * layer.delayStep);
                const dur = 1.6 + ((i % 5) * 0.08);
                const scale = layer.scaleJitter[i % layer.scaleJitter.length];

                return (
                  <g
                    key={`petal-${layer.name}-${i}`}
                    transform={`rotate(${angle})`}
                  >
                    <g
                      className="sunflower-single-petal"
                      style={{
                        animation: `organicPetalUnfurl ${dur}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
                        transformOrigin: '0px 0px',
                      }}
                    >
                      <path
                        d={layer.path}
                        fill={`url(#petal-${layer.gradSuffix}-grad-${flowerId})`}
                        transform={`scale(${scale})`}
                        opacity={layer.opacity}
                      />
                    </g>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Anillo de contraste bajo el disco central */}
        <circle cx="0" cy="0" r="38" fill="rgba(69, 26, 3, 0.35)" />

        {/* DISCO CENTRAL Y SEMILLAS FLORECIENTES */}
        <g
          className="sunflower-center-disc"
          style={{
            animation: 'organicDiscBloom 1.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.78s both',
            transformOrigin: '0px 0px',
          }}
        >
          {/* Receptáculo de Semillas */}
          <circle
            cx="0"
            cy="0"
            r="36"
            fill={`url(#seed-center-grad-${flowerId})`}
            stroke="#B45309"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* Semillas doradas dispuestas en espiral áurea */}
          <g transform="translate(-100, -100)">
            {seeds.map((s) => (
              <circle
                key={s.key}
                cx={s.cx}
                cy={s.cy}
                r={s.key > 35 ? 1.6 : 1.3}
                fill="#FBBF24"
                opacity={0.35 + (s.key % 3) * 0.22}
              />
            ))}
          </g>

          {/* Corona dorada sutil */}
          <circle
            cx="0"
            cy="0"
            r="34"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeDasharray="2 3"
            opacity="0.65"
          />
        </g>
      </g>
    </svg>
  );
};

import React from 'react';

interface MandalaHaloProps {
  size?: number | string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

/**
 * Concentric-ring sacred geometry mandala halo.
 * Restrained antique gold line work with lotus petals, rays, and bindu accents.
 */
export const MandalaHalo: React.FC<MandalaHaloProps> = ({
  size = 380,
  className = '',
  strokeColor = '#C9A227',
  strokeWidth = 1,
  opacity = 0.55,
}) => {
  // Generate 16 radial rays and 12 lotus petals
  const petals = Array.from({ length: 16 }, (_, i) => i * (360 / 16));
  const innerPetals = Array.from({ length: 8 }, (_, i) => i * (360 / 8));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      style={{ opacity }}
      role="presentation"
      aria-hidden="true"
    >
      <g
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outermost dotted boundary ring */}
        <circle cx="200" cy="200" r="190" strokeDasharray="2 6" />

        {/* Concentric hairline rings */}
        <circle cx="200" cy="200" r="176" strokeWidth={strokeWidth * 0.75} />
        <circle cx="200" cy="200" r="158" strokeWidth={strokeWidth * 0.5} />
        <circle cx="200" cy="200" r="128" />
        <circle cx="200" cy="200" r="96" strokeDasharray="3 5" />
        <circle cx="200" cy="200" r="64" />
        <circle cx="200" cy="200" r="32" strokeWidth={strokeWidth * 0.75} />

        {/* Central Bindu */}
        <circle cx="200" cy="200" r="3" fill={strokeColor} />

        {/* 16 Outer Geometric Lotus Petals */}
        {petals.map((angle) => (
          <g key={angle} transform={`rotate(${angle} 200 200)`}>
            {/* Triangular spear petal */}
            <path d="M200 24 L208 42 L200 56 L192 42 Z" strokeWidth={strokeWidth * 0.8} />
            <line x1="200" y1="56" x2="200" y2="72" strokeWidth={strokeWidth * 0.6} />
            <circle cx="200" cy="20" r="1.5" fill={strokeColor} />
            {/* Scallop arch between petals */}
            <path
              d="M192 42 C184 32 176 32 168 42"
              strokeWidth={strokeWidth * 0.5}
            />
          </g>
        ))}

        {/* 8 Inner Sacred Petals */}
        {innerPetals.map((angle) => (
          <g key={`inner-${angle}`} transform={`rotate(${angle + 22.5} 200 200)`}>
            <path
              d="M200 104 C212 116 216 136 200 152 C184 136 188 116 200 104 Z"
              strokeWidth={strokeWidth * 0.75}
            />
            <circle cx="200" cy="128" r="1.2" fill={strokeColor} />
          </g>
        ))}
      </g>
    </svg>
  );
};

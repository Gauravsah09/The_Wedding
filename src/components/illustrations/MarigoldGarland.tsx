import React from 'react';

interface MarigoldGarlandProps {
  orientation?: 'left' | 'right';
  className?: string;
  size?: number;
}

/**
 * Hand-drawn marigold toran/garland SVG.
 * Drapes elegantly from the top corners with subtle layered petals,
 * sacred saffron (#F28C28) and antique gold (#C9A227) florets.
 */
export const MarigoldGarland: React.FC<MarigoldGarlandProps> = ({
  orientation = 'left',
  className = '',
  size = 140,
}) => {
  const isLeft = orientation === 'left';

  return (
    <div
      className={`pointer-events-none select-none ${isLeft ? 'sway-left' : 'sway-right'} ${className}`}
      style={{
        transform: isLeft ? 'none' : 'scaleX(-1)',
        transformOrigin: isLeft ? 'top left' : 'top right',
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 160 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sacred Thread Hanging Curve */}
        <path
          d="M0 0 C40 30 80 80 110 170"
          stroke="#C9A227"
          strokeWidth="1.2"
          strokeDasharray="2 3"
        />

        {/* Marigold Blossom 1 (Top Left Anchor) */}
        <g transform="translate(18, 22)">
          <circle cx="0" cy="0" r="16" fill="#F28C28" fillOpacity="0.2" />
          <path
            d="M0 -12 C5 -12 10 -8 12 0 C10 8 5 12 0 12 C-5 12 -10 8 -12 0 C-10 -8 -5 -12 0 -12 Z"
            fill="#F28C28"
          />
          <path
            d="M-8 -8 C0 -14 8 -8 10 -2 C8 6 0 10 -8 4 Z"
            stroke="#C9A227"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="0" r="5" fill="#FFE27A" />
          <circle cx="0" cy="0" r="2" fill="#4A0E1C" />
        </g>

        {/* Marigold Blossom 2 (Mid-curve) */}
        <g transform="translate(48, 62)">
          <circle cx="0" cy="0" r="18" fill="#F28C28" fillOpacity="0.18" />
          <path
            d="M-14 0 C-14 -8 -6 -14 0 -14 C6 -14 14 -8 14 0 C14 8 6 14 0 14 C-6 14 -14 8 -14 0 Z"
            fill="#F28C28"
          />
          <path
            d="M-10 -7 C-4 -12 6 -10 10 -3 C10 6 2 11 -6 8 Z"
            fill="#FFA64D"
          />
          <circle cx="0" cy="0" r="6" fill="#FFE27A" stroke="#C9A227" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="2.5" fill="#C9A227" />
        </g>

        {/* Mango Leaf Accent (Auspicious Pallava) */}
        <path
          d="M52 66 C70 70 82 86 86 102 C72 96 60 84 52 66 Z"
          fill="#4A6B34"
          fillOpacity="0.75"
          stroke="#C9A227"
          strokeWidth="0.6"
        />

        {/* Marigold Blossom 3 (Lower curve) */}
        <g transform="translate(80, 115)">
          <circle cx="0" cy="0" r="19" fill="#F28C28" fillOpacity="0.22" />
          <path
            d="M0 -15 C8 -15 15 -8 15 0 C15 8 8 15 0 15 C-8 15 -15 8 -15 0 C-15 -8 -8 -15 0 -15 Z"
            fill="#F28C28"
          />
          <path
            d="M-11 -8 C-2 -13 9 -9 11 -1 C9 8 0 12 -8 8 Z"
            fill="#FFA64D"
            stroke="#C9A227"
            strokeWidth="0.75"
          />
          <circle cx="0" cy="0" r="6" fill="#FFE27A" />
          <circle cx="0" cy="0" r="2" fill="#4A0E1C" />
        </g>

        {/* Marigold Blossom 4 (Pendant Tip) */}
        <g transform="translate(110, 172)">
          <circle cx="0" cy="0" r="16" fill="#F28C28" fillOpacity="0.25" />
          <path
            d="M0 -12 C6 -12 12 -6 12 0 C12 6 6 12 0 12 C-6 12 -12 6 -12 0 C-12 -6 -6 -12 0 -12 Z"
            fill="#F28C28"
          />
          <circle cx="0" cy="0" r="5" fill="#FFE27A" stroke="#C9A227" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="2" fill="#4A0E1C" />
        </g>

        {/* Hanging Tassel */}
        <path
          d="M110 184 L110 204 M108 204 L112 204"
          stroke="#C9A227"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

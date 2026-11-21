import React from 'react';

/**
 * Bespoke Melcome Circular Wax-Seal Emblem SVG
 * Follows Section 04 of Brand Guidelines:
 * - Primary embossed Oxblood Wax mark (#3D0C11 / #6E1B24)
 * - Celebratory Champagne Foil variant (#D4AF7A)
 * Features organic wax rim, inner double-ring, rose & heart motif, and refined "M" / couple emblem.
 */
export function WaxSealIcon({
  variant = 'oxblood', // 'oxblood' | 'foil' | 'ivory'
  size = 38,
  className = '',
  showMonogram = false,
}) {
  const isFoil = variant === 'foil';
  const isIvory = variant === 'ivory';

  const outerFill = isFoil
    ? '#D4AF7A'
    : isIvory
    ? '#F6F1EA'
    : '#3D0C11';

  const innerFill = isFoil
    ? '#3D0C11'
    : isIvory
    ? '#3D0C11'
    : '#4F1118';

  const strokeAccent = isFoil
    ? '#F6F1EA'
    : isIvory
    ? '#D4AF7A'
    : '#D4AF7A';

  const rimHighlight = isFoil
    ? '#E8CEA1'
    : isIvory
    ? '#E3D9CE'
    : '#6E1B24';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Organic Embossed Wax Seal Outer Silhouette */}
      <path
        d="M32 2.5C37.5 2.3 42.8 4.1 47.5 6.8C52.4 9.6 56.8 13.5 59.3 18.6C61.8 23.7 62.2 29.5 61.5 35.1C60.8 40.7 59.1 46.2 55.6 50.6C52.1 55 46.9 58.1 41.5 59.9C36.1 61.7 30.4 62.1 24.8 60.8C19.2 59.5 13.9 56.7 9.9 52.5C5.9 48.3 3.4 42.8 2.6 37.1C1.8 31.4 2.5 25.5 4.8 20.2C7.1 14.9 11.1 10.4 16 7.3C20.9 4.2 26.5 2.7 32 2.5Z"
        fill={outerFill}
        stroke={rimHighlight}
        strokeWidth="1.4"
      />

      {/* Inner Raised Wax Rim */}
      <circle
        cx="32"
        cy="32"
        r="23.5"
        fill={innerFill}
        stroke={strokeAccent}
        strokeWidth="1.2"
        strokeOpacity="0.85"
      />

      {/* Fine Dotted Foil / Embossed Inner Ring */}
      <circle
        cx="32"
        cy="32"
        r="20.2"
        stroke={strokeAccent}
        strokeWidth="0.75"
        strokeDasharray="1.8 2.2"
        strokeOpacity="0.65"
      />

      {showMonogram ? (
        /* Editorial Serif M Monogram with Rose & Heart Accent */
        <g>
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill={strokeAccent}
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="22"
            fontWeight="600"
            letterSpacing="0.04em"
          >
            M
          </text>
          {/* Petite Heart Motif above M */}
          <path
            d="M32 18.8C31.1 17.6 29.4 17.5 28.6 18.6C27.8 19.7 28.5 21.2 32 23.4C35.5 21.2 36.2 19.7 35.4 18.6C34.6 17.5 32.9 17.6 32 18.8Z"
            fill={strokeAccent}
            fillOpacity="0.9"
          />
        </g>
      ) : (
        /* Signature Couple Silhouette, Rose & Heart Motif (Per Brand Guidelines Section 04) */
        <g stroke={strokeAccent} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
          {/* Couple Arch / Embrace Motif */}
          <circle cx="28.5" cy="21.5" r="2.7" fill={strokeAccent} fillOpacity="0.2" />
          <circle cx="35.2" cy="20.2" r="2.8" fill={strokeAccent} fillOpacity="0.2" />
          {/* Flowing Bridal Veil & Gown Line */}
          <path d="M25.8 24.5C22.5 27.5 20.2 32.5 19.5 38.5" strokeOpacity="0.85" />
          <path d="M27.5 25.2C25.5 29.8 24.2 35.2 23.5 41.2" />
          {/* Couple Torso & Joined Hands */}
          <path d="M28.5 25.2C30.2 28.5 31.2 33.8 31.2 41.2" />
          <path d="M35.5 24C37.5 28.5 38.2 34.8 38.2 41.2" />
          <path d="M29.2 30.8C31.5 31.8 33.8 31.5 35.8 29.8" />
          {/* Delicate Floating Hearts on Right */}
          <path
            d="M43.5 26.2C42.9 25.3 41.7 25.2 41.1 26C40.5 26.8 41 27.9 43.5 29.5C46 27.9 46.5 26.8 45.9 26C45.3 25.2 44.1 25.3 43.5 26.2Z"
            fill={strokeAccent}
            fillOpacity="0.3"
            strokeWidth="1.1"
          />
          {/* Bottom Rose Emblem */}
          <path
            d="M27 44.5C28.8 42.5 35.2 42.5 37 44.5C38.5 46.2 36.2 49.5 32 49.5C27.8 49.5 25.5 46.2 27 44.5Z"
            fill={strokeAccent}
            fillOpacity="0.22"
          />
          <path d="M29.8 45.8C31 44.8 33 44.8 34.2 45.8" />
        </g>
      )}
    </svg>
  );
}

export default WaxSealIcon;

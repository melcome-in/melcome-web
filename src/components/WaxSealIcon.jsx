import React from 'react';

/**
 * Official Melcome Circular Wax-Seal Emblem & Horizontal Logo Lockup
 * Uses the authentic embossed Oxblood Wax seal and MELCOME logotype asset.
 */
export function WaxSealIcon({
  variant = 'oxblood', // 'oxblood' | 'foil' | 'ivory'
  size = 40,
  className = '',
}) {
  const isFoil = variant === 'foil';

  return (
    <img
      src="./assets/wax-seal-icon.png"
      alt="Melcome Wax Seal Emblem"
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`shrink-0 select-none object-contain ${
        isFoil ? 'brightness-110 contrast-105 drop-shadow-[0_2px_8px_rgba(212,175,122,0.35)]' : ''
      } ${className}`}
    />
  );
}

export function MelcomeLogoLockup({
  variant = 'oxblood', // 'oxblood' (for light Silk Ivory surfaces) | 'foil' (for dark Oxblood Wax surfaces)
  className = 'h-10 sm:h-12 w-auto',
}) {
  const src =
    variant === 'foil'
      ? './assets/logo-horizontal-foil.png'
      : './assets/logo-horizontal.png';

  return (
    <img
      src={src}
      alt="MELCOME — Digital Wedding Invitation Studio"
      className={`select-none object-contain ${className}`}
    />
  );
}

export default WaxSealIcon;

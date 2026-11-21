import React from 'react';
import { Play, ShoppingBag, Sparkles, Eye } from 'lucide-react';
import WaxSealIcon from './WaxSealIcon';

/**
 * Invitation Demo Card Component (Section 3.D Specification — Optimized for 2-Col Mobile & 3-Col Desktop)
 * - White rounded card (`rounded-xl sm:rounded-2xl`, `border-[#E3D9CE]`, subtle hover lift `hover:-translate-y-1 transition-all`)
 * - Top Preview Area: Realistic smartphone frame with a subtle dark bezel and top speaker notch,
 *   displaying a high-resolution vertical invitation preview image (`aspect-[9/14]`, `object-cover`)
 * - Bottom Info Area (`p-3 sm:p-5`):
 *   - Theme Title (`Cormorant Garamond`, bold, `#1A0B0D`)
 *   - Tier Badge (`PREMIUM` or `STANDARD` in tiny uppercase `#8C6A6E`)
 *   - Price in INR (`₹1,999` to `₹3,999` in bold `#6E1B24`)
 *   - 2-Button Row (50/50 split):
 *     1. `Demo` button: Light cream/ivory background (`#F6F1EA`), `1px solid #E3D9CE`, Play icon, `#1A0B0D` text.
 *     2. `Buy Now` button: Solid `#3D0C11` (Oxblood Wax) background (hover `#6E1B24`), white text, with ShoppingBag icon.
 */
export default function DemoCard({ demo, onOpenPreview, onOpenOrder }) {
  return (
    <article className="demo-card group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-[#E3D9CE] bg-white shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial-hover">
      {/* Top Preview Area: Studio Backdrop + Realistic Smartphone Frame */}
      <div
        onClick={() => onOpenPreview(demo)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenPreview(demo);
          }
        }}
        aria-label={`Preview ${demo.title} interactive wedding invitation`}
        className="relative flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-b from-[#F6F1EA] via-[#EFE7DC] to-[#E6DDD0] px-2.5 pt-3.5 pb-3 sm:px-7 sm:pt-7 sm:pb-6"
      >
        {/* Subtle Editorial Arch Line in Background */}
        <div
          className="pointer-events-none absolute inset-x-3 top-2 sm:inset-x-8 sm:top-4 bottom-0 rounded-t-full border border-[#E3D9CE]/80"
          aria-hidden="true"
        />

        {/* Category Pill in Top-Left Corner */}
        <span className="absolute left-2 top-2 sm:left-4 sm:top-4 z-20 rounded-full border border-[#E3D9CE] bg-white/90 px-2 py-0.5 sm:px-2.5 text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#6E1B24] backdrop-blur-sm">
          {demo.category}
        </span>

        {/* Realistic Smartphone Frame with Dark Bezel & Top Speaker Notch */}
        <div className="relative z-10 w-full max-w-[148px] sm:max-w-[235px] rounded-[20px] sm:rounded-[32px] border-[4px] sm:border-[6px] border-[#1A0B0D] bg-[#1A0B0D] p-0.5 sm:p-1 shadow-phone ring-1 ring-[#D4AF7A]/25 transition-transform duration-500 ease-out group-hover:scale-[1.015]">
          {/* Top Speaker Notch */}
          <div className="pointer-events-none absolute left-1/2 top-1.5 sm:top-2.5 z-30 flex -translate-x-1/2 items-center gap-1 sm:gap-1.5 rounded-full bg-[#1A0B0D] px-2 sm:px-3 py-0.5">
            <span className="h-0.5 w-4 sm:h-1 sm:w-6 rounded-full bg-[#3A282A]" />
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#2E1C1E]" />
          </div>

          {/* Vertical Invitation Preview Screen (aspect-[9/14]) */}
          <div className="relative aspect-[9/14] w-full overflow-hidden rounded-[15px] sm:rounded-[24px] bg-[#3D0C11]">
            <img
              src={demo.image}
              alt={`${demo.title} wedding invitation preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Editorial Dark Luxury Gradient Overlay for Authentic Invitation Typography */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(26,11,13,0.45) 0%, rgba(61,12,17,0.18) 38%, rgba(26,11,13,0.84) 100%)',
              }}
            />

            {/* 1px Champagne Foil Inner Hairline Frame inside Phone Screen */}
            <div className="pointer-events-none absolute inset-1.5 sm:inset-2.5 rounded-[11px] sm:rounded-[18px] border border-[#D4AF7A]/45" />

            {/* Live Invitation Screen Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-2 sm:p-4 text-center text-[#F6F1EA]">
              {/* Top Monogram Seal */}
              <div className="mt-2.5 sm:mt-4 flex flex-col items-center">
                <span className="text-[6px] sm:text-[8px] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[#D4AF7A] line-clamp-1">
                  {demo.themePalette.badgeText}
                </span>
              </div>

              {/* Couple Names & Wedding Date inside Phone */}
              <div className="mb-0.5 sm:mb-1 flex flex-col items-center">
                <div className="mb-1 sm:mb-2">
                  <WaxSealIcon
                    variant={demo.category === 'Royal' ? 'foil' : 'oxblood'}
                    size={22}
                    className="sm:!w-[30px] sm:!h-[30px]"
                  />
                </div>
                <p className="hidden sm:block text-[8px] uppercase tracking-[0.22em] text-[#F6F1EA]/80">
                  Together With Their Families
                </p>
                <h4 className="mt-0.5 font-serif text-xs sm:text-xl font-semibold leading-tight text-[#F6F1EA]">
                  {demo.coupleNames}
                </h4>
                <div className="my-1 sm:my-1.5 h-[1px] w-7 sm:w-10 bg-[#D4AF7A]/70" />
                <p className="text-[7px] sm:text-[9px] font-medium tracking-[0.14em] sm:tracking-[0.18em] text-[#D4AF7A]">
                  {demo.shortDate}
                </p>
                <p className="hidden sm:block mt-0.5 text-[9px] text-[#F6F1EA]/75">
                  {demo.city}
                </p>

                {/* Hover Cue Pill inside Phone */}
                <span className="mt-1.5 sm:mt-2.5 inline-flex items-center gap-1 rounded-full border border-[#D4AF7A]/50 bg-[#3D0C11]/90 px-1.5 sm:px-2.5 py-0.5 text-[7px] sm:text-[9px] font-medium uppercase tracking-[0.1em] sm:tracking-[0.14em] text-[#F6F1EA] transition-colors duration-300 group-hover:bg-[#D4AF7A] group-hover:text-[#1A0B0D]">
                  <Eye className="h-2 w-2 sm:h-2.5 sm:w-2.5" strokeWidth={1.5} />
                  <span>Preview</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Area (padding p-3 on mobile, p-5 on sm+) */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-5">
        <div>
          {/* Top Row: Tier Badge & Price */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-0.5 sm:gap-1 rounded-md bg-[#F6F1EA] px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#8C6A6E] border border-[#E3D9CE]/70">
              {demo.tier === 'PREMIUM' && (
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-[#D4AF7A]" strokeWidth={1.5} />
              )}
              {demo.tier}
            </span>
            <span className="font-sans text-sm sm:text-lg font-bold tracking-tight text-[#6E1B24]">
              {demo.price}
            </span>
          </div>

          {/* Theme Title (Cormorant Garamond, bold, #1A0B0D) */}
          <h3 className="mt-1.5 sm:mt-2 font-serif text-base sm:text-2xl font-bold leading-snug text-[#1A0B0D] transition-colors duration-300 group-hover:text-[#6E1B24] line-clamp-1">
            {demo.title}
          </h3>

          {/* Concise Theme Description */}
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs leading-snug sm:leading-relaxed text-[#8C6A6E] line-clamp-2">
            {demo.description}
          </p>
        </div>

        {/* 2-Button Row (50/50 split) */}
        <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-1.5 sm:gap-3 pt-1">
          {/* 1. Demo Button */}
          <button
            type="button"
            onClick={() => onOpenPreview(demo)}
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-[#E3D9CE] bg-[#F6F1EA] px-2 py-2 sm:px-3.5 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-[#1A0B0D] transition-all duration-300 hover:border-[#6E1B24]/40 hover:bg-[#EFE6DC] focus:outline-none focus:ring-2 focus:ring-[#6E1B24]/20"
          >
            <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-[#6E1B24]" strokeWidth={1.5} />
            <span>Demo</span>
          </button>

          {/* 2. Buy Now Button */}
          <button
            type="button"
            onClick={() => onOpenOrder(demo)}
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-[#3D0C11] px-2 py-2 sm:px-3.5 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-[#F6F1EA] shadow-sm transition-all duration-300 hover:bg-[#6E1B24] focus:outline-none focus:ring-2 focus:ring-[#3D0C11]/30"
          >
            <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-[#D4AF7A]" strokeWidth={1.5} />
            <span className="truncate">Buy Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}

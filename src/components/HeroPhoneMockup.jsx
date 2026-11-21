import React from 'react';
import { MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react';
import WaxSealIcon from './WaxSealIcon';

/**
 * Clean Floating Smartphone Mockup for the Hero Section
 * Compact on mobile viewports, full-size on tablet/desktop viewports.
 */
export default function HeroPhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[235px] sm:max-w-[335px] select-none">
      {/* Subtle Ambient Background Aura behind the phone */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[40px] sm:rounded-[48px] opacity-60 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(212, 175, 122, 0.25), rgba(61, 12, 17, 0.08) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Realistic Smartphone Chassis */}
      <div className="relative z-10 rounded-[34px] sm:rounded-[44px] border-[6px] sm:border-[8px] border-[#1A0B0D] bg-[#3D0C11] p-1 sm:p-1.5 shadow-phone ring-1 ring-[#D4AF7A]/30">
        {/* Top Speaker Notch / Dynamic Island */}
        <div className="pointer-events-none absolute left-1/2 top-2 sm:top-3 z-30 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2 rounded-full bg-[#1A0B0D] px-3 sm:px-4 py-0.5 sm:py-1">
          <span className="h-1 w-6 sm:h-1.5 sm:w-8 rounded-full bg-[#3A282A]" />
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#2B1D1F] ring-1 ring-[#D4AF7A]/25" />
        </div>

        {/* Inner Phone Viewport */}
        <div className="relative h-[390px] sm:h-[535px] w-full overflow-hidden rounded-[26px] sm:rounded-[34px] bg-[#3D0C11] p-2 sm:p-3 text-[#1A0B0D]">
          {/* Inner Silk Ivory Arch Card with Oxblood Wax Envelope Frame */}
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] sm:rounded-[26px] border border-[#D4AF7A]/40 bg-[#F6F1EA] px-3 py-4 sm:px-4 sm:py-6 text-center shadow-inner">
            {/* Decorative Inner 1px Hairline Border */}
            <div className="pointer-events-none absolute inset-1.5 sm:inset-2 rounded-[16px] sm:rounded-[20px] border border-[#E3D9CE]" />

            {/* Top Wax Seal & Couple Header */}
            <div className="relative z-10 mt-1.5 sm:mt-2 flex flex-col items-center">
              <WaxSealIcon
                variant="oxblood"
                size={28}
                className="sm:!w-[40px] sm:!h-[40px]"
              />
              <p className="mt-1 sm:mt-2 text-[7.5px] sm:text-[9px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#8C6A6E]">
                The Wedding Invitation
              </p>
              <h3 className="mt-0.5 sm:mt-1 font-serif text-lg sm:text-[26px] font-semibold leading-tight text-[#1A0B0D]">
                Lauria Eriten
                <span className="block font-serif text-xs sm:text-sm font-normal italic text-[#6E1B24]">
                  and
                </span>
                Mark Tfiown
              </h3>
            </div>

            {/* Editorial Arch Photo Window */}
            <div className="relative z-10 mx-auto my-1 sm:my-2 w-full max-w-[162px] sm:max-w-[215px]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[36px] sm:rounded-t-[48px] rounded-b-lg sm:rounded-b-xl border border-[#D4AF7A]/60 shadow-sm">
                <img
                  src="./assets/editorial-couple.jpg"
                  alt="Couple holding hands with deep burgundy roses"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D0C11]/45 via-transparent to-transparent" />
                <div className="absolute bottom-1 sm:bottom-1.5 inset-x-0 text-center">
                  <span className="rounded-full bg-[#3D0C11]/85 px-2 sm:px-2.5 py-0.5 text-[7.5px] sm:text-[9px] font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#F6F1EA]">
                    28 • 11 • 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Ceremony Logistics & RSVP Preview */}
            <div className="relative z-10 space-y-1 sm:space-y-2 px-0.5 sm:px-1">
              <div className="mx-auto inline-flex items-center gap-2 sm:gap-3 rounded-lg border border-[#E3D9CE] bg-white px-2 sm:px-3 py-0.5 sm:py-1 text-[8.5px] sm:text-[10px] text-[#1A0B0D]">
                <span className="inline-flex items-center gap-1 font-medium text-[#6E1B24]">
                  <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={1.5} />
                  Sat, Nov 28
                </span>
                <span className="text-[#E3D9CE]">|</span>
                <span className="inline-flex items-center gap-1 text-[#8C6A6E]">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={1.5} />
                  5:00 PM
                </span>
              </div>

              <p className="text-[9px] sm:text-[11px] font-medium text-[#1A0B0D] line-clamp-1">
                The Oberoi Udaivilas, Lake Pichola
              </p>

              {/* Invitation Action Preview Card */}
              <div className="rounded-lg sm:rounded-xl border border-[#E3D9CE] bg-white p-1.5 sm:p-2.5 shadow-sm">
                <div className="mb-1 sm:mb-1.5 flex items-center justify-between px-0.5 sm:px-1 text-[7.5px] sm:text-[9px] font-medium text-[#8C6A6E]">
                  <span>RSVP &amp; LOCATION</span>
                  <span className="flex items-center gap-0.5 sm:gap-1 text-[#6E1B24]">
                    <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={1.5} /> Instant Confirm
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                  <span className="rounded-md sm:rounded-lg bg-[#3D0C11] py-1 sm:py-1.5 text-[8px] sm:text-[10px] font-medium text-[#F6F1EA]">
                    Joyfully Attending
                  </span>
                  <span className="inline-flex items-center justify-center gap-0.5 sm:gap-1 rounded-md sm:rounded-lg border border-[#E3D9CE] bg-[#F6F1EA] py-1 sm:py-1.5 text-[8px] sm:text-[10px] font-medium text-[#6E1B24]">
                    <MapPin className="h-2 w-2 sm:h-2.5 sm:w-2.5" strokeWidth={1.5} />
                    Venue Map
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Stationery Signature */}
            <div className="relative z-10 border-t border-[#E3D9CE] pt-1.5 sm:pt-2 text-center">
              <p className="text-[7.5px] sm:text-[9px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#8C6A6E]">
                CRAFTED BY MELCOME
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

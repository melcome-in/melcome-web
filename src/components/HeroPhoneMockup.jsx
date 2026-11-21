import React from 'react';
import { MapPin, Calendar, CheckCircle2, Clock } from 'lucide-react';
import WaxSealIcon from './WaxSealIcon';

/**
 * Clean Floating Smartphone Mockup for the Hero Section
 * Displays a sleek Melcome wedding invitation preview in deep Oxblood Wax (#3D0C11)
 * & Silk Ivory (#F6F1EA) with subtle soft shadow.
 */
export default function HeroPhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[345px] select-none">
      {/* Subtle Ambient Background Aura behind the phone */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[48px] opacity-60 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(212, 175, 122, 0.25), rgba(61, 12, 17, 0.08) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Realistic Smartphone Chassis */}
      <div className="relative z-10 rounded-[44px] border-[8px] border-[#1A0B0D] bg-[#3D0C11] p-1.5 shadow-phone ring-1 ring-[#D4AF7A]/30">
        {/* Top Speaker Notch / Dynamic Island */}
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1A0B0D] px-4 py-1">
          <span className="h-1.5 w-8 rounded-full bg-[#3A282A]" />
          <span className="h-2 w-2 rounded-full bg-[#2B1D1F] ring-1 ring-[#D4AF7A]/25" />
        </div>

        {/* Inner Phone Viewport */}
        <div className="relative h-[535px] w-full overflow-hidden rounded-[34px] bg-[#3D0C11] p-3 text-[#1A0B0D]">
          {/* Inner Silk Ivory Arch Card with Oxblood Wax Envelope Frame */}
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] border border-[#D4AF7A]/40 bg-[#F6F1EA] px-4 py-6 text-center shadow-inner">
            {/* Decorative Inner 1px Hairline Border */}
            <div className="pointer-events-none absolute inset-2 rounded-[20px] border border-[#E3D9CE]" />

            {/* Top Wax Seal & Couple Header */}
            <div className="relative z-10 mt-2 flex flex-col items-center">
              <WaxSealIcon variant="oxblood" size={40} />
              <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#8C6A6E]">
                The Wedding Invitation
              </p>
              <h3 className="mt-1 font-serif text-[26px] font-semibold leading-tight text-[#1A0B0D]">
                Lauria Eriten
                <span className="block font-serif text-sm font-normal italic text-[#6E1B24]">
                  and
                </span>
                Mark Tfiown
              </h3>
            </div>

            {/* Editorial Arch Photo Window */}
            <div className="relative z-10 mx-auto my-2 w-full max-w-[215px]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[48px] rounded-b-xl border border-[#D4AF7A]/60 shadow-sm">
                <img
                  src="./assets/editorial-couple.jpg"
                  alt="Couple holding hands with deep burgundy roses"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D0C11]/45 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 inset-x-0 text-center">
                  <span className="rounded-full bg-[#3D0C11]/85 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#F6F1EA]">
                    28 • 11 • 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Ceremony Logistics & RSVP Preview */}
            <div className="relative z-10 space-y-2 px-1">
              <div className="mx-auto inline-flex items-center gap-3 rounded-lg border border-[#E3D9CE] bg-white px-3 py-1 text-[10px] text-[#1A0B0D]">
                <span className="inline-flex items-center gap-1 font-medium text-[#6E1B24]">
                  <Calendar className="h-3 w-3" strokeWidth={1.5} />
                  Sat, Nov 28
                </span>
                <span className="text-[#E3D9CE]">|</span>
                <span className="inline-flex items-center gap-1 text-[#8C6A6E]">
                  <Clock className="h-3 w-3" strokeWidth={1.5} />
                  5:00 PM
                </span>
              </div>

              <p className="text-[11px] font-medium text-[#1A0B0D]">
                The Oberoi Udaivilas, Lake Pichola
              </p>

              {/* Invitation Action Preview Card */}
              <div className="rounded-xl border border-[#E3D9CE] bg-white p-2.5 shadow-sm">
                <div className="mb-1.5 flex items-center justify-between px-1 text-[9px] font-medium text-[#8C6A6E]">
                  <span>RSVP &amp; LOCATION</span>
                  <span className="flex items-center gap-1 text-[#6E1B24]">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} /> Instant Confirm
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <span className="rounded-lg bg-[#3D0C11] py-1.5 text-[10px] font-medium text-[#F6F1EA]">
                    Joyfully Attending
                  </span>
                  <span className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#E3D9CE] bg-[#F6F1EA] py-1.5 text-[10px] font-medium text-[#6E1B24]">
                    <MapPin className="h-2.5 w-2.5" strokeWidth={1.5} />
                    Venue Map
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Stationery Signature */}
            <div className="relative z-10 border-t border-[#E3D9CE] pt-2 text-center">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#8C6A6E]">
                CRAFTED BY MELCOME
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

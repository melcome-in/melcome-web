import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  Share2,
  Clock,
  LockOpen,
} from 'lucide-react';
import WaxSealIcon from './WaxSealIcon';

/**
 * Interactive Floating Smartphone Mockup for the Hero Right Column
 * Displays a realistic Melcome wedding invitation website preview in deep Oxblood Wax (#3D0C11)
 * & Silk Ivory (#F6F1EA), matching page 8 of the Brand Guidelines ("Lauria Eriten & Mark Tfiown" / "Signature of Love").
 * Users can toggle between the Envelope Wax-Seal Cover and the Opened Silk Ivory Invitation.
 */
export default function HeroPhoneMockup({ onOpenFullDemo }) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [rsvpSelected, setRsvpSelected] = useState('joyfully');

  return (
    <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[355px] select-none">
      {/* Subtle Ambient Background Aura behind the phone (Static, no flashy pulsing) */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[48px] opacity-60 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(212, 175, 122, 0.25), rgba(61, 12, 17, 0.08) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Interactive View Switcher Pill above the Phone */}
      <div className="relative z-10 mb-3 flex items-center justify-between rounded-full border border-[#E3D9CE] bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8C6A6E] pl-1">
          Interactive Preview
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsEnvelopeOpen(false)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${
              !isEnvelopeOpen
                ? 'bg-[#3D0C11] text-[#F6F1EA]'
                : 'text-[#8C6A6E] hover:text-[#1A0B0D]'
            }`}
          >
            Wax Seal Cover
          </button>
          <button
            type="button"
            onClick={() => setIsEnvelopeOpen(true)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${
              isEnvelopeOpen
                ? 'bg-[#3D0C11] text-[#F6F1EA]'
                : 'text-[#8C6A6E] hover:text-[#1A0B0D]'
            }`}
          >
            Inside Invite
          </button>
        </div>
      </div>

      {/* Realistic Smartphone Chassis */}
      <div className="relative z-10 rounded-[44px] border-[8px] border-[#1A0B0D] bg-[#3D0C11] p-1.5 shadow-phone ring-1 ring-[#D4AF7A]/30">
        {/* Top Speaker Notch / Dynamic Island */}
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1A0B0D] px-4 py-1">
          <span className="h-1.5 w-8 rounded-full bg-[#3A282A]" />
          <span className="h-2 w-2 rounded-full bg-[#2B1D1F] ring-1 ring-[#D4AF7A]/25" />
        </div>

        {/* Floating Music Toggle inside Phone Corner */}
        <button
          type="button"
          onClick={() => setIsMusicOn(!isMusicOn)}
          title={isMusicOn ? 'Mute ambient melody' : 'Play ambient melody'}
          className="absolute right-4 top-10 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF7A]/40 bg-[#3D0C11]/85 text-[#D4AF7A] shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-[#6E1B24]"
        >
          {isMusicOn ? (
            <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          ) : (
            <VolumeX className="h-3.5 w-3.5 opacity-70" strokeWidth={1.5} />
          )}
        </button>

        {/* Inner Phone Viewport */}
        <div className="relative h-[560px] w-full overflow-hidden rounded-[34px] bg-[#3D0C11]">
          {!isEnvelopeOpen ? (
            /* STATE 1: OXBLOOD WAX ENVELOPE COVER REVEAL */
            <div className="flex h-full flex-col items-center justify-between bg-[#3D0C11] px-6 py-11 text-center text-[#F6F1EA] transition-opacity duration-500">
              {/* Ornate 1px Champagne Foil Hairline Frame */}
              <div className="pointer-events-none absolute inset-3.5 rounded-[26px] border border-[#D4AF7A]/30" />

              <div className="relative z-10 mt-4">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#D4AF7A]">
                  The Wedding Celebration Of
                </p>
                <h3 className="mt-2 font-serif text-3xl font-medium tracking-wide text-[#F6F1EA]">
                  Lauria <span className="italic text-[#D4AF7A]">&amp;</span> Mark
                </h3>
                <p className="mt-1 text-[11px] tracking-[0.18em] text-[#F6F1EA]/70">
                  SATURDAY • 28 NOV 2026 • UDAIPUR
                </p>
              </div>

              {/* Interactive Wax Seal Emblem Trigger */}
              <div className="relative z-10 my-2 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setIsEnvelopeOpen(true)}
                  className="group relative flex flex-col items-center focus:outline-none"
                >
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#D4AF7A]/40 bg-[#F6F1EA] p-2 shadow-xl transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="./assets/wax-seal-icon.png"
                      alt="Melcome Wax Seal Emblem"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF7A]/50 bg-[#6E1B24]/80 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#F6F1EA] transition-colors duration-300 group-hover:bg-[#D4AF7A] group-hover:text-[#1A0B0D]">
                    <LockOpen className="h-3 w-3" strokeWidth={1.5} />
                    Tap Seal to Open
                  </span>
                </button>
              </div>

              <div className="relative z-10 mb-1 text-center">
                <p className="font-serif text-xs italic text-[#F6F1EA]/75">
                  “Every love story deserves a grand opening.”
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#D4AF7A]/80">
                  CRAFTED BY MELCOME
                </p>
              </div>
            </div>
          ) : (
            /* STATE 2: SILK IVORY INTERACTIVE INVITATION SCROLL (Matches Page 8 of Brand Guidelines) */
            <div className="flex h-full flex-col justify-between bg-[#3D0C11] p-3 text-[#1A0B0D] transition-opacity duration-500">
              {/* Inner Silk Ivory Arch Card with Oxblood Wax Envelope Frame */}
              <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[26px] border border-[#D4AF7A]/40 bg-[#F6F1EA] px-4 py-6 text-center shadow-inner">
                {/* Decorative Inner 1px Hairline Border */}
                <div className="pointer-events-none absolute inset-2 rounded-[20px] border border-[#E3D9CE]" />

                {/* Top Monogram & Header */}
                <div className="relative z-10 mt-2 flex flex-col items-center">
                  <WaxSealIcon variant="oxblood" size={36} showMonogram={true} />
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.24em] text-[#8C6A6E]">
                    The Wedding Invitation
                  </p>
                  <h3 className="mt-1 font-serif text-[25px] font-semibold leading-tight text-[#1A0B0D]">
                    Lauria Eriten
                    <span className="block font-serif text-sm font-normal italic text-[#6E1B24]">
                      and
                    </span>
                    Mark Tfiown
                  </h3>
                </div>

                {/* Editorial Arch Photo Window (Uses Uploaded Brand Photography) */}
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

                {/* Ceremony Logistics & Countdown Pill */}
                <div className="relative z-10 space-y-1.5 px-1">
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

                  {/* Interactive Mini RSVP Selector inside Phone */}
                  <div className="rounded-xl border border-[#E3D9CE] bg-white p-2 shadow-sm">
                    <div className="flex items-center justify-between text-[10px] font-medium text-[#8C6A6E] mb-1.5 px-1">
                      <span>INSTANT RSVP</span>
                      <span className="text-[#6E1B24] flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} /> Live Sync
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setRsvpSelected('joyfully')}
                        className={`rounded-lg py-1 text-[10px] font-medium transition-all duration-300 ${
                          rsvpSelected === 'joyfully'
                            ? 'bg-[#3D0C11] text-[#F6F1EA]'
                            : 'bg-[#F6F1EA] text-[#1A0B0D] hover:bg-[#E3D9CE]/50'
                        }`}
                      >
                        Joyfully Attending
                      </button>
                      <button
                        type="button"
                        onClick={onOpenFullDemo}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#E3D9CE] bg-[#F6F1EA] py-1 text-[10px] font-medium text-[#6E1B24] transition-all duration-300 hover:bg-[#6E1B24] hover:text-[#F6F1EA]"
                      >
                        <MapPin className="h-2.5 w-2.5" strokeWidth={1.5} />
                        Venue Map
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer inside Phone */}
                <div className="relative z-10 flex items-center justify-between border-t border-[#E3D9CE] pt-2 text-[10px] text-[#8C6A6E]">
                  <button
                    type="button"
                    onClick={() => setIsEnvelopeOpen(false)}
                    className="font-medium text-[#6E1B24] underline-offset-2 hover:underline"
                  >
                    ← Close Seal
                  </button>
                  <button
                    type="button"
                    onClick={onOpenFullDemo}
                    className="inline-flex items-center gap-1 font-medium text-[#1A0B0D] hover:text-[#6E1B24]"
                  >
                    Full Interactive Demo →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Editorial Caption Pill at Bottom-Left of Phone */}
      <div className="relative z-20 -mt-5 mx-auto flex max-w-[290px] items-center justify-between rounded-xl border border-[#E3D9CE] bg-white px-3.5 py-2.5 shadow-editorial">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0E6E4] text-[#6E1B24]">
            <Share2 className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-[#1A0B0D]">One-Link WhatsApp Share</p>
            <p className="text-[11px] text-[#8C6A6E]">melcome.in/lauria-and-mark</p>
          </div>
        </div>
        <span className="rounded-full bg-[#F6F1EA] border border-[#E3D9CE] px-2 py-0.5 text-[10px] font-semibold text-[#6E1B24]">
          Live
        </span>
      </div>
    </div>
  );
}

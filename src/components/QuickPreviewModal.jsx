import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Music,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Share2,
  ChevronRight,
  LockOpen,
  Heart,
} from 'lucide-react';
import WaxSealIcon from './WaxSealIcon';

/**
 * Interactive Quick Preview Modal (Section 4 UI/UX Checklist Requirement)
 * Opens when clicking `Demo` on any card (or `Explore Demos` live preview).
 * Lets the user test the complete Melcome invitation guest journey:
 * 1. Tap the embossed Wax Seal to open the invitation envelope
 * 2. Scroll through the couple portrait, poetic story quote, event timeline, dress code & Google Maps card
 * 3. Submit a live test RSVP inside the simulated smartphone screen
 * 4. Switch between any of the 6 collection themes on the fly
 */
export default function QuickPreviewModal({
  activeDemo,
  allDemos,
  onSelectDemo,
  onClose,
  onOrderDemo,
}) {
  const [isOpened, setIsOpened] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    setRsvpSubmitted(false);
    setGuestName('');
  }, [activeDemo?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!activeDemo) return null;

  const isRoyalDark = activeDemo.id === 'royal-velvet';

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0B0D]/75 p-3 sm:p-6 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-demo-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#E3D9CE] bg-[#F6F1EA] shadow-2xl lg:flex-row"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close live preview modal"
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#E3D9CE] bg-white text-[#1A0B0D] shadow-sm transition-colors duration-300 hover:bg-[#3D0C11] hover:text-[#F6F1EA]"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {/* Left Column: Interactive Smartphone Simulator */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#EFE7DC] to-[#E5DBD0] px-4 py-6 sm:px-8 lg:w-[46%]">
          {/* State Switcher Bar */}
          <div className="mb-3 flex items-center gap-1.5 rounded-full border border-[#E3D9CE] bg-white/95 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setIsOpened(false)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-300 ${
                !isOpened
                  ? 'bg-[#3D0C11] text-[#F6F1EA]'
                  : 'text-[#8C6A6E] hover:text-[#1A0B0D]'
              }`}
            >
              1. Wax Seal Cover
            </button>
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-300 ${
                isOpened
                  ? 'bg-[#3D0C11] text-[#F6F1EA]'
                  : 'text-[#8C6A6E] hover:text-[#1A0B0D]'
              }`}
            >
              2. Interactive Invite
            </button>
          </div>

          {/* Smartphone Mockup Frame */}
          <div className="relative w-full max-w-[300px] rounded-[38px] border-[7px] border-[#1A0B0D] bg-[#1A0B0D] p-1 shadow-phone ring-1 ring-[#D4AF7A]/35">
            {/* Top Speaker Notch */}
            <div className="pointer-events-none absolute left-1/2 top-2.5 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#1A0B0D] px-3.5 py-0.5">
              <span className="h-1 w-6 rounded-full bg-[#3A282A]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#2E1C1E]" />
            </div>

            {/* Floating Audio Toggle */}
            <button
              type="button"
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              title={isMusicPlaying ? 'Mute ambient wedding audio' : 'Unmute ambient wedding audio'}
              className="absolute right-3.5 top-8 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF7A]/50 bg-[#3D0C11]/90 text-[#D4AF7A] shadow-sm transition-colors hover:bg-[#6E1B24]"
            >
              {isMusicPlaying ? (
                <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              ) : (
                <VolumeX className="h-3.5 w-3.5 opacity-60" strokeWidth={1.5} />
              )}
            </button>

            {/* Phone Screen Scrollable Area */}
            <div className="custom-scrollbar relative h-[480px] w-full overflow-y-auto overflow-x-hidden rounded-[30px] bg-[#3D0C11]">
              {!isOpened ? (
                /* VIEW 1: WAX SEAL ENVELOPE COVER */
                <div className="flex h-full flex-col items-center justify-between bg-[#3D0C11] px-5 py-10 text-center text-[#F6F1EA]">
                  <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-[#D4AF7A]/35" />
                  <div className="mt-3">
                    <p className="text-[9px] uppercase tracking-[0.24em] text-[#D4AF7A]">
                      {activeDemo.themePalette.badgeText}
                    </p>
                    <h4 className="mt-2 font-serif text-2xl font-semibold text-[#F6F1EA]">
                      {activeDemo.coupleNames}
                    </h4>
                    <p className="mt-1 text-[10px] tracking-[0.18em] text-[#F6F1EA]/75">
                      {activeDemo.shortDate} • {activeDemo.city}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpened(true)}
                    className="group my-2 flex flex-col items-center focus:outline-none"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D4AF7A]/50 bg-[#F6F1EA] p-1.5 shadow-xl transition-transform duration-300 group-hover:scale-105">
                      <img
                        src="./assets/wax-seal-icon.png"
                        alt="Tap Wax Seal"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF7A] bg-[#6E1B24] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F6F1EA] transition-colors group-hover:bg-[#D4AF7A] group-hover:text-[#1A0B0D]">
                      <LockOpen className="h-3 w-3" strokeWidth={1.5} />
                      Tap Seal to Unfold
                    </span>
                  </button>

                  <p className="font-serif text-xs italic text-[#F6F1EA]/75">
                    {activeDemo.storyQuote}
                  </p>
                </div>
              ) : (
                /* VIEW 2: OPENED SCROLLABLE WEDDING INVITATION WEBSITE */
                <div
                  className={`min-h-full pb-6 ${
                    isRoyalDark ? 'bg-[#2A070B] text-[#F6F1EA]' : 'bg-[#F6F1EA] text-[#1A0B0D]'
                  }`}
                >
                  {/* Hero Cover Banner inside Phone */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={activeDemo.image}
                      alt={activeDemo.coupleNames}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D0C11] via-[#3D0C11]/35 to-black/30" />
                    <div className="absolute inset-x-0 bottom-3 px-4 text-center text-[#F6F1EA]">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#D4AF7A]">
                        We Invite You To Celebrate
                      </p>
                      <h4 className="mt-0.5 font-serif text-2xl font-semibold">
                        {activeDemo.coupleNames}
                      </h4>
                      <p className="text-[10px] tracking-[0.15em] text-[#F6F1EA]/85">
                        {activeDemo.date}
                      </p>
                    </div>
                  </div>

                  {/* Story Quote & Countdown Section */}
                  <div className="px-4 pt-4 text-center">
                    <div className="mx-auto mb-2 flex justify-center">
                      <WaxSealIcon
                        variant={isRoyalDark ? 'foil' : 'oxblood'}
                        size={30}
                        showMonogram={true}
                      />
                    </div>
                    <p
                      className={`font-serif text-xs italic leading-relaxed ${
                        isRoyalDark ? 'text-[#F6F1EA]/85' : 'text-[#6E1B24]'
                      }`}
                    >
                      {activeDemo.storyQuote}
                    </p>

                    {/* Countdown Strip */}
                    <div
                      className={`mt-3 grid grid-cols-4 gap-1.5 rounded-xl border p-2 text-center ${
                        isRoyalDark
                          ? 'border-[#D4AF7A]/30 bg-[#3D0C11]'
                          : 'border-[#E3D9CE] bg-white'
                      }`}
                    >
                      {[
                        { val: '24', label: 'Days' },
                        { val: '11', label: 'Hours' },
                        { val: '45', label: 'Mins' },
                        { val: '18', label: 'Secs' },
                      ].map((item) => (
                        <div key={item.label}>
                          <p
                            className={`font-serif text-base font-bold leading-none ${
                              isRoyalDark ? 'text-[#D4AF7A]' : 'text-[#3D0C11]'
                            }`}
                          >
                            {item.val}
                          </p>
                          <p className="mt-0.5 text-[8px] uppercase tracking-wider text-[#8C6A6E]">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ceremony & Reception Schedule */}
                  <div className="mt-4 px-4">
                    <p className="text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8C6A6E]">
                      Celebration Itinerary
                    </p>
                    <div className="mt-2 space-y-2">
                      {activeDemo.events.map((ev, idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl border p-2.5 text-left ${
                            isRoyalDark
                              ? 'border-[#D4AF7A]/25 bg-[#3D0C11]'
                              : 'border-[#E3D9CE] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-serif text-sm font-bold ${
                                isRoyalDark ? 'text-[#D4AF7A]' : 'text-[#1A0B0D]'
                              }`}
                            >
                              {ev.name}
                            </span>
                            <span className="text-[9px] font-medium text-[#6E1B24] bg-[#F0E6E4] px-2 py-0.5 rounded-full">
                              {ev.time}
                            </span>
                          </div>
                          <p
                            className={`mt-1 flex items-center gap-1 text-[10px] ${
                              isRoyalDark ? 'text-[#F6F1EA]/80' : 'text-[#8C6A6E]'
                            }`}
                          >
                            <MapPin className="h-3 w-3 shrink-0 text-[#D4AF7A]" strokeWidth={1.5} />
                            {ev.venue}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Test RSVP Form inside Phone */}
                  <div className="mt-4 px-4">
                    <div
                      className={`rounded-xl border p-3 ${
                        isRoyalDark
                          ? 'border-[#D4AF7A]/30 bg-[#3D0C11]'
                          : 'border-[#E3D9CE] bg-white'
                      }`}
                    >
                      <p
                        className={`font-serif text-sm font-bold text-center ${
                          isRoyalDark ? 'text-[#F6F1EA]' : 'text-[#1A0B0D]'
                        }`}
                      >
                        Confirm Your Attendance
                      </p>
                      {rsvpSubmitted ? (
                        <div className="mt-2 rounded-lg bg-[#F0E6E4] p-2.5 text-center text-[#3D0C11]">
                          <CheckCircle2
                            className="mx-auto h-4 w-4 text-[#6E1B24]"
                            strokeWidth={1.5}
                          />
                          <p className="mt-1 text-[11px] font-semibold">
                            Thank you{guestName ? `, ${guestName}` : ''}!
                          </p>
                          <p className="text-[9px] text-[#6E1B24]">
                            Your RSVP ({guestCount}) has been recorded live.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleRsvpSubmit} className="mt-2 space-y-2">
                          <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Your Full Name"
                            className="w-full rounded-lg border border-[#E3D9CE] bg-[#F6F1EA] px-2.5 py-1.5 text-[11px] text-[#1A0B0D] placeholder-[#8C6A6E] focus:border-[#6E1B24] focus:outline-none"
                          />
                          <div className="flex gap-1.5">
                            <select
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                              className="w-1/2 rounded-lg border border-[#E3D9CE] bg-[#F6F1EA] px-2 py-1.5 text-[10px] text-[#1A0B0D] focus:outline-none"
                            >
                              <option>1 Guest</option>
                              <option>2 Guests</option>
                              <option>Family (4)</option>
                            </select>
                            <button
                              type="submit"
                              className="w-1/2 rounded-lg bg-[#6E1B24] py-1.5 text-[10px] font-semibold text-[#F6F1EA] transition-colors hover:bg-[#3D0C11]"
                            >
                              Send RSVP
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-2.5 text-center text-[11px] text-[#8C6A6E]">
            Scroll inside the phone frame or toggle the Wax Seal cover above.
          </p>
        </div>

        {/* Right Column: Theme Details, Highlights & Quick Theme Switcher */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:w-[54%]">
          <div>
            {/* Eyebrow & Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border border-[#E3D9CE] bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6E1B24]">
                <Sparkles className="h-3 w-3 text-[#D4AF7A]" strokeWidth={1.5} />
                {activeDemo.tier} COLLECTION
              </span>
              <span className="text-xs text-[#8C6A6E]">• {activeDemo.category} Aesthetic</span>
            </div>

            {/* Theme Title & Price */}
            <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-[#E3D9CE] pb-4">
              <div>
                <h2
                  id="modal-demo-title"
                  className="font-serif text-3xl font-bold text-[#1A0B0D] sm:text-4xl"
                >
                  {activeDemo.title}
                </h2>
                <p className="mt-1 text-sm text-[#8C6A6E]">{activeDemo.description}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-sans text-2xl font-bold text-[#6E1B24]">
                  {activeDemo.price}
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#8C6A6E]">
                  One-Time Package
                </p>
              </div>
            </div>

            {/* Included Interactive Features */}
            <div className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C6A6E]">
                Included Interactive Craftsmanship
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {activeDemo.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-xl border border-[#E3D9CE] bg-white p-2.5 text-xs text-[#1A0B0D]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6E1B24]"
                      strokeWidth={1.5}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dress Code & Sample Venue Meta */}
            <div className="mt-4 rounded-xl border border-[#E3D9CE] bg-white/80 p-3.5 text-xs">
              <div className="flex items-center justify-between text-[#8C6A6E]">
                <span className="font-medium text-[#1A0B0D]">Sample Venue Setup:</span>
                <span>{activeDemo.venueName}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[#8C6A6E]">
                <span className="font-medium text-[#1A0B0D]">Attire Palette Guide:</span>
                <span className="text-right">{activeDemo.dressCode}</span>
              </div>
            </div>

            {/* Quick Switch Between All 6 Demos */}
            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C6A6E]">
                Switch Theme Preview
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {allDemos.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectDemo(item)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                      item.id === activeDemo.id
                        ? 'border-[#3D0C11] bg-[#3D0C11] text-[#F6F1EA]'
                        : 'border-[#E3D9CE] bg-white text-[#1A0B0D] hover:border-[#6E1B24]'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Modal CTA Row */}
          <div className="mt-6 flex flex-col gap-3 border-t border-[#E3D9CE] pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOrderDemo(activeDemo);
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D0C11] px-5 py-3 text-sm font-semibold text-[#F6F1EA] shadow-sm transition-all duration-300 hover:bg-[#6E1B24]"
            >
              <ShoppingBag className="h-4 w-4 text-[#D4AF7A]" strokeWidth={1.5} />
              <span>Customize &amp; Order ({activeDemo.price})</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-[#E3D9CE] bg-white px-5 py-3 text-sm font-medium text-[#1A0B0D] transition-all duration-300 hover:bg-[#EFE7DC]"
            >
              Back to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

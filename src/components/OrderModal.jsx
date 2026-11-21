import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import WaxSealIcon from './WaxSealIcon';

/**
 * Bespoke Order / WhatsApp Customization Modal
 * Triggered when clicking `Buy Now` on any Demo Card.
 * Generates a tailored WhatsApp message to Melcome Studio so couples can immediately
 * begin step 02 ("Share Your Story") or test the full checkout inquiry flow.
 */
export default function OrderModal({ demo, onClose }) {
  const [coupleNames, setCoupleNames] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!demo) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Melcome Studio! We would love to order the "${demo.title}" (${demo.tier} — ${demo.price}) digital wedding invitation.${
      coupleNames ? `\n• Couple: ${coupleNames}` : ''
    }${weddingDate ? `\n• Wedding Date: ${weddingDate}` : ''}${
      city ? `\n• Celebration City: ${city}` : ''
    }\nPlease let us know the next steps!`
  );

  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0B0D]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#E3D9CE] bg-[#F6F1EA] p-6 sm:p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close order modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#E3D9CE] bg-white text-[#1A0B0D] transition-colors hover:bg-[#3D0C11] hover:text-[#F6F1EA]"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3">
          <WaxSealIcon variant="oxblood" size={42} showMonogram={true} />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6E1B24]">
              Bespoke Invitation Order
            </p>
            <h3 id="order-modal-title" className="font-serif text-2xl font-bold text-[#1A0B0D]">
              {demo.title} — <span className="text-[#6E1B24]">{demo.price}</span>
            </h3>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[#8C6A6E]">
          We customize every invitation with your story, photos, music, Google Maps venues, and
          live RSVP sheet. Delivered ready-to-share in 24–48 hours.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#1A0B0D] mb-1">
              Couple&apos;s Names <span className="text-[#8C6A6E]">(Optional)</span>
            </label>
            <input
              type="text"
              value={coupleNames}
              onChange={(e) => setCoupleNames(e.target.value)}
              placeholder="e.g., Arjun & Meera"
              className="w-full rounded-xl border border-[#E3D9CE] bg-white px-3.5 py-2.5 text-sm text-[#1A0B0D] placeholder-[#8C6A6E]/70 focus:border-[#6E1B24] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#1A0B0D] mb-1">
                Wedding Date
              </label>
              <input
                type="text"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                placeholder="e.g., 14 Dec 2026"
                className="w-full rounded-xl border border-[#E3D9CE] bg-white px-3.5 py-2.5 text-sm text-[#1A0B0D] placeholder-[#8C6A6E]/70 focus:border-[#6E1B24] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1A0B0D] mb-1">
                Venue / City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Kochi / Chennai"
                className="w-full rounded-xl border border-[#E3D9CE] bg-white px-3.5 py-2.5 text-sm text-[#1A0B0D] placeholder-[#8C6A6E]/70 focus:border-[#6E1B24] focus:outline-none"
              />
            </div>
          </div>

          {submitted && (
            <div className="flex items-center gap-2 rounded-xl border border-[#D4AF7A] bg-white p-3 text-xs text-[#3D0C11]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6E1B24]" strokeWidth={1.5} />
              <span>
                Opening WhatsApp chat with Melcome Studio for <strong>{demo.title}</strong>...
              </span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D0C11] px-5 py-3.5 text-sm font-semibold text-[#F6F1EA] shadow-sm transition-all duration-300 hover:bg-[#6E1B24]"
            >
              <MessageSquare className="h-4 w-4 text-[#D4AF7A]" strokeWidth={1.5} />
              <span>Continue on WhatsApp — {demo.price}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-4 border-t border-[#E3D9CE] pt-3 text-[11px] text-[#8C6A6E]">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-[#6E1B24]" strokeWidth={1.5} />
            100% Custom Setup Included
          </span>
          <span>•</span>
          <span>24–48 Hr Delivery</span>
        </div>
      </div>
    </div>
  );
}

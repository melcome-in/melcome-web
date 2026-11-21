import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu,
  X,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Clock,
  LayoutGrid,
  MessageSquare,
  Share2,
  Star,
  Instagram,
  ArrowRight,
  Mail,
  Calendar,
  MapPin,
  Music,
  Heart,
  ExternalLink,
} from 'lucide-react';
import WaxSealIcon, { MelcomeLogoLockup } from './components/WaxSealIcon';
import HeroPhoneMockup from './components/HeroPhoneMockup';
import DemoCard from './components/DemoCard';
import QuickPreviewModal from './components/QuickPreviewModal';
import OrderModal from './components/OrderModal';
import {
  INVITATION_DEMOS,
  FILTER_CATEGORIES,
  HOW_IT_WORKS_STEPS,
  COUPLE_REVIEWS,
  BRAND_TOUCHPOINTS,
} from './data/invitationsData';

gsap.registerPlugin(ScrollTrigger);

const STEP_ICONS = {
  LayoutGrid,
  MessageSquare,
  Share2,
};

const TOUCHPOINT_ICONS = {
  Mail,
  Calendar,
  MapPin,
  Music,
  CheckCircle2,
};

// Triple-cloned array for seamless bidirectional infinite loop slider on mobile
const INFINITE_MOBILE_REVIEWS = [
  ...COUPLE_REVIEWS.map((r) => ({ ...r, cloneKey: `pre-${r.id}` })),
  ...COUPLE_REVIEWS.map((r) => ({ ...r, cloneKey: `mid-${r.id}` })),
  ...COUPLE_REVIEWS.map((r) => ({ ...r, cloneKey: `post-${r.id}` })),
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewDemo, setPreviewDemo] = useState(null);
  const [orderDemo, setOrderDemo] = useState(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const mainRef = useRef(null);
  const reviewsSliderRef = useRef(null);
  const currentPhysicalIndexRef = useRef(COUPLE_REVIEWS.length); // starts at middle set index 3
  const isTouchingReviewsRef = useRef(false);
  const scrollSettleTimerRef = useRef(null);

  const centerPhysicalCard = (physicalIdx, smooth = true) => {
    const slider = reviewsSliderRef.current;
    if (!slider) return;
    const cards = slider.querySelectorAll('.review-slide-card');
    const target = cards[physicalIdx];
    if (!target) return;
    const targetLeft =
      target.offsetLeft - (slider.clientWidth - target.offsetWidth) / 2;

    if (!smooth) {
      slider.style.scrollSnapType = 'none';
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = targetLeft;
      void slider.offsetHeight;
      slider.style.scrollSnapType = '';
      slider.style.scrollBehavior = '';
    } else {
      slider.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
    currentPhysicalIndexRef.current = physicalIdx;
    setActiveReviewIndex(physicalIdx % COUPLE_REVIEWS.length);
  };

  // Initialize mobile infinite slider at the middle set on mount
  useEffect(() => {
    const slider = reviewsSliderRef.current;
    if (!slider) return;
    const initTimer = setTimeout(() => {
      if (slider.clientWidth > 0) {
        centerPhysicalCard(COUPLE_REVIEWS.length, false);
      }
    }, 60);
    return () => clearTimeout(initTimer);
  }, []);

  // Calm infinite auto-slide on mobile viewports when not being touched
  useEffect(() => {
    const interval = setInterval(() => {
      const slider = reviewsSliderRef.current;
      if (!slider || slider.clientWidth === 0 || isTouchingReviewsRef.current) {
        return;
      }
      const n = COUPLE_REVIEWS.length;
      const nextPhysical = currentPhysicalIndexRef.current + 1;
      centerPhysicalCard(nextPhysical, true);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const scrollToReviewSlide = (logicalIdx) => {
    const n = COUPLE_REVIEWS.length;
    const targetPhysical = n + ((logicalIdx % n) + n) % n;
    centerPhysicalCard(targetPhysical, true);
  };

  const handleReviewsScroll = () => {
    const slider = reviewsSliderRef.current;
    if (!slider || slider.clientWidth === 0) return;
    const n = COUPLE_REVIEWS.length;
    const scrollCenter = slider.scrollLeft + slider.clientWidth / 2;
    const cards = slider.querySelectorAll('.review-slide-card');
    if (cards.length < n * 3) return;

    let closestIdx = n;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    currentPhysicalIndexRef.current = closestIdx;
    const logicalIdx = closestIdx % n;
    if (logicalIdx !== activeReviewIndex) {
      setActiveReviewIndex(logicalIdx);
    }

    // Once scroll snap settles, silently recenter into the middle clone set [n .. 2n-1]
    if (scrollSettleTimerRef.current) {
      clearTimeout(scrollSettleTimerRef.current);
    }
    scrollSettleTimerRef.current = setTimeout(() => {
      if (isTouchingReviewsRef.current) return;
      const idx = currentPhysicalIndexRef.current;
      if (idx < n || idx >= n * 2) {
        const normalizedPhysical = n + (idx % n);
        const setSpan = cards[n].offsetLeft - cards[0].offsetLeft;
        slider.style.scrollSnapType = 'none';
        slider.style.scrollBehavior = 'auto';
        if (idx < n) {
          slider.scrollLeft += setSpan;
        } else if (idx >= n * 2) {
          slider.scrollLeft -= setSpan;
        }
        void slider.offsetHeight;
        slider.style.scrollSnapType = '';
        slider.style.scrollBehavior = '';
        currentPhysicalIndexRef.current = normalizedPhysical;
      }
    }, 140);
  };

  const filteredDemos =
    selectedCategory === 'All'
      ? INVITATION_DEMOS
      : INVITATION_DEMOS.filter((demo) => demo.category === selectedCategory);

  // Calm, deliberate, editorial GSAP ScrollTrigger entrance reveals (No pulsing, bouncing, or flashy motion)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger reveal
      gsap.fromTo(
        '.gsap-hero-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        '.gsap-hero-phone',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          delay: 0.25,
          ease: 'power2.out',
        }
      );

      // Section headers & editorial blocks fade-up
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });

      // Staggered grids (Steps, Reviews, Pillars)
      gsap.utils.toArray('.gsap-stagger-group').forEach((group) => {
        const items = group.querySelectorAll('.gsap-stagger-item');
        if (items.length) {
          gsap.fromTo(
            items,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.14,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 84%',
                once: true,
              },
            }
          );
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Calm fade-up when filtering demo cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.demo-card',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-[#F6F1EA] text-[#1A0B0D] overflow-x-hidden">
      {/* =====================================================================
          A. STICKY NAVIGATION BAR
      ====================================================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E3D9CE] bg-[#F6F1EA]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Left: Official Horizontal Lockup — Circular Wax-Seal Emblem + MELCOME Logotype */}
          <a
            href="#top"
            className="group flex items-center py-0.5 focus:outline-none"
            aria-label="Melcome Digital Wedding Invitation Studio Home"
          >
            <MelcomeLogoLockup
              variant="oxblood"
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {[
              { label: 'Collection', target: 'collection' },
              { label: 'How It Works', target: 'how-it-works' },
              { label: 'Reviews', target: 'reviews' },
              { label: 'About', target: 'about' },
            ].map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className="text-sm font-medium text-[#1A0B0D]/85 transition-colors duration-300 hover:text-[#6E1B24]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Primary CTA Button (Explore Demos in #3D0C11 Oxblood Wax with #F6F1EA text, hover #6E1B24) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('collection')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#3D0C11] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#F6F1EA] shadow-sm transition-all duration-300 hover:bg-[#6E1B24] focus:outline-none focus:ring-2 focus:ring-[#3D0C11]/30"
            >
              <span>Explore Demos</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#D4AF7A]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex md:hidden items-center justify-center rounded-xl border border-[#E3D9CE] bg-white p-2.5 text-[#1A0B0D] transition-colors duration-300 hover:bg-[#EFE7DC]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Responsive Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E3D9CE] bg-[#F6F1EA] px-4 pt-3 pb-5 md:hidden">
            <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
              {[
                { label: 'Collection', target: 'collection' },
                { label: 'How It Works', target: 'how-it-works' },
                { label: 'Reviews', target: 'reviews' },
                { label: 'About', target: 'about' },
              ].map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#1A0B0D] transition-colors hover:bg-white"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-[#8C6A6E]" strokeWidth={1.5} />
                </button>
              ))}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('collection')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D0C11] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6F1EA] transition-all duration-300 hover:bg-[#6E1B24]"
                >
                  <span>Explore Demos</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF7A]" strokeWidth={1.5} />
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* =====================================================================
            B. HERO SECTION
        ====================================================================== */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
          {/* Subtle Architectural Arch Background Accent */}
          <div
            className="pointer-events-none absolute right-0 top-12 -z-10 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(212, 175, 122, 0.22) 0%, rgba(110, 27, 36, 0.05) 65%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Column (7 cols on desktop) */}
              <div className="lg:col-span-7 text-left">
                {/* Eyebrow Pill: DIGITAL WEDDING INVITATIONS */}
                <div className="gsap-hero-item inline-flex items-center gap-2 rounded-full border border-[#E3D9CE] bg-white px-3.5 py-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6E1B24]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6E1B24]">
                    DIGITAL WEDDING INVITATIONS
                  </span>
                </div>

                {/* Headline (Cormorant Garamond) */}
                <h1 className="gsap-hero-item mt-6 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#1A0B0D] sm:text-5xl lg:text-[62px]">
                  Every Love Story Deserves a{' '}
                  <span className="italic font-medium text-[#6E1B24]">Grand Opening.</span>
                </h1>

                {/* Subheadline (Plus Jakarta Sans) */}
                <p className="gsap-hero-item mt-5 max-w-xl text-base leading-relaxed text-[#8C6A6E] sm:text-lg font-normal">
                  Bespoke, interactive wedding invitation websites crafted for modern couples.
                  Effortless to share on WhatsApp, unforgettable to open.
                </p>

                {/* CTA Pair: Browse Designs + How It Works */}
                <div className="gsap-hero-item mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => scrollToSection('collection')}
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#3D0C11] px-7 py-4 text-sm font-semibold text-[#F6F1EA] shadow-editorial transition-all duration-300 hover:bg-[#6E1B24] focus:outline-none focus:ring-2 focus:ring-[#3D0C11]/30"
                  >
                    <span>Browse Designs</span>
                    <ArrowRight className="h-4 w-4 text-[#D4AF7A]" strokeWidth={1.5} />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('how-it-works')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E3D9CE] bg-white px-7 py-4 text-sm font-semibold text-[#1A0B0D] transition-all duration-300 hover:border-[#6E1B24] hover:text-[#6E1B24] focus:outline-none focus:ring-2 focus:ring-[#E3D9CE]"
                  >
                    <span>How It Works</span>
                  </button>
                </div>

                {/* Mini Trust Strip below CTAs */}
                <div className="gsap-hero-item mt-9 border-t border-[#E3D9CE] pt-6">
                  <div className="flex flex-wrap items-center gap-y-2.5 gap-x-4 text-xs font-medium text-[#8C6A6E] sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 text-[#1A0B0D]">
                      <Smartphone className="h-4 w-4 text-[#6E1B24]" strokeWidth={1.5} />
                      100% Mobile-First
                    </span>
                    <span className="text-[#D4AF7A]" aria-hidden="true">
                      •
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#1A0B0D]">
                      <CheckCircle2 className="h-4 w-4 text-[#6E1B24]" strokeWidth={1.5} />
                      Live RSVP Tracking
                    </span>
                    <span className="text-[#D4AF7A]" aria-hidden="true">
                      •
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#1A0B0D]">
                      <Clock className="h-4 w-4 text-[#6E1B24]" strokeWidth={1.5} />
                      Delivered in 24–48 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek, Realistic Floating Smartphone Mockup (5 cols on desktop) */}
              <div className="gsap-hero-phone lg:col-span-5">
                <HeroPhoneMockup
                  onOpenFullDemo={() => setPreviewDemo(INVITATION_DEMOS[1])}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            C. SMALL ABOUT SECTION
        ====================================================================== */}
        <section
          id="about"
          className="border-y border-[#E3D9CE] bg-white/60 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="gsap-reveal">
              <div className="mx-auto mb-3 flex justify-center">
                <WaxSealIcon variant="oxblood" size={52} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6E1B24]">
                WHY MELCOME
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1A0B0D] sm:text-4xl lg:text-[42px]">
                Timeless by Aesthetic.{' '}
                <span className="italic font-normal text-[#6E1B24]">Interactive by Design.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#8C6A6E] sm:text-base">
                Paper cards get tucked away and generic PDFs get lost in chat threads. Melcome
                bridges classic wedding craftsmanship with modern web interactivity—giving your
                guests Google Maps navigation, event timelines, and instant RSVPs in one effortless
                link.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            D. INVITATION DEMOS SECTION (6 DUMMY CARDS)
        ====================================================================== */}
        <section id="collection" className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header (Centered) */}
            <div className="gsap-reveal mx-auto max-w-2xl text-center">
              <p className="font-serif text-lg italic text-[#6E1B24] sm:text-xl">
                Our Collection
              </p>
              <h2 className="mt-1 font-serif text-4xl font-bold tracking-tight text-[#1A0B0D] sm:text-5xl">
                Invitation Demos
              </h2>
              <p className="mt-3 text-sm text-[#8C6A6E] sm:text-base">
                Handcrafted with cultural authenticity and smooth animations.
              </p>

              {/* Filter Pills (SaaS UX): All, Traditional, Modern, Royal, Minimal */}
              <div
                className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#E3D9CE] bg-white p-1.5 shadow-sm"
                role="tablist"
                aria-label="Filter invitation demos by style"
              >
                {FILTER_CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                        active
                          ? 'bg-[#3D0C11] text-[#F6F1EA] shadow-sm'
                          : 'text-[#8C6A6E] hover:bg-[#F6F1EA] hover:text-[#1A0B0D]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive 2-Column Grid on Mobile, 3-Column Grid on Desktop */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {filteredDemos.map((demo) => (
                <DemoCard
                  key={demo.id}
                  demo={demo}
                  onOpenPreview={(d) => setPreviewDemo(d)}
                  onOpenOrder={(d) => setOrderDemo(d)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            E. STEPS SECTION ("HOW IT WORKS")
        ====================================================================== */}
        <section
          id="how-it-works"
          className="border-t border-[#E3D9CE] bg-white/50 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header (Centered) */}
            <div className="gsap-reveal mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6E1B24]">
                EFFORTLESS PROCESS
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                <span className="block text-[#1A0B0D]">Three Steps to Your</span>
                <span className="block italic text-[#6E1B24]">Perfect Invitation</span>
              </h2>
              <p className="mt-4 text-sm text-[#8C6A6E] sm:text-base">
                We handle the design and tech. You focus on your celebration.
              </p>
            </div>

            {/* 3-Column Horizontal Process Flow Connected by a Thin Horizontal 1px Gradient Line */}
            <div className="gsap-stagger-group relative mt-16">
              {/* Thin Horizontal Connecting Line (1px gradient from #6E1B24 to #D4AF7A) behind numbered circles on desktop */}
              <div
                className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-[1px] md:block"
                style={{
                  background: 'linear-gradient(90deg, #6E1B24 0%, #D4AF7A 50%, #6E1B24 100%)',
                }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  const StepIcon = STEP_ICONS[step.iconName] || LayoutGrid;
                  return (
                    <div
                      key={step.number}
                      className="gsap-stagger-item relative flex flex-col items-center text-center"
                    >
                      {/* Circular White Badge (w-16 h-16 rounded-full bg-white shadow-md) containing serif number in #6E1B24 */}
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#E3D9CE] bg-white shadow-md">
                        <span className="font-serif text-2xl font-bold text-[#6E1B24]">
                          {step.number}
                        </span>
                      </div>

                      {/* Below the Circle: Soft Tinted Rounded-Square Icon Container (bg-[#F0E6E4] text-[#6E1B24]) */}
                      <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0E6E4] text-[#6E1B24] shadow-sm">
                        <StepIcon className="h-5 w-5" strokeWidth={1.5} />
                      </div>

                      {/* Bold Serif Title + Concise 2-Line Description */}
                      <h3 className="mt-4 font-serif text-2xl font-bold text-[#1A0B0D]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#8C6A6E]">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            F. COUPLE REVIEWS SECTION
        ====================================================================== */}
        <section id="reviews" className="border-t border-[#E3D9CE] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="gsap-reveal mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6E1B24]">
                COUPLE STORIES
              </p>
              <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A0B0D] sm:text-5xl">
                Loved by Modern Couples
              </h2>
              <p className="mt-3 text-sm text-[#8C6A6E] sm:text-base">
                Real words from couples who announced their celebration with Melcome.
              </p>
            </div>

            {/* 3 Clean Testimonial Cards — Infinite Loop Mobile Slider + 3-Column Single Row on Desktop */}
            <div className="relative mt-10 sm:mt-12">
              {/* Mobile Infinite Loop Horizontal Slider (md:hidden) */}
              <div
                ref={reviewsSliderRef}
                onScroll={handleReviewsScroll}
                onTouchStart={() => {
                  isTouchingReviewsRef.current = true;
                }}
                onTouchEnd={() => {
                  isTouchingReviewsRef.current = false;
                  handleReviewsScroll();
                }}
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-2 md:hidden"
              >
                {INFINITE_MOBILE_REVIEWS.map((review) => (
                  <article
                    key={review.cloneKey}
                    className="review-slide-card flex w-[84vw] max-w-[330px] shrink-0 snap-center flex-col justify-between rounded-2xl border border-[#E3D9CE] bg-white p-6 shadow-editorial"
                  >
                    <div>
                      <div
                        className="flex items-center gap-1"
                        aria-label="Rated 5 out of 5 stars"
                      >
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="h-4 w-4 fill-[#D4AF7A] text-[#D4AF7A]"
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>

                      <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-[#1A0B0D]">
                        {review.quote}
                      </blockquote>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#E3D9CE] pt-4">
                      <div>
                        <p className="font-serif text-xl font-bold text-[#1A0B0D]">
                          {review.couple}
                        </p>
                        <p className="text-xs text-[#8C6A6E]">{review.location}</p>
                      </div>
                      <span className="rounded-full border border-[#E3D9CE] bg-[#F6F1EA] px-3 py-1 text-[11px] font-medium text-[#6E1B24]">
                        {review.theme}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Mobile Pagination Dots Only (No Left/Right Arrows) */}
              <div
                className="mt-4 flex items-center justify-center gap-2 md:hidden"
                role="tablist"
                aria-label="Couple review slides"
              >
                {COUPLE_REVIEWS.map((review, idx) => {
                  const isActive = activeReviewIndex === idx;
                  return (
                    <button
                      key={review.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View review from ${review.couple}`}
                      onClick={() => scrollToReviewSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-6 bg-[#3D0C11]'
                          : 'w-2 bg-[#E3D9CE] hover:bg-[#8C6A6E]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Desktop 3-Column Single Row (hidden on mobile, grid on md+) */}
              <div className="gsap-stagger-group hidden md:grid md:grid-cols-3 md:gap-8">
                {COUPLE_REVIEWS.map((review) => (
                  <article
                    key={review.id}
                    className="gsap-stagger-item flex flex-col justify-between rounded-2xl border border-[#E3D9CE] bg-white p-6 shadow-editorial transition-all duration-300 hover:-translate-y-1"
                  >
                    <div>
                      <div
                        className="flex items-center gap-1"
                        aria-label="Rated 5 out of 5 stars"
                      >
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="h-4 w-4 fill-[#D4AF7A] text-[#D4AF7A]"
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>

                      <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-[#1A0B0D]">
                        {review.quote}
                      </blockquote>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#E3D9CE] pt-4">
                      <div>
                        <p className="font-serif text-xl font-bold text-[#1A0B0D]">
                          {review.couple}
                        </p>
                        <p className="text-xs text-[#8C6A6E]">{review.location}</p>
                      </div>
                      <span className="rounded-full border border-[#E3D9CE] bg-[#F6F1EA] px-3 py-1 text-[11px] font-medium text-[#6E1B24]">
                        {review.theme}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          G. FOOTER (DARK CONTRAST ANCHOR)
          Full-bleed Oxblood Wax (#3D0C11) background with Silk Ivory (#F6F1EA)
          and Champagne Gold (#D4AF7A) text.
      ====================================================================== */}
      <footer className="bg-[#3D0C11] text-[#F6F1EA] border-t border-[#D4AF7A]/25">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 pb-12 border-b border-[#D4AF7A]/20">
            {/* Brand Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="flex flex-col items-start">
                <MelcomeLogoLockup
                  variant="foil"
                  className="h-12 sm:h-14 w-auto"
                />
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#D4AF7A]">
                  Digital Wedding Invitation Studio
                </p>
              </div>

              <p className="mt-4 font-serif text-xl italic text-[#D4AF7A]">
                “Every love story deserves a grand opening.”
              </p>

              <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#F6F1EA]/75">
                Handcrafted interactive wedding invitation websites that blend heirloom stationery
                aesthetics with effortless WhatsApp sharing, Google Maps navigation, and live RSVP
                tracking.
              </p>
            </div>

            {/* Quick Links Column (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF7A]">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#F6F1EA]/85">
                {[
                  { label: 'Invitation Collection', target: 'collection' },
                  { label: 'How It Works', target: 'how-it-works' },
                  { label: 'Couple Stories', target: 'reviews' },
                  { label: 'Why Melcome', target: 'about' },
                ].map((link) => (
                  <li key={link.target}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.target)}
                      className="transition-colors duration-300 hover:text-[#D4AF7A]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Direct WhatsApp CTA Column (4 cols) */}
            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF7A]">
                Start Your Invitation
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#F6F1EA]/80">
                Have a custom theme in mind or need your invitation link in 24 hours? Chat directly
                with our design studio.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={() => setOrderDemo(INVITATION_DEMOS[1])}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF7A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A0B0D] transition-all duration-300 hover:bg-[#E5C594]"
                >
                  <MessageSquare className="h-4 w-4" strokeWidth={1.5} />
                  <span>Chat on WhatsApp</span>
                </button>

                <a
                  href="https://instagram.com/melcome.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF7A]/35 bg-[#6E1B24]/40 px-5 py-3 text-xs font-medium text-[#F6F1EA] transition-all duration-300 hover:border-[#D4AF7A] hover:bg-[#6E1B24]"
                >
                  <Instagram className="h-4 w-4 text-[#D4AF7A]" strokeWidth={1.5} />
                  <span>Instagram @melcome.in</span>
                  <ExternalLink className="h-3 w-3 opacity-70" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#F6F1EA]/70 sm:flex-row">
            <p>© 2026 Melcome. All rights reserved.</p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#D4AF7A]/85">
              melcome.in • Crafted with Love &amp; Editorial Precision
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE QUICK PREVIEW MODAL & WHATSAPP ORDER MODAL
      ====================================================================== */}
      <QuickPreviewModal
        activeDemo={previewDemo}
        allDemos={INVITATION_DEMOS}
        onSelectDemo={(d) => setPreviewDemo(d)}
        onClose={() => setPreviewDemo(null)}
        onOrderDemo={(d) => setOrderDemo(d)}
      />

      <OrderModal demo={orderDemo} onClose={() => setOrderDemo(null)} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { GaneshIcon, IndianDivider } from './GaneshIcon';
import { Sparkles, ChevronDown } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

interface EnvelopeSceneProps {
  onOpen: () => void;
  onSkip: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({ onOpen, onSkip }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (prefersReducedMotion) {
      onOpen();
      return;
    }

    // Sequence: Flap swings open (0-600ms) -> Letter glides up (400-1200ms) -> Next scene (1600ms)
    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-3 sm:px-6 py-4 sm:py-6 bg-velvet text-[#FFF7E7] overflow-x-hidden select-none">
      {/* Outer Golden Arch Framing */}
      <div className="absolute inset-2 sm:inset-5 border-2 border-[#D6B56D]/50 rounded-2xl pointer-events-none z-10 flex flex-col justify-between p-2 sm:p-4">
        <div className="w-full flex justify-between items-start">
          <div className="corner-ornament-tl" />
          <div className="corner-ornament-tr" />
        </div>
        <div className="w-full flex justify-between items-end">
          <div className="corner-ornament-bl" />
          <div className="corner-ornament-br" />
        </div>
      </div>

      {/* Top Skip Button - Discreet & Accessible */}
      <div className="w-full max-w-md flex justify-end z-30 pt-1">
        <button
          onClick={onSkip}
          className="text-xs text-[#F7E6B0]/80 hover:text-[#FFF7E7] px-3 py-1.5 rounded-full border border-[#D6B56D]/30 hover:border-[#D6B56D] transition-colors flex items-center gap-1 backdrop-blur-sm bg-[#35030C]/50"
        >
          <span>सीधे विवरण देखें</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Center Content Area */}
      <div className="flex flex-col items-center text-center z-20 max-w-md w-full mx-auto my-auto py-2">
        {/* Divine Header: Ganesh Ji */}
        <div className="relative mb-1">
          <div className="absolute -inset-3 bg-radial from-[#F7E6B0]/25 via-[#D6B56D]/5 to-transparent rounded-full blur-md pointer-events-none" />
          <GaneshIcon size={72} />
        </div>

        <h1 className="text-lg sm:text-2xl font-bold tracking-widest text-[#F7E6B0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-hindi">
          ॥ ॐ श्री गणेशाय नमः ॥
        </h1>
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#D6B56D] uppercase mt-0.5">
          सादर आमंत्रण
        </p>

        <IndianDivider className="my-1.5" />

        {/* 
          ENVELOPE STAGE:
          The envelope container is strictly locked in place.
          NO translateY, margin shifts, or scale jumps occur before, during, or after opening.
        */}
        <div className="relative my-2 sm:my-3 w-full max-w-[340px] sm:max-w-[370px] h-[215px] sm:h-[235px] flex items-center justify-center [perspective:1400px]">
          {/* Ambient Warm Golden Aura (glows gently on open) */}
          <div
            className={`absolute -inset-4 rounded-3xl bg-radial from-[#F59E0B]/25 via-[#D6B56D]/10 to-transparent blur-xl pointer-events-none transition-opacity duration-1000 ${
              isOpening ? 'opacity-100' : 'opacity-40'
            }`}
          />

          {/* 
            THE ENVELOPE (Single Positioning Anchor):
            Zero translate-y or jumping. Everything aligns relative to this box.
          */}
          <div
            onClick={handleOpenClick}
            className="envelope-container relative w-full h-full rounded-2xl cursor-pointer select-none"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 16px 38px rgba(18, 1, 4, 0.85), 0 0 20px rgba(214, 181, 109, 0.25)',
            }}
          >
            {/* 1. ENVELOPE BACK BODY (Base Layer) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3D030C] via-[#2E0209] to-[#200106] rounded-2xl border-2 border-[#D6B56D] overflow-hidden z-1">
              {/* Subtle Velvet Floral Watermark Texture */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F7E6B0_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
              <div className="absolute inset-2 border border-[#D6B56D]/30 rounded-xl pointer-events-none" />
            </div>

            {/* 
              2. THE GOLDEN INVITATION LETTER (Middle Layer)
              - Sits between Back Body (z-1) and Front Pocket (z-15)
              - Rises smoothly above the envelope when opened (z-25)
              - NOT clipped by any overflow-hidden parent!
            */}
            <div
              className="absolute left-[3%] right-[3%] bottom-[4%] rounded-xl border border-[#D6B56D] p-3 sm:p-4 text-[#35030C] shadow-2xl transition-all flex flex-col items-center justify-center text-center"
              style={{
                height: '90%',
                background: 'linear-gradient(135deg, #FFFDF5 0%, #FDF7E2 40%, #F9EFC7 75%, #F4E2A8 100%)',
                transform: isOpening ? 'translateY(-72px)' : 'translateY(0)',
                transitionDuration: prefersReducedMotion ? '0.1s' : '950ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: isOpening ? '350ms' : '0ms',
                zIndex: isOpening ? 25 : 5,
                boxShadow: isOpening
                  ? '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(214,181,109,0.5)'
                  : '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              {/* Golden Hairline Inner Frame */}
              <div className="absolute inset-1.5 border border-[#D6B56D]/60 rounded-lg pointer-events-none" />

              {/* Letter Header */}
              <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#8F6723] uppercase font-hindi">
                ॥ श्री गणेशाय नमः ॥
              </div>

              {/* Ceremony Heading */}
              <div className="text-[13px] sm:text-[15px] font-extrabold text-[#510712] font-hindi leading-tight mt-0.5">
                शुभ सगाई समारोह
              </div>

              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent my-1 sm:my-1.5" />

              {/* Couple Names - Clear, Fully Visible, Without Clipping */}
              <div className="flex flex-col items-center justify-center w-full px-1">
                <span className="text-[12px] sm:text-[14px] font-bold text-[#6D071A] font-hindi leading-snug whitespace-nowrap">
                  {INVITATION_CONFIG.BRIDE_TITLE}
                </span>

                <span className="text-[10px] sm:text-[11px] font-extrabold text-[#B45309] font-hindi my-0.5">
                  संग
                </span>

                <span className="text-[12px] sm:text-[14px] font-bold text-[#6D071A] font-hindi leading-snug whitespace-nowrap">
                  {INVITATION_CONFIG.GROOM_TITLE}
                </span>
              </div>

              {/* Event Date & Time */}
              <div className="mt-1 sm:mt-1.5 pt-1 border-t border-[#D6B56D]/40 text-[10px] sm:text-[11px] font-semibold text-[#510712] flex items-center justify-center gap-1.5 whitespace-nowrap">
                <span>{INVITATION_CONFIG.EVENT_DATE_HINDI}</span>
                <span>•</span>
                <span>{INVITATION_CONFIG.EVENT_TIME_HINDI}</span>
              </div>
            </div>

            {/* 
              3. ENVELOPE FRONT POCKET (Lower Layer)
              - Anchored exactly to bottom/left/right of envelope-container
              - Perfectly covers the bottom half of the letter when closed
              - Z-index: 15
            */}
            <div className="absolute inset-0 pointer-events-none z-15 rounded-2xl overflow-hidden">
              <svg
                viewBox="0 0 360 230"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="pocketBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A0512" />
                    <stop offset="60%" stopColor="#35030C" />
                    <stop offset="100%" stopColor="#220106" />
                  </linearGradient>
                  <linearGradient id="pocketGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7E6B0" />
                    <stop offset="50%" stopColor="#D6B56D" />
                    <stop offset="100%" stopColor="#8F6723" />
                  </linearGradient>
                </defs>

                {/* Left Side Triangular Fold */}
                <path
                  d="M0,0 L165,115 L0,230 Z"
                  fill="url(#pocketBaseGrad)"
                  stroke="url(#pocketGoldGrad)"
                  strokeWidth="1.2"
                />

                {/* Right Side Triangular Fold */}
                <path
                  d="M360,0 L195,115 L360,230 Z"
                  fill="url(#pocketBaseGrad)"
                  stroke="url(#pocketGoldGrad)"
                  strokeWidth="1.2"
                />

                {/* Bottom Triangular Fold */}
                <path
                  d="M0,230 L180,105 L360,230 Z"
                  fill="url(#pocketBaseGrad)"
                  stroke="url(#pocketGoldGrad)"
                  strokeWidth="1.4"
                />
              </svg>

              {/* Bottom Golden Corner Accents */}
              <div className="absolute bottom-2.5 left-3 text-[10px] text-[#F7E6B0]/70 font-cinzel">✦</div>
              <div className="absolute bottom-2.5 right-3 text-[10px] text-[#F7E6B0]/70 font-cinzel">✦</div>
            </div>

            {/* 
              4. TOP FOLDING FLAP (Hinged at top:0)
              - Exact top hinge: origin-top
              - Rotates rotateX(-180deg) smoothly without moving envelope container
              - When closed: z-20. When fully open: behind rising letter (z-2)
            */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: '58%',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                transform: isOpening ? 'rotateX(-175deg)' : 'rotateX(0deg)',
                transitionDuration: prefersReducedMotion ? '0.1s' : '750ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: isOpening ? 2 : 20,
              }}
            >
              <svg
                viewBox="0 0 360 135"
                className="w-full h-full filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.65)]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#550816" />
                    <stop offset="60%" stopColor="#3C040E" />
                    <stop offset="100%" stopColor="#2A0208" />
                  </linearGradient>
                  <linearGradient id="flapBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF7D6" />
                    <stop offset="50%" stopColor="#D6B56D" />
                    <stop offset="100%" stopColor="#9E782F" />
                  </linearGradient>
                </defs>

                {/* Triangle Flap pointing downward */}
                <path
                  d="M0,0 L360,0 L180,130 Z"
                  fill="url(#flapGrad)"
                  stroke="url(#flapBorderGrad)"
                  strokeWidth="2"
                />

                {/* Decorative Inner Arch on Flap */}
                <path
                  d="M25,6 L335,6 L180,118 Z"
                  fill="none"
                  stroke="rgba(247, 230, 176, 0.4)"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
              </svg>

              {/* 
                5. WAX SEAL EMBLEM (Attached to tip of flap)
                - Centered exactly at bottom peak of flap (y=130px -> ~96% of flap height)
              */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  top: '96%',
                  background: 'radial-gradient(circle at 35% 35%, #FFF7D6 0%, #D6B56D 45%, #8F6723 85%, #4A2E05 100%)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.7), 0 0 12px rgba(214,181,109,0.5)',
                  border: '2px solid #FFF7E7',
                  opacity: isOpening ? 0 : 1,
                  transform: `translate(-50%, -50%) scale(${isOpening ? 0.4 : 1})`,
                }}
              >
                <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full border border-[#FFF7E7]/70 flex items-center justify-center">
                  <GaneshIcon size={26} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          Main Welcome Text Outside Envelope:
          Ensures bride & groom names are 100% visible, centered, and readable at all times!
        */}
        <div className="space-y-1 mt-2 w-full px-2">
          <h2 className="text-xl sm:text-2xl font-bold font-hindi gold-text-gradient tracking-wide">
            शुभ सगाई समारोह
          </h2>

          <div className="flex flex-col items-center justify-center text-sm sm:text-base font-semibold text-[#FFF7E7] font-hindi pt-0.5">
            <span className="leading-snug">{INVITATION_CONFIG.BRIDE_TITLE}</span>
            <span className="text-[#D6B56D] text-xs font-bold my-0.5 tracking-widest uppercase">
              संग
            </span>
            <span className="leading-snug">{INVITATION_CONFIG.GROOM_TITLE}</span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#D6B56D] font-hindi pt-0.5">
            {INVITATION_CONFIG.EVENT_DATE_HINDI} • {INVITATION_CONFIG.EVENT_TIME_HINDI}
          </p>
        </div>
      </div>

      {/* 
        Bottom Single-Click Interactive CTA Button:
        Clicking this or clicking the envelope triggers the exact same smooth opening flow.
      */}
      <div className="z-30 w-full max-w-xs flex flex-col items-center gap-1.5 pb-2 sm:pb-4">
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="w-full py-3 sm:py-3.5 px-6 rounded-full font-bold text-base sm:text-lg tracking-wide text-[#270309] bg-gradient-to-r from-[#FFF5CE] via-[#D6B56D] to-[#F7E6B0] shadow-[0_8px_25px_rgba(214,181,109,0.4)] hover:shadow-[0_10px_35px_rgba(214,181,109,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-[#FFF7E7]"
        >
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{isOpening ? 'निमंत्रण खुल रहा है...' : 'निमंत्रण खोलें ✨'}</span>
        </button>

        <p className="text-[11px] text-[#F7E6B0]/70 tracking-wider font-light">
          एक बार टैप करके उत्सव प्रारंभ करें
        </p>
      </div>
    </div>
  );
};

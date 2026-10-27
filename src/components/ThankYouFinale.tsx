import React, { useState } from 'react';
import { GaneshIcon, IndianDivider, DiyaIcon } from './GaneshIcon';
import { RotateCcw, Sparkles, Phone } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

interface ThankYouFinaleProps {
  onReplayInvitation: () => void;
  showClosingGateEffect?: boolean;
}

export const ThankYouFinale: React.FC<ThankYouFinaleProps> = ({
  onReplayInvitation,
  showClosingGateEffect = false,
}) => {
  const [gateClosing, setGateClosing] = useState(false);

  const handleSimulateGateClose = () => {
    setGateClosing(true);
    setTimeout(() => {
      setGateClosing(false);
    }, 3800);
  };

  return (
    <footer id="thankyou" className="relative w-full max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center space-y-10">
      {/* Decorative Closing Gate Overlay (when triggered) */}
      {(gateClosing || showClosingGateEffect) && (
        <div className="fixed inset-0 z-50 pointer-events-none flex gate-perspective">
          <div
            className="w-1/2 h-full bg-gradient-to-r from-[#200106] to-[#3B040D] border-r-2 border-[#D6B56D]"
            style={{
              animation: 'gateCloseLeft 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
            }}
          />
          <div
            className="w-1/2 h-full bg-gradient-to-l from-[#200106] to-[#3B040D] border-l-2 border-[#D6B56D]"
            style={{
              animation: 'gateCloseRight 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
            }}
          />
        </div>
      )}

      {/* Main Royal Card */}
      <div className="royal-frame rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#3E040E] via-[#2A0208] to-[#1E0106] shadow-2xl relative overflow-hidden space-y-8">
        <div className="corner-ornament-tl" />
        <div className="corner-ornament-tr" />
        <div className="corner-ornament-bl" />
        <div className="corner-ornament-br" />

        {/* Ambient Warm Golden Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-64 bg-radial from-[#F7E6B0]/15 via-[#D6B56D]/5 to-transparent blur-3xl pointer-events-none" />

        {/* Top Ganesh Ji Icon */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-2.5 rounded-full bg-[#510712] border border-[#D6B56D] shadow-lg">
            <GaneshIcon size={68} />
          </div>
          <p className="text-base sm:text-lg font-bold tracking-widest text-[#F7E6B0] font-hindi">
            ॥ ॐ श्री गणेशाय नमः ॥
          </p>
        </div>

        <IndianDivider />

        {/* MAIN HIGHLIGHT: Invitation message is the central focus (couple's names removed here per feedback) */}
        <div className="max-w-2xl mx-auto space-y-4 py-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-hindi text-[#F7E6B0] gold-text-gradient leading-relaxed">
            आपकी उपस्थिति सादर प्रार्थनीय है।
          </h2>

          <p className="text-base sm:text-xl font-hindi text-[#FFF7E7]/95 leading-relaxed font-medium">
            सपरिवार पधारकर वर-वधू को अपना स्नेह एवं आशीर्वाद प्रदान करें।
          </p>

          <div className="py-3">
            <span className="inline-block px-8 py-2.5 rounded-full bg-gradient-to-r from-[#510712] via-[#800020] to-[#510712] border-2 border-[#D6B56D] text-2xl sm:text-3xl font-extrabold font-hindi gold-text-gradient shadow-xl">
              धन्यवाद!
            </span>
          </div>
        </div>

        {/* Final Inviter Information (Section 1F: श्री विजय नाथ दुबे [सुरेन्द्र दुबे], ग्राम कुंदहा, रामापुर, जौनपुर) */}
        <div className="pt-6 border-t border-[#D6B56D]/40 max-w-lg mx-auto space-y-2 text-xs sm:text-sm font-hindi">
          <div className="text-[#D6B56D] font-bold uppercase tracking-wider text-xs">
            सादर आमंत्रक:
          </div>
          <p className="text-lg sm:text-2xl font-bold text-[#FFF7E7] font-hindi gold-text-gradient">
            {INVITATION_CONFIG.FINAL_INVITER_NAME}
          </p>
          <p className="text-sm sm:text-base text-[#FFF7E7]/90 font-hindi">
            {INVITATION_CONFIG.FINAL_INVITER_ADDRESS}
          </p>
          <p className="text-[#F7E6B0] flex items-center justify-center gap-1.5 pt-2">
            <Phone size={14} className="text-[#D6B56D]" />
            <span>संपर्क: </span>
            <a
              href={`tel:+${INVITATION_CONFIG.CONTACT_PHONE_RAW}`}
              className="font-bold underline hover:text-[#FFF7E7] tracking-wider"
            >
              {INVITATION_CONFIG.CONTACT_PHONE}
            </a>
          </p>
        </div>

        {/* Diyas on corners of footer */}
        <div className="flex justify-around items-center pt-2">
          <DiyaIcon className="w-8 h-8" />
          <div className="text-[11px] text-[#D6B56D]/70 font-hindi">
            ॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके ॥
          </div>
          <DiyaIcon className="w-8 h-8" />
        </div>
      </div>

      {/* Action Buttons to Replay or Symbolically Close */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={onReplayInvitation}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D6B56D] to-[#F7E6B0] text-[#270309] font-bold text-sm font-hindi shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw size={16} />
          <span>निमंत्रण पुनः देखें (प्रारंभ से)</span>
        </button>

        <button
          onClick={handleSimulateGateClose}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#35030C] border border-[#D6B56D]/50 text-[#F7E6B0] hover:text-[#FFF7E7] hover:border-[#D6B56D] text-xs sm:text-sm font-hindi transition-colors"
        >
          <Sparkles size={16} className="text-[#D6B56D]" />
          <span>शाही द्वार दृश्य</span>
        </button>
      </div>

      <p className="text-[11px] text-[#F7E6B0]/50 tracking-wider">
        मधु एवं अभिषेक शुभ सगाई समारोह • {INVITATION_CONFIG.EVENT_DATE_HINDI}
      </p>

      <style>{`
        @keyframes gateCloseLeft {
          0% { transform: rotateY(-90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes gateCloseRight {
          0% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </footer>
  );
};

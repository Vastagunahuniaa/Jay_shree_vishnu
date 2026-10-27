import React, { useEffect, useState } from 'react';
import { GaneshIcon, DiyaIcon } from './GaneshIcon';
import { Sparkles } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

interface GateSceneProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const GateScene: React.FC<GateSceneProps> = ({ onComplete, onSkip }) => {
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    // Automatically trigger gate swing after a brief reveal
    const timer = setTimeout(() => {
      setGateOpen(true);
    }, 350);

    // After the gate swings open and celebration bursts, proceed to the main celebration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-velvet overflow-hidden gate-perspective">
      {/* Golden celebration backlight */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          gateOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-[120vw] h-[120vh] bg-radial from-[#F7E6B0]/30 via-[#D6B56D]/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Skip button in corner */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={onSkip}
          className="text-xs text-[#F7E6B0] hover:text-[#FFF7E7] px-3 py-1.5 rounded-full border border-[#D6B56D]/40 bg-[#35030C]/80 backdrop-blur-sm shadow-md"
        >
          स्किप करें ⏭
        </button>
      </div>

      {/* Palace Archway Top Ornament (Toran / Jharokha frame) */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-36 z-35 flex flex-col items-center pointer-events-none">
        <div className="w-full h-12 bg-gradient-to-b from-[#35030C] to-[#510712] border-b-2 border-[#D6B56D] flex items-center justify-center relative shadow-lg">
          <div className="flex items-center gap-3 sm:gap-6 text-[#F7E6B0] text-xs sm:text-sm font-semibold tracking-wider font-hindi">
            <span>✿</span>
            <span>॥ शुभ सगाई समारोह ॥</span>
            <span>✿</span>
          </div>
        </div>

        {/* Diyas on Left and Right Archway Pillars */}
        <div className="w-full max-w-4xl px-4 flex justify-between items-center -mt-2">
          <DiyaIcon className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-[0_0_8px_#F59E0B]" />
          <div className="p-1.5 rounded-full bg-[#35030C]/90 border border-[#D6B56D] shadow-md">
            <GaneshIcon size={36} />
          </div>
          <DiyaIcon className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-[0_0_8px_#F59E0B]" />
        </div>
      </div>

      {/* Behind Gate Revealed Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-1000 ${
          gateOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-md space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6B56D]/60 bg-[#510712]/60 backdrop-blur-sm text-[#F7E6B0] text-xs tracking-widest font-semibold uppercase">
            <Sparkles size={14} className="text-[#F7E6B0]" />
            <span>राजकीय प्रवेश द्वार</span>
            <Sparkles size={14} className="text-[#F7E6B0]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-hindi gold-text-gradient leading-tight">
            स्वागतम्
          </h2>

          <div className="text-base sm:text-lg font-hindi text-[#FFF7E7] space-y-1">
            <p className="font-bold text-[#F7E6B0]">{INVITATION_CONFIG.BRIDE_TITLE}</p>
            <p className="text-xs text-[#D6B56D] font-bold">संग</p>
            <p className="font-bold text-[#F7E6B0]">{INVITATION_CONFIG.GROOM_TITLE}</p>
            <p className="text-xs sm:text-sm text-[#FFF7E7]/80 pt-1">
              के शुभ सगाई समारोह में आपका हार्दिक स्वागत है।
            </p>
          </div>
        </div>
      </div>

      {/* 3D Gate Panels: Left & Right */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {/* Left Gate Panel */}
        <div
          className={`w-1/2 h-full origin-left transition-transform duration-[2000ms] ease-out relative border-r-2 border-[#D6B56D] shadow-[20px_0_50px_rgba(0,0,0,0.85)] ${
            gateOpen ? '[transform:rotateY(-105deg)]' : '[transform:rotateY(0deg)]'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(135deg, #4A0511 0%, #35030C 50%, #220106 100%)',
          }}
        >
          <div className="absolute inset-4 sm:inset-8 border-2 border-[#D6B56D]/80 rounded-l-3xl p-3 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D6B56D_2px,transparent_2px)] [background-size:24px_24px]" />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              <div className="w-12 h-20 rounded-full border-2 border-[#D6B56D] bg-gradient-to-r from-[#D6B56D]/40 to-[#F7E6B0]/20 flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 rounded-full border border-[#FFF7E7] bg-[#510712]" />
              </div>
            </div>

            <div className="text-right text-[#D6B56D] text-xs font-cinzel">✦ ❖ ✦</div>
            <div className="text-center text-[#F7E6B0]/60 text-[10px] tracking-widest uppercase font-hindi">
              ॥ ॐ ॥
            </div>
            <div className="text-right text-[#D6B56D] text-xs font-cinzel">✦ ❖ ✦</div>
          </div>
        </div>

        {/* Right Gate Panel */}
        <div
          className={`w-1/2 h-full origin-right transition-transform duration-[2000ms] ease-out relative border-l-2 border-[#D6B56D] shadow-[-20px_0_50px_rgba(0,0,0,0.85)] ${
            gateOpen ? '[transform:rotateY(105deg)]' : '[transform:rotateY(0deg)]'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(225deg, #4A0511 0%, #35030C 50%, #220106 100%)',
          }}
        >
          <div className="absolute inset-4 sm:inset-8 border-2 border-[#D6B56D]/80 rounded-r-3xl p-3 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D6B56D_2px,transparent_2px)] [background-size:24px_24px]" />

            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              <div className="w-12 h-20 rounded-full border-2 border-[#D6B56D] bg-gradient-to-l from-[#D6B56D]/40 to-[#F7E6B0]/20 flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 rounded-full border border-[#FFF7E7] bg-[#510712]" />
              </div>
            </div>

            <div className="text-left text-[#D6B56D] text-xs font-cinzel">✦ ❖ ✦</div>
            <div className="text-center text-[#F7E6B0]/60 text-[10px] tracking-widest uppercase font-hindi">
              ॥ श्री ॥
            </div>
            <div className="text-left text-[#D6B56D] text-xs font-cinzel">✦ ❖ ✦</div>
          </div>
        </div>
      </div>
    </div>
  );
};

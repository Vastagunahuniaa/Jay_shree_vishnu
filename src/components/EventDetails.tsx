import React from 'react';
import { GaneshIcon, IndianDivider, DiyaIcon } from './GaneshIcon';
import { Calendar, Clock, MapPin, Heart, Sparkles, UserCheck } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

interface EventDetailsProps {
  onOpenCardModal: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onOpenCardModal }) => {
  return (
    <section id="ceremony" className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* 1. SCENE THREE: Ceremony Title Reveal */}
      <div className="text-center space-y-4">
        <div className="inline-block p-2 rounded-full bg-[#35030C]/80 border border-[#D6B56D]/50 shadow-md">
          <GaneshIcon size={64} />
        </div>

        <div className="space-y-1">
          <p className="text-lg sm:text-xl font-bold tracking-widest text-[#F7E6B0] font-hindi">
            ॥ ॐ श्री गणेशाय नमः ॥
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-hindi gold-text-gradient tracking-wide py-1">
            शुभ सगाई समारोह
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#D6B56D] font-royal uppercase">
            ENGAGEMENT CEREMONY
          </p>
        </div>

        <IndianDivider text="मांगलिक प्रसंग" />

        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#FFF7E7]/90 font-hindi leading-relaxed">
          सपरिवार पधारकर वर-वधू को अपना स्नेह एवं आशीर्वाद प्रदान करें।
        </p>
      </div>

      {/* 2. SCENE FOUR: Bride and Groom Reveal */}
      <div id="couple" className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Bride Card (मधु दुबे) */}
          <div className="royal-frame rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
            <div className="corner-ornament-tl" />
            <div className="corner-ornament-tr" />
            <div className="corner-ornament-bl" />
            <div className="corner-ornament-br" />

            <div className="w-12 h-12 rounded-full bg-[#510712] border border-[#D6B56D] flex items-center justify-center text-[#F7E6B0] mb-3 shadow-md">
              <Sparkles size={20} className="text-[#F7E6B0]" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#D6B56D] font-bold">
              वधू
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-hindi text-[#FFF7E7] mt-1 mb-2 gold-text-gradient">
              {INVITATION_CONFIG.BRIDE_TITLE}
            </h2>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent my-3" />

            <div className="space-y-2 text-sm sm:text-base font-hindi text-[#FFF7E7]/90 leading-relaxed">
              <p>
                <span className="text-[#D6B56D] font-semibold">सुपुत्री:</span> {INVITATION_CONFIG.BRIDE_FATHER} एवं {INVITATION_CONFIG.BRIDE_MOTHER}
              </p>
              <p>
                <span className="text-[#D6B56D] font-semibold">पौत्री:</span> {INVITATION_CONFIG.BRIDE_GRANDFATHER} एवं {INVITATION_CONFIG.BRIDE_GRANDMOTHER}
              </p>
            </div>
          </div>

          {/* Groom Card (अभिषेक तिवारी) */}
          <div className="royal-frame rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
            <div className="corner-ornament-tl" />
            <div className="corner-ornament-tr" />
            <div className="corner-ornament-bl" />
            <div className="corner-ornament-br" />

            <div className="w-12 h-12 rounded-full bg-[#510712] border border-[#D6B56D] flex items-center justify-center text-[#F7E6B0] mb-3 shadow-md">
              <Sparkles size={20} className="text-[#F7E6B0]" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#D6B56D] font-bold">
              वर
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-hindi text-[#FFF7E7] mt-1 mb-2 gold-text-gradient">
              {INVITATION_CONFIG.GROOM_TITLE}
            </h2>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent my-3" />

            <div className="space-y-2 text-sm sm:text-base font-hindi text-[#FFF7E7]/90 leading-relaxed">
              <p>
                <span className="text-[#D6B56D] font-semibold">सुपुत्र:</span> {INVITATION_CONFIG.GROOM_FATHER} एवं {INVITATION_CONFIG.GROOM_MOTHER}
              </p>
              <p>
                <span className="text-[#D6B56D] font-semibold">निवास:</span> {INVITATION_CONFIG.GROOM_RESIDENCE}
              </p>
            </div>
          </div>
        </div>

        {/* Center Intertwined Royal Rings / Sang Badge */}
        <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 my-4 md:my-0 flex justify-center z-20">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#510712] via-[#35030C] to-[#510712] border-2 border-[#D6B56D] shadow-[0_0_20px_rgba(214,181,109,0.5)]">
            <span className="text-[#F7E6B0] text-sm">✦</span>
            <Heart size={16} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-base sm:text-lg font-bold font-hindi text-[#FFF7E7] px-1">संग</span>
            <Heart size={16} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-[#F7E6B0] text-sm">✦</span>
          </div>
        </div>
      </div>

      {/* 3. Event Time & Date Highlight Banner */}
      <div className="royal-frame rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#35030C] via-[#510712] to-[#35030C] text-center space-y-6">
        <div className="corner-ornament-tl" />
        <div className="corner-ornament-tr" />
        <div className="corner-ornament-bl" />
        <div className="corner-ornament-br" />

        <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#270309] border border-[#D6B56D] flex items-center justify-center text-[#D6B56D]">
              <Calendar size={24} />
            </div>
            <div className="text-left font-hindi">
              <span className="text-xs text-[#D6B56D] block font-semibold">समारोह दिनांक</span>
              <span className="text-xl sm:text-2xl font-bold text-[#FFF7E7]">{INVITATION_CONFIG.EVENT_DATE_HINDI}</span>
            </div>
          </div>

          <div className="hidden sm:block h-12 w-[1px] bg-[#D6B56D]/40" />

          {/* Time (Updated to 4:00 PM / शाम 4 बजे) */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#270309] border border-[#D6B56D] flex items-center justify-center text-[#D6B56D]">
              <Clock size={24} />
            </div>
            <div className="text-left font-hindi">
              <span className="text-xs text-[#D6B56D] block font-semibold">शुभ मुहूर्त समय</span>
              <span className="text-xl sm:text-2xl font-bold text-[#FFF7E7]">{INVITATION_CONFIG.EVENT_TIME_HINDI}</span>
            </div>
          </div>

          <div className="hidden sm:block h-12 w-[1px] bg-[#D6B56D]/40" />

          {/* Place brief */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#270309] border border-[#D6B56D] flex items-center justify-center text-[#D6B56D]">
              <MapPin size={24} />
            </div>
            <div className="text-left font-hindi">
              <span className="text-xs text-[#D6B56D] block font-semibold">समारोह स्थल</span>
              <span className="text-lg sm:text-xl font-bold text-[#FFF7E7]">{INVITATION_CONFIG.VENUE_LOCATION}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SCENE FIVE: Animated Family & Inviter Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inviter Card (प्रेषक) with updated address (रामापुर) */}
        <div className="royal-frame rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="corner-ornament-tl" />
          <div className="corner-ornament-tr" />
          <div className="corner-ornament-bl" />
          <div className="corner-ornament-br" />

          <div>
            <div className="flex items-center gap-2 mb-3 text-[#D6B56D]">
              <UserCheck size={20} />
              <span className="text-xs uppercase tracking-widest font-bold">सादर आमंत्रक / प्रेषक</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold font-hindi text-[#FFF7E7] mb-2 gold-text-gradient">
              {INVITATION_CONFIG.INVITER_NAME}
            </h3>
            <div className="inline-block px-2.5 py-1 rounded bg-[#510712] border border-[#D6B56D]/50 text-xs font-semibold text-[#F7E6B0] mb-3">
              {INVITATION_CONFIG.INVITER_ROLE}
            </div>

            <p className="text-sm sm:text-base font-hindi text-[#FFF7E7]/90 leading-relaxed">
              {INVITATION_CONFIG.INVITER_ADDRESS}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D6B56D]/30 flex items-center justify-between text-xs text-[#F7E6B0]">
            <span>सम्पर्क सूत्र:</span>
            <a
              href={`tel:+${INVITATION_CONFIG.CONTACT_PHONE_RAW}`}
              className="font-bold tracking-wider text-[#FFF7E7] hover:text-[#D6B56D] transition-colors"
            >
              {INVITATION_CONFIG.CONTACT_PHONE}
            </a>
          </div>
        </div>

        {/* Traditional Blessing Message */}
        <div className="royal-frame rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center items-center">
          <div className="corner-ornament-tl" />
          <div className="corner-ornament-tr" />
          <div className="corner-ornament-bl" />
          <div className="corner-ornament-br" />

          <DiyaIcon className="w-10 h-10 mb-2" />

          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold font-hindi text-[#F7E6B0]">
              आपकी उपस्थिति प्रार्थनीय है
            </h3>
            <p className="text-sm sm:text-base font-hindi text-[#FFF7E7]/90 italic leading-relaxed">
              &ldquo;हमारे इस मांगलिक अवसर पर पधारकर वर-वधू को अपना शुभाशीर्वाद प्रदान करें एवं हमारे आतिथ्य को स्वीकार कर हमें अनुगृहीत करें।&rdquo;
            </p>
          </div>

          <div className="w-full mt-4 pt-3 border-t border-[#D6B56D]/30 flex justify-center text-xs text-[#D6B56D]">
            <span>॥ सर्व मंगल मांगल्ये शिवे सर्वार्थ साधिके ॥</span>
          </div>
        </div>
      </div>

      {/* 5. Original Invitation Card (Sole dedicated detailed card, outer cover removed) */}
      <div id="original-card" className="space-y-6 pt-2">
        <div className="text-center space-y-2">
          <span className="text-xs tracking-widest text-[#D6B56D] uppercase font-bold">
            मुद्रित स्वरूप
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-hindi gold-text-gradient">
            मूल निमंत्रण पत्रिका
          </h2>
          <p className="text-sm sm:text-base font-hindi text-[#FFF7E7]/80">
            आपकी सुविधा के लिए मूल निमंत्रण पत्रिका यहाँ प्रस्तुत है।
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="royal-frame rounded-2xl p-4 sm:p-6 flex flex-col justify-between bg-[#35030C]/90 shadow-2xl">
            <div className="corner-ornament-tl" />
            <div className="corner-ornament-tr" />
            <div className="corner-ornament-bl" />
            <div className="corner-ornament-br" />

            <div className="text-center mb-3">
              <span className="text-xs sm:text-sm font-bold text-[#F7E6B0] uppercase font-hindi">
                विस्तृत निमंत्रण पत्रिका
              </span>
            </div>

            {/* Preserved entire image without cropping */}
            <div
              onClick={onOpenCardModal}
              className="relative w-full aspect-[3/4] max-h-[520px] overflow-hidden rounded-xl border border-[#D6B56D]/50 bg-[#270309] cursor-pointer group flex items-center justify-center p-2"
            >
              <img
                src={INVITATION_CONFIG.DETAILED_CARD_IMAGE}
                alt="मूल सगाई निमंत्रण पत्रिका - मधु एवं अभिषेक"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = INVITATION_CONFIG.DETAILED_CARD_FALLBACK;
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                <span className="px-5 py-2.5 rounded-full bg-[#D6B56D] text-[#270309] font-bold text-xs sm:text-sm font-hindi shadow-lg">
                  पत्रिका बड़े आकार में देखें 🔍
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="text-xs text-[#D6B56D] font-hindi">सगाई पत्र • 26 नवंबर 2026</span>
              <button
                onClick={onOpenCardModal}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D6B56D] to-[#F7E6B0] text-[#270309] text-xs font-hindi font-bold shadow transition-all hover:scale-105 active:scale-95"
              >
                पत्रिका बड़े आकार में देखें 🔍
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Calendar, Clock } from 'lucide-react';
import { IndianDivider } from './GaneshIcon';
import { INVITATION_CONFIG } from '../config/invitationConfig';

export const VenueSection: React.FC = () => {
  const venueQuery = encodeURIComponent(INVITATION_CONFIG.VENUE_FULL);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${venueQuery}`;
  const whatsappUrl = `https://wa.me/${INVITATION_CONFIG.CONTACT_PHONE_RAW}?text=${encodeURIComponent(
    `सादर प्रणाम, मधु एवं अभिषेक के शुभ सगाई समारोह (${INVITATION_CONFIG.EVENT_DATE_HINDI}, ${INVITATION_CONFIG.VENUE_FULL}) के संबंध में जानकारी हेतु संपर्क किया गया है।`
  )}`;

  return (
    <section id="venue" className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6 sm:space-y-8">
      {/* Golden Spotlight Header */}
      <div className="relative text-center space-y-3">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-radial from-[#F7E6B0]/20 via-[#D6B56D]/5 to-transparent blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#510712] border border-[#D6B56D]/60 text-xs font-bold text-[#F7E6B0] uppercase font-hindi shadow-md">
          <MapPin size={16} className="text-[#D6B56D]" />
          <span>समारोह स्थल विवरण</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-hindi gold-text-gradient">
          समारोह स्थल
        </h2>

        <p className="text-sm sm:text-base font-hindi text-[#FFF7E7]/80">
          आपके सुगम आगमन हेतु स्थल की जानकारी एवं संपर्क सूत्र
        </p>

        <IndianDivider />
      </div>

      {/* Main Venue Showcase Card */}
      <div className="royal-frame rounded-3xl p-6 sm:p-10 text-center space-y-6 sm:space-y-8 bg-gradient-to-b from-[#40040E] to-[#250207] shadow-2xl relative overflow-hidden">
        <div className="corner-ornament-tl" />
        <div className="corner-ornament-tr" />
        <div className="corner-ornament-bl" />
        <div className="corner-ornament-br" />

        {/* Venue Title & Address in exact order: श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़ */}
        <div className="space-y-3">
          <div className="inline-block p-3 rounded-full bg-[#510712] border-2 border-[#D6B56D] text-[#F7E6B0] shadow-lg mb-1">
            <Navigation size={28} className="text-[#F7E6B0]" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold font-hindi text-[#FFF7E7] gold-text-gradient">
            {INVITATION_CONFIG.VENUE_NAME}
          </h3>

          <p className="text-lg sm:text-2xl font-bold font-hindi text-[#F7E6B0]">
            {INVITATION_CONFIG.VENUE_LOCATION}
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D6B56D] to-transparent mx-auto my-3" />

          {/* Date & Time pill badges with corrected 4:00 PM */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-hindi text-[#FFF7E7]/90 pt-1">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#35030C] border border-[#D6B56D]/40">
              <Calendar size={14} className="text-[#D6B56D]" />
              <span>दिनांक {INVITATION_CONFIG.EVENT_DATE_HINDI}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#35030C] border border-[#D6B56D]/40">
              <Clock size={14} className="text-[#D6B56D]" />
              <span>समय {INVITATION_CONFIG.EVENT_TIME_HINDI}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
          {/* 1. Google Maps Navigation Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm font-hindi bg-gradient-to-r from-[#D6B56D] to-[#F7E6B0] text-[#270309] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MapPin size={18} className="text-[#270309]" />
            <span>स्थान का रास्ता देखें 📍</span>
          </a>

          {/* 2. Direct Phone Call Button */}
          <a
            href={`tel:+${INVITATION_CONFIG.CONTACT_PHONE_RAW}`}
            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm font-hindi bg-[#510712] hover:bg-[#800020] text-[#FFF7E7] border border-[#D6B56D]/60 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Phone size={18} className="text-[#D6B56D]" />
            <span>संपर्क करें 📞</span>
          </a>

          {/* 3. Direct WhatsApp Message Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm font-hindi bg-[#1E5631] hover:bg-[#277242] text-white border border-[#4E9F3D]/60 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageCircle size={18} className="text-white" />
            <span>व्हाट्सऐप संदेश 💬</span>
          </a>
        </div>

        {/* Contact Information footnote */}
        <div className="text-xs text-[#F7E6B0]/80 font-hindi pt-2">
          <span>सहायता अथवा मार्ग दर्शन हेतु संपर्क सूत्र: </span>
          <a
            href={`tel:+${INVITATION_CONFIG.CONTACT_PHONE_RAW}`}
            className="font-bold text-[#FFF7E7] tracking-wider hover:underline"
          >
            {INVITATION_CONFIG.CONTACT_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
};

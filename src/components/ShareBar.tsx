import React, { useState } from 'react';
import { Share2, Check, Copy, ArrowUp, CalendarPlus, MessageCircle } from 'lucide-react';

export const ShareBar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return window.location.href;
  };

  const getShareTitle = () => 'मधु एवं अभिषेक — शुभ सगाई समारोह निमंत्रण';

  const getShareText = () => {
    return `॥ ॐ श्री गणेशाय नमः ॥\n\nसादर आमंत्रण\nशुभ सगाई समारोह: आयु. कु. मधु दुबे संग चि. अभिषेक तिवारी\n\nदिनांक: 26 नवंबर 2026, समय: शाम 5 बजे\nसमारोह स्थल: श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़\n\nसपरिवार पधारकर वर-वधू को अपना स्नेह एवं आशीर्वाद प्रदान करें।\n\nडिजिटल निमंत्रण पत्रिका लिंक: ${getShareUrl()}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getShareTitle(),
          text: getShareText(),
          url: getShareUrl(),
        });
      } catch {
        // User cancelled share or aborted
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleAddToCalendar = () => {
    // 26 November 2026 at 5:00 PM IST (17:00) to 22:00 IST
    // UTC: 2026-11-26T11:30:00Z to 2026-11-26T16:30:00Z
    const title = encodeURIComponent('मधु एवं अभिषेक — शुभ सगाई समारोह');
    const details = encodeURIComponent(
      'शुभ सगाई समारोह: आयु. कु. मधु दुबे संग चि. अभिषेक तिवारी। सपरिवार पधारकर वर-वधू को अपना स्नेह एवं आशीर्वाद प्रदान करें।'
    );
    const location = encodeURIComponent('श्री इन मैरिज हॉल, जगनीपुर, प्रतापगढ़');
    const dates = '20261126T113000Z/20261126T163000Z';
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="royal-frame rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#35030C] via-[#480510] to-[#35030C] text-center space-y-6 shadow-xl">
        <div className="corner-ornament-tl" />
        <div className="corner-ornament-tr" />
        <div className="corner-ornament-bl" />
        <div className="corner-ornament-br" />

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold font-hindi gold-text-gradient">
            प्रियजनों के साथ साझा करें
          </h3>
          <p className="text-xs sm:text-sm font-hindi text-[#FFF7E7]/80">
            इस मांगलिक अवसर की निमंत्रण पत्रिका अपने परिजनों एवं मित्रों को प्रेषित करें
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* WhatsApp Share */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#111] font-bold text-xs sm:text-sm font-hindi shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageCircle size={18} className="fill-current text-white" />
            <span className="text-white">व्हाट्सऐप पर भेजें</span>
          </button>

          {/* Web Share API */}
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6B56D] to-[#F7E6B0] text-[#270309] font-bold text-xs sm:text-sm font-hindi shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Share2 size={18} />
            <span>निमंत्रण साझा करें</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#510712] hover:bg-[#800020] text-[#FFF7E7] border border-[#D6B56D]/50 font-semibold text-xs sm:text-sm font-hindi transition-all"
          >
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
            <span>{copied ? 'लिंक कॉपी हो गया!' : 'लिंक कॉपी करें'}</span>
          </button>

          {/* Add to Google Calendar */}
          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#510712] hover:bg-[#800020] text-[#F7E6B0] border border-[#D6B56D]/50 font-semibold text-xs sm:text-sm font-hindi transition-all"
          >
            <CalendarPlus size={18} />
            <span>कैलेंडर में जोड़ें</span>
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="ऊपर जाएँ"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#270309] hover:bg-[#35030C] text-[#D6B56D] border border-[#D6B56D]/40 text-xs sm:text-sm font-hindi transition-all"
          >
            <ArrowUp size={18} />
            <span>ऊपर जाएँ</span>
          </button>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';

interface NavHeaderProps {
  onNavigateHome: () => void;
}

export const NavHeader: React.FC<NavHeaderProps> = ({ onNavigateHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#270309]/95 backdrop-blur-md border-b border-[#D6B56D]/30 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark (single line) */}
        <button
          onClick={onNavigateHome}
          className="text-base sm:text-lg font-bold font-hindi gold-text-gradient whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <span className="text-[#D6B56D] text-sm">॥</span>
          <span>मधु & अभिषेक</span>
          <span className="text-[#D6B56D] text-sm">॥</span>
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-hindi text-[#F7E6B0]">
          <button
            onClick={() => scrollTo('ceremony')}
            className="hover:text-[#FFF7E7] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            सगाई समारोह
          </button>
          <button
            onClick={() => scrollTo('couple')}
            className="hover:text-[#FFF7E7] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            वर-वधू
          </button>
          <button
            onClick={() => scrollTo('original-card')}
            className="hover:text-[#FFF7E7] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            मूल पत्रिका
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="hover:text-[#FFF7E7] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            समारोह स्थल
          </button>
          <button
            onClick={() => scrollTo('thankyou')}
            className="hover:text-[#FFF7E7] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            धन्यवाद
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scrollTo('venue')}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D6B56D] to-[#F7E6B0] text-[#270309] font-bold text-xs font-hindi whitespace-nowrap shrink-0 shadow hover:opacity-95 flex items-center gap-1"
          >
            <MapPin size={13} />
            <span>स्थान देखें</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="मेन्यू खोलें"
            className="md:hidden p-1.5 rounded-lg text-[#F7E6B0] hover:text-[#FFF7E7] hover:bg-[#510712]/50"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#35030C] border-b border-[#D6B56D]/40 px-4 py-4 space-y-3 font-hindi text-sm text-[#F7E6B0]">
          <button
            onClick={() => scrollTo('ceremony')}
            className="block w-full text-left py-1.5 hover:text-[#FFF7E7]"
          >
            सगाई समारोह
          </button>
          <button
            onClick={() => scrollTo('couple')}
            className="block w-full text-left py-1.5 hover:text-[#FFF7E7]"
          >
            वर-वधू
          </button>
          <button
            onClick={() => scrollTo('original-card')}
            className="block w-full text-left py-1.5 hover:text-[#FFF7E7]"
          >
            मूल निमंत्रण पत्रिका
          </button>
          <button
            onClick={() => scrollTo('venue')}
            className="block w-full text-left py-1.5 hover:text-[#FFF7E7]"
          >
            समारोह स्थल (मैरिज हॉल)
          </button>
          <button
            onClick={() => scrollTo('thankyou')}
            className="block w-full text-left py-1.5 hover:text-[#FFF7E7]"
          >
            सादर आमंत्रक एवं धन्यवाद
          </button>
        </div>
      )}
    </header>
  );
};

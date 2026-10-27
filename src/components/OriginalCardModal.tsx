import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitationConfig';

interface OriginalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalCardModal: React.FC<OriginalCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    setZoomLevel(1);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentImageSrc = INVITATION_CONFIG.DETAILED_CARD_IMAGE;
  const currentImageTitle = 'मूल सगाई निमंत्रण पत्रिका';

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 3.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentImageTitle}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-6 bg-black/92 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Top Header Controls Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#35030C]/90 border border-[#D6B56D]/50 shadow-xl text-[#FFF7E7] z-20"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-hindi text-[#F7E6B0]">
            मूल सगाई निमंत्रण पत्रिका
          </span>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleZoomOut}
            aria-label="ज़ूम कम करें"
            className="p-2 rounded-lg bg-[#510712] text-[#F7E6B0] hover:bg-[#800020] transition-colors"
            title="ज़ूम कम करें"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleResetZoom}
            aria-label="रीसेट ज़ूम"
            className="p-2 rounded-lg bg-[#510712] text-[#F7E6B0] hover:bg-[#800020] transition-colors text-xs font-mono"
            title="रीसेट"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={handleZoomIn}
            aria-label="ज़ूम बढ़ाएं"
            className="p-2 rounded-lg bg-[#510712] text-[#F7E6B0] hover:bg-[#800020] transition-colors"
            title="ज़ूम बढ़ाएं"
          >
            <ZoomIn size={16} />
          </button>

          <a
            href={currentImageSrc}
            download="madhu-abhishek-invitation.jpg"
            aria-label="डाउनलोड करें"
            className="p-2 rounded-lg bg-[#510712] text-[#F7E6B0] hover:bg-[#800020] transition-colors"
            title="पत्रिका डाउनलोड करें"
          >
            <Download size={16} />
          </a>

          <button
            onClick={onClose}
            aria-label="बंद करें"
            className="p-2 ml-1 rounded-lg bg-[#D6B56D] text-[#270309] hover:bg-[#F7E6B0] font-bold transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Center Image Canvas with Pan & Zoom */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full flex-1 flex items-center justify-center overflow-auto p-2 sm:p-4 my-2 relative"
      >
        <div
          className="relative transition-transform duration-200 ease-out flex items-center justify-center max-h-[82vh]"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div className="royal-frame p-2 rounded-2xl bg-[#35030C] shadow-2xl">
            <div className="corner-ornament-tl" />
            <div className="corner-ornament-tr" />
            <div className="corner-ornament-bl" />
            <div className="corner-ornament-br" />

            <img
              src={currentImageSrc}
              alt={currentImageTitle}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-[92vw] sm:max-w-[70vw] w-auto h-auto object-contain rounded-lg border border-[#D6B56D]/40"
              onError={(e) => {
                e.currentTarget.src = INVITATION_CONFIG.DETAILED_CARD_FALLBACK;
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center text-xs text-[#F7E6B0]/70 font-hindi flex items-center gap-1.5 z-20">
        <Sparkles size={14} className="text-[#D6B56D]" />
        <span>पत्रिका को स्पष्ट रूप से पढ़ने के लिए ज़ूम करें अथवा डाउनलोड करें</span>
      </div>
    </div>
  );
};

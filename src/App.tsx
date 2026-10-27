/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EnvelopeScene } from './components/EnvelopeScene';
import { GateScene } from './components/GateScene';
import { NavHeader } from './components/NavHeader';
import { EventDetails } from './components/EventDetails';
import { VenueSection } from './components/VenueSection';
import { ThankYouFinale } from './components/ThankYouFinale';
import { OriginalCardModal } from './components/OriginalCardModal';
import { ThreeRoyalCanvas } from './components/ThreeRoyalCanvas';
import { FireworksCanvas } from './components/FireworksCanvas';
import { FloatingBalloons } from './components/FloatingBalloons';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  // Navigation scenes: 'envelope' -> 'gate' -> 'main'
  const [currentScene, setCurrentScene] = useState<'envelope' | 'gate' | 'main'>('envelope');
  const [musicTrigger, setMusicTrigger] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showClosingGate, setShowClosingGate] = useState(false);

  // Original Card Lightbox modal
  const [cardModalOpen, setCardModalOpen] = useState(false);

  // Auto-scroll controller refs
  const isAutoScrollingRef = useRef<boolean>(false);
  const autoScrollTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Function to cancel auto-scrolling when manual user touch/scroll is detected
  const stopAutoScroll = useCallback(() => {
    if (isAutoScrollingRef.current) {
      isAutoScrollingRef.current = false;
      autoScrollTimersRef.current.forEach(clearTimeout);
      autoScrollTimersRef.current = [];
    }
  }, []);

  // Listen for user manual touch or wheel to immediately yield control
  useEffect(() => {
    const handleManualInteraction = () => {
      stopAutoScroll();
    };

    window.addEventListener('wheel', handleManualInteraction, { passive: true });
    window.addEventListener('touchmove', handleManualInteraction, { passive: true });
    window.addEventListener('touchstart', handleManualInteraction, { passive: true });
    window.addEventListener('keydown', handleManualInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleManualInteraction);
      window.removeEventListener('touchmove', handleManualInteraction);
      window.removeEventListener('touchstart', handleManualInteraction);
      window.removeEventListener('keydown', handleManualInteraction);
      autoScrollTimersRef.current.forEach(clearTimeout);
    };
  }, [stopAutoScroll]);

  // Smooth cinematic auto-scroll through sections
  const startCinematicScroll = useCallback(() => {
    isAutoScrollingRef.current = true;
    autoScrollTimersRef.current.forEach(clearTimeout);
    autoScrollTimersRef.current = [];

    const scheduleScrollTo = (targetId: string, delayMs: number) => {
      const timer = setTimeout(() => {
        if (!isAutoScrollingRef.current) return;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, delayMs);
      autoScrollTimersRef.current.push(timer);
    };

    // Progression timeline giving comfortable reading time:
    // 1. Ceremony & Couple Reveal
    scheduleScrollTo('couple', 1800);
    // 2. Original Invitation Card
    scheduleScrollTo('original-card', 7500);
    // 3. Venue Highlight
    scheduleScrollTo('venue', 14000);
    // 4. Final Thank You Section
    scheduleScrollTo('thankyou', 20500);

    // After viewing the final message, trigger gentle symbolic closing gate
    const finalTimer = setTimeout(() => {
      if (isAutoScrollingRef.current) {
        setShowClosingGate(true);
        setTimeout(() => setShowClosingGate(false), 3800);
        isAutoScrollingRef.current = false;
      }
    }, 27000);
    autoScrollTimersRef.current.push(finalTimer);
  }, []);

  // 1. Single click on "निमंत्रण खोलें ✨" triggers the complete flow
  const handleEnvelopeOpen = () => {
    setMusicTrigger(true);
    setCurrentScene('gate');
    setShowFireworks(true);
    setShowBalloons(true);
  };

  // 2. Skip directly to main invitation details
  const handleSkipToDetails = () => {
    stopAutoScroll();
    setMusicTrigger(true);
    setCurrentScene('main');
    setShowFireworks(false);
    setShowBalloons(false);
  };

  // 3. When gate opening finishes, enter main flow and begin cinematic auto-scroll
  const handleGateComplete = () => {
    setCurrentScene('main');

    // Turn off fireworks after opening celebration so text is not obscured
    setTimeout(() => {
      setShowFireworks(false);
      setShowBalloons(false);
    }, 3500);

    // Start smooth auto-scroll through sections
    setTimeout(() => {
      startCinematicScroll();
    }, 600);
  };

  // 4. Open original card modal
  const handleOpenCardModal = () => {
    stopAutoScroll();
    setCardModalOpen(true);
  };

  // 5. Replay invitation from beginning
  const handleReplay = () => {
    stopAutoScroll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene('envelope');
    setShowFireworks(false);
    setShowBalloons(false);
    setShowClosingGate(false);
  };

  return (
    <div className="relative min-h-screen bg-velvet text-[#FFF7E7] font-hindi selection:bg-[#D6B56D] selection:text-[#35030C]">
      {/* Three.js Royal 3D Golden Particles Background Canvas */}
      <ThreeRoyalCanvas />

      {/* Diwali Celebration Fireworks Canvas (bursts during opening sequence, then stops) */}
      <FireworksCanvas active={showFireworks} />

      {/* Tasteful small group of 6 celebration balloons (rises during opening, then disappears) */}
      <FloatingBalloons active={showBalloons} />

      {/* Indian Wedding Background Music Player */}
      <AudioPlayer autoPlayTrigger={musicTrigger} />

      {/* SCENE ONE: Royal Envelope Opening Welcome (One-Click trigger) */}
      {currentScene === 'envelope' && (
        <EnvelopeScene
          onOpen={handleEnvelopeOpen}
          onSkip={handleSkipToDetails}
        />
      )}

      {/* SCENE TWO: Grand Palace Gate Opening (Automatic 3D sequence) */}
      {currentScene === 'gate' && (
        <GateScene
          onComplete={handleGateComplete}
          onSkip={handleSkipToDetails}
        />
      )}

      {/* MAIN INVITATION: Natural flow through ceremony, couple, original card, venue & Thank You */}
      {currentScene === 'main' && (
        <div className="relative z-10 animate-fadeIn">
          {/* Top Navigation */}
          <NavHeader onNavigateHome={handleReplay} />

          <main className="space-y-2">
            {/* Ceremony and Bride & Groom and Inviter Details */}
            <EventDetails onOpenCardModal={handleOpenCardModal} />

            {/* Venue Highlight & Navigation */}
            <VenueSection />

            {/* Emotional Thank You Finale with Highlighted Invitation Message */}
            <ThankYouFinale
              onReplayInvitation={handleReplay}
              showClosingGateEffect={showClosingGate}
            />
          </main>
        </div>
      )}

      {/* Original Scanned Card Lightbox Modal */}
      <OriginalCardModal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
      />
    </div>
  );
}

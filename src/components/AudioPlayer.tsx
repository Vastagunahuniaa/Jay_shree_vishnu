import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [usingSynthFallback, setUsingSynthFallback] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    droneGain?: GainNode;
    melodyGain?: GainNode;
    masterGain?: GainNode;
    intervalId?: number;
  }>({});

  // Web Audio Procedural Indian Wedding Ambience Generator (Shehnai/Flute & Tanpura Drone)
  const startProceduralSynth = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.28, ctx.currentTime);
      master.connect(ctx.destination);

      // Tanpura Drone (Sa - C#3 138.59Hz, Pa - G#3 207.65Hz, Sa - C#4 277.18Hz)
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.18, ctx.currentTime);
      droneGain.connect(master);

      const dronePitches = [138.59, 207.65, 277.18];
      dronePitches.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        osc.connect(filter);
        filter.connect(droneGain);
        osc.start();
      });

      // Shehnai / Bansuri Melodic Notes in Raag Yaman/Kalyan
      // Notes: Sa(277), Re(311), Ga(349), Ma#(392), Pa(415), Dha(466), Ni(523), Tar Sa(554)
      const yamanScale = [277.18, 311.13, 349.23, 391.99, 415.3, 466.16, 523.25, 554.37];
      const melodyGain = ctx.createGain();
      melodyGain.gain.setValueAtTime(0.22, ctx.currentTime);
      melodyGain.connect(master);

      const playMelodyNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = ctx.currentTime;
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm shehnai tone
        noteOsc.type = 'triangle';
        const randomPitch = yamanScale[Math.floor(Math.random() * yamanScale.length)];
        noteOsc.frequency.setValueAtTime(randomPitch, now);

        // Gentle vibrato
        const vibrato = ctx.createOscillator();
        vibrato.frequency.setValueAtTime(5.2, now);
        const vibratoGain = ctx.createGain();
        vibratoGain.gain.setValueAtTime(6.0, now);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(noteOsc.frequency);
        vibrato.start(now);
        vibrato.stop(now + 2.5);

        // Soft envelope: swell and sustain
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

        noteOsc.connect(noteGain);
        noteGain.connect(melodyGain);

        noteOsc.start(now);
        noteOsc.stop(now + 2.3);
      };

      const intervalId = window.setInterval(playMelodyNote, 1600);

      synthNodesRef.current = {
        droneGain,
        melodyGain,
        masterGain: master,
        intervalId,
      };

      setUsingSynthFallback(true);
      setIsPlaying(true);
    } catch {
      // Audio not supported or blocked
    }
  }, []);

  const stopProceduralSynth = useCallback(() => {
    if (synthNodesRef.current.intervalId) {
      clearInterval(synthNodesRef.current.intervalId);
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  }, []);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setUsingSynthFallback(false);
        })
        .catch(() => {
          // If mp3 fails or doesn't exist, seamlessly fallback to procedural synthesizer
          startProceduralSynth();
        });
    } else {
      startProceduralSynth();
    }
  }, [startProceduralSynth]);

  const pauseMusic = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (usingSynthFallback) {
      stopProceduralSynth();
    }
  }, [usingSynthFallback, stopProceduralSynth]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (synthNodesRef.current.masterGain) {
      synthNodesRef.current.masterGain.gain.setValueAtTime(isMuted ? 0.28 : 0, audioCtxRef.current?.currentTime || 0);
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      playMusic();
    }
  }, [autoPlayTrigger, playMusic, isPlaying]);

  useEffect(() => {
    return () => {
      if (synthNodesRef.current.intervalId) {
        clearInterval(synthNodesRef.current.intervalId);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio
        ref={audioRef}
        src="/assets/background-music.mp3"
        loop
        preload="auto"
        onError={() => {
          // Softly handle missing mp3 by enabling synth fallback
        }}
      />

      <div
        className={`flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-md bg-[#35030C]/90 border border-[#D6B56D]/50 shadow-lg text-[#F7E6B0] transition-all duration-300 ${
          expanded ? 'px-3' : 'px-2'
        }`}
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'संगीत रोकें' : 'संगीत बजाएं'}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#D6B56D] to-[#8F6723] text-[#270309] shadow-md hover:scale-105 active:scale-95 transition-transform"
          title={isPlaying ? 'संगीत रोकें' : 'संगीत बजाएं'}
        >
          {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current ml-0.5" />}
        </button>

        {expanded && (
          <div className="flex items-center gap-2 px-1 text-xs font-medium">
            <span className="flex items-center gap-1 text-[#F7E6B0]">
              <Music size={14} className={isPlaying ? 'animate-bounce text-[#D6B56D]' : ''} />
              <span>{usingSynthFallback ? 'शहनाई धुन' : 'शाही संगीत'}</span>
            </span>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'ध्वनि चालू करें' : 'ध्वनि बंद करें'}
              className="p-1.5 text-[#F7E6B0] hover:text-[#FFF7E7] transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-7 h-7 flex items-center justify-center text-[#D6B56D] hover:text-[#FFF7E7] text-xs font-mono"
          aria-label="संगीत सेटिंग्स"
        >
          {expanded ? '✕' : '♪'}
        </button>
      </div>
    </div>
  );
};

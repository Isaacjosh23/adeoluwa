"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SLIDES = [{ bg: "#1a1208" }, { bg: "#0e1a10" }, { bg: "#100e1a" }];

const PHRASES = [
  "It began with a conversation...",
  "Two hearts found their way home.",
  "Every love story is beautiful...",
  "...but ours is our favourite.",
  "August 15th, we say forever. ✦",
];

interface HeroContextType {
  slideIdx: number;
  setSlideIdx: (idx: number) => void;
  typedText: string;
  muted: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  toggleMute: () => void;
  musicStarted: boolean;
  setMusicStarted: (started: boolean) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

const isAppleDevice = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|mac/.test(ua);
};

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [muted, setMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isApple = useRef(isAppleDevice());
  const wasPlayingRef = useRef(false);

  // ── SLIDE TIMER ──
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // ── MUSIC ──
  useEffect(() => {
    if (musicStarted && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, [musicStarted]);

  // ── PAGE VISIBILITY HANDLER ──
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current || !musicStarted) return;

      if (document.hidden) {
        // Page is hidden - pause the audio
        wasPlayingRef.current = !audioRef.current.paused;
        audioRef.current.pause();
      } else {
        // Page is visible again - resume if it was playing
        if (wasPlayingRef.current && !muted) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [musicStarted, muted]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isApple.current) {
      audioRef.current.muted = !audioRef.current.muted;
      // On Apple devices, ensure audio resumes after being suspended
      if (!audioRef.current.muted) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (muted) {
        audioRef.current.volume = 0.3;
      } else {
        audioRef.current.volume = 0;
      }
    }
    setMuted((prev) => !prev);
  };

  // ── TYPEWRITER ──
  useEffect(() => {
    if (!musicStarted) return;
    let pi = 0,
      ci = 0,
      deleting = false,
      stopped = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (stopped) return;
      const phrase = PHRASES[pi];
      if (!deleting) {
        ci++;
        setTypedText(phrase.slice(0, ci));
        if (ci === phrase.length) {
          if (pi === PHRASES.length - 1) {
            stopped = true;
            return;
          }
          timeout = setTimeout(() => {
            deleting = true;
            tick();
          }, 2400);
          return;
        }
        timeout = setTimeout(tick, 65);
      } else {
        ci--;
        setTypedText(phrase.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          pi++;
          timeout = setTimeout(tick, 380);
          return;
        }
        timeout = setTimeout(tick, 32);
      }
    };

    timeout = setTimeout(tick, 1200);
    return () => clearTimeout(timeout);
  }, [musicStarted]);

  const value: HeroContextType = {
    slideIdx,
    setSlideIdx,
    typedText,
    muted,
    audioRef,
    toggleMute,
    musicStarted,
    setMusicStarted,
  };

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
}

export function useHero() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error("useHero must be used within a HeroProvider");
  }
  return context;
}

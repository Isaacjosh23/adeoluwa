"use client";

import { useHero } from "@/context/HeroContext";
import Music from "./components/Music";
import SlidesDot from "./components/SlidesDot";
import Slides from "./components/Slides";
import MainContent from "./components/MainContent";

export default function Hero() {
  const { audioRef, musicStarted } = useHero();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Slides />

      <div className="absolute inset-0 z-1 bg-linear-to-b from-[rgba(14,12,11,0.25)] via-[rgba(14,12,11,0.1)] to-[rgba(14,12,11,0.92)]" />

      <MainContent />

      <SlidesDot />

      <div className="absolute bottom-[2.4rem] sm:bottom-[3.2rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.8rem] sm:gap-4 z-2 opacity-0 animate-fadeUp [animation-delay:2.2s] [animation-fill-mode:forwards]">
        <span className="text-[0.8rem] sm:text-[0.9rem] tracking-[0.28em] uppercase text-[rgba(250,247,242,0.3)]">
          Scroll
        </span>
      </div>

      <audio ref={audioRef} loop>
        <source src="/audio/bg-music.mp3" type="audio/mpeg" />
      </audio>

      {musicStarted && <Music />}
    </section>
  );
}

"use client";

import { useHero } from "@/context/HeroContext";
import Music from "./components/Music";
import SlidesDot from "./components/SlidesDot";
import Slides from "./components/Slides";
import MainContent from "./components/MainContent";

export default function Hero() {
  const { musicStarted } = useHero();

  return (
    <section
      id="hero"
      className="relative max-h-screen flex items-center justify-center overflow-hidden"
    >
      <Slides />

      <div className="absolute inset-0 z-1 bg-linear-to-b from-[rgba(14,12,11,0.25)] via-[rgba(14,12,11,0.1)] to-[rgba(14,12,11,0.92)]" />

      <MainContent />

      <SlidesDot />

      {musicStarted && <Music />}
    </section>
  );
}

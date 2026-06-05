"use client";

import IntroGate from "@/components/IntroGate";
import Hero from "@/components/hero/Hero";
import Marquee from "@/components/Marquee";
import { HeroProvider, useHero } from "@/context/HeroContext";

function HomeContent() {
  const { setMusicStarted, musicStarted } = useHero();

  return (
    <>
      {!musicStarted && <IntroGate onBegin={() => setMusicStarted(true)} />}

      <Hero />
      <Marquee />
      {/* rest of the page goes here */}
    </>
  );
}

export default function Home() {
  return (
    <HeroProvider>
      <HomeContent />
    </HeroProvider>
  );
}

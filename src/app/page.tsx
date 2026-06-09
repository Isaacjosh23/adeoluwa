"use client";

import IntroGate from "@/components/IntroGate";
import Hero from "@/components/hero/Hero";
import Marquee from "@/components/Marquee";
import { HeroProvider, useHero } from "@/context/HeroContext";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/our-story/OurStory";
import EventDetails from "@/components/event-details/EventDetail";
import ColoursOfTheDay from "@/components/colors-of-the-day/ColorsOfTheDay";

function HomeContent() {
  const { setMusicStarted, musicStarted } = useHero();

  return (
    <>
      {!musicStarted && <IntroGate onBegin={() => setMusicStarted(true)} />}

      <Hero />
      <Marquee />
      <Countdown />
      {/* <OurStory /> */}
      <EventDetails />
      <ColoursOfTheDay />
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

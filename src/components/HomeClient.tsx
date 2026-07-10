"use client";

import IntroGate from "@/components/IntroGate";
import Hero from "@/components/time-line/hero/Hero";
import Marquee from "@/components/Marquee";
import { HeroProvider, useHero } from "@/context/HeroContext";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/our-story/OurStory";
import EventDetails from "@/components/event-details/EventDetail";
import ColorsOfTheDay from "@/components/colors-of-the-day/ColorsOfTheDay";
import Timeline from "@/components/time-line";
import Etiquette from "@/components/etiquette";
import RSVP from "@/components/rsvp";
import Footer from "@/components/Footer";
import MessageTicker from "@/components/MessageTicker";

interface Message {
  name: string;
  message: string;
}

interface HomeClientProps {
  messages: Message[];
}

function HomeContent({ messages }: HomeClientProps) {
  const { setMusicStarted, musicStarted } = useHero();

  return (
    <>
      {!musicStarted && <IntroGate onBegin={() => setMusicStarted(true)} />}
      <Hero />
      <Marquee />
      <MessageTicker messages={messages} />
      <Countdown />
      <OurStory />
      <EventDetails />
      <ColorsOfTheDay />
      <RSVP />
      <Timeline />
      <Etiquette />
      <Footer />
    </>
  );
}

export default function HomeClient({ messages }: HomeClientProps) {
  return (
    <HeroProvider>
      <HomeContent messages={messages} />
    </HeroProvider>
  );
}

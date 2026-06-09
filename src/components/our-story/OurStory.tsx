"use client";

import Card from "./components/Card";
import Progress from "./components/Progress";
import NavButton from "./components/NavButton";
import Header from "./components/Header";
import { OurStoryProvider } from "@/context/OurStoryContext";

export default function OurStory() {
  return (
    <section
      id="story"
      className="bg-(--bg-story) py-28 sm:py-36 pb-24 sm:pb-[7.2rem] text-center overflow-hidden"
    >
      <Header />

      <OurStoryProvider>
        <Card />

        <Progress />

        <NavButton />
      </OurStoryProvider>
    </section>
  );
}

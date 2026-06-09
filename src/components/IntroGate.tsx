"use client";

import { useState } from "react";

interface IntroGateProps {
  onBegin: () => void;
}

export default function IntroGate({ onBegin }: IntroGateProps) {
  const [visible, setVisible] = useState(true);

  const handleBegin = () => {
    setVisible(false);
    onBegin();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-2000 bg-(--color-dark) flex items-center justify-center text-center px-[2.4rem]">
      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[
          {
            size: "w-[12rem] h-[12rem] sm:w-[18rem] sm:h-[18rem]",
            delay: "[animation-delay:0s]",
          },
          {
            size: "w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem]",
            delay: "[animation-delay:0.9s]",
          },
          {
            size: "w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem]",
            delay: "[animation-delay:1.8s]",
          },
          {
            size: "w-[42rem] h-[42rem] sm:w-[55rem] sm:h-[55rem]",
            delay: "[animation-delay:2.7s]",
          },
        ].map((ring, i) => (
          <span
            key={i}
            className={`absolute ${ring.size} rounded-full border-[0.5px] border-[rgba(196,145,58,0.15)] animate-ringPulse ${ring.delay}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-[1.2rem] sm:gap-[1.6rem]">
        <p className="font-serif text-[clamp(4.8rem,12vw,9.6rem)] font-light italic text-(--color-gold) tracking-widest leading-none opacity-0 animate-fadeUp [animation-delay:0.5s] [animation-fill-mode:forwards]">
          A ♡ E
        </p>

        <p className="font-serif text-[clamp(1.4rem,3.5vw,2rem)] italic text-(--color-text-muted) tracking-[0.06em] opacity-0 animate-fadeUp [animation-delay:1s] [animation-fill-mode:forwards]">
          A love story worth remembering
        </p>

        <button
          onClick={handleBegin}
          className="mt-[1.6rem] sm:mt-8 px-[3.2rem] sm:px-[4.4rem] py-[1.2rem] sm:py-[1.4rem] border-[0.5px] border-[rgba(196,145,58,0.45)] bg-transparent text-(--color-gold) font-sans text-[1rem] sm:text-[1.1rem] font-normal tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 hover:bg-[rgba(196,145,58,0.1)] hover:border-(--color-gold) opacity-0 animate-fadeUp [animation-delay:1.6s] [animation-fill-mode:forwards]"
        >
          Let Our Story Begin
        </button>
      </div>
    </div>
  );
}

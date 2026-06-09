"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_DATE = new Date("2026-08-15T10:00:00");

function calculateTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days, pad: false },
    { label: "Hours", value: timeLeft.hours, pad: true },
    { label: "Minutes", value: timeLeft.minutes, pad: true },
    { label: "Seconds", value: timeLeft.seconds, pad: true },
  ];

  return (
    <section
      id="countdown"
      className="bg-(--bg-countdown) text-center py-24 sm:py-[8.8rem] px-8 sm:px-[2.4rem]"
    >
      <p className="text-[1rem] md:text-[1.2rem] font-medium tracking-[0.32em] uppercase text-(--color-gold) mb-16 sm:mb-[5.2rem]">
        Counting Down To Forever
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-[0.5px] border-(--color-gold-dim)  w-[20rem] sm:w-260 mx-auto">
        {units.map(({ label, value, pad }, i) => (
          <div
            key={label}
            className={`flex flex-col items-center px-12 sm:px-[4.4rem] py-[2.4rem] sm:py-[2.8rem]
              ${i % 2 === 0 ? "border-r-[0.5px] border-(--color-gold-dim)" : ""}
              ${i < 2 ? "border-b-[0.5px] border-(--color-gold-dim) sm:border-b-0" : ""}
              ${i < 3 ? "sm:border-r-[0.5px] sm:border-(--color-gold-dim)" : ""}
            `}
          >
            <span className="font-serif text-[clamp(4rem,8vw,8.8rem)] font-light text-(--color-gold-light) leading-none">
              {mounted ? (pad ? String(value).padStart(2, "0") : value) : "—"}
            </span>

            <span className="block text-[0.8rem] sm:text-[1rem] tracking-[0.24em] uppercase text-(--color-text-muted) mt-[0.8rem]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

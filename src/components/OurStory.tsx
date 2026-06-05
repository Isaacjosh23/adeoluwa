"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface MemoryCard {
  id: number;
  image: string;
  date: string;
  caption: string;
}

const MEMORIES: MemoryCard[] = [
  {
    id: 1,
    image: "https://placehold.co/300x420/2C1F18/C4913A",
    date: "February 2019",
    caption: "It began with a conversation",
  },
  {
    id: 2,
    image: "https://placehold.co/300x420/1A2418/F0D898",
    date: "April 2019",
    caption: "Our first real date",
  },
  {
    id: 3,
    image: "https://placehold.co/300x420/181F2C/E8D5B0",
    date: "2020",
    caption: "Late nights, deeper talks",
  },
  {
    id: 4,
    image: "https://placehold.co/300x420/2C2818/C4913A",
    date: "June 2022",
    caption: "He finally said the words",
  },
  {
    id: 5,
    image: "https://placehold.co/300x420/2C1824/F0D898",
    date: "December 2023",
    caption: "She said yes — twice",
  },
  {
    id: 6,
    image: "https://placehold.co/300x420/18282C/E8D5B0",
    date: "August 2026",
    caption: "And now, forever begins",
  },
];

export default function OurStory() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startX.current = clientX;
    startY.current = clientY;
    setIsDragging(true);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragX(clientX - startX.current);
    setDragY(clientY - startY.current);
  };

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - startX.current;
    if (Math.abs(dx) > 75 && current < MEMORIES.length - 1) {
      setIsFlying(true);
      setTimeout(() => {
        setCurrent((p) => p + 1);
        setIsFlying(false);
        setDragX(0);
        setDragY(0);
      }, 400);
    } else {
      setDragX(0);
      setDragY(0);
    }
  };

  const nextCard = () => {
    if (current >= MEMORIES.length - 1) return;
    setIsFlying(true);
    setTimeout(() => {
      setCurrent((p) => p + 1);
      setIsFlying(false);
    }, 400);
  };

  const prevCard = () => {
    if (current <= 0) return;
    setCurrent((p) => p - 1);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const pos = index - current;

    if (pos < 0)
      return {
        opacity: 0,
        transform: "scale(0.78)",
        zIndex: 0,
        pointerEvents: "none",
      };

    if (pos === 0) {
      if (isFlying)
        return {
          transform: `translateX(${dragX > 0 ? "160%" : "-160%"}) rotate(${dragX > 0 ? "20deg" : "-20deg"})`,
          opacity: 0,
          zIndex: 6,
          transition:
            "transform 0.42s cubic-bezier(.55,0,.45,1), opacity 0.35s ease",
        };
      if (isDragging)
        return {
          transform: `translateX(${dragX}px) translateY(${dragY * 0.25}px) rotate(${dragX * 0.07}deg)`,
          opacity: 1 - Math.abs(dragX) / 300,
          zIndex: 6,
          transition: "none",
        };
      return {
        transform: "translateY(0) rotate(0deg) scale(1)",
        opacity: 1,
        zIndex: 6,
        transition:
          "transform 0.38s cubic-bezier(.22,.68,0,1.2), opacity 0.35s ease",
      };
    }

    const stacks: React.CSSProperties[] = [
      {},
      {
        transform: "translateY(1rem) rotate(2.8deg) scale(0.955)",
        opacity: 0.8,
        zIndex: 5,
      },
      {
        transform: "translateY(1.9rem) rotate(-2deg) scale(0.91)",
        opacity: 0.55,
        zIndex: 4,
      },
      {
        transform: "translateY(2.6rem) rotate(1.4deg) scale(0.865)",
        opacity: 0.3,
        zIndex: 3,
      },
      {
        transform: "translateY(3.2rem) rotate(-0.8deg) scale(0.82)",
        opacity: 0,
        zIndex: 2,
      },
    ];

    return {
      ...(stacks[Math.min(pos, 4)] || stacks[4]),
      transition:
        "transform 0.38s cubic-bezier(.22,.68,0,1.2), opacity 0.35s ease",
      pointerEvents: "none",
    };
  };

  return (
    <section
      id="story"
      className="bg-[var(--bg-story)] py-[7rem] sm:py-[9rem] pb-[6rem] sm:pb-[7.2rem] text-center overflow-hidden"
    >
      {/* Header */}
      <div className="px-[2rem] sm:px-[4rem] pb-[4rem] sm:pb-[5.2rem]">
        <p className="section-label">How It All Started</p>
        <h2 className="font-serif text-[clamp(3.2rem,5vw,5.8rem)] font-light leading-[1.1] text-[var(--color-text-primary)] mt-[1.2rem]">
          Our <em className="italic text-[var(--color-gold)]">Story</em>
        </h2>
        <p className="text-[0.9rem] sm:text-[1rem] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mt-[1rem]">
          Swipe through our memories
        </p>
      </div>

      {/* Card stage — scales down on small screens */}
      <div
        className="relative mx-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          width: "min(30rem, 85vw)",
          height: "min(42rem, 119vw)",
        }}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        {MEMORIES.map((memory, index) => (
          <div
            key={memory.id}
            className="absolute inset-0 rounded-[0.6rem] overflow-hidden"
            style={getCardStyle(index)}
          >
            <Image
              src={memory.image}
              alt={memory.caption}
              fill
              className="object-cover pointer-events-none"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 right-0 px-[2rem] pt-[3.6rem] pb-[2rem] bg-gradient-to-t from-[rgba(14,12,11,0.88)] to-transparent">
              <p className="text-[0.9rem] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-[0.4rem] font-sans">
                {memory.date}
              </p>
              <p className="font-serif italic text-[1.5rem] sm:text-[1.6rem] text-[rgba(250,247,242,0.9)] leading-[1.4]">
                {memory.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex justify-center gap-[0.6rem] sm:gap-[0.7rem] mt-[3.2rem] sm:mt-[4rem] px-[4rem]">
        {MEMORIES.map((_, i) => (
          <div
            key={i}
            className={`h-[0.2rem] flex-1 max-w-[4rem] rounded-[0.2rem] transition-all duration-[380ms] ${
              i === current
                ? "bg-[var(--color-gold)]"
                : i < current
                  ? "bg-[rgba(196,145,58,0.38)]"
                  : "bg-[rgba(106,76,42,0.18)]"
            }`}
          />
        ))}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-[2rem] mt-[2rem] sm:mt-[2.2rem]">
        <button
          onClick={prevCard}
          disabled={current === 0}
          aria-label="Previous"
          className="w-[3.6rem] h-[3.6rem] sm:w-[3.8rem] sm:h-[3.8rem] rounded-full border-[0.5px] border-[var(--color-gold-dim)] bg-transparent cursor-pointer text-[1.4rem] sm:text-[1.5rem] text-[var(--color-text-muted)] flex items-center justify-center transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] disabled:opacity-30 disabled:pointer-events-none"
        >
          ←
        </button>
        <span className="font-serif italic text-[1.3rem] sm:text-[1.4rem] text-[var(--color-text-muted)]">
          {current + 1} / {MEMORIES.length}
        </span>
        <button
          onClick={nextCard}
          disabled={current === MEMORIES.length - 1}
          aria-label="Next"
          className="w-[3.6rem] h-[3.6rem] sm:w-[3.8rem] sm:h-[3.8rem] rounded-full border-[0.5px] border-[var(--color-gold-dim)] bg-transparent cursor-pointer text-[1.4rem] sm:text-[1.5rem] text-[var(--color-text-muted)] flex items-center justify-center transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] disabled:opacity-30 disabled:pointer-events-none"
        >
          →
        </button>
      </div>
    </section>
  );
}

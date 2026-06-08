"use client";

import { useState, useRef } from "react";
import { MEMORIES } from "@/lib/memories";

export function useOurStory() {
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

  return {
    current,
    isDragging,
    dragX,
    dragY,
    isFlying,
    onDragStart,
    onDragMove,
    onDragEnd,
    nextCard,
    prevCard,
    getCardStyle,
  };
}

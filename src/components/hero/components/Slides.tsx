"use client";

import { useEffect, useState } from "react";
import { useHero } from "@/context/HeroContext";
import { HERO_SLIDES } from "@/lib/hero-slides";

function Slides() {
  const { slideIdx } = useHero();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mql.matches);

    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <div className="absolute inset-0">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1600 ease-in-out ${
            i === slideIdx ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: isMobile ? "cover" : "contain",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>
  );
}

export default Slides;

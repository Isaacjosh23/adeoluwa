import { useHero } from "@/context/HeroContext";
import { HERO_SLIDES } from "@/lib/hero-slides";

function SlidesDot() {
  const { slideIdx, setSlideIdx } = useHero();

  return (
    <div className="absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-[0.8rem] z-2">
      {HERO_SLIDES.map((_, i) => (
        <button
          key={i}
          onClick={() => setSlideIdx(i)}
          aria-label={`Slide ${i + 1}`}
          className={`h-[0.2rem] border-none cursor-pointer transition-all duration-300 p-0 ${
            i === slideIdx
              ? "w-[3.2rem] bg-(--color-gold)"
              : "w-[1.8rem] bg-[rgba(250,247,242,0.25)]"
          }`}
        />
      ))}
    </div>
  );
}

export default SlidesDot;

import Image from "next/image";
import { useHero } from "@/context/HeroContext";
import { HERO_SLIDES } from "@/lib/hero-slides";

function Slides() {
  const { slideIdx } = useHero();

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === slideIdx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-[center_25%] sm:object-[center_20%] lg:object-[center_15%]"
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}

export default Slides;

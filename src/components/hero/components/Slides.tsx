import { useHero } from "@/context/HeroContext";

export const SLIDES = [{ bg: "#1a1208" }, { bg: "#0e1a10" }, { bg: "#100e1a" }];

function Slides() {
  const { slideIdx } = useHero();

  return (
    <div className="absolute inset-0">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1600 ease-in-out ${
            i === slideIdx ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: slide.bg }}
        />
      ))}
    </div>
  );
}

export default Slides;

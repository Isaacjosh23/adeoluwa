import { useHero } from "@/context/HeroContext";
import Link from "next/link";

function MainContent() {
  const { typedText } = useHero();

  return (
    <div className="relative z-2 text-center flex flex-col items-center pt-48 pb-32 px-8 sm:pt-60 sm:pb-32 sm:px-[2.4rem]">
      <p className="text-[1rem] md:text-[1.2rem] font-medium tracking-[0.3em] uppercase text-(--color-text-inverse) mb-8 sm:mb-[2.4rem] opacity-0 animate-fadeUp [animation-delay:0.3s] [animation-fill-mode:forwards]">
        We are getting married
      </p>

      <h1 className="font-serif text-[clamp(5rem,7vw,9rem)] leading-none tracking-tight text-(--color-text-inverse) opacity-0 animate-fadeUp [animation-delay:0.6s] [animation-fill-mode:forwards] font-medium">
        <em className="italic text-(--color-gold)">Adedamola</em>
        <span className="block font-serif italic text-[clamp(2rem,4vw,4rem)] text-(--color-text-inverse) my-[0.6rem] sm:my-[0.8rem]">
          &
        </span>
        Oluwaseun
      </h1>

      {/* Divider */}
      <div className="w-[0.1rem] h-16 sm:h-20 bg-linear-to-b from-transparent via-(--color-gold) to-transparent opacity-0 animate-fadeUp [animation-delay:0.9s] [animation-fill-mode:forwards] my-6" />

      {/* Typewriter */}
      <div className="font-serif italic text-[clamp(1.6rem,3vw,2.8rem)] text-[rgba(250,247,242,0.78)] min-h-16 sm:min-h-[4.4rem] flex items-center gap-[0.2rem] opacity-0 animate-fadeUp [animation-delay:1.1s] [animation-fill-mode:forwards] px-4">
        <span>{typedText}</span>
        <span className="inline-block w-[0.15rem] h-[0.9em] bg-(--color-gold) ml-[0.2rem] align-middle animate-blink" />
      </div>

      <p className="mt-8 sm:mt-[2.4rem] text-[1rem] md:text-[1.2rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-(--color-text-inverse) opacity-0 animate-fadeUp [animation-delay:1.3s] [animation-fill-mode:forwards] px-4">
        Saturday · 15th August 2026
      </p>

      <p className="font-sans italic text-[1.3rem] sm:text-[1.4rem] text-(--color-gold) mt-[0.6rem] tracking-[0.06em] opacity-0 animate-fadeUp [animation-delay:1.5s] [animation-fill-mode:forwards] font-normal">
        #AdeOluwa26
      </p>

      {/* CTA Button */}
      <Link
        href="#rsvp"
        className="sm:hidden text-(--color-text-inverse) bg-(--color-gold) text-[1.2rem] px-[1.8rem] py-[0.8rem] rounded-lg font-medium cursor-pointer hover:bg-(--color-gold)/80 transition-colors duration-300 mt-6"
      >
        RSVP
      </Link>
    </div>
  );
}

export default MainContent;

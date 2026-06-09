import { useHero } from "@/context/HeroContext";

function MainContent() {
  const { typedText } = useHero();

  return (
    <div className="relative z-2 text-center flex flex-col items-center pt-40 pb-32 px-8 sm:pt-48 sm:pb-40 sm:px-[2.4rem]">
      <p className="text-[1rem] md:text-[1.2rem] font-medium tracking-[0.3em] uppercase text-(--color-gold) mb-8 sm:mb-[2.8rem] opacity-0 animate-fadeUp [animation-delay:0.3s] [animation-fill-mode:forwards]">
        We are getting married
      </p>

      <h1 className="font-serif text-[clamp(5rem,10vw,11.8rem)] font-light leading-none tracking-tight text-(--color-text-inverse) opacity-0 animate-fadeUp [animation-delay:0.6s] [animation-fill-mode:forwards]">
        <em className="italic text-(--color-gold)">Adedamola</em>
        <span className="block font-serif italic text-[clamp(2rem,4vw,4rem)] text-(--color-text-inverse-muted) my-[0.6rem] sm:my-[0.8rem]">
          &
        </span>
        Oluwaseun
      </h1>

      {/* Divider */}
      <div className="w-[0.1rem] h-16 sm:h-[5.4rem] bg-linear-to-b from-transparent via-(--color-gold) to-transparent my-[1.8rem] sm:my-[2.2rem] opacity-0 animate-fadeUp [animation-delay:0.9s] [animation-fill-mode:forwards]" />

      {/* Typewriter */}
      <div className="font-serif italic text-[clamp(1.6rem,3vw,2.8rem)] text-[rgba(250,247,242,0.78)] min-h-16 sm:min-h-[4.4rem] flex items-center gap-[0.2rem] opacity-0 animate-fadeUp [animation-delay:1.1s] [animation-fill-mode:forwards] px-4">
        <span>{typedText}</span>
        <span className="inline-block w-[0.15rem] h-[0.9em] bg-(--color-gold) ml-[0.2rem] align-middle animate-blink" />
      </div>

      <p className="mt-8 sm:mt-[2.4rem] text-[1rem] md:text-[1.2rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[rgba(250,247,242,0.38)] opacity-0 animate-fadeUp [animation-delay:1.3s] [animation-fill-mode:forwards] px-4">
        Saturday · 15th August 2026
      </p>

      <p className="font-serif italic text-[1.3rem] sm:text-[1.4rem] text-(--color-gold) mt-[0.6rem] tracking-[0.06em] opacity-0 animate-fadeUp [animation-delay:1.5s] [animation-fill-mode:forwards]">
        #AdeOluwa26
      </p>
    </div>
  );
}

export default MainContent;

import { RULES } from "./rules";

export default function Etiquette() {
  return (
    <section
      id="etiquette"
      className="bg-(--bg-etiquette) py-28 sm:py-36 px-8 sm:px-[4.8rem]"
    >
      <div className="max-w-480 mx-auto">
        <div className="mb-16 sm:mb-[5.6rem]">
          <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
            House Rules
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-light leading-[1.1] text-(--color-text-inverse) mt-[1.2rem]">
            Before you{" "}
            <em className="italic text-(--color-gold-light)">show up</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[0.5px] bg-(--color-gold-dim)">
          {RULES.map((rule) => (
            <div
              key={rule.number}
              className="bg-(--bg-etiquette) px-[2.8rem] sm:px-[3.2rem] py-[3.2rem] sm:py-16 flex flex-col gap-[1.2rem] group transition-colors duration-300 hover:bg-[rgba(196,145,58,0.05)]"
            >
              <span className="font-serif text-[4.4rem] sm:text-[5.2rem] font-light leading-none text-[rgba(196,145,58,0.2)] group-hover:text-[rgba(196,145,58,0.35)] transition-colors duration-300">
                {rule.number}
              </span>

              <h3 className="text-[1rem] sm:text-[1.2rem] tracking-[0.16em] uppercase text-(--color-gold) font-medium font-sans">
                {rule.title}
              </h3>

              <p className="font-serif italic text-[1.4rem] sm:text-[1.5rem] text-[rgba(250,247,242,0.5)] leading-[1.75]">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

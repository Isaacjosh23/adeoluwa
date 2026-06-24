import { RULES } from "./rules";

export default function Etiquette() {
  return (
    <section
      id="etiquette"
      className="bg-(--bg-etiquette) py-28 sm:py-36 px-8 sm:px-[4.8rem]"
    >
      <div className="max-w-480 mx-auto">
        <div className="mb-16 sm:mb-[5.6rem]">
          <p className="text-[1rem] sm:text-[1.3rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
            House Rules
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-medium leading-[1.1] text-(--color-text-inverse) mt-[1.2rem]">
            Before you{" "}
            <em className="italic text-(--color-gold-light)">show up</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--color-gold-dim)">
          {RULES.map((rule, i) => {
            const isLastOdd = i === RULES.length - 1 && RULES.length % 2 !== 0;

            return (
              <div
                key={rule.number}
                className={`bg-(--bg-etiquette) px-[2.8rem] sm:px-[3.2rem] py-[3.2rem] sm:py-16 flex flex-col gap-[1.2rem] group transition-colors duration-300 hover:bg-[rgba(196,145,58,0.05)]
                  ${isLastOdd ? "sm:col-span-2" : ""}
                `}
              >
                <div
                  className={
                    isLastOdd
                      ? "sm:max-w-240 sm:mx-auto sm:text-center sm:items-center flex flex-col gap-[1.2rem]"
                      : "flex flex-col gap-[1.2rem]"
                  }
                >
                  <span className="font-serif text-[4.4rem] sm:text-[5.2rem] font-light leading-none text-[rgba(196,145,58,0.2)] group-hover:text-[rgba(196,145,58,0.35)] transition-colors duration-300">
                    {rule.number}
                  </span>

                  <h3 className="text-[1rem] sm:text-[1.3rem] tracking-[0.16em] uppercase text-(--color-gold) font-medium font-sans">
                    {rule.title}
                  </h3>

                  <p className="font-serif italic text-[1.5rem] sm:text-[1.6rem] text-(--color-text-inverse) leading-[1.75]">
                    {rule.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

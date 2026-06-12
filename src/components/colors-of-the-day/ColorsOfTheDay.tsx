import Swatches from "./components/Swatches";

export default function ColorsOfTheDay() {
  return (
    <section
      id="colors"
      className="bg-(--bg-colors) py-28 sm:py-36 px-8 sm:px-[4.8rem]"
    >
      <div className="max-w-480 mx-auto">
        <div className="mb-16 sm:mb-[5.6rem]">
          <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
            Colors of the Day
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
            Dress with <em className="italic text-(--color-gold)">intention</em>
          </h2>
          <p className="font-serif italic text-[1.6rem] sm:text-[1.8rem] text-(--color-text-muted) mt-[1.6rem] max-w-240">
            We would love to see you draped in these tones. Please dress
            accordingly to complement the beauty of the day.
          </p>
        </div>

        <Swatches />

        {/* Footer note */}
        <p className="mt-16 sm:mt-[5.6rem] font-serif italic text-[1.4rem] sm:text-[1.6rem] text-(--color-gold) max-w-240">
          Aso-ebi fabric is available — contact the coordinator for details.
        </p>
      </div>
    </section>
  );
}

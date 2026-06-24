import { MILESTONES } from "./milestone";

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="bg-(--bg-timeline) py-28 sm:py-36 px-8 sm:px-[4.8rem]"
    >
      <div className="max-w-480 mx-auto">
        <div className="mb-16 sm:mb-[5.6rem]">
          <p className="text-[1rem] sm:text-[1.3rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
            Milestones
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] leading-[1.1] text-(--color-text-primary) mt-[1.2rem] font-medium">
            The <em className="italic text-(--color-gold)">journey</em> so far
          </h2>
        </div>

        <div className="relative flex flex-col">
          <div className="absolute left-[1.15rem] sm:left-1/2 top-0 bottom-0 w-[0.5px] bg-(--color-gold-dim) -translate-x-1/2" />

          {MILESTONES.map((milestone, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={milestone.event}
                className={`relative flex items-start sm:items-center gap-[2.4rem] sm:gap-0 mb-[4.8rem] sm:mb-[6.4rem] last:mb-0
                  ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"}
                `}
              >
                <div
                  className={`w-full pl-16 sm:pl-0 sm:w-[calc(50%-3.2rem)]
                    ${isEven ? "sm:pr-[6.4rem] sm:text-right" : "sm:pl-[6.4rem] sm:text-left"}
                  `}
                >
                  <h3 className="font-serif text-[2.2rem] sm:text-[2.8rem] font-medium text-(--color-text-primary) leading-[1.2] mb-[0.8rem]">
                    {milestone.event}
                  </h3>
                  <p className="font-serif italic font-medium text-[1.5rem] sm:text-[1.7rem] text-(--color-text-muted) leading-[1.7]">
                    {milestone.description}
                  </p>
                </div>

                <div className="absolute left-[1.15rem] sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-4 h-4 rounded-full border-[0.5px] border-(--color-gold) transition-all duration-300
                    ${
                      i === MILESTONES.length - 1
                        ? "bg-(--color-gold) w-[1.4rem] h-[1.4rem]"
                        : "bg-(--bg-timeline)"
                    }`}
                  />
                </div>

                <div className="hidden sm:block sm:w-[calc(50%-3.2rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

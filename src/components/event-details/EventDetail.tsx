import Cards from "./components/Cards";

export default function EventDetails() {
  return (
    <section
      id="details"
      className="bg-(--bg-details) py-28 sm:py-36 px-8 sm:px-[4.8rem]"
    >
      <div className="max-w-480 mx-auto">
        <div className="mb-16 sm:mb-[5.6rem]">
          <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
            Event Details
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-light leading-[1.1] text-(--color-text-inverse) mt-[1.2rem]">
            Join us for{" "}
            <em className="italic text-(--color-gold)">a day of joy</em>
          </h2>
        </div>

        <Cards />
      </div>
    </section>
  );
}

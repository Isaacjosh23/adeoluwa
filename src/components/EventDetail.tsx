import { MapPin, Clock, Shirt } from "lucide-react";

interface DetailCard {
  number: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}

const DETAILS: DetailCard[] = [
  {
    number: "①",
    icon: <MapPin size={16} />,
    label: "Ceremony",
    value: "Church of the Resurrection",
    sub: "10:00 AM · Victoria Island, Lagos",
  },
  {
    number: "②",
    icon: <Clock size={16} />,
    label: "Reception",
    value: "The Landmark Beach Event Centre",
    sub: "2:00 PM · Oniru, Lagos",
  },
  {
    number: "③",
    icon: <Shirt size={16} />,
    label: "Dress Code",
    value: "Champagne & Ivory",
    sub: "Aso-ebi details on request",
  },
];

export default function EventDetails() {
  return (
    <section
      id="details"
      className="bg-[var(--bg-details)] py-[7rem] sm:py-[9rem] px-[2rem] sm:px-[4.8rem]"
    >
      <div className="max-w-[120rem] mx-auto">
        {/* Header */}
        <div className="mb-[4rem] sm:mb-[5.6rem]">
          <p className="section-label">Event Details</p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-light leading-[1.1] text-[var(--color-text-inverse)] mt-[1.2rem]">
            Join us for{" "}
            <em className="italic text-[var(--color-gold)]">a day of joy</em>
          </h2>
        </div>

        {/* Cards — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-[0.5px] border-[var(--color-gold-dim)]">
          {DETAILS.map((detail, i) => (
            <div
              key={detail.label}
              className={`flex flex-col items-center text-center px-[2.4rem] sm:px-[3.6rem] py-[3.6rem] sm:py-[4.4rem] gap-[0.8rem] transition-colors duration-300 hover:bg-[rgba(196,145,58,0.04)]
                ${
                  i !== DETAILS.length - 1
                    ? "border-b-[0.5px] sm:border-b-0 sm:border-r-[0.5px] border-[var(--color-gold-dim)]"
                    : ""
                }`}
            >
              <span className="font-serif text-[2.4rem] sm:text-[2.8rem] italic text-[var(--color-gold)] leading-none mb-[0.6rem]">
                {detail.number}
              </span>
              <div className="text-[var(--color-text-muted)] mb-[0.4rem]">
                {detail.icon}
              </div>
              <p className="text-[0.9rem] tracking-[0.22em] uppercase text-[var(--color-text-muted)]">
                {detail.label}
              </p>
              <p className="font-serif text-[1.7rem] sm:text-[1.9rem] font-light text-[var(--color-text-inverse)] leading-[1.4]">
                {detail.value}
              </p>
              <p className="text-[1rem] sm:text-[1.1rem] text-[var(--color-text-muted)]">
                {detail.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

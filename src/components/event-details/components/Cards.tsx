import Location from "./Location";
import { DETAILS } from "./types";

function Cards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 border-[0.5px] border-(--color-gold-dim)">
      {DETAILS.map((detail, i) => (
        <div
          key={detail.label}
          className={`relative flex flex-col items-start text-left px-[2.4rem] sm:px-16 py-[3.6rem] sm:py-[4.8rem] gap-[1.2rem] transition-colors duration-300 hover:bg-[rgba(196,145,58,0.04)]
                ${
                  i !== DETAILS.length - 1
                    ? "border-b-[0.5px] sm:border-b-0 sm:border-r-[0.5px] border-(--color-gold-dim)"
                    : ""
                }`}
        >
          {detail.access && (
            <span className="absolute top-[1.6rem] right-[1.6rem] px-[1.2rem] py-2 rounded-full border-[0.5px] border-(--color-gold) text-[0.8rem] sm:text-[1rem] tracking-[0.14em] uppercase text-(--color-gold) font-sans font-medium">
              {detail.access}
            </span>
          )}

          {/* Number + Icon row */}
          <div className="flex items-center justify-between w-full">
            <div>{detail.icon}</div>
          </div>

          {/* Label */}
          <p className="text-[1rem] sm:text-[1.2rem] font-medium tracking-[0.22em] uppercase text-(--color-text-muted)">
            {detail.label}
          </p>

          {/* Venue name */}
          <p className="font-serif text-[2rem] sm:text-[2.4rem] font-light text-(--color-text-inverse) leading-[1.3]">
            {detail.venue}
          </p>

          {/* Divider */}
          <div className="w-full h-[0.5px] bg-(--color-gold-dim)" />

          {/* Time */}
          <div className="flex items-center gap-[1.2rem]">
            <span className="text-[0.9rem] tracking-[0.2em] uppercase text-(--color-gold) font-medium">
              {detail.timeIcon}
            </span>
            <span className="font-serif text-[1.6rem] text-(--color-text-inverse)">
              {detail.time}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-[1.2rem]">
            <span className="text-[0.9rem] tracking-[0.2em] uppercase text-(--color-gold) font-medium">
              {detail.dateIcon}
            </span>
            <span className="font-serif text-[1.6rem] text-(--color-text-inverse)">
              {detail.date}
            </span>
          </div>

          {/* Location */}
          <Location detail={detail} />
        </div>
      ))}
    </div>
  );
}

export default Cards;

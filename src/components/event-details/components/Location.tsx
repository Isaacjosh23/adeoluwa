import RightDiagonalArrowIcon from "@/ui/icons/right-diagonal-arrow";
import { DetailCard } from "./types";

interface LocationProps {
  detail: DetailCard;
}

function Location({ detail }: LocationProps) {
  return (
    <div className="flex items-start gap-[1.2rem]">
      <span className="text-[0.9rem] tracking-[0.2em] uppercase text-(--color-gold) font-medium shrink-0 mt-[0.3rem]">
        {detail.locationIcon}
      </span>
      <a
        href={detail.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif text-[1.6rem] text-(--color-text-inverse) underline decoration-(--color-gold) decoration-[0.5px] underline-offset-4 hover:text-(--color-gold) transition-colors duration-300 leading-[1.4] flex items-center gap-[0.6rem] font-medium"
      >
        {detail.location}
        <span className="inline-block no-underline">
          <RightDiagonalArrowIcon className="size-8" />
        </span>
      </a>
    </div>
  );
}

export default Location;

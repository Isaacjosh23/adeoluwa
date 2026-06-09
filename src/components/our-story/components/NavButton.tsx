import { useOurStoryContext } from "@/context/OurStoryContext";
import { MEMORIES } from "@/lib/memories";
import LeftArrowIcon from "@/ui/icons/left-arrow";
import RightArrowIcon from "@/ui/icons/right-arrow";

function NavButton() {
  const { prevCard, nextCard, current } = useOurStoryContext();

  return (
    <div className="flex items-center justify-center gap-8 mt-8 sm:mt-[2.2rem]">
      <button
        onClick={prevCard}
        disabled={current === 0}
        aria-label="Previous"
        className="w-[3.6rem] h-[3.6rem] sm:w-[3.8rem] sm:h-[3.8rem] rounded-full border-[0.5px] border-(--color-gold-dim) bg-transparent cursor-pointer text-[1.4rem] sm:text-[1.5rem] text-(--color-text-muted) flex items-center justify-center transition-all duration-300 hover:border-(--color-gold) hover:text-(--color-gold) disabled:opacity-30 disabled:pointer-events-none"
      >
        <LeftArrowIcon className="size-8 sm:size-10" />
      </button>
      <span className="font-serif italic text-[1.3rem] sm:text-[1.4rem] text-(--color-text-muted)">
        {current + 1} / {MEMORIES.length}
      </span>
      <button
        onClick={nextCard}
        disabled={current === MEMORIES.length - 1}
        aria-label="Next"
        className="w-[3.6rem] h-[3.6rem] sm:w-[3.8rem] sm:h-[3.8rem] rounded-full border-[0.5px] border-(--color-gold-dim) bg-transparent cursor-pointer text-[1.4rem] sm:text-[1.5rem] text-(--color-text-muted) flex items-center justify-center transition-all duration-300 hover:border-(--color-gold) hover:text-(--color-gold) disabled:opacity-30 disabled:pointer-events-none"
      >
        <RightArrowIcon className="size-8 sm:size-10" />
      </button>
    </div>
  );
}

export default NavButton;

import { useOurStoryContext } from "@/context/OurStoryContext";
import { MEMORIES } from "@/lib/memories";

function Progress() {
  const { current } = useOurStoryContext();

  return (
    <div className="flex justify-center gap-[0.6rem] sm:gap-[0.7rem] mt-[3.2rem] sm:mt-16 px-16">
      {MEMORIES.map((_, i) => (
        <div
          key={i}
          className={`h-[0.2rem] flex-1 max-w-16 rounded-[0.2rem] transition-all duration-380 ${
            i === current
              ? "bg-(--color-gold)"
              : i < current
                ? "bg-[rgba(196,145,58,0.38)]"
                : "bg-[rgba(106,76,42,0.18)]"
          }`}
        />
      ))}
    </div>
  );
}

export default Progress;

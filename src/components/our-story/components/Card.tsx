import { useOurStoryContext } from "@/context/OurStoryContext";
import { MEMORIES } from "@/lib/memories";
import Image from "next/image";

function Card() {
  const { onDragStart, onDragMove, onDragEnd, getCardStyle } =
    useOurStoryContext();

  return (
    <div
      className="relative mx-auto cursor-grab active:cursor-grabbing select-none"
      style={{
        width: "min(30rem, 85vw)",
        height: "min(42rem, 119vw)",
      }}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
    >
      {MEMORIES.map((memory, index) => (
        <div
          key={memory.id}
          className="absolute inset-0 rounded-[0.6rem] overflow-hidden"
          style={getCardStyle(index)}
        >
          <Image
            src={memory.image}
            alt={memory.caption}
            fill
            sizes="(max-width: 640px) 85vw, 30rem"
            className="object-cover pointer-events-none"
            draggable={false}
          />
          <div className="absolute bottom-0 left-0 right-0 px-8 pt-[3.6rem] pb-8 bg-linear-to-t from-[rgba(14,12,11,0.88)] to-transparent">
            <p className="text-[0.9rem] tracking-[0.2em] uppercase text-(--color-gold) mb-[0.4rem] font-sans">
              {memory.date}
            </p>
            <p className="font-serif italic text-[1.5rem] sm:text-[1.6rem] text-[rgba(250,247,242,0.9)] leading-[1.4]">
              {memory.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;

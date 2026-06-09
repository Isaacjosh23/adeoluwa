import { useHero } from "@/context/HeroContext";
import MuteIcon from "@/ui/icons/mute";
import UnmuteIcon from "@/ui/icons/unmute";

function Music() {
  const { toggleMute, muted } = useHero();

  return (
    <button
      onClick={toggleMute}
      aria-label="Toggle music"
      className="fixed bottom-8 right-8 sm:bottom-[2.8rem] sm:right-[2.8rem] z-900 w-16 h-16 sm:w-[4.4rem] sm:h-[4.4rem] rounded-full bg-[rgba(14,12,11,0.8)] backdrop-blur-[10px] border-[0.5px] border-[rgba(196,145,58,0.35)] flex items-center justify-center cursor-pointer transition-all duration-300 text-(--color-gold) hover:bg-[rgba(196,145,58,0.15)] hover:border-(--color-gold)"
    >
      {muted ? (
        <MuteIcon className="w-[1.6rem] h-[1.6rem] sm:w-[1.8rem] sm:h-[1.8rem]" />
      ) : (
        <UnmuteIcon className="w-[1.6rem] h-[1.6rem] sm:w-[1.8rem] sm:h-[1.8rem]" />
      )}
    </button>
  );
}

export default Music;

import CloseIcon from "@/ui/icons/close";

interface Message {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface MessageModalProps {
  message: Message;
  onClose: () => void;
}

function MessageModal({ message, onClose }: MessageModalProps) {
  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center px-[2.4rem] bg-[rgba(14,12,11,0.85)] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-240 max-h-[80vh] bg-(--color-dark-2) border-[0.5px] border-(--color-gold-dim) p-16 flex flex-col gap-[2.4rem] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-8 right-8 text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-200 cursor-pointer"
        >
          <CloseIcon className="size-8" />
        </button>

        <span className="font-serif text-[4rem] text-(--color-gold) leading-none opacity-30">
          &quot;
        </span>

        <p className="font-serif italic text-[1.6rem] sm:text-[1.8rem] text-[rgba(250,247,242,0.82)] leading-[1.8] mt-[-1.2rem]">
          {message.message}
        </p>

        <div className="h-[0.5px] bg-(--color-gold-dim) w-full" />

        <div className="flex items-center justify-between gap-[1.2rem] flex-wrap">
          <p className="font-sans text-[1.2rem] tracking-[0.14em] uppercase text-(--color-text-muted)">
            — {message.name}
          </p>
          <p className="font-sans text-[1.1rem] text-(--color-text-muted)">
            {message.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;

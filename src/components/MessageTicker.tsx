const SAMPLE_MESSAGES = [
  {
    name: "Ngozi Okafor",
    message: "So excited for you both! Can't wait to celebrate!",
  },
  {
    name: "Tunde Adeyemi",
    message: "Wishing you a lifetime of love and laughter.",
  },
  { name: "Amaka Eze", message: "This is so beautiful. Congratulations!" },
  {
    name: "Seun Balogun",
    message: "God bless your union. We are so happy for you!",
  },
  {
    name: "Chidinma Obi",
    message: "Your love story is truly inspiring. See you there!",
  },
  {
    name: "Emeka Nwosu",
    message: "Congratulations to the couple! Your home is blessed.",
  },
  { name: "Fatima Aliyu", message: "So honoured to be invited. Can't wait!" },
  {
    name: "Biodun Adewale",
    message: "Two amazing people found each other. Love wins!",
  },
];

const TICKER_TRUNCATE_AT = 220;

interface Message {
  name: string;
  message: string;
}

interface MessageTickerProps {
  messages: Message[];
}

function MessageTicker({ messages }: MessageTickerProps) {
  const items =
    messages.length > 0
      ? [...messages, ...messages]
      : [...SAMPLE_MESSAGES, ...SAMPLE_MESSAGES];

  return (
    <div className="bg-(--bg-etiquette) border-t-[0.5px] border-b-[0.5px] border-(--color-gold-dim) py-[3.2rem] overflow-hidden">
      <p className="text-[1rem] sm:text-[1.3rem] tracking-[0.28em] uppercase text-(--color-gold) font-medium font-sans text-center mb-[2.4rem]">
        Messages from our guests
      </p>

      <div className="flex gap-[1.6rem] animate-message-ticker w-max whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <div
            key={i}
            className="w-md h-104 shrink-0 border-[0.5px] border-(--color-gold-dim) bg-[rgba(196,145,58,0.03)] p-[2.4rem] flex flex-col gap-[1.2rem] hover:border-(--color-gold) transition-colors duration-300 cursor-pointer whitespace-normal overflow-hidden"
          >
            <span className="font-serif text-[3.2rem] text-(--color-gold) leading-none opacity-40 shrink-0">
              &quot;
            </span>

            <p className="font-serif italic text-[1.4rem] text-[rgba(250,247,242,0.7)] leading-[1.7] mt-[-0.8rem] overflow-hidden line-clamp-4 flex-1">
              {item.message.length > TICKER_TRUNCATE_AT
                ? item.message.slice(0, TICKER_TRUNCATE_AT).trimEnd() + "..."
                : item.message}
            </p>

            <p className="font-sans text-[1.1rem] tracking-[0.12em] uppercase text-(--color-text-muted) shrink-0">
              — {item.name}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-[3.2rem]">
        <a
          href="/messages"
          className="font-sans text-[1.1rem] font-medium tracking-[0.18em] uppercase text-(--color-gold) border-[0.5px] border-(--color-gold-dim) px-[3.2rem] py-[1.2rem] hover:bg-(--color-gold) hover:text-(--color-dark) transition-all duration-300"
        >
          View All Messages →
        </a>
      </div>
    </div>
  );
}

export default MessageTicker;

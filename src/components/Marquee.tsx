export default function Marquee() {
  const items = [
    "Forever Starts Here",
    "Two Became One",
    "It Was Always You",
    "15 · 08 · 2026",
    "Ilorin in Love",
    "#AdeOluwa26",
  ];

  return (
    <div className="overflow-hidden bg-(--bg-marquee) border-t-[0.5px] border-b-[0.5px] border-(--color-gold-dim) py-[1.2rem] sm:py-[1.4rem] w-full">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-serif italic text-[1.4rem] sm:text-[1.7rem] text-[rgba(196,145,58,0.65)] inline-flex items-center"
          >
            {item}
            <span className="not-italic text-[0.6rem] sm:text-[0.7rem] text-(--color-gold) mx-[1.6rem] sm:mx-[2.4rem]">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

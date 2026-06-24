import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "#story" },
  { label: "Event Details", href: "#details" },
  { label: "Dress Colors", href: "#colors" },
  { label: "Etiquette", href: "#etiquette" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Footer() {
  return (
    <footer className="bg-(--bg-footer) py-24 sm:py-32 px-8 sm:px-[4.8rem]">
      <div className="max-w-480 mx-auto flex flex-col items-center gap-[4.8rem]">
        <div className="flex flex-col items-center gap-[1.2rem]">
          <p className="font-serif italic text-[clamp(5.2rem,10vw,8.8rem)] font-light text-(--color-gold) leading-none tracking-[0.08em]">
            A ♡ O
          </p>
          <p className="font-serif italic text-[1.4rem] sm:text-[1.7rem] text-(--color-text-inverse)">
            Saturday, 15th August 2026 · Ilorin, Kwara State
          </p>
          <p className="font-sans font-normal italic text-[1.3rem] sm:text-[1.4rem] text-(--color-gold) tracking-[0.08em]">
            #AdeOluwa2026
          </p>
        </div>

        <div className="w-full max-w-160 h-[0.5px] bg-(--color-gold-dim)" />

        <div className="flex flex-wrap items-center justify-center gap-x-[2.4rem] gap-y-[1.2rem]">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[1rem] sm:text-[1.2rem] tracking-[0.16em] uppercase text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-300 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="w-full max-w-160 h-[0.5px] bg-(--color-gold-dim)" />

        <div className="flex flex-col sm:flex-row items-center gap-[0.8rem] sm:gap-[3.2rem]">
          <p className="font-serif italic text-[1.5rem] text-(--color-text-muted) font-medium">
            Questions? Reach the coordinators:
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-[0.8rem] sm:gap-[2.4rem]">
            <a
              href="tel:+2349151027961"
              className="text-[1.3rem] tracking-widest text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-300 font-"
            >
              Damilola — 09151027961
            </a>
            <span className="hidden sm:block text-(--color-gold-dim)">·</span>
            <a
              href="tel:+2349135230118"
              className="text-[1.3rem] tracking-widest text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-300 font-"
            >
              Ayokunle — 09135230118
            </a>
          </div>
        </div>

        <p className="text-[1.2rem] text-(--color-text-muted) text-center leading-[1.8] font-medium">
          Made with love · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

function Header() {
  return (
    <div className="px-8 sm:px-16 pb-16 sm:pb-[5.2rem]">
      <p className="section-label">How It All Started</p>
      <h2 className="font-serif text-[clamp(3.2rem,5vw,5.8rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
        Our <em className="italic text-(--color-gold)">Story</em>
      </h2>
      <p className="text-[0.9rem] sm:text-[1rem] tracking-[0.2em] uppercase text-(--color-text-muted) mt-4">
        Swipe through our memories
      </p>
    </div>
  );
}

export default Header;

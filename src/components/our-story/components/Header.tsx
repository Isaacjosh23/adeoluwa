function Header() {
  return (
    <div className="px-8 sm:px-16 pb-16 sm:pb-[5.2rem]">
      <p className="font-sans text-[1rem] md:text-[1.2rem] font-medium tracking-[0.32em] uppercase text-(--color-gold)">
        How It All Started
      </p>
      <h2 className="font-serif text-[clamp(3.2rem,5vw,5.8rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
        Our <em className="italic text-(--color-gold)">Story</em>
      </h2>
      <p className="text-[1rem] sm:text-[1.2rem] tracking-[0.2em] uppercase text-(--color-gold) mt-4">
        Swipe through our memories
      </p>
    </div>
  );
}

export default Header;

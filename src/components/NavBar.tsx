"use client";

import CloseIcon from "@/ui/icons/close";
import MenuIcon from "@/ui/icons/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "#story" },
  { label: "Event Details", href: "#details" },
  { label: "Dress Code", href: "#colors" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const pathname = usePathname();

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-60% 0px -55% 0px",
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-795 transition-all duration-500 bg-(--color-dark)"
      id="home"
    >
      <div className="max-w-520 mx-auto px-[2.4rem] md:px-[4.8rem]">
        <div className="flex items-center justify-between h-28">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center leading-none group"
          >
            <p className="font-serif font-light italic text-(--color-gold) text-4xl tracking-widest leading-none">
              A ♡ O
            </p>
          </Link>

          <div className="hidden md:flex items-center md:gap-10 lg:gap-[3.2rem]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative md:text-[1.2rem] lg:text-[1.4rem] tracking-[0.08em] text-(--color-text-inverse) hover:text-(--color-gold) uppercase font-medium transition-colors duration-300 pb-[0.4rem]
                  after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-300
                  ${
                    pathname === link.href
                      ? "text-cream after:w-full"
                      : "text-cream hover:text-gold-light after:w-0 hover:after:w-full"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => alert("Not functional yet")}
              className="text-(--color-text-inverse) bg-(--color-gold) text-[1.4rem] px-8 py-4 rounded-lg font-medium cursor-pointer hover:bg-(--color-gold)/80 transition-colors duration-300"
            >
              RSVP
            </button>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-16 h-16 gap-1.5 cursor-pointer -translate-y-2"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <CloseIcon className="size-10 text-(--color-text-inverse)" />
            ) : (
              <MenuIcon className="size-10 text-(--color-text-inverse)" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-dark-overlay md:hidden"
          style={{ zIndex: 790, backdropFilter: "blur(2px)", top: "7rem" }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
}

export default NavBar;

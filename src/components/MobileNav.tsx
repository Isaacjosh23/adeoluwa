import Link from "next/link";
import { navLinks } from "./NavBar";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-dark ${isOpen ? "max-h-160 opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="border-t border-gold-dim p-[2.4rem] flex flex-col gap-[0.8rem]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`text-[1.6rem] font-medium tracking-wide py-[1.2rem] border-b border-gold-dim transition-colors duration-300 text-cream hover:text-gold-light ${
              pathname === link.href
                ? "text-(--color-text-inverse)"
                : "text-(--color-text-inverse) hover:text-(--color-gold)"
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
    </div>
  );
}

export default MobileNav;

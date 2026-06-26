"use client";

import { signOut } from "@/app/admin/action";
import CloseIcon from "@/ui/icons/close";
import ExitIcon from "@/ui/icons/exit";
import MenuIcon from "@/ui/icons/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TABS } from "./Tabs";

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-800 bg-(--bg-admin-sidebar) border-b-[0.5px] border-(--color-gold-dim) flex items-center justify-between px-8 h-[6.4rem]">
        <p className="font-serif italic text-[2.2rem] text-(--color-gold)">
          A ♡ O
        </p>
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="text-(--color-text-inverse) p-[0.8rem]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <CloseIcon className="size-10" />
          ) : (
            <MenuIcon className="size-10" />
          )}
        </button>
      </div>

      {/* Backdrop on mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-790 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-104 bg-(--bg-admin-sidebar) border-r-[0.5px] border-(--color-gold-dim) flex flex-col z-795 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="hidden lg:flex flex-col items-center py-16 border-b-[0.5px] border-(--color-gold-dim)">
          <p className="font-serif italic text-[3.6rem] text-(--color-gold) leading-none">
            A ♡ O
          </p>
          <p className="text-[1rem] sm:text-[1.3rem] tracking-[0.2em] uppercase text-(--color-text-muted) mt-4">
            Coordinator Panel
          </p>
        </div>

        {/* Spacer for mobile top bar */}
        <div className="lg:hidden h-[6.4rem]" />

        {/* Nav */}
        <nav className="flex-1 py-[3.2rem] px-[1.6rem] flex flex-col gap-[0.4rem]">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-[1.4rem] px-[1.6rem] py-[1.4rem] rounded-[0.4rem] transition-colors duration-200
                  ${
                    isActive
                      ? "bg-(--color-gold) text-(--color-dark)"
                      : "text-(--color-text-muted) hover:bg-[rgba(196,145,58,0.08)] hover:text-(--color-gold)"
                  }
                `}
              >
                {tab.icon}
                <span className="text-[1.3rem] tracking-[0.06em] font-medium">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User + sign out */}
        <div className="border-t-[0.5px] border-(--color-gold-dim) p-8">
          <p className="text-[1.3rem] text-(--color-text-muted) truncate mb-[1.2rem]">
            {userEmail}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left font-medium text-[1.2rem] tracking-[0.08em] uppercase text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-200 flex items-center gap-4 cursor-pointer"
            >
              <ExitIcon className="size-9" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

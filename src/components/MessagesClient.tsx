"use client";

import { useState } from "react";
import Link from "next/link";
import MessageModal from "./MessageModal";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface MessagesClientProps {
  messages: Message[];
}

const TRUNCATE_AT = 220;

export default function MessagesClient({ messages }: MessagesClientProps) {
  const [modalMessage, setModalMessage] = useState<Message | null>(null);

  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-(--bg-etiquette) px-[2.4rem] sm:px-[4.8rem] py-[6.4rem]">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-[0.8rem] text-(--color-text-muted) hover:text-(--color-gold) transition-colors duration-200 font-sans text-[1.1rem] tracking-[0.14em] uppercase mb-[4.8rem] font-medium cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-[1.6rem] h-[1.6rem]"
          >
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to site
        </button>

        {/* Header */}
        <div className="mb-[4.8rem]">
          <p className="text-[1rem] sm:text-[1.3rem] tracking-[0.3em] uppercase text-(--color-gold) font-medium font-sans mb-[1.2rem]">
            From our guests
          </p>
          <h1 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-medium text-(--color-text-inverse) leading-[1.1]">
            Messages of{" "}
            <em className="italic text-(--color-gold-light)">love</em>
          </h1>
          <p className="font-serif italic text-[1.7rem] font-normal text-(--color-text-muted) mt-[1.6rem]">
            {messages.length} {messages.length === 1 ? "message" : "messages"}{" "}
            from people who love you both.
          </p>
        </div>

        {/* Empty state */}
        {messages.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-serif italic text-[2rem] text-(--color-text-muted)">
              No messages yet — be the first to leave one!
            </p>
            <Link
              href="/#rsvp"
              className="inline-block mt-[2.4rem] font-sans text-[1.1rem] tracking-[0.18em] uppercase text-(--color-gold) border-[0.5px] border-(--color-gold-dim) px-[3.2rem] py-[1.2rem] hover:bg-(--color-gold) hover:text-(--color-dark) transition-all duration-300"
            >
              RSVP & Leave a Message
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.6rem]">
            {messages.map((m) => {
              const isLong = m.message.length > TRUNCATE_AT;
              const preview = isLong
                ? m.message.slice(0, TRUNCATE_AT).trimEnd() + "..."
                : m.message;

              return (
                <div
                  key={m.id}
                  className="border-[0.5px] border-(--color-gold-dim) bg-[rgba(196,145,58,0.03)] p-[2.8rem] flex flex-col gap-[1.6rem] hover:border-(--color-gold) transition-colors duration-300"
                >
                  {/* Quote mark */}
                  <span className="font-serif text-[3.6rem] text-(--color-gold) leading-none opacity-30 shrink-0">
                    &quot;
                  </span>

                  {/* Message preview */}
                  <p className="font-serif italic text-[1.6rem] text-[rgba(250,247,242,0.75)] leading-[1.75] mt-[-0.8rem] flex-1">
                    {preview}
                  </p>

                  {/* Read more */}
                  {isLong && (
                    <button
                      onClick={() => setModalMessage(m)}
                      className="self-start font-sans text-[1.1rem] tracking-[0.14em] uppercase text-(--color-gold) hover:underline underline-offset-4 transition-all duration-200 cursor-pointer"
                    >
                      Read more →
                    </button>
                  )}

                  {/* Divider */}
                  <div className="h-[0.5px] bg-(--color-gold-dim) w-full" />

                  {/* Name + date */}
                  <div className="flex items-end justify-between gap-[1.2rem]">
                    <p className="font-sans text-[1.2rem] tracking-[0.12em] uppercase text-(--color-text-inverse)">
                      — {m.name}
                    </p>
                    <p className="font-sans text-[1.2rem] text-(--color-text-inverse) shrink-0">
                      {m.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalMessage && (
        <MessageModal
          message={modalMessage}
          onClose={() => setModalMessage(null)}
        />
      )}
    </>
  );
}

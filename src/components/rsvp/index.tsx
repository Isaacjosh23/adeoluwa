"use client";

import { useState } from "react";
import Toast from "./components/Toast";
import RsvpForm from "./components/RsvpForm";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestCount: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  guestCount: "",
  message: "",
};

export default function RSVP() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          guestCount: form.guestCount,
          message: form.message || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("RSVP submission error:", data);
        alert(`Error: ${data.error || "Failed to submit RSVP"}`);
        setLoading(false);
        return;
      }

      setLoading(false);
      setForm(INITIAL_FORM);
      setToastVisible(true);

      // Auto-dismiss after 4.5s
      setTimeout(() => setToastVisible(false), 4500);
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Failed to submit RSVP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Toast visible={toastVisible} onClose={() => setToastVisible(false)} />

      <section
        id="rsvp"
        className="bg-(--bg-rsvp) py-28 sm:py-36 px-8 sm:px-[4.8rem]"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 sm:mb-[5.6rem]">
            <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
              Confirm Your Attendance
            </p>
            <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
              Tell us{" "}
              <em className="italic text-(--color-gold)">you&apos;re coming</em>
            </h2>
            <p className="font-serif italic text-[1.5rem] sm:text-[1.7rem] text-(--color-text-muted) mt-[1.6rem] leading-[1.7]">
              We&apos;re saving you a seat and a plate — just say the word. RSVP
              closes{" "}
              <strong className="not-italic font-medium text-(--color-text-primary)">
                July 31, 2025.
              </strong>
            </p>
          </div>

          {/* Form */}

          <RsvpForm
            form={form}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </>
  );
}

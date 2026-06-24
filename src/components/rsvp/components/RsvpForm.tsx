import RightAltArrowIcon from "@/ui/icons/right-alt-arrow";
import { FormData } from "@/hooks/useRsvp";
import type { ChangeEvent, FormEvent } from "react";

interface RsvpFormProps {
  form: FormData;
  loading: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: FormEvent) => void;
}

const inputClass = `
    w-full bg-transparent border-b-[0.5px] border-(--color-gold-dim)
    px-0 py-[1rem] font-serif text-[1.8rem] text-(--color-text-primary)
    placeholder:text-(--color-text-muted) placeholder:font-serif placeholder:italic
    focus:outline-none focus:border-(--color-gold)
    transition-colors duration-300
  `;

const labelClass = `
    block text-[1rem] sm:text-[1.2rem] tracking-[0.22em] uppercase
    text-(--color-text-muted) font-medium font-sans mb-[0.4rem]
  `;

function RsvpForm({ form, loading, onChange, onSubmit }: RsvpFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-16">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-[4.8rem]">
        <div>
          <label className={labelClass} htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="John"
            value={form.firstName}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Doe"
            value={form.lastName}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass} htmlFor="email">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="johndoe@example.com"
          value={form.email}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-[4.8rem]">
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="08012345678"
            value={form.phone}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        {/* Guest count */}
        <div>
          <label className={labelClass} htmlFor="guestCount">
            Number of Guests *
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="text"
            required
            placeholder="2"
            value={form.guestCount}
            onChange={onChange}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, "");
            }}
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass} htmlFor="message">
          Message to the Couple
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Say something warm..."
          value={form.message}
          onChange={onChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[1.6rem] pt-[1.6rem] border-t-[0.5px] border-(--color-gold-dim)">
        <button
          type="submit"
          disabled={loading}
          className="px-12 py-[1.2rem] bg-(--color-gold) text-(--color-dark) font-sans text-[1rem] sm:text-[1.2rem] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-(--color-brown) hover:text-(--color-text-inverse)! disabled:opacity-50 disabled:cursor-not-allowed mx-auto cursor-pointer"
        >
          {loading ? (
            <p>Sending...</p>
          ) : (
            <p className="flex items-center gap-2">
              Confirm My Attendance{" "}
              <span>
                <RightAltArrowIcon className="text-[2rem] inline-block" />
              </span>
            </p>
          )}
        </button>
        <p className="font-serif italic text-[1.5rem] text-(--color-text-muted) font-medium">
          You will receive a confirmation email shortly.
        </p>
      </div>
    </form>
  );
}

export default RsvpForm;

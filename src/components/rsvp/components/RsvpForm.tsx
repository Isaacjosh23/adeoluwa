import RightAltArrowIcon from "@/ui/icons/right-alt-arrow";
import { FormData } from "..";
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
    px-0 py-[1rem] font-serif text-[1.5rem] text-(--color-text-primary)
    placeholder:text-(--color-text-muted) placeholder:font-serif placeholder:italic
    focus:outline-none focus:border-(--color-gold)
    transition-colors duration-300
  `;

const labelClass = `
    block text-[1rem] sm:text-[1.2rem] tracking-[0.22em] uppercase
    text-(--color-text-muted) font-semibold font-sans mb-[0.4rem]
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
            placeholder="Ngozi"
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
            placeholder="Okafor"
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
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          className={inputClass}
        />
      </div>

      {/* Phone */}
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

      {/* Guest count + Attending row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-[4.8rem]">
        <div>
          <label className={labelClass} htmlFor="guestCount">
            Number of Guests
          </label>
          <select
            id="guestCount"
            name="guestCount"
            value={form.guestCount}
            onChange={onChange}
            className={`${inputClass} cursor-pointer appearance-none`}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="1">Just me</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="attending">
            Attending *
          </label>
          <select
            id="attending"
            name="attending"
            required
            value={form.attending}
            onChange={onChange}
            className={`${inputClass} cursor-pointer appearance-none`}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="both">Ceremony & Reception</option>
            <option value="reception">Reception only</option>
            <option value="ceremony">Ceremony only</option>
            <option value="no">Unable to attend</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass} htmlFor="message">
          Message to the Couple{" "}
          <span className="normal-case tracking-normal text-(--color-text-muted)">
            (optional)
          </span>
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
          className="px-12 py-[1.2rem] bg-(--color-gold) text-(--color-dark) font-sans text-[1rem] sm:text-[1.2rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-(--color-brown) hover:text-(--color-text-inverse)! disabled:opacity-50 disabled:cursor-not-allowed mx-auto cursor-pointer"
        >
          {loading ? (
            <p>Sending...</p>
          ) : (
            <p>
              Confirm My Attendance{" "}
              <span>
                <RightAltArrowIcon className="text-[1rem] inline-block" />
              </span>
            </p>
          )}
        </button>
        <p className="font-serif italic text-[1.3rem] text-(--color-text-muted)">
          You will receive a confirmation email shortly.
        </p>
      </div>
    </form>
  );
}

export default RsvpForm;

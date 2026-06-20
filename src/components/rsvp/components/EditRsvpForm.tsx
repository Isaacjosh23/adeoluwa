"use client";

import { EditRsvpFormProps, useEditRsvp } from "@/hooks/useEdit";
import RightAltArrowIcon from "@/ui/icons/right-alt-arrow";

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

export default function EditRsvpForm(props: EditRsvpFormProps) {
  const {
    guestId,
    error,
    handleCancel,
    handleSubmit,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    guestCount,
    setGuestCount,
    phone,
    setPhone,
    message,
    setMessage,
    loading,
  } = useEditRsvp(props);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Guest ID display */}
      <div className="mb-8 p-4 bg-(--color-dark) rounded">
        <p className="text-[1rem] text-(--color-text-inverse) font-medium uppercase tracking-wide">
          Your Guest ID
        </p>
        <p className="text-[1.5rem] font-serif text-(--color-gold)">
          {guestId}
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-900/30 border border-red-600 rounded">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-16">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-[4.8rem]">
          <div>
            <label className={labelClass} htmlFor="firstName">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="lastName">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            type="text"
            required
            value={guestCount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setGuestCount(value);
            }}
            className={inputClass}
          />
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
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[1.6rem] pt-[1.6rem] border-t-[0.5px] border-(--color-gold-dim)">
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-[1.2rem] bg-(--color-gold) text-(--color-dark) font-sans text-[1rem] sm:text-[1.2rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-(--color-brown) hover:text-(--color-text-inverse)! disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <p>Saving...</p>
            ) : (
              <p>
                Save Changes{" "}
                <span>
                  <RightAltArrowIcon className="text-[1rem] inline-block" />
                </span>
              </p>
            )}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-8 py-[1.2rem] bg-transparent border border-(--color-gold) text-(--color-gold) font-sans text-[1rem] sm:text-[1.2rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-(--color-gold) hover:text-(--color-dark) disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Cancel My RSVP
          </button>
        </div>
      </form>
    </div>
  );
}

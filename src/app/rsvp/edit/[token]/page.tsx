"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import EditRsvpForm from "@/components/rsvp/components/EditRsvpForm";

interface RsvpData {
  id: string;
  guestId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  guestCount: string;
  attending: string;
  message?: string;
  status: string;
  submittedAt: string;
}

export default function EditRsvpPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [rsvpData, setRsvpData] = useState<RsvpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchRsvp = async () => {
      try {
        const response = await fetch(`/api/rsvp/${token}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to load RSVP");
          setLoading(false);
          return;
        }

        setRsvpData(data);
        setLoading(false);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMsg);
        setLoading(false);
      }
    };

    if (token) {
      fetchRsvp();
    }
  }, [token]);

  const handleSuccess = () => {
    setSuccess(true);
    setSuccessMessage(
      "Your RSVP has been updated successfully! You will receive a confirmation email shortly.",
    );
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
  };

  if (loading) {
    return (
      <section className="bg-(--bg-rsvp) py-28 sm:py-36 px-8 sm:px-[4.8rem] min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-(--color-gold) font-serif text-[1.5rem]">
            Loading your RSVP...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-(--bg-rsvp) py-28 sm:py-36 px-8 sm:px-[4.8rem] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
              Error
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
              Unable to Load RSVP
            </h2>
            <p className="font-serif italic text-[1.5rem] text-red-400 mt-[1.6rem]">
              {error}
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 px-8 py-[1.2rem] bg-(--color-gold) text-(--color-dark) font-sans text-[1.2rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-(--color-brown) cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (success) {
    return (
      <section className="bg-(--bg-rsvp) py-28 sm:py-36 px-8 sm:px-[4.8rem] min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
              Success
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,4rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
              <em className="italic text-(--color-gold)">RSVP Updated</em>
            </h2>
            <p className="font-serif italic text-[1.5rem] text-(--color-text-muted) mt-[1.6rem]">
              {successMessage}
            </p>
            <p className="font-serif italic text-[1.2rem] text-(--color-text-muted) mt-[2rem]">
              Redirecting to home in 3 seconds...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!rsvpData) {
    return (
      <section className="bg-(--bg-rsvp) py-28 sm:py-36 px-8 sm:px-[4.8rem] min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-(--color-gold) font-serif text-[1.5rem]">
            No RSVP data found
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-(--bg-rsvp) py-28 sm:py-36 px-8 sm:px-[4.8rem]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 sm:mb-[5.6rem]">
          <p className="text-[1rem] md:text-[1.2rem] uppercase text-(--color-gold) font-medium tracking-[0.32em] font-sans">
            Update Your RSVP
          </p>
          <h2 className="font-serif text-[clamp(3.2rem,5vw,6rem)] font-light leading-[1.1] text-(--color-text-primary) mt-[1.2rem]">
            Modify your{" "}
            <em className="italic text-(--color-gold)">attendance</em>
          </h2>
          <p className="font-serif italic text-[1.5rem] sm:text-[1.7rem] text-(--color-text-muted) mt-[1.6rem] leading-[1.7]">
            Change your details or cancel your RSVP below. Updates must be made
            before <strong className="not-italic">July 31, 2026.</strong>
          </p>
        </div>

        {/* Form */}
        <EditRsvpForm
          guestId={rsvpData.guestId}
          firstName={rsvpData.firstName}
          lastName={rsvpData.lastName}
          email={rsvpData.email}
          phone={rsvpData.phone}
          guestCount={rsvpData.guestCount}
          message={rsvpData.message}
          token={token}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </section>
  );
}

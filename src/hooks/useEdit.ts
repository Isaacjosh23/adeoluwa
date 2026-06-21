import { useState } from "react";

export interface EditRsvpFormProps {
  guestId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  guestCount: string;
  message?: string;
  token: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useEditRsvp({
  guestId,
  firstName: initialFirstName,
  lastName: initialLastName,
  email: initialEmail,
  phone: initialPhone,
  guestCount: initialGuestCount,
  message: initialMessage,
  token,
  onSuccess,
  onError,
}: EditRsvpFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone || "");
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [message, setMessage] = useState(initialMessage || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/rsvp/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          guestCount,
          message: message || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update RSVP");
        onError?.(data.error || "Failed to update RSVP");
        setLoading(false);
        return;
      }

      setLoading(false);
      onSuccess?.();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      onError?.(errorMsg);
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your RSVP? This action cannot be undone.",
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/rsvp/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cancel" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to cancel RSVP");
        onError?.(data.error || "Failed to cancel RSVP");
        setLoading(false);
        return;
      }

      setLoading(false);
      onSuccess?.();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errorMsg);
      onError?.(errorMsg);
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    guestCount,
    setGuestCount,
    message,
    setMessage,
    loading,
    error,
    handleCancel,
    handleSubmit,
    guestId,
  };
}

import { useState } from "react";

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

export function useRsvp() {
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

      setTimeout(() => setToastVisible(false), 5000);
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Failed to submit RSVP. Please try again.");
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    toastVisible,
    setToastVisible,
    handleChange,
    handleSubmit,
  };
}

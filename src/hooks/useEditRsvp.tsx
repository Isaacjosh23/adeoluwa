import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export function useEditRsvp() {
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

  return {
    rsvpData,
    loading,
    error,
    success,
    successMessage,
    handleSuccess,
    handleError,
    router,
    token,
  };
}

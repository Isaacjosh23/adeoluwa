import { createClient } from "@/lib/supabase/server";
import MessagesClient from "@/components/MessagesClient";

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("rsvps")
    .select("id, first_name, last_name, message, submitted_at")
    .not("message", "is", null)
    .neq("message", "")
    .order("submitted_at", { ascending: false });

  const formatted = (messages ?? []).map((m) => ({
    id: m.id,
    name: `${m.first_name} ${m.last_name}`,
    message: m.message!,
    date: new Date(m.submitted_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return <MessagesClient messages={formatted} />;
}

import HomeClient from "@/components/HomeClient";
import { createClient } from "@/lib/supabase/server";

interface Message {
  name: string;
  message: string;
}

// ── SERVER COMPONENT — fetches data ──
export default async function Home() {
  const supabase = await createClient();

  const { data: guestMessages } = await supabase
    .from("rsvps")
    .select("first_name, last_name, message")
    .not("message", "is", null)
    .neq("message", "")
    .order("submitted_at", { ascending: false });

  const messages: Message[] = (guestMessages ?? []).map((g) => ({
    name: `${g.first_name} ${g.last_name}`,
    message: g.message!,
  }));

  return <HomeClient messages={messages} />;
}

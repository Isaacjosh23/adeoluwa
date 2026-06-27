import { createClient } from "@/lib/supabase/server";

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("rsvps")
    .select(
      "id, guest_id, first_name, last_name, message, status, submitted_at",
    )
    .not("message", "is", null)
    .neq("message", "")
    .order("submitted_at", { ascending: false });

  if (error) {
    return (
      <div className="px-[2.4rem] sm:px-16 py-16 pt-40 lg:pt-[4.8rem]">
        <p className="text-red-400 font-medium italic text-[1.6rem]">
          Failed to load messages. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="px-[2.4rem] sm:px-16 py-16 pt-40 lg:pt-[4.8rem]">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[1rem] sm:text-[1.3rem] tracking-[0.24em] uppercase text-(--color-gold) font-medium mb-[0.8rem]">
          Messages
        </p>
        <h1 className="font-serif text-[3.6rem] sm:text-[4.4rem] font-medium text-(--color-text-primary) leading-[1.1]">
          Guest Messages
        </h1>
        <p className="font-serif italic text-[1.7rem] text-(--color-text-muted) mt-[0.8rem]">
          {messages?.length ?? 0} guest{messages?.length !== 1 ? "s" : ""} left
          a message.
        </p>
      </div>

      {/* Messages */}
      {!messages || messages.length === 0 ? (
        <div className="text-center py-[6.4rem] border-[0.5px] border-(--color-gold-dim)">
          <p className="font-serif italic text-[1.8rem] text-(--color-text-muted) font-medium">
            No messages yet
          </p>
          <p className="text-[1.4rem] text-(--color-text-muted) mt-[0.8rem]">
            Messages from guests will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.6rem]">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) p-[2.4rem] flex flex-col gap-[1.6rem] hover:border-(--color-gold) transition-colors duration-200"
            >
              {/* Quote mark */}
              {/* <span className="font-serif text-[4rem] text-(--color-gold) leading-none opacity-30">
                &quot;
              </span> */}
              {/* Message */}
              <p className="font-sans text-[1.7rem] text-(--color-text-primary) font-medium leading-[1.7]">
                &quot;{m.message} &quot;
              </p>

              {/* Divider */}
              <div className="h-[0.5px] bg-(--color-gold-dim) w-full" />

              {/* Guest info */}
              <div className="">
                <div>
                  <p className="font-serif italic text-[1.6rem] font-medium text-(--color-text-primary)">
                    {m.first_name} {m.last_name}
                  </p>
                </div>
                <div className="">
                  <p className="font-sans text-[1.2rem] text-(--color-text-muted) font-normal mt-[0.4rem]">
                    {new Date(m.submitted_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

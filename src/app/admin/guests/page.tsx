import { createClient } from "@/lib/supabase/server";
import GuestsTable from "@/components/admin/GuestsTable";

export default async function GuestsPage() {
  const supabase = await createClient();

  const { data: guests, error } = await supabase
    .from("rsvps")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    return (
      <div className="px-[2.4rem] sm:px-16 py-16 pt-40 lg:pt-[4.8rem]">
        <p className="text-red-400 font-serif italic text-[1.6rem]">
          Failed to load guests. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="px-[2.4rem] sm:px-16 py-16 pt-40 lg:pt-[4.8rem]">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[1rem] tracking-[0.24em] uppercase text-(--color-gold) font-medium mb-[0.8rem]">
          Guest List
        </p>
        <h1 className="font-serif text-[3.6rem] sm:text-[4.4rem] font-light text-(--color-text-primary) leading-[1.1]">
          All RSVPs
        </h1>
        <p className="font-serif italic text-[1.5rem] text-(--color-text-muted) mt-[0.8rem]">
          {guests?.length ?? 0} response{guests?.length !== 1 ? "s" : ""} so
          far.
        </p>
      </div>

      <GuestsTable guests={guests ?? []} />
    </div>
  );
}

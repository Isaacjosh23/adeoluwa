import StatCard from "@/components/admin/StatCard";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("guest_count, status");

  const totalRsvps = rsvps?.length ?? 0;
  const confirmed = rsvps?.filter((r) => r.status === "confirmed") ?? [];
  const cancelled = rsvps?.filter((r) => r.status === "cancelled") ?? [];
  const totalGuests = confirmed.reduce(
    (sum, r) => sum + (r.guest_count || 0),
    0,
  );

  return (
    <div className="px-[2.4rem] sm:px-16 py-16 sm:py-[4.8rem] pt-40lg:pt-[4.8rem]">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[1rem] tracking-[0.24em] uppercase text-(--color-gold) font-medium mb-[0.8rem]">
          Dashboard
        </p>
        <h1 className="font-serif text-[3.6rem] sm:text-[4.4rem] font-light text-(--color-text-primary) leading-[1.1]">
          Welcome back
        </h1>
        <p className="font-serif italic text-[1.5rem] text-(--color-text-muted) mt-[0.8rem]">
          Here&apos;s how the guest list is shaping up.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.6rem]">
        <StatCard label="Total RSVPs" value={totalRsvps} />
        <StatCard label="Total Guests" value={totalGuests} />
        <StatCard label="Confirmed" value={confirmed.length} accent="gold" />
        <StatCard label="Cancelled" value={cancelled.length} accent="muted" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface Guest {
  id: string;
  guest_id: string;
  first_name: string;
  last_name: string;
  email: string;
  guest_count: number;
  status: string;
  attending: string;
}

interface PassesClientProps {
  guests: Guest[];
}

export default function PassesClient({ guests }: PassesClientProps) {
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  const filtered = guests.filter((g) => {
    if (search === "") return true;
    return (
      `${g.first_name} ${g.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.guest_id.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ── SINGLE PASS DOWNLOAD ──
  const downloadPass = async (guest: Guest) => {
    setLoadingId(guest.id);
    try {
      const res = await fetch(`/api/admin/pass/${guest.id}`);
      if (!res.ok) throw new Error("Failed to generate pass");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${guest.first_name}_${guest.last_name}_EventPass.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate pass. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  // ── BULK DOWNLOAD ──
  const downloadAll = async () => {
    setBulkLoading(true);
    try {
      const res = await fetch("/api/admin/passes/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestIds: filtered.map((g) => g.id) }),
      });
      if (!res.ok) throw new Error("Failed to generate bulk passes");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `all-event-passes-${new Date().toISOString().split("T")[0]}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate bulk passes. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-[1.6rem] items-start sm:items-center justify-between">
        <input
          type="text"
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-lg bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) px-[1.6rem] py-4 font-sans text-[1.3rem] text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:border-(--color-gold) transition-colors duration-200"
        />

        <button
          onClick={downloadAll}
          disabled={bulkLoading || filtered.length === 0}
          className="px-[2.4rem] py-4 bg-(--color-gold) text-(--color-dark) font-sans text-[1.1rem] font-medium tracking-[0.14em] uppercase hover:bg-(--color-brown) hover:text-(--color-text-inverse) transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
        >
          {bulkLoading ? "Generating..." : `Download All (${filtered.length})`}
        </button>
      </div>

      {/* Results count */}
      <p className="text-[1.5rem] text-(--color-text-muted) font-sans">
        {filtered.length} confirmed guest{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Guest cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-[6.4rem] border-[0.5px] border-(--color-gold-dim)">
          <p className="font-serif text-[1.8rem] text-(--color-text-muted)">
            No confirmed guests found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.6rem]">
          {filtered.map((guest) => (
            <div
              key={guest.id}
              className="bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) p-[2.4rem] flex flex-col gap-[1.6rem] hover:border-(--color-gold) transition-colors duration-200"
            >
              {/* Guest info */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-[1.9rem] font-medium text-(--color-text-primary) leading-[1.2]">
                    {guest.first_name} {guest.last_name}
                  </p>
                  <p className="text-[1.1rem] tracking-widest text-(--color-gold) font-medium mt-[0.4rem]">
                    {guest.guest_id}
                  </p>
                </div>
                <span className="text-[1rem] tracking-widest uppercase font-medium font-sans px-4 py-[0.3rem] rounded-full bg-[rgba(196,145,58,0.12)] text-(--color-gold) border-[0.5px] border-(--color-gold-dim) shrink-0">
                  Confirmed
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-[0.6rem] border-t-[0.5px] border-(--color-gold-dim) pt-[1.6rem]">
                <div className="flex items-center gap-[0.8rem]">
                  <span className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium w-28 shrink-0">
                    Email
                  </span>
                  <span className="text-[1.3rem] text-(--color-text-primary) truncate">
                    {guest.email}
                  </span>
                </div>
                <div className="flex items-center gap-[0.8rem]">
                  <span className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium w-28 shrink-0">
                    Guests
                  </span>
                  <span className="text-[1.3rem] text-(--color-text-primary)">
                    {guest.guest_count}{" "}
                    {guest.guest_count === 1 ? "person" : "people"}
                  </span>
                </div>
                <div className="flex items-center gap-[0.8rem]">
                  <span className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium w-28 shrink-0">
                    Event
                  </span>
                  <span className="text-[1.3rem] text-(--color-text-primary) capitalize">
                    {guest.attending}
                  </span>
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={() => downloadPass(guest)}
                disabled={loadingId === guest.id}
                className="w-full py-4 border-[0.5px] border-(--color-gold) text-(--color-gold) font-sans text-[1.1rem] font-medium tracking-[0.14em] uppercase hover:bg-(--color-gold) hover:text-(--color-dark) transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loadingId === guest.id ? "Generating..." : "Download Pass →"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

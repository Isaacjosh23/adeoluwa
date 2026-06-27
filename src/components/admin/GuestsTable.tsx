"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";

export interface Guest {
  id: string;
  guest_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  guest_count: number;
  attending: string;
  status: string;
  submitted_at: string;
}

interface GuestsTableProps {
  guests: Guest[];
}

export default function GuestsTable({ guests }: GuestsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── FILTER ──
  const filtered = guests.filter((g) => {
    const matchesSearch =
      search === "" ||
      `${g.first_name} ${g.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.guest_id.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  // ── CSV EXPORT ──
  const exportCSV = () => {
    const headers = [
      "Guest ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Guests",
      "Submitted At",
    ];
    const rows = filtered.map((g) => [
      g.guest_id,
      g.first_name,
      g.last_name,
      g.email,
      g.phone ?? "",
      g.guest_count,
      g.status,
      new Date(g.submitted_at).toLocaleDateString("en-GB"),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guest-list-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (guest: Guest) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${guest.first_name} ${guest.last_name}'s RSVP? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(guest.id);
    try {
      const res = await fetch(`/api/admin/guests/${guest.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Refresh server data
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete guest. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-[1.6rem] items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-[1.2rem] w-full sm:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-lg bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) px-[1.6rem] py-4 font-sans text-[1.3rem] text-(--color-text-primary) placeholder:text-(--color-text-muted) focus:outline-none focus:border-(--color-gold) transition-colors duration-200"
          />
        </div>

        {/* Export */}
        <button
          onClick={exportCSV}
          className="px-[2.4rem] py-4 bg-(--color-gold) text-(--color-dark) font-sans text-[1.1rem] font-medium tracking-[0.14em] uppercase hover:bg-(--color-brown) hover:text-(--color-text-inverse) transition-colors duration-200 shrink-0 cursor-pointer"
        >
          Export CSV
        </button>
      </div>

      {/* Results count */}
      <p className="text-[1.5rem] text-(--color-text-muted) font-sans">
        Showing {filtered.length} of {guests.length} guests
      </p>

      <DesktopTable
        filtered={filtered}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      <MobileTable
        filtered={filtered}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </div>
  );
}

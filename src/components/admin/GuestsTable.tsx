"use client";

import { useState } from "react";

interface Guest {
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ── FILTER ──
  const filtered = guests.filter((g) => {
    const matchesSearch =
      search === "" ||
      `${g.first_name} ${g.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.guest_id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || g.status === statusFilter;

    return matchesSearch && matchesStatus;
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
      "Status",
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

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) px-[1.6rem] py-4 font-sans text-[1.3rem] text-(--color-text-primary) focus:outline-none focus:border-(--color-gold) transition-colors duration-200 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Export */}
        <button
          onClick={exportCSV}
          className="px-[2.4rem] py-4 bg-(--color-gold) text-(--color-dark) font-sans text-[1.1rem] font-medium tracking-[0.14em] uppercase hover:bg-(--color-brown) transition-colors duration-200 shrink-0"
        >
          Export CSV
        </button>
      </div>

      {/* Results count */}
      <p className="text-[1.2rem] text-(--color-text-muted) font-sans">
        Showing {filtered.length} of {guests.length} guests
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-[6.4rem] border-[0.5px] border-(--color-gold-dim)">
          <p className="font-serif italic text-[1.8rem] text-(--color-text-muted)">
            No guests found
          </p>
          <p className="text-[1.3rem] text-(--color-text-muted) mt-[0.8rem]">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-[0.5px] border-(--color-gold-dim) text-left border-collapse">
            <thead>
              <tr className="bg-(--bg-admin-sidebar) border-b-[0.5px] border-(--color-gold-dim)">
                {[
                  "Guest ID",
                  "Name",
                  "Email",
                  "Phone",
                  "Guests",
                  "Status",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-[1.6rem] py-[1.4rem] text-[1rem] tracking-[0.16em] uppercase text-(--color-gold) font-medium font-sans whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((guest, i) => (
                <tr
                  key={guest.id}
                  className={`border-b-[0.5px] border-(--color-gold-dim) transition-colors duration-150 hover:bg-(--bg-admin-table-alt)
                    ${i % 2 === 0 ? "bg-(--bg-admin-table-row)" : "bg-(--bg-admin-table-alt)"}
                  `}
                >
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.2rem] text-(--color-gold) font-medium whitespace-nowrap">
                    {guest.guest_id}
                  </td>
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.3rem] text-(--color-text-primary) whitespace-nowrap">
                    {guest.first_name} {guest.last_name}
                  </td>
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.3rem] text-(--color-text-primary)">
                    {guest.email}
                  </td>
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.3rem] text-(--color-text-muted) whitespace-nowrap">
                    {guest.phone ?? "—"}
                  </td>
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.3rem] text-(--color-text-primary) text-center">
                    {guest.guest_count}
                  </td>
                  <td className="px-[1.6rem] py-[1.4rem] whitespace-nowrap">
                    <span
                      className={`inline-block px-4 py-[0.3rem] text-[1rem] tracking-[0.12em] uppercase font-medium rounded-full font-sans
                        ${
                          guest.status === "confirmed"
                            ? "bg-[rgba(196,145,58,0.12)] text-(--color-gold) border-[0.5px] border-(--color-gold-dim)"
                            : "bg-[rgba(255,255,255,0.05)] text-(--color-text-muted) border-[0.5px] border-(--color-gold-dim)"
                        }
                      `}
                    >
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.3rem] text-(--color-text-muted) whitespace-nowrap">
                    {new Date(guest.submitted_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import DeleteIcon from "@/ui/icons/delete";
import { Guest } from "./GuestsTable";

interface DesktopTableProps {
  deletingId: string | null;
  filtered: Guest[];
  onDelete: (guest: Guest) => void;
}

function DesktopTable({ deletingId, filtered, onDelete }: DesktopTableProps) {
  return (
    <>
      {filtered.length === 0 ? (
        <div className="text-center py-[6.4rem] border-[0.5px] border-(--color-gold-dim)">
          <p className="font-serif italic text-[1.8rem] text-(--color-text-muted)">
            No guests found
          </p>
        </div>
      ) : (
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="min-w-full w-full border-[0.5px] border-(--color-gold-dim) text-left border-collapse">
            <thead>
              <tr className="bg-(--bg-admin-sidebar) border-b-[0.5px] border-(--color-gold-dim)">
                {[
                  "Guest ID",
                  "Name",
                  "Email",
                  "Phone",
                  "Guests",
                  "Date",
                  "",
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
                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.4rem] text-(--color-gold) font-medium whitespace-nowrap">
                    {guest.guest_id}
                  </td>

                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.4rem] text-(--color-text-primary) whitespace-nowrap">
                    {guest.first_name} {guest.last_name}
                  </td>

                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.4rem] text-(--color-text-primary)">
                    {guest.email}
                  </td>

                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.4rem] text-(--color-text-muted) whitespace-nowrap">
                    {guest.phone ?? "—"}
                  </td>

                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.4rem] text-(--color-text-primary) text-center">
                    {guest.guest_count}
                  </td>

                  <td className="px-[1.6rem] py-[1.4rem] font-sans text-[1.4rem] text-(--color-text-muted) whitespace-nowrap">
                    {new Date(guest.submitted_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-[1.6rem] py-[1.4rem] whitespace-nowrap">
                    <button
                      onClick={() => onDelete(guest)}
                      disabled={deletingId === guest.id}
                      aria-label={`Delete ${guest.first_name} ${guest.last_name}`}
                      className="text-red-400 hover:text-white hover:bg-red-400 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer p-1 rounded-full"
                    >
                      {deletingId === guest.id ? (
                        <span className="text-[1.1rem]">...</span>
                      ) : (
                        <DeleteIcon className="size-7" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default DesktopTable;

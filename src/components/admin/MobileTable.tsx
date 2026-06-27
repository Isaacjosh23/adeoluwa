import DeleteIcon from "@/ui/icons/delete";
import { Guest } from "./GuestsTable";

interface MobileTableProps {
  filtered: Guest[];
  onDelete: (guest: Guest) => void;
  deletingId: string | null;
}

function MobileTable({ filtered, onDelete, deletingId }: MobileTableProps) {
  return (
    <div className="md:hidden flex flex-col gap-[1.2rem]">
      {filtered.map((guest) => (
        <div
          key={guest.id}
          className="bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) p-6 flex flex-col gap-[1.2rem]"
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-[1.2rem] font-medium text-(--color-gold) tracking-widest">
              {guest.guest_id}
            </span>
            <button
              onClick={() => onDelete(guest)}
              disabled={deletingId === guest.id}
              aria-label={`Delete ${guest.first_name} ${guest.last_name}`}
              className="text-(--color-text-muted) hover:text-red-400 transition-colors duration-200 disabled:opacity-40 cursor-pointer"
            >
              {deletingId === guest.id ? (
                <span className="text-[1.1rem]">...</span>
              ) : (
                <DeleteIcon className="size-6" />
              )}
            </button>
          </div>

          {/* Name */}
          <p className="font-serif text-[1.8rem] font-medium text-(--color-text-primary)">
            {guest.first_name} {guest.last_name}
          </p>

          {/* Divider */}
          <div className="h-[0.5px] bg-(--color-gold-dim)" />

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-[1.2rem]">
            <div>
              <p className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium mb-[0.3rem]">
                Email
              </p>
              <p className="font-sans text-[1.3rem] text-(--color-text-primary) break-all">
                {guest.email}
              </p>
            </div>
            <div>
              <p className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium mb-[0.3rem]">
                Phone
              </p>
              <p className="font-sans text-[1.3rem] text-(--color-text-primary)">
                {guest.phone ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium mb-[0.3rem]">
                Guests
              </p>
              <p className="font-sans text-[1.3rem] text-(--color-text-primary)">
                {guest.guest_count}
              </p>
            </div>
            <div>
              <p className="text-[1rem] tracking-[0.14em] uppercase text-(--color-text-muted) font-medium mb-[0.3rem]">
                Date
              </p>
              <p className="font-sans text-[1.3rem] text-(--color-text-primary)">
                {new Date(guest.submitted_at).toLocaleDateString("en-GB", {
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
  );
}

export default MobileTable;

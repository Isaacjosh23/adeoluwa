interface StatCardProps {
  label: string;
  value: number;
  accent?: "gold" | "muted";
}

export default function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="bg-(--bg-admin-card) border-[0.5px] border-(--color-gold-dim) p-[2.8rem] rounded-[0.4rem]">
      <p className="text-[1rem] sm:text-[1.2rem] tracking-[0.18em] uppercase text-(--color-text-muted) font-medium mb-[1.2rem]">
        {label}
      </p>
      <p
        className={`font-serif text-[4.4rem] font-light leading-none ${
          accent === "gold"
            ? "text-(--color-gold)"
            : accent === "muted"
              ? "text-(--color-text-muted)"
              : "text-(--color-text-primary)"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

const SWATCHES = [
  {
    name: "Burgundy",
    hex: "#510D18",
  },
  {
    name: "Peach",
    hex: "#F38751",
  },
  {
    name: "Gold",
    hex: "#DAB38F",
  },
];

function Swatches() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {SWATCHES.map((swatch, i) => (
        <div
          key={swatch.name}
          className={`bg-(--bg-colors) flex flex-col gap-[2.4rem] p-[3.6rem] sm:p-[4.8rem] group
            ${
              i !== SWATCHES.length - 1
                ? "border-b-[0.5px] sm:border-b-0 sm:border-r-[0.5px] border-(--color-gold-dim)"
                : ""
            }`}
        >
          <div
            className="w-[70%] aspect-square rounded-[0.4rem] transition-transform duration-500 group-hover:scale-[1.02] m-auto"
            style={{ backgroundColor: swatch.hex }}
          />
          <div className="flex items-center justify-center">
            <p className="font-serif text-[2rem] sm:text-[2.2rem] font-light text-(--color-text-primary)">
              {swatch.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Swatches;

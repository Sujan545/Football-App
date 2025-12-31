import type { Area } from "../types/football";

interface Props {
  area:Area;
}

export default function AreaCard({ area }: Props) {
  return (
    <div className="border border-gray-700 rounded-md p-4 bg-black text-white">
      <img
        src={area.flag || "https://via.placeholder.com/80?text=No+Logo"}
        alt={area.name}
        className="w-20 h-20 object-contain mb-3"
      />

      <h3 className="text-sm font-semibold">{area.name}</h3>

      <p className="text-xs text-gray-400">Code: {area.code ?? "N/A"}</p>
    </div>
  );
}
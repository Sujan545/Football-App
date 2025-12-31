import type { Competition } from "../types/football";

interface Props {
  competition: Competition;
}

export default function CompetitionCard({ competition }: Props) {
  return (
    <div className="border border-gray-700 rounded-md p-4 bg-black text-white">
      <img
        src={competition.emblem || "https://via.placeholder.com/80?text=No+Logo"}
        alt={competition.name}
        className="w-20 h-20 object-contain mb-3"
      />

      <h3 className="text-sm font-semibold">{competition.name}</h3>
      <p className="text-xs text-gray-400">Area: {competition.area.name}</p>
      <p className="text-xs text-gray-400">Code: {competition.code ?? "N/A"}</p>
      <p className="text-xs text-gray-400">Type: {competition.type}</p>
      <button className="text-xs text-gray-400 border mt-2 hover:bg-gray-400 hover:text-black border-gray-300 px-2 py-0.5">
        view all
      </button>
    </div>
  );
}
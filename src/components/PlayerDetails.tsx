import type { Player } from "../types/football";


interface PlayerDetailsProps {
  player: Player | null;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  if (!player) {
    return <p className="p-6 text-gray-500">Player not found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {player.currentTeam?.crest && (
          <img
            src={player.currentTeam.crest}
            alt={player.currentTeam.name}
            className="w-16 h-16"
          />
        )}

        <div>
          <h1 className="text-2xl font-bold">{player.name}</h1>
          <p className="text-gray-600">
            {player.position} · #{player.shirtNumber ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Player Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Info label="Nationality" value={player.nationality} />
        <Info label="Date of Birth" value={player.dateOfBirth} />
      </div>

      {/* Current Team */}
      {player.currentTeam && (
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Current Team</h2>

          <div className="grid grid-cols-2 gap-4">
            <Info label="Club" value={player.currentTeam.name} />
            <Info label="Founded" value={player.currentTeam.founded} />
            <Info label="Stadium" value={player.currentTeam.venue} />
            <Info label="Colors" value={player.currentTeam.clubColors} />
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

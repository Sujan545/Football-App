import { Link } from "react-router-dom";
import type { Scorer } from "../types/football";

interface ScorersTableProps {
  scorers: Scorer[]; 
}

const ScorersTable = ({ scorers }: ScorersTableProps) => {
  if (!scorers || scorers.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Top scorers not available for this competition
      </p>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold px-4 py-3 border-gray-300 border-b">
        Top Scorers
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-center">Goals</th>
              <th className="px-4 py-2 text-center">Assists</th>
              <th className="px-4 py-2 text-center">Penalties</th>
            </tr>
          </thead>

          <tbody>
            {scorers.map((scorer, index) => (
              <tr
                key={scorer.player.id}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-medium">{index + 1}</td>

                <td className="px-4 py-2">
                  <Link
                    to={`/persons/${scorer.player.id}`}
                    className="font-medium hover:underline"
                  >
                    {scorer.player.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {scorer.player.nationality}
                  </p>
                </td>

                <td className="px-4 py-2">
                  <Link
                    to={`/teams/${scorer.team.id}`}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <img
                      src={scorer.team.crest}
                      alt={scorer.team.name}
                      className="w-6 h-6"
                    />
                    <span>{scorer.team.name}</span>
                  </Link>
                </td>

                <td className="px-4 py-2 text-center font-semibold">
                  {scorer.goals}
                </td>

                <td className="px-4 py-2 text-center">
                  {scorer.assists ?? "-"}
                </td>

                <td className="px-4 py-2 text-center">
                  {scorer.penalties ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScorersTable;

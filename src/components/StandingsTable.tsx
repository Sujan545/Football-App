import { Link } from "react-router-dom";

const StandingsTable = ({ table }: any) => {
  if (!table.length) return <p>No standings available</p>;

  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600">
            #
          </th>
          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-600">
            Team
          </th>
          <th className="px-3 py-2 text-center text-sm font-semibold text-gray-600">
            Pts
          </th>
          <th className="px-3 py-2 text-center text-sm font-semibold text-gray-600">
            P.G
          </th>
          <th className="px-3 py-2 text-center text-sm font-semibold text-gray-600">
            GD
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {table.map((row: any) => (
          <tr
            key={row.team.id}
            className="hover:bg-gray-50 transition"
          >
            <td className="px-3 py-2 text-sm text-gray-700">
              {row.position}
            </td>
            <Link
              to={`/teams/${row.team.id}`}
              className="flex items-center gap-2 hover:underline"
            >
              <td className="px-3 py-2 text-sm font-medium text-gray-800 flex gap-2 items-center">
                <img src={row.team.crest} alt="" className="h-6 w-6" /> {row.team.name}
              </td>
            </Link>

            <td className="px-3 py-2 text-center text-sm font-semibold text-gray-900">
              {row.points}
            </td>

            <td className="px-3 py-2 text-center text-sm text-gray-700">
              {row.playedGames}
            </td>

            <td className="px-3 py-2 text-center text-sm text-gray-700">
              {row.goalDifference}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default StandingsTable;

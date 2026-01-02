import { Link } from "react-router-dom";

const MatchesList = ({ matches }: any) => {
  if (!matches.length) return <p>No matches available</p>;

  return (
    <div className="space-y-3">
      {matches.map((match: any) => {
        const date = new Date(match.utcDate).toLocaleString();

        return (
          <Link
            key={match.id}
            to={`/matches/${match.id}`}
            className="block bg-white rounded-lg shadow hover:bg-gray-50 transition"
          >
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
              {/* Teams */}
              <div className="flex items-center text-sm font-medium text-gray-800">
                <Link
                  to={`/teams/${match.homeTeam.id}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="w-10 h-10"
                    />
                    {match.homeTeam.tla}
                  </div>
                </Link>


                <span className="mx-2 text-gray-400">vs</span>

                <Link
                  to={`/teams/${match.awayTeam.id}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <div className="flex items-center gap-2">

                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="w-10 h-10"
                    />
                    {match.awayTeam.tla}
                  </div>
                </Link>
              </div>
              {/* Date + Full Time */}
              <div className="flex flex-col items-center text-sm font-semibold text-gray-900">
                <p className="text-xs text-gray-500">{date}</p>
                <p>
                  F.T ({match.score.fullTime.home} :{" "}
                  {match.score.fullTime.away})
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div >
  );
};

export default MatchesList;

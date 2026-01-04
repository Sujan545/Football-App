import { Link } from "react-router-dom";
import type { Match } from "../types/football";

type MatchCardProps = {
  match: Match;
};

const MatchCard = ({ match }: MatchCardProps) => {
  if (!match) {
    return <p className="p-6">Match not found</p>;
  }


  const date = new Date(match.utcDate).toLocaleString();
  return (
    <Link
      to={`/matches/${match.id}`}
      className="block bg-white rounded-lg shadow hover:bg-gray-50 transition"
    >
      <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
        <div className="flex items-center text-sm font-medium text-gray-800">
          <Link
            to={`/teams/${match.homeTeam.id}`}
            className="flex items-center gap-2 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              className="w-6 h-6"
            />
            {match.homeTeam.tla}
          </Link>

          <span className="mx-2 text-gray-400">vs</span>

          <Link
            to={`/teams/${match.awayTeam.id}`}
            className="flex items-center gap-2 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              className="w-6 h-6"
            />
            {match.awayTeam.tla}
          </Link>
        </div>

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
};

export default MatchCard;

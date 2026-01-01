import { Link } from "react-router-dom";

const MatchDetails = ({ match }: { match: any }) => {
  const date = new Date(match.utcDate).toLocaleString();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Competition Header */}
      <div className="flex items-center gap-3">
        <img src={match.competition.emblem} className="w-8 h-8" alt="Competition Logo" />
        <h1 className="text-xl font-bold">{match.competition.name}</h1>
        <img src={match.area.flag} className="w-6 h-6" alt={match.area.name} />
      </div>

      {/* Match Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          {/* Home Team */}
          <Link
            to={`/teams/${match.homeTeam.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <img src={match.homeTeam.crest} className="w-10 h-10" alt={match.homeTeam.name} />
            <span>{match.homeTeam.name}</span>
          </Link>

          {/* Score */}
          <div className="text-center">
            <p className="text-2xl font-bold">
              {match.score.fullTime.home} : {match.score.fullTime.away}
            </p>
            <p className="text-sm text-gray-500">{match.status}</p>
          </div>

          {/* Away Team */}
          <Link
            to={`/teams/${match.awayTeam.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <span>{match.awayTeam.name}</span>
            <img src={match.awayTeam.crest} className="w-10 h-10" alt={match.awayTeam.name} />
          </Link>
        </div>

        {/* Half-Time Score */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Half-time: {match.score.halfTime.home} : {match.score.halfTime.away}
        </p>
      </div>

      {/* Extra Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <p><b>Date:</b> {date}</p>
        <p><b>Matchday:</b> {match.matchday}</p>
        <p className="flex gap-2 items-center">
          <b>Referee:</b> {match.referees?.[0]?.name || "N/A"} 
          <span className="font-semibold text-sm">({" "}{match.referees?.[0]?.nationality || "N/A"}{" "})</span>
        </p>
      </div>
    </div>
  );
};

export default MatchDetails;

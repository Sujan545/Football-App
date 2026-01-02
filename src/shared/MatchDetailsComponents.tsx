type MatchDetailsProps = {
  match: any;
};

const MatchDetailsComponents = ({ match }: MatchDetailsProps) => {
  if (!match) {
    return <p className="p-6">Match not found</p>;
  }

  const matchDate = new Date(match.utcDate).toLocaleString();

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 space-y-8">
      
      {/* Competition Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4">
        <div className="flex items-center gap-3">
          <img
            src={match.competition.emblem}
            alt={match.competition.name}
            className="w-8 h-8"
          />
          <div>
            <p className="font-semibold">{match.competition.name}</p>
            <p className="text-xs text-gray-500">
              {match.area.name} • Matchday {match.matchday}
            </p>
          </div>
        </div>

        <div className="text-right text-sm text-gray-500">
          <p>{match.venue}</p>
          <p>{matchDate}</p>
        </div>
      </div>

      {/* Score Section */}
      <div className="flex justify-between items-center text-center">
        {/* Home Team */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            src={match.homeTeam.crest}
            alt={match.homeTeam.name}
            className="w-16 h-16"
          />
          <p className="mt-2 font-semibold">{match.homeTeam.shortName}</p>
          <p className="text-xs text-gray-500">
            Formation: {match.homeTeam.formation || "N/A"}
          </p>
        </div>

        {/* Score */}
        <div>
          <p className="text-4xl font-bold">
            {match.score.fullTime.home} : {match.score.fullTime.away}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            HT {match.score.halfTime.home} - {match.score.halfTime.away}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {match.status}
          </span>
        </div>

        {/* Away Team */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            src={match.awayTeam.crest}
            alt={match.awayTeam.name}
            className="w-16 h-16"
          />
          <p className="mt-2 font-semibold">{match.awayTeam.shortName}</p>
          <p className="text-xs text-gray-500">
            Formation: {match.awayTeam.formation || "N/A"}
          </p>
        </div>
      </div>

      {/* Coaches */}
      <div className="grid md:grid-cols-2 gap-6 border-t border-gray-300  pt-6">
        <div>
          <h3 className="font-semibold mb-1">Home Coach</h3>
          <p>{match.homeTeam.coach?.name || "N/A"}</p>
          <p className="text-xs text-gray-500">
            {match.homeTeam.coach?.nationality || "N/A"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Away Coach</h3>
          <p>{match.awayTeam.coach?.name || "N/A"}</p>
          <p className="text-xs text-gray-500">
            {match.awayTeam.coach?.nationality || "N/A"}
          </p>
        </div>
      </div>

      {/* Match Facts */}
      <div className="border-t border-gray-300 pt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Attendance</span>
          <span className="font-medium">
            {match.attendance?.toLocaleString() || "N/A"}
          </span>
        </div>

        <div className="border-t pt-6 border-gray-300 space-y-3 text-sm">
  <h3 className="font-semibold">Match Officials</h3>

  {match.referees && match.referees.length > 0 ? (
    match.referees.map((ref: any) => (
      <div
        key={ref.id}
        className="flex justify-between items-center"
      >
        <div>
          <p className="font-medium">{ref.name}</p>
          <p className="text-xs text-gray-500">
            {ref.type.replaceAll("_", " ")}
          </p>
        </div>

        <span className="text-gray-600 text-sm">
          {ref.nationality || "N/A"}
        </span>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No referee information available</p>
  )}
</div>


        <div className="flex justify-between">
          <span className="text-gray-500">Stage</span>
          <span className="font-medium">{match.stage}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">{match.score.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsComponents;

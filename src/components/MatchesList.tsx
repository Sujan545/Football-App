const MatchesList = ({ matches }: any) => {
  if (!matches.length) return <p>No matches available</p>;

  return (
    <div className="space-y-3">
      {matches.map((match: any) => (
        <div
          key={match.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm hover:bg-gray-50 transition"
        >
          {/* Teams */}
          <div className="text-sm font-medium  items-center flex text-gray-800">
            <div className="flex items-center gap-2">
              <img src={match.homeTeam.crest} alt="" className="w-10 h-10" />
              {match.homeTeam.name}
            </div>
            <span className="mx-2 text-gray-400">vs</span>
            <div className="flex items-center gap-2">
              <img src={match.awayTeam.crest} alt="" className="w-10 h-10 " />
              {match.awayTeam.name}
            </div>
          </div>
          <div className="flex flex-col font-semibold text-sm text-gray-900 items-center">
            <p>H.T</p>
            <p>{match.score.halfTime.home}:{match.score.halfTime.away}</p>
          </div>
          {/* Score */}
          <div className="text-sm flex flex-col items-center font-semibold text-gray-900">
            <p>{match.utcDate}</p>
            <p>F.T:{" "}(
              {match.score.fullTime.home} : {match.score.fullTime.away})
            </p>
          </div>
        </div>
      ))}
    </div>

  );
};

export default MatchesList;



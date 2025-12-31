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
      <div className="text-sm font-medium text-gray-800">
        {match.homeTeam.name}
        <span className="mx-2 text-gray-400">vs</span>
        {match.awayTeam.name}
      </div>

      {/* Score */}
      <div className="text-sm font-semibold text-gray-900">
        {match.score.fullTime.home} : {match.score.fullTime.away}
      </div>
    </div>
  ))}
</div>

  );
};

export default MatchesList;



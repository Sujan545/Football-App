
type MatchInfoProps = {
  match: any;
};

const MatchInfo = ({ match }: MatchInfoProps) => {
  if (!match) return <p className="p-6">No match data available</p>;

  const matchDate = new Date(match.utcDate).toLocaleString();

  return (
    <div className="bg-white shadow rounded-xl p-6 max-w-3xl mx-auto space-y-6">
      {/* Competition Header */}
      <div className="flex items-center gap-3">
        <img src={match.competition.emblem} alt={match.competition.name} className="w-8 h-8" />
        <p className="font-semibold text-lg">{match.competition.name}</p>
        <img src={match.area.flag} alt={match.area.name} className="w-6 h-6" />
        <p className="text-sm text-gray-500 ml-auto">{matchDate}</p>
      </div>

      {/* Teams & Score */}
      <div className="flex justify-between items-center">
        {/* Home Team */}
        <div className="flex flex-col items-center">
          <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-16 h-16" />
          <p className="font-semibold mt-2">{match.homeTeam.name}</p>
          <p className="text-xs text-gray-500">Formation: {match.homeTeam.formation || "N/A"}</p>
          <p className="text-xs text-gray-500">Coach: {match.homeTeam.coach?.name || "N/A"}</p>
        </div>

        {/* Score */}
        <div className="text-center">
          <p className="text-4xl font-bold">
            {match.score.fullTime.home} : {match.score.fullTime.away}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Half-time: {match.score.halfTime.home} : {match.score.halfTime.away}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {match.status}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center">
          <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-16 h-16" />
          <p className="font-semibold mt-2">{match.awayTeam.name}</p>
          <p className="text-xs text-gray-500">Formation: {match.awayTeam.formation || "N/A"}</p>
          <p className="text-xs text-gray-500">Coach: {match.awayTeam.coach?.name || "N/A"}</p>
        </div>
      </div>

      {/* Goals */}
      {match.goals?.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Goals</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {match.goals.map((goal: any, index: number) => (
              <li key={index}>
                {goal.minute}' {goal.type} - {goal.scorer.name} ({goal.team.name}){" "}
                {goal.assist ? `Assist: ${goal.assist.name}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Penalties */}
      {match.penalties?.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Penalties</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {match.penalties.map((penalty: any, index: number) => (
              <li key={index}>
                {penalty.player.name} ({penalty.team.name}) -{" "}
                {penalty.scored ? "Scored" : "Missed"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Referees */}
      {match.referees?.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Referees</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {match.referees.map((ref: any) => (
              <li key={ref.id}>
                {ref.type}: {ref.name} ({ref.nationality || "N/A"})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Match Info */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p><b>Venue:</b> {match.venue}</p>
          <p><b>Matchday:</b> {match.matchday}</p>
          <p><b>Stage:</b> {match.stage}</p>
          <p><b>Duration:</b> {match.score.duration}</p>
          <p><b>Attendance:</b> {match.attendance || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;

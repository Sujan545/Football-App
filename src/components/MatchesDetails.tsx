import { Link } from "react-router-dom";
import { useState } from "react";
import MatchCard from "../shared/MatchCard";
import MatchDetailsComponents from "../shared/MatchDetailsComponents";
import MatchInfo from "../shared/MatchInfo";

const MatchDetails = ({ match, headToHead }: { match: any; headToHead: any }) => {
  const [showH2H, setShowH2H] = useState(false);
  const [openMainMatch,setOpenMainMatch]=useState(false)
  const [openMatches, setOpenMatches] = useState<{ [key: number]: boolean }>({});

    const toggleMainMatch = () => setOpenMainMatch((prev) => !prev);
  const handleMatchClick = (matchId: number) => {
    setOpenMatches((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <img src={match.competition.emblem} className="w-8 h-8" alt="Competition Logo" />
        <h1 className="text-xl font-bold">{match.competition.name}</h1>
        <img src={match.area.flag} className="w-6 h-6" alt={match.area.name} />
      </div>

      <div className="bg-white shadow rounded-lg p-6 cursor-pointer"
        key={match.id}
        onClick={toggleMainMatch} >
        <div className="flex justify-between items-center">
          <Link
            to={`/teams/${match.homeTeam.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <img src={match.homeTeam.crest} className="w-10 h-10" alt={match.homeTeam.name} />
            <span>{match.homeTeam.name}</span>
          </Link>

          <div className="text-center">
            <p className="text-2xl font-bold">
              {match.score.fullTime.home} : {match.score.fullTime.away}
            </p>
            <p className="text-sm text-gray-500">{match.status}</p>
          </div>

          <Link
            to={`/teams/${match.awayTeam.id}`}
            className="flex items-center gap-2 hover:underline"
          >
            <span>{match.awayTeam.name}</span>
            <img src={match.awayTeam.crest} className="w-10 h-10" alt={match.awayTeam.name} />
          </Link>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Half-time: {match.score.halfTime.home} : {match.score.halfTime.away}
        </p>

      </div>
      {openMainMatch && (

        <MatchInfo match={match}/>
        
      )}
     
      <div className="space-y-3">
        <button
          className="px-4 cursor-pointer hover:text-gray-900 rounded-md py-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
          onClick={() => setShowH2H((prev) => !prev)}
        >
          H2H
        </button>

        {showH2H && (
          <div className="space-y-3">
            {headToHead?.matches?.map((h2hMatch: any) => (
              <div key={h2hMatch.id}>
                {/* MatchCard clickable */}
                <div
                  className="cursor-pointer"
                  onClick={() => handleMatchClick(h2hMatch.id)}
                >
                  <MatchCard match={h2hMatch} />
                </div>

                {/* Show details below clicked MatchCard */}
                {openMatches[h2hMatch.id] && (
                  <div className="mt-3">
                    <MatchDetailsComponents match={h2hMatch} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;

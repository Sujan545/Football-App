import { useState } from "react";
import { Link } from "react-router-dom";
import type { Match } from "../types/football";

type FilterType =
  | "ALL"
  | "TODAY"
  | "UPCOMING"
  | "PAST"
  | "FINISHED"
  | "LIVE";

interface MatchesListProps {
  matches: Match[];
}

const MatchesList = ({ matches }: MatchesListProps) => {
  if (!matches?.length) return <p>No matches available</p>;

  const [openMenu, setOpenMenu] = useState(false);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filteredMatches = matches.filter((match: any) => {
    const matchDate = new Date(match.utcDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    matchDate.setHours(0, 0, 0, 0);

    if (filter === "FINISHED" && match.status !== "FINISHED") return false;
    if (filter === "LIVE" && match.status !== "LIVE") return false;
    if (filter === "TODAY" && matchDate.getTime() !== today.getTime())
      return false;
    if (filter === "UPCOMING" && matchDate < today) return false;
    if (filter === "PAST" && matchDate > today) return false;

    return true;
  });

  const MenuItem = ({
    label,
    value,
  }: {
    label: string;
    value: FilterType;
  }) => (
    <button
      onClick={() => {
        setFilter(value);
        setOpenMenu(false);
      }}
      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${filter === value ? "font-medium bg-gray-100" : ""
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Match List</p>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-white hover:bg-gray-100"
          >
            {filter === "ALL" ? "ALL" : filter}
            <span className="text-xs">▾</span>
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow z-20">
              <MenuItem label="ALL" value="ALL" />
              <MenuItem label="LIVE" value="LIVE" />
              <MenuItem label="TODAY" value="TODAY" />
              <MenuItem label="UPCOMING" value="UPCOMING" />
              <MenuItem label="PAST" value="PAST" />
              <MenuItem label="FINISHED" value="FINISHED" />
            </div>
          )}
        </div>
      </div>
      {filteredMatches.length === 0 && (
        <p className="text-gray-500 text-sm">
          No data available for selected filter
        </p>
      )}

      {filteredMatches.map((match: any) => {
        const date = new Date(match.utcDate).toLocaleString();
        return (
          <Link
            key={match.id}
            to={`/matches/${match.id}`}
            className="block bg-white rounded-lg shadow hover:bg-gray-50 transition"
          >
            <div className="flex justify-between px-4 py-3 rounded-lg">
              <div className="flex items-center gap-3 text-sm font-medium">
                <img src={match.homeTeam.crest} className="w-8 h-8" />
                {match.homeTeam.tla}
                <span className="text-gray-400">vs</span>
                {match.awayTeam.tla}
                <img src={match.awayTeam.crest} className="w-8 h-8" />
              </div>

              <div className="text-sm text-center font-semibold">
                <p className="text-xs text-gray-500">{date}</p>
                F.T ({match.score.fullTime.home} :
                {match.score.fullTime.away})
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MatchesList;

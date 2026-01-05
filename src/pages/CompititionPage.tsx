import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StandingsTable from "../components/StandingsTable";
import { api } from "../api/competitionApi";
import MatchesList from "../components/MatchesList";
import ScorersTable from "../components/Scorer";
import type {
  Match,
  StandingTableItem,
  Scorer,
} from "../types/football";

const CompetitionPage = () => {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<
    "matches" | "standings" | "topScorers"
  >("matches");

  const [matches, setMatches] = useState<Match []>([]);
  const [standings, setStandings] = useState<StandingTableItem[]>([]);
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    setLoading(true);
    api
      .get("/v4/competitions")
      .then((res) => setCompetitions(res.data.competitions))
      .catch((err) =>
        console.error("ERROR FETCHING COMPETITIONS:", err)
      )
      .finally(() => setLoading(false));
  }, []);

 
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([
      api.get(`/v4/competitions/${id}/matches?limit=10`),
      api.get(`/v4/competitions/${id}/standings`),
      api.get(`/v4/competitions/${id}/scorers`),
    ])
      .then(([matchesRes, standingsRes, scorersRes]) => {
        setMatches(matchesRes.data.matches);
        setStandings(standingsRes.data.standings[0].table);
        setScorers(scorersRes.data.scorers);
      })
      .catch((err) =>
        console.error("ERROR FETCHING COMPETITION DATA:", err)
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
     
      {competitions.map((comp) =>
        comp.code === id ? (
          <div
            key={comp.id}
            className="flex items-center gap-3 pb-4 px-2"
          >
            <img
              src={comp.emblem}
              alt={comp.name}
              className="w-10 h-10"
            />
            <h1 className="font-semibold text-lg">{comp.name}</h1>
          </div>
        ) : null
      )}

      <div className="flex gap-4 mb-4">
        {["matches", "standings", "topScorers"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as typeof activeTab)
            }
            className={`px-3 py-1 rounded transition ${
              activeTab === tab
                ? "font-bold text-gray-800 border-b-2 border-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "topScorers"
              ? "Top Scorers"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {!loading && activeTab === "matches" && (
        <MatchesList matches={matches} />
      )}

      {!loading && activeTab === "standings" && (
        <StandingsTable table={standings} />
      )}

      {!loading && activeTab === "topScorers" && (
        <ScorersTable scorers={scorers} />
      )}
    </div>
  );
};

export default CompetitionPage;

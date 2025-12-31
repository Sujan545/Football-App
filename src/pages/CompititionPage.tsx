import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StandingsTable from "../components/StandingsTable";
import { api } from "../api/competitionApi";
import MatchesList from "../components/MatchesCard";

const CompetitionPage = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState<"matches" | "standings">("matches");
  const [matches, setMatches] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([
      api.get(`/v4/competitions/${id}/matches?limit=10`),
      api.get(`/v4/competitions/${id}/standings`)
    ])
      .then(([matchesRes, standingsRes]) => {
        setMatches(matchesRes.data.matches);
        setStandings(standingsRes.data.standings[0].table);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      {/* TABS */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <button
          onClick={() => setActiveTab("matches")}
          style={{
            fontWeight: activeTab === "matches" ? "bold" : "normal"
          }}
        >
          Matches
        </button>

        <button
          onClick={() => setActiveTab("standings")}
          style={{
            fontWeight: activeTab === "standings" ? "bold" : "normal"
          }}
        >
          Standings
        </button>
      </div>

      {/* CONTENT */}
      {loading && <p>Loading...</p>}

      {!loading && activeTab === "matches" && (
        <MatchesList matches={matches} />
      )}

      {!loading && activeTab === "standings" && (
        <StandingsTable table={standings} />
      )}
    </div>
  );
};

export default CompetitionPage;

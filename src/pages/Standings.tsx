import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import MatchesCard from "../components/MatchesList";
import StandingsTable from "../components/StandingsTable";


const StandingsPage = () => {
  const { id } = useParams();

  const [matches, setMatches] = useState<any[]>([]);
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([
      api.get(`/v4/competitions/${id}/matches?status=FINISHED&limit=5`),
      api.get(`/v4/competitions/${id}/standings`)
    ])
      .then(([matchesRes, standingsRes]) => {
        setMatches(matchesRes.data.matches);
        setStandings(standingsRes.data.standings[0].table);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Recent Matches</h2>
      <MatchesCard matches={matches} />

      <h2>Standings</h2>
      <StandingsTable table={standings} />
    </div>
  );
};

export default StandingsPage;

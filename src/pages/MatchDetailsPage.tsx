import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import MatchDetails from "../components/MatchesDetails";

const MatchDetailsPage = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState<any>(null);
  const [h2h, setH2h] = useState<any>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) return;
    api
      .get(`/v4/matches/${matchId}`)
      .then(res => setMatch(res.data ?? null))
      .catch(() => setMatch(null))
      .finally(() => setLoading(false));
  }, [matchId]);

  useEffect(() => {
    api
      .get(`/v4/matches/${matchId}/head2head`)
      .then(res => setH2h(res.data ?? null))
      .catch(() => setH2h(null))
      .finally(() => setLoading(false))
  }, [matchId])


  if (loading) return <p className="p-6">Loading match...</p>;
  if (!match) return <p className="p-6">Match not found</p>;

  return <MatchDetails match={match} headToHead={h2h} />;
};

export default MatchDetailsPage;

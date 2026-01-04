import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import MatchDetails from "../components/MatchesDetails";
import type { AggregatedMatchesResponse, Match } from "../types/football";

const MatchDetailsPage = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [h2h, setH2h] = useState<AggregatedMatchesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) return;
    setLoading(true);
    api
      .get(`/v4/matches/${matchId}`)
      .then(res => setMatch(res.data ?? null))
      .catch(() => setMatch(null))
      .finally(() => setLoading(false));
  }, [matchId]);

  useEffect(() => {
    if (!matchId) return;
    api
      .get(`/v4/matches/${matchId}/head2head`)
      .then(res => setH2h(res.data ?? null))
      .catch(() => setH2h(null));
  }, [matchId]);

  if (loading) return <p className="p-6">Loading match...</p>;
  if (!match) return <p className="p-6">Match not found</p>;

  return <MatchDetails match={match} headToHead={h2h ?? { matches: [] }} />;
};

export default MatchDetailsPage;

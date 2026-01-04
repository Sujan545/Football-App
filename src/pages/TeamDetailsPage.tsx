import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import TeamsDetails from "../components/TeamDetails";
import type { Team } from "../types/football";

const TeamDetailsPage = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) return;

    setLoading(true);

    api
      .get(`/v4/teams/${teamId}`)
      .then((res) => {
        setTeam(res.data);
      })
      .catch(() => {
        setTeam(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [teamId]);

  if (loading) return <p className="p-6">Loading team...</p>;
  if (!team) return <p className="p-6">Team not found</p>;

  return <TeamsDetails team={team} />;
};

export default TeamDetailsPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import PlayerDetails from "../components/PlayerDetails";
import { type Player } from "../types/football";

const PlayerDetailsPage = () => {
  const { personId} = useParams();
  const [person ,setPerson] = useState<Player| null>(null);
  const [loading, setLoading] = useState(true);


 

  useEffect(() => {
    if (!personId) return;
    api
      .get(`/v4/persons/${personId}`)
      .then(res => setPerson(res.data ?? null))
      .catch(() => setPerson(null))
      .finally(() => setLoading(false));
  }, [personId]);

  if (loading) return <p className="p-6">Loading match...</p>;
  if (!person) return <p className="p-6">Match not found</p>;

  return <PlayerDetails player={person} />;
};

export default PlayerDetailsPage;

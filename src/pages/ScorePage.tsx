import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import ScorersTable from "../components/Scorer";

const ScorePage = () => {
  const { id } = useParams<{ id: string }>();
  const [scorers, setScorers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api
      .get(`/v4/competitions/${id}/scorers`)
      .then(res => setScorers(res.data.scorers ?? []))
      .catch(err => console.error("ERROR FETCHING SCORERS:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading scorers...</p>;
  if (!scorers.length) return <p className="p-6">No scorers found</p>;

  return <ScorersTable scorers={scorers} />;
};

export default ScorePage;

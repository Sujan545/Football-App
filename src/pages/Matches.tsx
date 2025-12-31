import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import MatchCard from "../components/MatchesCard";

const Matches = () => {
  const { id } = useParams();

  const [matches, setMatches] = useState<any[]>([]);
  const [season, setSeason] = useState("2024");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    let url = `/v4/competitions/${id}/matches?season=${season}`;

    if (status) {
      url += `&status=${status}`;
    }

    api
      .get(url)
      .then(res => {
        setMatches(res.data.matches);
      })
      .finally(() => setLoading(false));
  }, [id, season, status]);

  return (
    <div>
      <h2>Matches</h2>

      {/* FILTER UI */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="number"
          placeholder="Season"
          value={season}
          onChange={e => setSeason(e.target.value)}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="LIVE">Live</option>
          <option value="FINISHED">Finished</option>
        </select>
      </div>

      {/* UI STATES */}
      {loading && <p>Loading matches...</p>}

      {!loading && matches.length === 0 && (
        <p>No matches found.</p>
      )}

      {/* MATCH LIST */}
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default Matches;

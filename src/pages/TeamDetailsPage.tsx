import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/competitionApi";
import TeamsDetails from "../components/TeamDetails";




const TeamDetailsPage = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!teamId) return;
        api
            .get(`/v4/teams/${teamId}`)
            .then(res => setTeam(res.data ?? null))
            .catch(() => setTeam(null))
            .finally(() => setLoading(false))
    }, [teamId])
console.log(team)
    if (loading) return <p className="p-6">Loading match...</p>;
    if (!team) return <p className="p-6">Team not found</p>;

    return <TeamsDetails team={team} />;
}

export default TeamDetailsPage;
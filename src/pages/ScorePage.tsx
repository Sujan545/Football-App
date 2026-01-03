import { useEffect, useState } from "react";
import { api } from "../api/competitionApi";
import { useParams } from "react-router-dom";
import ScorersTable from "../components/Scorer";





const ScorePage = () => {
    const { id } = useParams();
    const [scorers, setScorers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        api.get(`/v4/competitions/${id}/scorers`)
            .then(res => setScorers(res.data.scorers))
            .catch(err => console.log("ERROR OCCURED WHILE FETCHING COMPETITIONS: ", err))
            .finally(() => setLoading(false));
    }, [id])
    console.log(scorers)

    if (loading) return <p className="p-6">Loading match...</p>;
    if (!scorers) return <p className="p-6">Scorers not found</p>;
    return (<ScorersTable scorers={scorers} />)
}


export default ScorePage;
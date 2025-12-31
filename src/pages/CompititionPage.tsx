import { useEffect, useState } from "react";
import { CompetitionsApi } from "../api/competitionApi";
import type { Competition } from "../types/football";
import CompetitionCard from "../components/CompetitionCard";

export default function Competitions() {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const res = await CompetitionsApi.get("");
                setCompetitions(res.data.competitions);
            } catch (err) {
                setError("Failed to load competitions");
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    //console.log(competitions);
    console.log(setCompetitions);

    if (loading) {
        return <p className="text-gray-400">Loading...</p>;
    }

    if (error) {
        return <p className="text-gray-400">{error}</p>;
    }

    return (
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {competitions.map((comp) => (
                    <CompetitionCard key={comp.id} competition={comp} />
                ))}
            </div>
     
    );
}
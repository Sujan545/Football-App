import { type Area } from "../types/football"

import { useEffect, useState } from "react"
import AreaCard from "../components/AreaCard";
import { api } from "../api/competitionApi";





export default function Area() {
    const [areas, setAreas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const FetchArea = async () => {
            try {
                const res = await api.get("");
                setAreas(res.data.areas);
            } catch (err) {
                setError("Failed to lead are");
            } finally {
                setLoading(false);
            }
        };
        FetchArea();
    }, [])
    console.log(setAreas)
    if (loading) {
        return <p className="text-gray-400">Loading...</p>;
    }

    if (error) {
        return <p className="text-gray-400">{error}</p>;
    }

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {areas.map((item) => (
               <AreaCard key={item.id} area={item}/>
            ))}
        </div>

    );
}
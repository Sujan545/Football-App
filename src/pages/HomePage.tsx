import { useEffect, useState } from "react";
import AreaSelect from "../components/AreaSelect";
import CompetitionList from "../components/CompetitionsList";
import { api } from "../api/competitionApi";

const Home = () => {
    const [areas, setAreas] = useState<any[]>([]);
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [areaId, setAreaId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const MAIN_AREA_IDS = [
        2077, // Europe
        2267, // World
    ];
    // Fetch areas (ONCE)
    useEffect(() => {
        api.get("/v4/areas").then(res => {
            const filteredAreas = res.data.areas.filter((area: any) =>
                MAIN_AREA_IDS.includes(area.id)
            );
            setAreas(filteredAreas);
        });
    }, []);

    // Fetch competitions when area changes
    useEffect(() => {
        if (!areaId) return;
        setLoading(true);
        api
            .get(`/v4/competitions?areas=${areaId}`)
            .then(res => setCompetitions(res.data.competitions))
            .finally(() => setLoading(false));
    }, [areaId]);

    return (
        <div>
            <h1>Football App</h1>

            <AreaSelect areas={areas} onSelect={setAreaId} />

            {loading && <p>Loading competitions...</p>}

            <CompetitionList competitions={competitions} />
        </div>
    );
};

export default Home;

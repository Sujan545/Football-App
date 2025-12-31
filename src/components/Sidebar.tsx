import { useEffect, useState } from "react";
import { api } from "../api/competitionApi";
import { Link } from "react-router-dom";

const MAIN_AREA_IDS = [
    { id: 2077, name: "Europe" },
    { id: 2267, name: "World" },
];

const Sidebar = () => {
    const [activeArea, setActiveArea] = useState<number | null>(null);
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch competitions for selected area
    useEffect(() => {
        if (!activeArea) return;

        setLoading(true);
        api
            .get(`/v4/competitions?areas=${activeArea}`)
            .then(res => setCompetitions(res.data.competitions))
            .finally(() => setLoading(false));
    }, [activeArea]);

    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-4 h-screen overflow-y-auto">
            <Link to="/" >
                <h2 className="text-xl font-bold mb-6">Football Dashboard</h2>
            </Link>

            {/* Top-level areas */}
            <ul className="space-y-2">
                {MAIN_AREA_IDS.map(area => (
                    <li key={area.id}>
                        {/* Area button */}
                        <button
                            onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                            className={`w-full text-left px-3 py-2 rounded flex justify-between items-center hover:bg-gray-100 transition ${activeArea === area.id ? "bg-blue-100 font-medium" : ""
                                }`}
                        >
                            {area.name}
                            <span className="text-gray-500">{activeArea === area.id ? "▲" : "▼"}</span>
                        </button>

                        {/* Nested competitions */}
                        {activeArea === area.id && (
                            <ul className="mt-1 ml-4 space-y-1">
                                {loading && <li className="px-2 py-1 text-gray-500">Loading...</li>}
                                {!loading && competitions.length === 0 && (
                                    <li className="px-2 py-1 text-gray-500">No competitions</li>
                                )}
                                {!loading &&
                                    competitions.map(comp => (
                                        <li key={comp.id}>
                                            <Link
                                                to={`/competition/${comp.code}`}
                                                className="block px-2 py-1 rounded hover:bg-gray-50 text-sm"
                                            >
                                                {comp.name}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;

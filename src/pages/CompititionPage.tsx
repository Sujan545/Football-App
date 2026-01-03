import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StandingsTable from "../components/StandingsTable";
import { api } from "../api/competitionApi";
import MatchesList from "../components/MatchesList";


const CompetitionPage = () => {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState<"matches" | "standings">("matches");
    const [matches, setMatches] = useState<any[]>([]);
    const [standings, setStandings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [competitions, setCompetitions] = useState<any[]>([]);



    useEffect(() => {
        setLoading(true);
        api
            .get(`/v4/competitions`)
            .then(res => setCompetitions(res.data.competitions))
            .catch(err => console.log("ERROR OCCURED WHILE FETCHING COMPETITIONS: ", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        Promise.all([
            api.get(`/v4/competitions/${id}/matches?limit=10`),
            api.get(`/v4/competitions/${id}/standings`)
        ])
            .then(([matchesRes, standingsRes]) => {
                setMatches(matchesRes.data.matches);
                setStandings(standingsRes.data.standings[0].table);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div>
            {competitions.map((comp) => (
                <div className="flex gap-2 ">
                    {comp.code == id && (
                        <div className="flex items-center gap-3 pb-4 px-2">
                            <img src={comp.emblem} alt={comp.name} className="w-10 h-10 " />
                            <h1 className="font-semibold text-lg">{comp.name}</h1>
                        </div>
                    )}
                </div>
            ))
            }
            {/* TABS */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setActiveTab("matches")}
                    className={`px-3 py-1 rounded transition
      ${activeTab === "matches"
                            ? "font-bold text-gray-800 border-b-2 border-gray-800"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Matches
                </button>

                <button
                    onClick={() => setActiveTab("standings")}
                    className={`px-3 py-1 rounded transition
      ${activeTab === "standings"
                            ? "font-bold text-gray-800 border-b-2 border-gray-800"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Standings
                </button>
            </div>


            {/* CONTENT */}
            {loading && <p>Loading...</p>}

            {!loading && activeTab === "matches" && (
                <MatchesList matches={matches} />
            )}

            {!loading && activeTab === "standings" && (
                <StandingsTable table={standings} comp={competitions} />
            )}
        </div>
    );
};

export default CompetitionPage;

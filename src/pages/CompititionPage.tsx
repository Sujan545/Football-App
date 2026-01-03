import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StandingsTable from "../components/StandingsTable";
import { api } from "../api/competitionApi";
import MatchesList from "../components/MatchesList";
import ScorersTable from "../components/Scorer";


const CompetitionPage = () => {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState<"matches" | "standings" | "topScorers">("matches");
    const [matches, setMatches] = useState<any[]>([]);
    const [standings, setStandings] = useState<any[]>([]);
    const [scorers, setScorers] = useState<any[]>([]);
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
            api.get(`/v4/competitions/${id}/standings`),
            api.get(`/v4/competitions/${id}/scorers`)
        ])
            .then(([matchesRes, standingsRes, scorersRes]) => {
                setMatches(matchesRes.data.matches);
                setScorers(scorersRes.data)
                setStandings(standingsRes.data.standings[0].table);
            })
            .finally(() => setLoading(false));
    }, [id]);
    console.log(scorers)
    console.log(id)
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
                <button
                    onClick={() => setActiveTab("topScorers")}
                    className={`px-3 py-1 rounded transition
      ${activeTab === "topScorers"
                            ? "font-bold text-gray-800 border-b-2 border-gray-800"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Top Scorers
                </button>
            </div>


            {/* CONTENT */}
            {loading && <p>Loading...</p>}

            {!loading && activeTab === "matches" && (
                <MatchesList matches={matches} />
            )}

            {!loading && activeTab === "standings" && (
                <StandingsTable table={standings} />
            )}
            {!loading && activeTab === "topScorers" && (
                <ScorersTable scorers={scorers} />
            )}
        </div>
    );
};

export default CompetitionPage;

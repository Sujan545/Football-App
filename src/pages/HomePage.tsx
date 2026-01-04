import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/competitionApi";
import type { Competition } from "../types/football";

const AREAS = [
  { id: 2077, name: "Europe", emoji: "🌍", description: "UEFA leagues & tournaments" },
  { id: 2267, name: "World", emoji: "🌎", description: "International competitions" },
];

const HomePage = () => {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const [competitions, setCompetitions] = useState<Competition []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeArea) return;

    setLoading(true);
    setCompetitions([]);

    api
      .get(`/v4/competitions?areas=${activeArea}`)
      .then(res => setCompetitions(res.data.competitions || []))
      .catch(err => {
        console.error("Error fetching competitions:", err);
        setCompetitions([]);
      })
      .finally(() => setLoading(false));
  }, [activeArea]);

  return (
    <div className="space-y-10 p-6">
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow">
        <h1 className="text-3xl font-bold mb-2">⚽ Football Dashboard</h1>
        <p className="text-white/80 max-w-xl">
          Explore leagues, matches, teams, and players from top competitions around the world.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Browse by Area</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {AREAS.map(area => (
            <button
              key={area.id}
              onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
              className={`group bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex items-center gap-4 ${
                activeArea === area.id ? "border-2 border-indigo-600" : ""
              }`}
            >
              <span className="text-4xl">{area.emoji}</span>
              <div>
                <h3 className="font-bold text-lg group-hover:text-indigo-600">{area.name}</h3>
                <p className="text-sm text-gray-500">{area.description}</p>
              </div>
            </button>
          ))}
        </div>

        {activeArea && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Competitions</h3>
            {loading && <p className="text-gray-500">Loading competitions...</p>}
            {!loading && competitions.length === 0 && (
              <p className="text-gray-500">No competitions available</p>
            )}
            {!loading && competitions.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {competitions.map(comp => (
                  <Link
                    key={comp.id}
                    to={`/competition/${comp.id}`}
                    className="bg-white rounded-xl p-4 shadow hover:shadow-lg flex items-center gap-3 transition"
                  >
                    {comp.emblem && (
                      <img src={comp.emblem} alt={comp.name} className="w-10 h-10" />
                    )}
                    <span className="font-medium">{comp.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Popular Competitions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { id: 2021, name: "Premier League", logo: "https://crests.football-data.org/PL.png" },
            { id: 2002, name: "Bundesliga", logo: "https://crests.football-data.org/BL1.png" },
            { id: 2014, name: "La Liga", logo: "https://crests.football-data.org/PD.png" },
          ].map(comp => (
            <Link
              key={comp.id}
              to={`/competition/${comp.id}`}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex items-center gap-4"
            >
              <img src={comp.logo} alt={comp.name} className="w-10 h-10" />
              <span className="font-medium">{comp.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

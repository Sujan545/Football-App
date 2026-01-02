import { Link } from "react-router-dom";


const HomePage = () => {

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow">
        <h1 className="text-3xl font-bold mb-2">
          ⚽ Football Dashboard
        </h1>
        <p className="text-white/80 max-w-xl">
          Explore leagues, matches, teams, and players from top competitions around the world.
        </p>
      </section>

      {/* Area Selection */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Browse by Area</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Europe */}
          <Link
             to=".competitions/2067"
            className="group bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🌍</span>
              <div>
                <h3 className="font-bold text-lg group-hover:text-indigo-600">
                  Europe
                </h3>
                <p className="text-sm text-gray-500">
                  UEFA leagues & tournaments
                </p>
              </div>
            </div>
          </Link>

          {/* World */}
          <Link
            to="/competition/2267"
            className="group bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🌎</span>
              <div>
                <h3 className="font-bold text-lg group-hover:text-indigo-600">
                  World
                </h3>
                <p className="text-sm text-gray-500">
                  International competitions
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Popular Competitions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Popular Competitions
        </h2>

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

      {/* Info / CTA */}
      <section className="bg-white rounded-xl p-6 shadow flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-semibold text-lg">
            Live football data powered by Football-Data API
          </h3>
          <p className="text-sm text-gray-500">
            Matches • Standings • Teams • Players
          </p>
        </div>

        <Link
          to="/competition/2021"
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Explore Now →
        </Link>
      </section>
    </div>
  );
};

export default HomePage;

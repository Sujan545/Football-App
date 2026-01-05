import { Link } from "react-router-dom";
import type { Team } from "../types/football";



const TeamsDetails = ({ team }: { team: Team}) => {
    if (!team) return <p className="p-6">Team not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4">
                <img src={team.crest} alt={team.name} className="w-16 h-16" />
                <div>
                    <h1 className="text-2xl font-bold">{team.name}</h1>
                    <p className="text-gray-500">{team.shortName} ({team.tla})</p>
                    <p className="flex items-center gap-2">
                        <img src={team.area?.flag} alt={team.area?.name} className="w-5 h-5" />
                        <span>{team.area?.name}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 space-y-2">
                {team.venue && <p><b>Venue:</b> {team.venue}</p>}
                {team.address && <p><b>Address:</b> {team.address}</p>}
                {team.clubColors && <p><b>Colors:</b> {team.clubColors}</p>}
                {team.founded && <p><b>Founded:</b> {team.founded}</p>}

                {team.coach && (
                    <p>
                        <b>Coach:</b> {team.coach.name} ({team.coach.nationality}){" "}
                        {team.coach.contract && `(Contract: ${team.coach.contract.start} - ${team.coach.contract.until})`}
                    </p>
                )}

                {team.website && (
                    <p>
                        <b>Website:</b>{" "}
                        <a href={team.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {team.website}
                        </a>
                    </p>
                )}
            </div>

            {team.squad && team.squad.length > 0 && (
                <div className="bg-gray-50 shadow rounded-lg p-4">
                    <h2 className="text-xl font-bold mb-4">Squad</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {team.squad.map(player => (
                            <div key={player.id} className="bg-white rounded p-3 shadow-sm flex justify-between items-center">
                                <div>
                                    <Link to={`/persons/${player.id}`}
                                    className="hover:underline">
                                        <p className="font-semibold">{player.name}</p>
                                    </Link>
                                    <p className="text-sm text-gray-500">{player.position}</p>
                                </div>
                                <div className="text-sm text-gray-500 text-right">
                                    <p>{player.nationality}</p>
                                    <p>{new Date(player.dateOfBirth).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamsDetails;

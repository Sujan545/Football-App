import type { Player } from "../types/football";

interface PlayerDetailsProps {
  player: Player | null;
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // If birthday hasn't occurred yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  if (!player) {
    return <p className="p-6 text-gray-500">Player not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {player.currentTeam?.crest && (
          <img
            src={player.currentTeam.crest}
            alt={player.currentTeam.name}
            className="w-20 h-20"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="text-gray-600">
            {player.position} · #{player.shirtNumber ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Personal Info */}
      <Section title="Player Information">
        <Info label="First Name" value={player.firstName} />
        <Info label="Last Name" value={player.lastName} />
        <Info label="Nationality" value={player.nationality} />
        <Info label="Date of Birth" value={player.dateOfBirth} />
        <Info label="Section" value={player.section} />
        <Info label="Position" value={player.position} />
        <Info label="Last Updated" value={formatDate(player.lastUpdated)} />
        <Info label="Age" value={`${calculateAge(player.dateOfBirth)} years`}/>
      </Section>

      {/* Team Info */}
      {player.currentTeam && (
        <Section title="Current Team">
          <Info label="Club Name" value={player.currentTeam.name} />
          <Info label="Short Name" value={player.currentTeam.shortName} />
          <Info label="TLA" value={player.currentTeam.tla} />
          <Info label="Founded" value={player.currentTeam.founded} />
          <Info label="Stadium" value={player.currentTeam.venue} />
          <Info label="Club Colors" value={player.currentTeam.clubColors} />
          <Info label="Address" value={player.currentTeam.address} />

          <div className="col-span-2">
            <a
              href={player.currentTeam.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Official Website
            </a>
          </div>
        </Section>
      )}
      {player.currentTeam?.area && (
        <Section title="Current Team">
          <Info label="Country Name" value={player.currentTeam.area.name} />
          <Info label="Code" value={player.currentTeam.area.code} />
         <img src={player.currentTeam.area.flag} alt={player.currentTeam.area.flag} className="w-8 h-8" /> 
        </Section>
      )}

      {/* Competitions */}
      {player.currentTeam?.runningCompetitions?.length > 0 && (
        <Section title="Running Competitions">
          <div className="grid grid-cols-2 gap-4">
            {player.currentTeam.runningCompetitions.map(comp => (
              <div
                key={comp.id}
                className="flex items-center gap-3 bg-gray-50 shadow rounded-lg p-4"
              >
                <img src={comp.emblem} alt={comp.name} className="w-8 h-8" />
                <div>
                  <p className="font-medium">{comp.name}</p>
                  <p className="text-sm text-gray-500">{comp.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Contract */}
      {player.currentTeam?.contract && (
        <Section title="Contract">
          <Info label="Start" value={player.currentTeam.contract.start} />
          <Info label="Until" value={player.currentTeam.contract.until} />
        </Section>
      )}
    </div>
  );
}


function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

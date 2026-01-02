

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string | null;
  area: Area;
}

export interface CompetitionsResponse {
  competitions: Competition[];
}

// types/player.ts
export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  section: string;
  position: string;
  shirtNumber?: number;
  lastUpdated: string;
  currentTeam?: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    area: {
      name: string;
      code: string;
      flag: string;
    };
    runningCompetitions: {
      id: number;
      name: string;
      type: string;
      emblem: string;
    }[];
    contract?: {
      start: string;
      until: string;
    };
  };
}

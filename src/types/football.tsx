

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

export interface Player {
  id: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
  shirtNumber?: number;
  currentTeam?: {
    id: number;
    name: string;
    crest: string;
    venue: string;
    founded: number;
    clubColors: string;
  };
}
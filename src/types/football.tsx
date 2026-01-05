
export interface Area {
  id: number;
  name: string;
  code: string;
  flag?: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem?: string;
  area: Area;
}

export interface Coach {
  name: string;
  nationality: string;
  contract?: {
    start: string;
    until: string;
  };
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  area?: {
    name: string;
    flag: string;
  };
  venue?: string;
  address?: string;
  clubColors?: string;
  founded?: number;
  website?: string;
  coach?: Coach;
  squad?: Player[];
  formation?: string
}


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
    runningCompetitions?: {
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

export type MatchStatus =
  | "SCHEDULED"
  | "LIVE"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED";
  
export interface Scorer {
  player: Player;
  team: Team;
  playedMatches: number;
  goals: number;
  assists: number;
  penalties: number;
}

export interface ScorersResponse {
  scorers: Scorer[];
}

export interface StandingTableItem {
  position: number;
  team: Team;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage: "REGULAR_SEASON" | "PLAY_OFFS";
  type: "TOTAL" | "HOME" | "AWAY";
  group: string | null;
  table: StandingTableItem[];
}

export interface StandingsResponse {
  standings: Standing[];
}

export interface StandingsTableProps {
  table: StandingTableItem[];
}


export interface Season {
  id: number;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  currentMatchday: number;
  winner: null | string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface ScoreTime {
  home: number | null;
  away: number | null;
}

export interface Score {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  duration: string;
  fullTime: ScoreTime;
  halfTime: ScoreTime;
}

export interface Odds {
  msg: string;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

export interface Match {
  id: number;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED";
  minute?: number;
  injuryTime?: number;
  attendance?: number;
  venue: string | null;
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;

  area: Area;
  competition: Competition;
  season: Season;

  homeTeam: Team;
  awayTeam: Team;

  score: Score;

  goals?: any[];
  penalties?: any[];
  bookings?: any[];
  substitutions?: any[];

  odds?: Odds;
  referees?: Referee[];
}

export interface TeamAggregate {
  id: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface Filters {
  limit: number;
  permission: string;
}

export interface ResultSet {
  competitions: string;
  count: number;
  first: string;
  last: string;
}

export interface Aggregates {
  awayTeam: TeamAggregate;
  homeTeam: TeamAggregate;
  numberOfMatches: number;
  totalGoals: number;
}

export interface AggregatedMatchesResponse {
  aggregates?: Aggregates;
  filters?: Filters;
  matches?: Match[];
  resultSet?: ResultSet;
}

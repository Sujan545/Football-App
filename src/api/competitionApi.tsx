import axios from "axios";

const COMPETITIONS_URL = "https://api.football-data.org/v4/competitions";
const AREA_URL = "https://api.football-data.org/v4/areas/";
const API_TOKEN = "b86c01a40b6941f7a88b1f01fa258912";

// Using proxy to avoid CORS
export const CompetitionsApi = axios.create({
  baseURL: "https://corsproxy.io/?" + COMPETITIONS_URL,
  headers: {
    "X-Auth-Token": API_TOKEN
  }
});
export const AreaApi = axios.create({
  baseURL: "https://corsproxy.io/?" + AREA_URL,
  headers: {
    "X-Auth-Token": API_TOKEN
  }
});


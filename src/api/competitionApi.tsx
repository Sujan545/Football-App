import axios from "axios";

const COMPETITIONS_URL = "https://api.football-data.org";

const API_TOKEN = "b86c01a40b6941f7a88b1f01fa258912";

// Using proxy to avoid CORS
export const api = axios.create({
  baseURL: "https://corsproxy.io/?" + COMPETITIONS_URL,
  headers: {
    "X-Auth-Token": API_TOKEN
  }
});



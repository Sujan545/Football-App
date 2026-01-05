import axios from "axios";




export const api = axios.create({
  baseURL: `https://corsproxy.io/${import.meta.env.VITE_URL}`,
  headers: {
    "X-Auth-Token": import.meta.env.VITE_API_TOKEN
  }
});



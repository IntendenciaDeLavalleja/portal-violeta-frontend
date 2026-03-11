import axios from "axios";

// PUBLIC_API_URL se bake en el bundle en build time (build arg en Coolify/Docker).
// Ejemplo: https://mapi.portalvioleta.lavalleja.uy/api
const API_BASE_URL =
  import.meta.env.PUBLIC_API_URL ||
  "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

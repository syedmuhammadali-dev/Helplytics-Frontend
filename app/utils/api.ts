import axios from "axios";
import { getCookie } from "cookies-next";

const isDevelopment = process.env.NODE_ENV === "development";

export const BASE_URL = isDevelopment
  ? process.env.NEXT_PUBLIC_BACKEND_URL_DEVELOPMENT || "http://localhost:3080"
  : process.env.NEXT_PUBLIC_BACKEND_URL || "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


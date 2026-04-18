import axios from "axios";
import { getCookie } from "cookies-next";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

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


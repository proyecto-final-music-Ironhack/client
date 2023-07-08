import axios from "axios";
import { TOKEN_NAME } from "../context/auth.context";
const URL = import.meta.env.VITE_API_URL_BACK;

const apiInstace = axios.create({
  baseURL: URL || "http://localhost:5005",
});

apiInstace.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  return config;
});

export default apiInstace;

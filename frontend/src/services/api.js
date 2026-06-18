import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:8000",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const res = await axios.post("http://localhost:8000/auth/refresh", {
          refresh_token: refreshToken,
        });
        localStorage.setItem("access_token", res.data.access_token);
        error.config.headers["Authorization"] =
          `Bearer ${res.data.access_token}`;

        return api(error.config);
      } catch {
        localStorage.removeItem("access_token");

        localStorage.removeItem("refresh_token");

        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default api;

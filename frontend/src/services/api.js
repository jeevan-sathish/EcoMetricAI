import axios from "axios";
// import.meta.env.VITE_API_URL ||
const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const res = await api.post("/auth/refresh", {
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

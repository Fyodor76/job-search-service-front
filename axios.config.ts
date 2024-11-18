import { baseUrl } from "@/const/baseUrl";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    originalRequest._retryCount = originalRequest._retryCount || 0;

    const maxRetries = 1;

    if (
      error.response?.status === 401 && 
      originalRequest._retryCount < maxRetries
    ) {
      originalRequest._retryCount += 1; 
      console.log('test axios')
      console.log(originalRequest._retryCount, 'retry axios amoun')
      try {
        const refreshResponse = await apiClient.post(
          "/auth/refresh-token",
          null,
          {
            withCredentials: true,
          },
        );

        if (refreshResponse.status === 200) {
          return apiClient(originalRequest); 
        }
      } catch (refreshError) {
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        if (window.location.pathname === "/") {
          window.location.reload();
        } else {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;

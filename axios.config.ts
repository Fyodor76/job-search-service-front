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

    // Проверяем, возникла ли ошибка на запросе рефреша токена
    if (originalRequest.url === "/auth/refresh-token") {
      console.log("401 ошибка на рефреш токене");
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }

      return Promise.reject(error);
    }

    // Если ошибка 401 и запрос не на рефреш токен
    if (
      error.response?.status === 401 &&
      originalRequest._retryCount < maxRetries
    ) {
      originalRequest._retryCount += 1;

      try {
        console.log("Попытка рефреша токена...");
        const refreshResponse = await apiClient.post(
          "/auth/refresh-token",
          null,
          {
            withCredentials: true,
          },
        );

        if (refreshResponse.status !== 401) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;

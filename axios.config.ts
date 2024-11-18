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

    // Добавляем свойство _retryCount для контроля количества попыток
    originalRequest._retryCount = originalRequest._retryCount || 0;

    // Ограничение на количество повторных запросов
    const maxRetries = 1;

    if (
      error.response?.status === 401 && 
      originalRequest._retryCount < maxRetries
    ) {
      originalRequest._retryCount += 1; // Увеличиваем счетчик

      try {
        const refreshResponse = await apiClient.post(
          "/auth/refresh-token",
          null,
          {
            withCredentials: true,
          },
        );

        if (refreshResponse.status === 200) {
          // Устанавливаем новые токены, если требуется
          return apiClient(originalRequest); // Повторяем запрос
        }
      } catch (refreshError) {
        // Удаляем токены, если обновление не удалось
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        // Перенаправляем пользователя на главную страницу
        if (window.location.pathname === "/") {
          window.location.reload();
        } else {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    // Если превысили количество попыток, возвращаем ошибку
    return Promise.reject(error);
  },
);

export default apiClient;

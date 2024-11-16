import { AxiosError } from "axios";
import apiClient from "../../axios.config";

export const makeRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data: Record<string, any> | null = null,
  config: Record<string, any> = {},
): Promise<T | null> => {
  try {
    const response = await apiClient.request<T>({
      url,
      method,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      // Игнорируем 401
      console.warn("401 Unauthorized ignored");
      return null; // Возвращаем null, чтобы не пробрасывать исключение
    }

    console.error("Request error:", error);
    throw error; // Пробрасываем остальные ошибки
  }
};

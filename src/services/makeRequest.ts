import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../../axios.config";

export const makeRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data: Record<string, any> | null = null,
  config: Record<string, any> = {},
): Promise<AxiosResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.request<T>({
      url,
      method,
      data,
      ...config,
    });

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.warn("401 Unauthorized ignored");
    }
    throw error; // Пробрасываем остальные ошибки
  }
};

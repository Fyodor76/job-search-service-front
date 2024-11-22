import { AxiosResponse } from "axios";
import { makeRequest } from "./makeRequest";

// Интерфейсы для возвращаемых данных
interface LogoutResponse {
  message: string; // Сообщение при успешном logout
}

interface RefreshTokenResponse {
  accessToken: string; // Новый Access Token
  refreshToken: string; // Новый Refresh Token
}

export const AuthServices = {
  logout: async (): Promise<AxiosResponse<LogoutResponse>> => {
    return await makeRequest<LogoutResponse>("/auth/logout", "POST");
  },

  refreshTokenServer: async (
    refreshTokenString: string,
    userAgent: string,
  ): Promise<AxiosResponse<RefreshTokenResponse>> => {
    return await makeRequest<RefreshTokenResponse>(
      `/auth/refresh-token`,
      "POST",
      null,
      {
        headers: {
          Cookie: refreshTokenString,
          "User-Agent": userAgent || "unknown",
        },
      },
    );
  },

  refreshTokenClient: async (): Promise<AxiosResponse<void>> => {
    return await makeRequest<void>(`/auth/refresh-token`, "POST");
  },
};

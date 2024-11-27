import { AxiosResponse } from "axios";
import { makeRequest } from "./makeRequest";

interface LogoutResponse {
  message: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface VerifyOtpType {
  email?: string;
  otp: string;
  chatId: string;
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

  sendEmail: async (email: string): Promise<AxiosResponse<void>> => {
    return await makeRequest<void>(`/auth/send-otp`, "POST", { email });
  },

  refreshTokenClient: async (): Promise<AxiosResponse<void>> => {
    return await makeRequest<void>(`/auth/refresh-token`, "POST");
  },

  verifyOtp: async ({email = '', chatId = '', otp}: VerifyOtpType): Promise<AxiosResponse<void>> => {
    return await makeRequest<void>(`/auth/verify-otp`, "POST", { email, otp, chatId });
  },
};

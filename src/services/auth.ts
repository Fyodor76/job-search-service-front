import { makeRequest } from "./makeRequest";

export const AuthServices = {
  logout: async () => {
    try {
      const data = await makeRequest<{ message: string }>(
        "/auth/logout",
        "POST",
      );

      console.log("Logout successful:", data);

      window.location.reload();

      return data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};

export const baseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : process.env.NEXT_PUBLIC_API_URL;

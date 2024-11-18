import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { baseUrl } from "./const/baseUrl";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const response = NextResponse.next();

  const isDevelopment = process.env.NODE_ENV === "development";
  const refreshTokenString = `refreshToken=${refreshToken};`;

  const userAgent = req.headers.get("user-agent");

  // 1. Проверка accessToken на валидность
  if (accessToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(accessToken, secret); // Проверка токена
      console.log("Access token is valid");
      return response; // Если токен валиден, продолжаем выполнение
    } catch (error) {
      console.log("tokenError:", error); // Логируем ошибку
    }
  }

  // 2. Если accessToken невалиден, пробуем обновить с помощью refreshToken
  if (refreshToken) {
    try {
      const refreshResponse = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: refreshTokenString,
          "User-Agent": userAgent || "unknown",
        },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const tokens = await refreshResponse.json();

        // Сохраняем новые токены в cookies
        response.cookies.set("accessToken", tokens.accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          domain: !isDevelopment ? ".api.job-search-service.ru" : "localhost",
          maxAge: 15 * 60, // 15 минут для accessToken
        });

        response.cookies.set("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          domain: !isDevelopment ? ".api.job-search-service.ru" : "localhost",
          maxAge: 60 * 24 * 60 * 60, // 60 дней для refreshToken
        });

        // Добавляем новые токены в заголовки
        response.headers.set("x-access-token", tokens.accessToken);
        response.headers.set("x-refresh-token", tokens.refreshToken);
        return response; // Возвращаем успешный ответ
      } else {
        console.error("Failed to refresh token");
        // Если запрос на refresh-token не удался, очищаем cookies
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response; // Если токен валиден, продолжаем выполнение
      }
    } catch (error) {
      console.error("Error during refresh token request:", error);
      // Очистка cookies при ошибке запроса
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response; // Если токен валиден, продолжаем выполнение
    }
  }

  // 3. Если нет refreshToken или оба токена невалидны, очищаем cookies и перенаправляем на главную страницу
  if (!refreshToken) {
    console.error("No refresh token available");
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
  }

  return response;
}

export const config = {
  matcher: ["/"], // Применяется только к главной странице
};

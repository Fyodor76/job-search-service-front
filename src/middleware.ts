import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { AuthServices } from "./services/auth";

async function setTokensInResponse(
  response: NextResponse,
  tokens: any,
  isDevelopment: boolean,
) {
  if (!tokens.accessToken && !tokens.refreshToken) {
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "lax",
      domain: !isDevelopment ? process.env.COOKIE_DOMAIN : "localhost",
      maxAge: -1,
      expires: new Date(0),
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "lax",
      domain: !isDevelopment ? process.env.COOKIE_DOMAIN : "localhost",
      maxAge: -1,
      expires: new Date(0),
    });
  } else {
    response.cookies.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "lax",
      domain: !isDevelopment ? process.env.COOKIE_DOMAIN : "localhost",
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: "lax",
      domain: !isDevelopment ? process.env.COOKIE_DOMAIN : "localhost",
      maxAge: 60 * 24 * 60 * 60,
    });
  }

  if (tokens.accessToken) {
    response.headers.set("x-access-token", tokens.accessToken);
  }
  if (tokens.refreshToken) {
    response.headers.set("x-refresh-token", tokens.refreshToken);
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const response = NextResponse.next();
  const isDevelopment = process.env.NODE_ENV === "development";
  const refreshTokenString = `refreshToken=${refreshToken};`;

  const userAgent = req.headers.get("user-agent") || "";

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
      const refreshResponse = await AuthServices.refreshTokenServer(
        refreshTokenString,
        userAgent,
      );

      if (refreshResponse.status === 200) {
        const tokens = refreshResponse.data;

        // Используем нашу функцию для установки новых токенов
        await setTokensInResponse(response, tokens, isDevelopment);

        return response; // Возвращаем успешный ответ с обновленными токенами
      } else {
        console.error("Failed to refresh token");
        // Если запрос на refresh-token не удался, очищаем cookies
        await setTokensInResponse(
          response,
          { accessToken: "", refreshToken: "" },
          isDevelopment,
        );
        return response; // Завершаем выполнение
      }
    } catch (error) {
      console.error("Error during refresh token request:", error);
      // Очистка cookies при ошибке запроса
      await setTokensInResponse(
        response,
        { accessToken: "", refreshToken: "" },
        isDevelopment,
      );
      return response; // Завершаем выполнение
    }
  }

  // 3. Если нет refreshToken или оба токена невалидны, очищаем cookies и перенаправляем на главную страницу
  if (!refreshToken) {
    console.error("No refresh token available");
    await setTokensInResponse(
      response,
      { accessToken: "", refreshToken: "" },
      isDevelopment,
    );
  }

  return response;
}

export const config = {
  matcher: ["/"], // Применяется только к главной странице
};

import { cookies, headers } from "next/headers"; // Импорт заголовков
import { jwtVerify } from "jose";

export async function checkAuth() {
  // Получаем заголовки и куки
  const headersList = headers();
  const accessTokenHeader = headersList.get("x-access-token");
  const refreshTokenHeader = headersList.get("x-refresh-token");

  const cookiesHeader = cookies();
  const accessToken =
    accessTokenHeader || cookiesHeader.get("accessToken")?.value;
  const refreshToken =
    refreshTokenHeader || cookiesHeader.get("refreshToken")?.value;

  let isAuth = false;
  let authData = null;

  try {
    if (accessToken) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(accessToken, secret);
      isAuth = true;
      authData = payload;
    }
  } catch (error) {}
  return { isAuth, authData };
}

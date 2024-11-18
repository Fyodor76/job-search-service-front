import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { baseUrl } from "./const/baseUrl";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const response = NextResponse.next();

  const isDevelopment = process.env.NODE_ENV === "development";

  const refreshTokenString = `refreshToken=${refreshToken};`;

  console.log(req.cookies.getAll(), "cookies get all in ");
  console.log(refreshToken, "refresh token in front middleware");

  // Извлекаем оригинальный user-agent
  const userAgent = req.headers.get("user-agent");

  if (accessToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(accessToken, secret);
      console.log("Access token is valid");
      return response;
    } catch (error) {
      console.log("tokenError:", error);
      NextResponse.next();
    }
  }

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
        response.cookies.set("accessToken", tokens.accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          domain: !isDevelopment ? ".job-search-service.ru" : "localhost",
          maxAge: 15 * 60,
        });

        response.cookies.set("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          domain: !isDevelopment ? ".job-search-service.ru" : "localhost",
          maxAge: 60 * 24 * 60 * 60,
        });

        response.headers.set("x-access-token", tokens.accessToken);
        response.headers.set("x-refresh-token", tokens.refreshToken);
      } else {
        console.error("Failed to refresh token");
        return NextResponse.redirect("/");
      }
    } catch (error) {}
  }
  return response;
}

export const config = {
  matcher: ["/"], // Применяется только к главной странице
};

// import { NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';
// import { baseUrl } from './const/baseUrl';

// export async function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get('accessToken')?.value;
//   const refreshToken = req.cookies.get('refreshToken')?.value;
//   const response = NextResponse.next();

//   if (accessToken) {
//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//       const res = await jwtVerify(accessToken, secret);
//       console.log(res)
//     } catch (error) {
//       console.error('Access token expired or invalid:', error);
//     }
//   }

//   console.log(refreshToken, 'refreshToken')

//   if (refreshToken) {
//     try {
//       const refreshResponse = await fetch(`${baseUrl}/auth/refresh-token`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Cookie': refreshToken,
//         },
//         credentials: 'include',
//       });

//       if (refreshResponse.ok) {
//         console.log('Token refreshed successfully');

//       } else {
//         console.error('Failed to refresh token');
//       }
//     } catch (error) {
//       console.error('Error refreshing tokens:', error);
//     }
//   }
//   return response
// }

// export const config = {
//   matcher: ['/'], // Применяется только к главной странице
// };

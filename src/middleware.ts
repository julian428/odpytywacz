import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = (await getToken({ req })) as any;

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/quizes", req.url));
    }

    if (pathname === "/dashboard" && !isAuth) {
      throw new Error("Zaloguj się aby korzystać z tej strony.");
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async () => true,
    },
  }
);

export const config = {
  matcher: ["/", "/dashboard"],
};

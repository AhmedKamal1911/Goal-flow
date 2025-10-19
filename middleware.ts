import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./lib/server/utils";

export async function middleware(request: NextRequest) {
  const session = await getServerSession();
  const { pathname } = request.nextUrl;

  if (!session && pathname.startsWith("/flow")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session && (pathname === "/" || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/flow", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/", "/register", "/flow"],
};

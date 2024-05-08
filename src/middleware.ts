import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export default async function handler(req: NextRequest) {
  const isLoggedIn = cookies().has('session');
  
  return isLoggedIn
    ? NextResponse.rewrite(new URL(req.nextUrl))
    : NextResponse.redirect(new URL("/login", req.nextUrl));
}

export const config = {
  matcher: ["/dashboard", "/admin", "/cashier", "/settings"],
};

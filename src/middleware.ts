import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSessionCookie } from "./actions/lib/session";

const routes = {
  admin: [
    "/admin",
    "/admin/dashboard",
    "/admin/settings",
    "/admin/cashier",
    "/admin/stats",
    
  ],
  cashier: ["/cashier", "/cashier/dashboard", "/cashier/settings"],
  public: ["/login", "/about-us", "/unauthorized", "/", "/testing", "/sign-up", "/admin/stock",],
};

export default async function handler(req: NextRequest) {
  const cookie = cookies().get("SESSION_TOKEN")?.value;
  const path = req.nextUrl.pathname;

  // Decrypt the session
  if (routes.public.includes(path)) {
    return NextResponse.next();
  }

  if (!cookie && !routes.public.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const [error, session] = await decryptSessionCookie(cookie as string);
  if (error) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const role = session?.role;
  if (role === "admin" && routes.admin.includes(path)) {
    return NextResponse.next();
  }
  if (role === "cashier" && routes.cashier.includes(path)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)",
  ],
};

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./actions/lib/session";

const routes = {
  admin: [
    "/admin",
    "/admin/dashboard",
    "/admin/settings",
    "/admin/cashier",
    "/admin/stats",
    "/admin/stock",
  ],
  cashier: ["/cashier", "/cashier/dashboard", "/cashier/settings"],
  public: ["/login", "/about-us", "/unauthorized", "/api/login"],
};

export default async function handler(req: NextRequest) {
  const cookie = cookies().get("SESSION")?.value;
  // Decrypt the session
  const session = cookie ?  await decrypt(cookie) : undefined

  // Get the path of the request
  const path = req.nextUrl.pathname;
  // Determine if the route is protected for admin, cashier or public
  const isProtectedRouteAdmin = routes.admin.includes(path);
  const isProtectedRouteCashier = routes.cashier.includes(path);
  const isPublicRoute = routes.public.includes(path);


  if (isPublicRoute) {
    return NextResponse.next();
  }
  if (!session && !isPublicRoute)
    return Response.redirect(new URL("/login", req.nextUrl));

  if (isProtectedRouteAdmin && session?.userRole !== "admin") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isProtectedRouteCashier && session?.userRole !== "cashier") {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // redirect anyways
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/favicon.ico",
    "/api/login",
  ],
};

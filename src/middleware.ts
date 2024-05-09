import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrefixRoutes } from "./types";

export default async function handler(req: NextRequest) {
  const isLoggedIn = cookies().has('session');
  const isAdmin = isLoggedIn ? JSON.parse(cookies().get('session')?.value as string).isAdmin : false;
  const isCashier = isLoggedIn ? JSON.parse(cookies().get('session')?.value as string).isCashier : false;
  
  console.log("Is admin:", isAdmin);
  console.log("Is cashier:", isCashier);

  const isAdminRoute = req.nextUrl.pathname.startsWith(PrefixRoutes.ADMIN);
  const isCashierRoute = req.nextUrl.pathname.startsWith(PrefixRoutes.CASHIER);

  if (isLoggedIn) {
    if ((isAdmin && isAdminRoute) || (isCashier && isCashierRoute)) {
      // User is logged in and has the appropriate role
      return NextResponse.rewrite(new URL(req.nextUrl));
    } else {
      // User is logged in but does not have access to the route
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl)); // Redirect to unauthorized page
    }
  } else {
    // User is not logged in
    return NextResponse.redirect(new URL("/login", req.nextUrl)); // Redirect to login page
  }
}

export const config = {
  matcher: ["/dashboard/:path", "/admin/:path", "/cashier/:path", "/settings/:path"],
};

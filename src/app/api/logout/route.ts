import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {

    // Clear the cookie
    cookies().delete('session')
    return Response.redirect(new URL('/login', req.nextUrl))
}
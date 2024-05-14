import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.SESSION_SECRET;

const encodedKey = new TextEncoder().encode(secret);

export async function encrypt(payload: { userRole: string; expiresAt: Date }) {
  console.log('cifradooo', payload)
  const jwt = new SignJWT(payload);
  return jwt
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  console.log('descifrado', session)
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log("Error decrypting session: ", e);
  }
}

export async function createSession(userInformation: string) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 hours
  const session = await encrypt({ userRole: userInformation, expiresAt });
  cookies().set("SESSION", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}


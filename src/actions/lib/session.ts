import { JWTPayload, jwtVerify } from "jose";

type Result<T> = [Error, undefined] | [undefined, T];

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function decryptSessionCookie(
  token: string
): Promise<Result<JWTPayload>> {
  try {
    return [
      undefined,
      (await jwtVerify(token, secret, { algorithms: ["HS256"] })).payload,
    ];
  } catch (e: any) {
    if (e.name === "JWTExpired") {
      return [new Error("Session expired"), undefined];
    }
    return [
      new Error("An unexpected error ocurred while verifying the session"),
      undefined,
    ];
  }
}

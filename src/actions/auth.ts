"use server";

import { AuthResponse } from "@/types";
import SHA256 from "crypto-js/sha256";
import { setDefaultResultOrder } from "dns";
const BASE_URL = process.env.BASE_URL as string;
import { cookies } from 'next/headers';

export async function login(formData: FormData, role: string): Promise<AuthResponse> {
  const LOGIN_URL =
    `${BASE_URL}/auth/login?` +
    new URLSearchParams({
      role,
    });
  const creds = {
    email: formData.get("email") as string,
    password: SHA256(formData.get("password") as string).toString(),
  };

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(creds),
  });
  const result = await response.json()
  if (response.status !== 200) return result

  // Set the session token only if the login was successful 
  const session = response.headers.getSetCookie()[0].split(';')[0].split('=')[1];
  cookies().set('SESSION_TOKEN', session, { path: '/', secure: true })
	return result;
}

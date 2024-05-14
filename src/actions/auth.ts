"use server";

import { AuthResponse } from "@/types";
import SHA256 from "crypto-js/sha256";
const BASE_URL = process.env.BASE_URL as string;

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

	return response.json();
}

"use server";

import { AuthResponse, SignUpData } from "@/types";
import SHA256 from "crypto-js/sha256";
import { BASE_URL } from "@/constants";
import { cookies } from 'next/headers';
import extract from "@/utils/getSessionFromCookies";

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
  console.log('resultao', result)
  // Set the session token only if the login was successful 
  const session = extract(response.headers.getSetCookie());

  cookies().set('SESSION_TOKEN', session, { path: '/', secure: true })
	return result;
}
export async function signUpCode(formData: FormData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup-access`, {
      method: "POST",
      body: JSON.stringify({ code: formData.get("code") }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
    return {
      error: true,
      body: {
        message: {
          title: "Error",
          description: "Network error",
          notificationStatus: "error",
        },
      },
    };
  }
}
export async function validateData(signUpData: {
  personal_id: string;
  password: string;
  name: string;
  phone_number: string;
  email: string;
  residence_location: string;
  role: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/signup-validation`, {
    method: "POST",
    body: JSON.stringify(signUpData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
}

interface SignUpDataType {
  email: string;
  password: string;
  name: string;
  personal_id: string;
  phone_number: string;
  residence_location: string;
  role: 'admin' | 'cashier';
}
export async function signUp(signUpData: SignUpDataType): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/auth/signup-insertion`, {
    method: "POST",
    body: JSON.stringify(signUpData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
}
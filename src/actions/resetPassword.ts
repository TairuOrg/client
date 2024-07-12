"use server";
import { BASE_URL } from "@/constants";
import { AuthResponse } from "@/types";
import { SHA256 } from "crypto-js";
import { cookies } from "next/headers";


export async function checkAdminEmail(email: string): Promise<any> {
  // fetch the admin email from the database
  const response = await fetch(`${BASE_URL}/auth/send-reset-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data
  
}

export async function checkPasscode(email: string, pincode: string): Promise<AuthResponse> {
  try {

    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/auth/verify-reset-code`, {

        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Cookie: `SESSION_TOKEN=${session}`,
        },
        body: JSON.stringify({email, code: pincode})
    });
    
    return await response.json()
    
  }
  catch(error){
    console.error("Error:", error);
    throw new Error("Error fetching items");
  }
}

export async function sendNewPassword(email: string, newPassword: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${BASE_URL}/auth/restore-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: SHA256(newPassword).toString() }),
    });
   
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error fetching items");
  }
}
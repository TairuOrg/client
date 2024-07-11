"use server";
import { BASE_URL } from "@/constants";
import { AuthResponse } from "@/types";
import { SHA256 } from "crypto-js";
import { cookies } from "next/headers";

export async function checkPasscode(pincode: string): Promise<AuthResponse> {
  try {

    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/auth/signup-access`, {

        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Cookie: `SESSION_TOKEN=${session}`,
        },
        body: JSON.stringify({code: pincode})
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
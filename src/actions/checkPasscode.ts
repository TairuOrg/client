"use server";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function checkPasscode(pincode: string) {

  try {

    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/auth/signup-validation`, {
        
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Cookie: `SESSION_TOKEN=${session}`,
        },
        body: JSON.stringify({code: pincode})
    });
    console.log('gfghfg', response.ok)
    return await response.json()
    
  }
  catch(error){
    console.error("Error:", error);
    throw new Error("Error fetching items");
  }
}
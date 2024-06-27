"use server";
import { Cashier, ServerResponse } from "@/types";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import { SHA256 } from "crypto-js";

export async function cashiersInfo(): Promise<ServerResponse<Cashier[]>> {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/get-cashiers`, {
      headers: {
        Cookie: `SESSION_TOKEN=${session}`,
      },
      
    });

    const result = await response.json();
    console.log("Resultadooo:", result);
    console.log("AKIII ESTOYYYY",result.body.payload)
    return result;
    
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error fetching items");
  }
}

export async function createCashier(cashier: any) {

  try {
    console.log('antes de enviarlo:', cashier)
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/auth/signup-insertion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify({...cashier, password: SHA256(cashier.password).toString()}),
    });

    const result = await response.json();
    return result;
  }
  catch(error){
    console.error("Error:", error);
    throw new Error("Error fetching items");
  }
}
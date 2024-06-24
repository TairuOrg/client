"use server";
import { Cashiers, ServerResponse } from "@/types";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function cashiersInfo(): Promise<ServerResponse<Cashiers[]>> {
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
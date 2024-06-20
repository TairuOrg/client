"use server";
import { Items, ServerResponse } from "@/types";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function stockItems(): Promise<ServerResponse<Items>> {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/items`, {
      headers: {
        Cookie: `SESSION_TOKEN=${session}`,
      },
    });

    const result = await response.json();
    console.log("Resultadooo:", result);
    return result;
    
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error fetching items");
  }
}


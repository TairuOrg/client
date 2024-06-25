"use server";
import { Item, ServerResponse } from "@/types";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function stockItems(): Promise<ServerResponse<Item[]>> {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/get-items`, {
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

export async function updateStockItem(item: FormData): Promise<ServerResponse<any>> {
  try {
    console.log('Item:', item)
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/update-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(item),
    });

    return await response.json();

  } catch(e) {
    throw new Error("Error updating item");
  }
}

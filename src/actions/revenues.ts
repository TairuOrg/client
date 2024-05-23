"use server";
import { Revenue, RevenueStats, ServerResponse } from "@/types";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function retrieveRevenues(): Promise<ServerResponse<Revenue>> {
  const session = cookies().get("SESSION_TOKEN")?.value;
  const response = await fetch(`${BASE_URL}/admin/todays-revenue`, {
    headers: {
      Cookie: `SESSION_TOKEN=${session}`,
    },
  });
  return await response.json()
}

// export async function retrieveRevenueStats(): Promise<ServerResponse<any> {
  
// }

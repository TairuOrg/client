"use server";
import { Revenue, ServerResponse, DashboardChartData } from "@/types";
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

export async function retrieveDashboardChartData(): Promise<ServerResponse<DashboardChartData>> {
  const session = cookies().get("SESSION_TOKEN")?.value;
  const response = await fetch(`${BASE_URL}/admin/get-dashboard-data`, {
    headers: {
      Cookie: `SESSION_TOKEN=${session}`,
    },
  });
  const result = await response.json()

  return result;
}
"use server";

import { BASE_URL } from "@/constants";
import { getStatisticsData, ServerResponse, Statistics } from "@/types";
import { cookies } from "next/headers";

export async function getStatistics(
  payload: getStatisticsData
): Promise<ServerResponse<Statistics>> {
  try {
    console.log("payload", payload);
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/get-statistics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload),
    });

    const result: ServerResponse<Statistics> = await response.json();
    console.log("result", result);
    return result;
  } catch (e) {
    console.error(e);
    throw new Error("Error updating item");
  }
}

'use server'
import { BASE_URL } from "@/constants";
import { Entry, ServerResponse } from "@/types";
import { cookies } from "next/headers";

export async function loadEntries(): Promise<ServerResponse<Entry[]>> {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/get-entries`, {
      headers: {
        Cookie: `SESSION_TOKEN=${session}`,
      },
    });

    const result = await response.json()
    console.log(result.body.payload)
    return result
  } catch (error) {

    throw new Error(`error: ${error}`)
  }
}


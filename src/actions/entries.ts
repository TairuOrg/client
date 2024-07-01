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

    const result: ServerResponse<Entry[]> = await response.json()

    result.body.payload.forEach(e => {

    })
    return result
  } catch (error) {

    throw new Error(`error: ${error}`)
  }
}

export async function createEntry(entry_to_add: Entry) {
  try {

    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/insert-entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(entry_to_add),
    });

    const result = await response.json()
    return result
  } catch (error) {
    throw new Error(`error: ${error}`)
  }
}


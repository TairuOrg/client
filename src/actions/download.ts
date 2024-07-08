'use server'
import { BASE_URL } from "@/constants";
import { ServerResponse } from "@/types";
import { cookies } from "next/headers";

export async function download_backup(): Promise<void> {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/backup-database`, {
      headers: {
        Cookie: `SESSION_TOKEN=${session}`,
      },
    });
  } catch (error) {

    throw new Error(`error: ${error}`)
  }
}

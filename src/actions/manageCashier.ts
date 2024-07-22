"use server";
import { BASE_URL } from "@/constants";
import { ServerResponse } from "@/types";
import { cookies } from "next/headers";

export async function deleteCashier(personal_id: string): Promise<ServerResponse<string>> {
  const payload = {
    personal_id: personal_id,
  };

  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/admin/delete-cashier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('result', result);
    return result;
  } catch (e) {
    console.error(e);
    return { error: true, body: {
      message: "An error occurred while deleting the cashier",
      payload: e as string
    }}
  }
}

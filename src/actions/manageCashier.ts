"use server";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function deleteCashier(personal_id: string) {
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

    return result;
  } catch (e) {
    console.error(e);
  }
}

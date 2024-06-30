"use server";

import { BASE_URL } from "@/constants";
import { Customer, ServerResponse } from "@/types";
import { cookies } from "next/headers";

export async function searchCustomerByPersonalID(id: string) {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/verify-customer`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify({
        personal_id: id
      })
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

export async function createCustomer(new_customer: any): Promise<ServerResponse<Customer>> {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/insert-customer`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(new_customer)
    });

    const result: ServerResponse<Customer> = await response.json();

    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

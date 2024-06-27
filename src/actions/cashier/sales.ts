"use server";

import { BASE_URL } from "@/constants";
import { Customer, ServerResponse } from "@/types";
import { cookies } from "next/headers";



export async function beginSale(payload: {cashier_id: number, customer_personal_id: string}): Promise<ServerResponse<number>> {
    try {
      const session = cookies().get("SESSION_TOKEN")?.value;
      const response = await fetch(`${BASE_URL}/cashier/begin-sale`, {
          method: 'POST',
  
        headers: {
          "Content-Type": "application/json",
          Cookie: `SESSION_TOKEN=${session}`,
        },
        body: JSON.stringify(payload)
      });
  
      const result: ServerResponse<number> = await response.json();
  
      return result;
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
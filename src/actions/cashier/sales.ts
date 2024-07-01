"use server";

import { BASE_URL } from "@/constants";
import { SaleItems, ServerResponse, ModifyItemQuantity, RemoveItemData, FinishSaleData } from "@/types";
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

export async function getProductsFromSale(payload: {sale_id: string}) {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/get-sale-items`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload)
    });

    const result: ServerResponse<SaleItems[]> = await response.json();
    console.log(result.body.payload)
    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

export async function modifyProductsQuantity(payload: ModifyItemQuantity) {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/add-item`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload)
    });

    const result: ServerResponse<string> = await response.json();
    console.log(result.body.payload)
    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

export async function removeItemFromSale(payload: RemoveItemData) {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/remove-item`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload)
    });

    const result: ServerResponse<string> = await response.json();
    console.log(result.body.payload)
    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

export async function cancelSale(payload: FinishSaleData) {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/cancel-sale`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload)
    });

    const result: ServerResponse<string> = await response.json();
    console.log(result.body.payload)
    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

export async function commitSale(payload: FinishSaleData) {
  try {
    const session = cookies().get("SESSION_TOKEN")?.value;
    const response = await fetch(`${BASE_URL}/cashier/commit-sale`, {
        method: 'POST',

      headers: {
        "Content-Type": "application/json",
        Cookie: `SESSION_TOKEN=${session}`,
      },
      body: JSON.stringify(payload)
    });

    const result: ServerResponse<string> = await response.json();
    console.log(result.body.payload)
    return result;
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}
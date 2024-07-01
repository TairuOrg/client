"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "@/constants";
import { CashiersStatusCount, ServerResponse } from "@/types";
import { ItemsAndCategoriesCount } from "@/types";

export async function fetchItemsAndCaetegories(): Promise<
  ServerResponse<ItemsAndCategoriesCount>
> {
  const session = cookies().get("SESSION_TOKEN")?.value;
  const response = await fetch(`${BASE_URL}/admin/items-and-categories`, {
    headers: {
      Cookie: `SESSION_TOKEN=${session}`,
    },
  });

  return await response.json();
}

export async function fetchCashiers(): Promise<
  ServerResponse<CashiersStatusCount>
> {
  const session = cookies().get("SESSION_TOKEN")?.value;
  const response = await fetch(`${BASE_URL}/admin/cashier-status`, {
    headers: {
      Cookie: `SESSION_TOKEN=${session}`,
    },
  });
  const res = await  response.json();

  return res;
}

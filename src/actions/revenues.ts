"use server";

import { Revenue, ServerResponse } from "@/types";

export async function retrieveRevenues(): Promise<ServerResponse<Revenue>> {
  // to implement

  return {
    error: false,
    body: {
      message: "Los ingresos el dia de hoy ahahaa",
      data: {
        US: { amount: 1 },
        VE: { amount: 2 },
        EU: { amount: 4 },
      },
    },
  };
}

export async function retrieveRevenueStats() {
  return {
    // something
  };
}

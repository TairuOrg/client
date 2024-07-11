"use server";
import { BASE_URL } from "@/constants";
import { UploadBackup } from "@/schemas/backupSchema";
import { cookies } from "next/headers";

export default async function uploadFile(payload: any) {
  const session = cookies().get("SESSION_TOKEN")?.value;
  const response = await fetch(`${BASE_URL}/admin/restore-database`, {
    method: "POST",
    headers: {
      Cookie: `SESSION_TOKEN=${session}`,
    },

    body: payload,
  });
}

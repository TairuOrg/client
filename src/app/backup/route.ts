import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const session = cookies().get("SESSION_TOKEN")?.value;
    console.log('session', session)
    const response = await fetch(`${BASE_URL}/admin/backup-database`, {
        headers: {
          Cookie: `SESSION_TOKEN=${session}`,
        },
      });
    
    return response;
}
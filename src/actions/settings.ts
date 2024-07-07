'use server'
import { BASE_URL } from "@/constants";
import { EditUserData, ServerResponse } from "@/types";
import { cookies } from "next/headers";

export async function settings(data: any): Promise<ServerResponse<any>> {
    try {
        const session = cookies().get("SESSION_TOKEN")?.value;
        const response = await fetch(`${BASE_URL}/auth/edit-user`, {
          method :'POST',
          headers: {
            Cookie: `SESSION_TOKEN=${session}`,
          },
          body: JSON.stringify(data)
          
        });
    
        const result = await response.json();
        console.log(result);
        return result;
        
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Error fetching settings");
    }
}
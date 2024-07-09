'use server'
import { BASE_URL } from "@/constants";
import { UpdateInformation } from "@/schemas/updateInfomation";
import { AuthResponse, EditUserData, ServerResponse } from "@/types";
import { SHA256 } from "crypto-js";
import { cookies } from "next/headers";

export async function settings(data: UpdateInformation): Promise<AuthResponse> {
    try {
        const payload = data.password ? {
          current_personal_id: data.personal_id,
          new_password: SHA256(data.password).toString(),
          new_name: data.fullname,
          new_phone_number: data.phoneCode + data.phoneNumber,
          new_email: data.email,
          new_residence_location: data.state,

        } : {
          current_personal_id: data.personal_id,
          new_name: data.fullname,
          new_phone_number: data.phoneCode + data.phoneNumber,
          new_email: data.email,
          new_residence_location: data.state,
        }
        const session = cookies().get("SESSION_TOKEN")?.value;
        const response = await fetch(`${BASE_URL}/auth/edit-user`, {
          method :'POST',
          headers: {
            "Content-Type": "application/json",
            Cookie: `SESSION_TOKEN=${session}`,
          },
          body: JSON.stringify(payload)
          
        });
    
        const result: AuthResponse = await response.json();
        console.log(result);
        return result;
        
      } catch (error) {
        console.error("Error:", error);
        throw new Error("Error fetching settings");
    }
}
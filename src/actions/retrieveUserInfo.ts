'use server'
import { BASE_URL } from "@/constants";
import { User } from "@/types";
import { cookies } from 'next/headers';
export async function retrieveUserInfo(): Promise<User> {
    const session = cookies().get('SESSION_TOKEN')?.value;

    const response = await fetch(`${BASE_URL}/admin/me`, {
        headers: {
            'Cookie': `SESSION_TOKEN=${session}`
        }
    });
    return await response.json()

}
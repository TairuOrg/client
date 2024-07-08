'use server'
import { BASE_URL } from '@/constants';
import { cookies } from "next/headers";
import { Sale, ServerResponse } from '@/types';

export async function getSales() {
    try {
        const session = cookies().get("SESSION_TOKEN")?.value;
        const response = await fetch(`${BASE_URL}/admin/get-sales`, {
            headers: {
            Cookie: `SESSION_TOKEN=${session}`,
            }
        })
        const {body: {payload}} = await response.json() as ServerResponse<Sale[]>;
        return payload
    } catch (error) {
        throw new Error('an error has happened')
    }
}
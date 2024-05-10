import { AuthData, FormData } from "@/types";
import SHA256 from "crypto-js/sha256"

export default function prepareAuth(user: FormData): FormData {
    return { ...user, password: SHA256(user.password).toString() };
}
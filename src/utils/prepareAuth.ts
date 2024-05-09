import { AuthData } from "@/types";
import SHA256 from "crypto-js/sha256"

export default function prepareAuth(user: AuthData): AuthData {
    return { ...user, password: SHA256(user.password).toString() };
}
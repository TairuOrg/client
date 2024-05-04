import { AuthData, AuthMessage } from "@/lib/data";

export function login(user: AuthData): AuthMessage {
    console.log(user);
    return {
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido!",
        isError: false,
        notificationStatus: "success",
    }// returns true to simulate a failed login
}

export function logout(): boolean {
    console.log("Logged out");
    return true
}


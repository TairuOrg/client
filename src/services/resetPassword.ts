import { BASE_URL } from "@/constants";
import { AuthMessage, ServerResponse } from "../types";

const URL = {
  email: "https://api.example.com/reset-password-email",
  PIN: "https://api.example.com/reset-password-PIN",
  newPassword: "https://api.example.com/reset-password-new-password",
};

export async function checkAdminEmail(email: string): Promise<any> {
  // fetch the admin email from the database
  const response = await fetch(`${BASE_URL}/auth/send-reset-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data
  
}

export function checkPINCode(PIN: string): AuthMessage {
  // fetch the PIN code from the database
  return {
    title: "PIN correcto",
    description:
      "El código PIN es correcto. Ahora puedes ingresar tu nueva contraseña.",
    notificationStatus: "success",
    isError: false,
  };
}
export function saveNewPassword(newPassword: string): AuthMessage {
  // save the new password in the database
  return {
    title: "Contraseña actualizada",
    description: "Tu contraseña ha sido actualizada correctamente.",
    notificationStatus: "success",
    isError: false,
  };
}

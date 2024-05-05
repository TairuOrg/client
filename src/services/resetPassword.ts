import { AuthMessage } from "../types";

const URL = {
    email: "https://api.example.com/reset-password-email",
    PIN: "https://api.example.com/reset-password-PIN",
    newPassword: "https://api.example.com/reset-password-new-password",
};

export function checkAdminEmail(email: string): AuthMessage {
  // fetch the admin email from the database
  return {
    title: "código PIN envíado",
    description:
      "Hemos enviado un código PIN a tu correo electrónico. Por favor, revisa tu bandeja de entrada.",
    notificationStatus: "success",
    isError: false,
  };
}

export function checkPINCode (PIN: string): AuthMessage  {
    // fetch the PIN code from the database
    return {
        title: "PIN correcto",
        description: "El código PIN es correcto. Ahora puedes ingresar tu nueva contraseña.",
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

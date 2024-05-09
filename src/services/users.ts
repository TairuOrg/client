// services/auth.ts
import { AuthData, AuthResponse, User } from "@/types";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users");
  console.log(await response.json())
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export const findCashier = async (user: AuthData): Promise<AuthResponse> => {
  const users = await fetchUsers();
  const user_found: User | undefined = users.find(
    (u) => u.email === user.email && u.password === user.password
  );

  return {
    error: !user_found,
    body: {
      data: user_found || {},
      message: {
        title: user_found
          ? "Inicio de sesión exitoso"
          : "Inicio de sesión fallido",
        description: user_found ? "¡Bienvenido!" : "Usuario no encontrado",
        notificationStatus: user_found ? "success" : "error",
      },
    },
  };
};

export const findAdmin = async (user: AuthData): Promise<AuthResponse> => {
  const users = await fetchUsers();
  const user_found: User | undefined = users.find(
    (u) => u.email === user.email && u.password === user.password && u.isAdmin
  );
  return {
    error: !user_found,
    body: {
      data: user_found || {},
      message: {
        title: user_found
          ? "Inicio de sesión exitoso"
          : "Inicio de sesión fallido",
        description: user_found ? "¡Bienvenido!" : "Usuario no encontrado",
        notificationStatus: user_found ? "success" : "error",
      },
    },
  };
};

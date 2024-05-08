import { AuthData, AuthResponse, User } from "@/types";

export const users: User[] = [
  {
    id: 1,
    fullname: "Arlina Tuny",
    email: "atuny0@sohu.com",
    password: "125",
    isAdmin: false,
  },
  {
    id: 2,
    fullname: "Kevan Tregian",
    email: "rshawe2@51.la",
    isAdmin: false,
    password: "t8BQ5d00",
  },
  {
    id: 3,
    fullname: "Rozalin Shawe",
    email: "yraigatt3@nature.com",
    isAdmin: true,
    password: "1234",
  },
];
export const findCashier = (user: AuthData): AuthResponse => {
  const user_found: User | undefined = users.find(
    (u) => u.email === user.email && u.password === user.password
  );
  user_found && localStorage.setItem("user", JSON.stringify(user_found));

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

// do the same
export const findAdmin = (user: AuthData): AuthResponse => {
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

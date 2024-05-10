import fs from "fs";
import { User } from "@/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  // This code here should send the external service a fetch and determine if the current attempt to login failed or not.
  // Meanwhile this is going to read dummy data
  const fileContents = await fs.promises.readFile(
    "./src/dummy_data/users.json",
    "utf-8"
  );
  // Parse the JSON data
  const users: User[] = JSON.parse(fileContents);
  const body: User = await req.json();

  const user_found: User | undefined = body.isAdmin
    ? users.find(
        (u) =>
          u.email === body.email && u.password === body.password && u.isAdmin
      )
    : users.find((u) => u.email === body.email && u.password === body.password);

  return Response.json({
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
  });
}

import fs from "fs";
import { AuthData, User } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession } from "@/app/lib/session";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // This code here should send the external service a fetch and determine if the current attempt to login failed or not.
    // Meanwhile this is going to read dummy data
    const fileContents = await fs.promises.readFile(
      "./src/dummy_data/users.json",
      "utf-8"
    );

    // Parse the JSON data
    const users: any = JSON.parse(fileContents);
    const { formData, isAdmin }: AuthData = await req.json();

    const user_found = isAdmin
      ? users.find(
          (u: any) =>
            u.email === formData.email &&
            u.password === formData.password &&
            u.isAdmin
        )
      : users.find(
          (u: any) =>
            u.email === formData.email && u.password === formData.password
        );

    // If user is not found, return error response
    if (!user_found) {
      return Response.json({
        error: true,
        body: {
          message: {
            title: "Inicio de sesión fallido",
            description: "Credenciales incorrectas",
            notificationStatus: "error",
          },
        },
      });
    }

    // Check if user's role matches the requested route
    const requestedRoute = isAdmin ? "/admin" : "/cashier";
    if (
      (user_found.isAdmin && requestedRoute !== "/admin") ||
      (!user_found.isAdmin && requestedRoute !== "/cashier")
    ) {
      return Response.json({
        error: true,
        body: {
          message: {
            title: "Acceso denegado",
            description: "No tiene permiso para acceder a esta ruta",
            notificationStatus: "error",
          },
        },
      });
    }
    // Create a session
    await createSession(user_found.isAdmin ? "admin" : "cashier");
    // Return success response
    return Response.json({
      error: false,
      body: {
        data: user_found,
        message: {
          title: "Inicio de sesión exitoso",
          description: "¡Bienvenido!",
          notificationStatus: "success",
        },
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return Response.json({
      error: true,
      body: {
        message: {
          title: "Error en el inicio de sesión",
          description: "Por favor, inténtalo de nuevo más tarde",
          notificationStatus: "error",
        },
      },
    });
  }
}

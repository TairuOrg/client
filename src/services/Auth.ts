import { AuthData, AuthMessage, User } from "@/types";
import { findAdmin, findCashier } from "@/dummy_data/users";

export function login(user: AuthData): AuthMessage {
  const URL_LOGIN = "idk";

  const { error, body } = user.isAdmin ? findAdmin(user) : findCashier(user);
  return { ...body.message, isError: error };
}

export function logout(): boolean {
  console.log("Logged out");
  return true;
}

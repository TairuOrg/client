import { AuthData, AuthMessage, User } from "@/types";
import { findAdmin, findCashier } from "@/dummy_data/users";
import Cookie from "js-cookie";
import SHA256 from "crypto-js/sha256";

export function login(user: AuthData): AuthMessage {
  const URL_LOGIN = "idk";

  const newUser = { ...user, password: SHA256(user.password).toString() };
  const { error, body } = user.isAdmin
    ? findAdmin(newUser)
    : findCashier(newUser);
    if (!error) {
      Cookie.set("session", JSON.stringify(body.data));
      localStorage.setItem("user", JSON.stringify(body.data));
    }
  return { ...body.message, isError: error };
}

export function logout(): boolean {
  console.log("Logged out");
  return true;
}

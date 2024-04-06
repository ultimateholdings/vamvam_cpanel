import { redirect } from "react-router-dom";
import { getAuthToken, getUserRole } from "../../helper/utils";
import { USER_ROLE } from "../../helper/enums";
import { logout } from "./http";

export function tokenLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/signing");
  }
  return null;
}

export function authenticationLoader() {
  const token = getAuthToken();
  if (token) {
    return redirect("/");
  }
  return null;
}

export function adminLoader() {
  const role = getUserRole();
  return role === USER_ROLE.manager ? null : redirect("/404");
}

export function conflictLoader() {
  const role = getUserRole();
  return role === USER_ROLE.conflictManager ? null : redirect("/404");
}

export function registrationLoader() {
  const role = getUserRole();
  return role === USER_ROLE.registrationManager ? null : redirect("/404");
}

export async function logoutAction() {
  const token = getAuthToken();
  if (token) {
    await logout();
  }

  return redirect("/signing");
}

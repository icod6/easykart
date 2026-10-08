import { apiRequest } from "./client";

export function login(email, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(name, email, password) {
  return apiRequest("/api/users/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}
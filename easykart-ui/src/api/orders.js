import { apiRequest } from "./client";

export function placeOrder() {
  return apiRequest("/api/orders", {
    method: "POST",
  });
}

export function getMyOrders() {
  return apiRequest("/api/orders");
}
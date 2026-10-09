import { apiRequest } from "./client";

export function getCart() {
  return apiRequest("/api/cart");
}

export function addToCart(productId, quantity) {
  return apiRequest("/api/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export function removeFromCart(productId) {
  return apiRequest(`/api/cart/items/${productId}`, {
    method: "DELETE",
  });
}
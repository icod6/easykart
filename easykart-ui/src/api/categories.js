import { apiRequest } from "./client";

export function getCategories() {
  return apiRequest("/api/categories");
}

export function createCategory(name) {
  return apiRequest("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export function deleteCategory(id) {
  return apiRequest(`/api/categories/${id}`, {
    method: "DELETE",
  });
}
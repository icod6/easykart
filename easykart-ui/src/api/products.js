import { apiRequest } from "./client";

export function getProducts({ name = "", categoryId = "", page = 0, size = 10 } = {}) {
  const params = new URLSearchParams();
  if (name) params.set("name", name);
  if (categoryId) params.set("categoryId", categoryId);
  params.set("page", page);
  params.set("size", size);

  return apiRequest(`/api/products?${params.toString()}`);
}

export function getCategories() {
  return apiRequest("/api/categories");
}
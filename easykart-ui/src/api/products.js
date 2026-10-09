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

export function createProduct(product) {
  return apiRequest("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateProduct(id, product) {
  return apiRequest(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id) {
  return apiRequest(`/api/products/${id}`, {
    method: "DELETE",
  });
}

export function createCategory(name) {
  return apiRequest("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}
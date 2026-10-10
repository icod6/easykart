import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import {createProduct, updateProduct } from "../../api/products";
import { getCategories, createCategory, deleteCategory } from "../../api/categories";
import { apiRequest } from "../../api/client";

function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
  if (!isEdit) return;
  apiRequest(`/api/products/${id}`).then((product) => {
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price);
    setStock(product.stock);
    setCategoryId(product.categoryId ?? "");
  });
}, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const payload = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
    };
    try {
      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAddCategory() {
    if (!newCategoryName.trim()) return;
    try {
      const category = await createCategory(newCategoryName);
      setCategories([...categories, category]);
      setCategoryId(category.id);
      setNewCategoryName("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteCategory(id) {
  if (!confirm("Delete this category?")) return;
  try {
    await deleteCategory(id);
    setCategories(categories.filter((c) => c.id !== id));
    if (categoryId === String(id)) setCategoryId("");
  } catch (err) {
    setError(err.message);
  }
}

  return (
    <div style={{ padding: "1rem", maxWidth: "400px" }}>
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <input
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button type="button" onClick={handleAddCategory}>
            + Add Category
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
  <h4>Existing Categories</h4>
  {categories.map((c) => (
    <div key={c.id} style={{ display: "flex", justifyContent: "space-between", maxWidth: "250px" }}>
      <span>{c.name}</span>
      <button type="button" onClick={() => handleDeleteCategory(c.id)}>Delete</button>
    </div>
  ))}
</div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={saving} style={{ marginTop: "1rem" }}>
          {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

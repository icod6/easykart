import { useState, useEffect } from "react";
// import { getProducts, getCategories } from "../api/products";
import { addToCart } from "../api/cart";
import { useAuth } from "../context/AuthContext";

import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    getProducts({ name, categoryId, page, size: 8 })
      .then((data) => {
        setProducts(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name, categoryId, page]);

  const { user } = useAuth();
  const [message, setMessage] = useState("");

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId, 1);
      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Products</h2>
      {message && <p>{message}</p>}

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          placeholder="Search by name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setPage(0);
          }}
        />
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <h4>{p.name}</h4>
            <p>{p.categoryName || "Uncategorized"}</p>
            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            {user && (
              <button onClick={() => handleAddToCart(p.id)}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/products";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    getProducts({ size: 50 })
      .then((data) => setProducts(data.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Manage Products</h2>
      <Link to="/admin/products/new">+ Add Product</Link>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{p.name}</td>
              <td>{p.categoryName || "—"}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Link to={`/admin/products/${p.id}/edit`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
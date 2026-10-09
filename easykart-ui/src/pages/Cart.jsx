import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart } from "../api/cart";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function loadCart() {
    setLoading(true);
    getCart()
      .then(setCart)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleRemove(productId) {
    try {
      await removeFromCart(productId);
      loadCart();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Cart</h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.productId}
              style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}
            >
              <span>{item.productName} × {item.quantity}</span>
              <span>₹{item.lineTotal}</span>
              <button onClick={() => handleRemove(item.productId)}>Remove</button>
            </div>
          ))}
          <h3 style={{ marginTop: "1rem" }}>Total: ₹{cart.total}</h3>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
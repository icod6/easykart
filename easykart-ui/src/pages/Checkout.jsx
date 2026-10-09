import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../api/cart";
import { placeOrder } from "../api/orders";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handlePlaceOrder() {
    setPlacing(true);
    setError("");
    try {
      const order = await placeOrder();
      navigate("/orders", { state: { justPlaced: order.id } });
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Checkout</h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty. Add some products first.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
              <span>{item.productName} × {item.quantity}</span>
              <span>₹{item.lineTotal}</span>
            </div>
          ))}
          <h3>Total: ₹{cart.total}</h3>

          {error && (
            <p style={{ color: "red", border: "1px solid red", padding: "0.5rem" }}>
              {error}
            </p>
          )}

          <button onClick={handlePlaceOrder} disabled={placing}>
            {placing ? "Placing order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
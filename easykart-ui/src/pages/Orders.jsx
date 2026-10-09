import { useState, useEffect } from "react";
import { getMyOrders } from "../api/orders";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Order #{order.id}</strong>
              <span>{order.status}</span>
            </div>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
            {order.items.map((item) => (
              <div key={item.productId} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.productName} × {item.quantity}</span>
                <span>₹{item.lineTotal}</span>
              </div>
            ))}
            <h4>Total: ₹{order.totalAmount}</h4>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
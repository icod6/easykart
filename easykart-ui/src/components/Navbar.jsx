import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">EasyKart</Link>
      <Link to="/products">Products</Link>

      {user ? (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My Orders</Link>
          {user.role === "ADMIN" && <Link to="/admin">Admin</Link>}
          <span style={{ marginLeft: "auto" }}>{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "auto" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
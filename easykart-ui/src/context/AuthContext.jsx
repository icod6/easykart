import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/auth";

const AuthContext = createContext(null);

function decodeToken(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = decodeToken(token);
      return { email: decoded.sub, role: decoded.role };
    } catch {
      return null;
    }
  });

  async function login(email, password) {
    const response = await loginApi(email, password);
    localStorage.setItem("token", response.token);
    const decoded = decodeToken(response.token);
    setUser({ email: decoded.sub, role: decoded.role });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
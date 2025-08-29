import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData && isTokenValid(token)) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  function isTokenValid(token) {
    try {
      const usageTime = jwtDecode(token).exp;
      if (!usageTime) return true;
      const currentTime = Date.now() / 1000;
      return usageTime < currentTime;
    } catch (error) {
      return false;
    }
  }

  function login(accessToken, userData) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsLoggedIn(true);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isTokenValid }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const validToken = isTokenValid(token);
    if (token && userData && validToken) {
      setIsLoggedIn(true);
      setToken(token);
      setUser(JSON.parse(userData));
    } else {
      if (token && !validToken) {
        alert("Token expired!!");
        logout();
        navigate("/");
      }
    }
  }, []);

  function isTokenValid(token) {
    try {
      const usageTime = jwtDecode(token).exp;
      if (!usageTime) return true;
      const currentTime = Date.now() / 1000;
      return usageTime > currentTime;
    } catch (error) {
      return false;
    }
  }

  function login(accessToken, userData) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(accessToken);
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
      value={{ isLoggedIn, user, login, logout, isTokenValid, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

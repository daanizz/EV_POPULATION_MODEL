import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import "./login.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const { login } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch(`${API_URL}/login/authenticate`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      alert("Login success");
      login(data.token, data.user);
      navigate("/");
      return;
      //its a context prop that have been passed to AuthContext...
    }
    alert(data.error);
  }

  return (
    <>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          className="login-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          className="login-input"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p className="login-link-text">
        Don't have an Account?{" "}
        <Link to="/createAc" className="login-link">
          Create Account
        </Link>
      </p>
    </>
  );
}

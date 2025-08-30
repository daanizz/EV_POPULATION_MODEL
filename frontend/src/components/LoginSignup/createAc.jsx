import React, { useState } from "react";
// import "./createAc.css";
// import LoginForm from "./login.jsx";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function CreateAc() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  /**@type {React.FormEventHandler<HTMLFormElement>} */
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("clicked and reached handler");
    const response = await fetch(`${API_URL}/login/createAc`, {
      method: "POST",
      body: JSON.stringify({ name, email, password, confirmPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("User created Succefully");
      navigate("/login");
      // return;
      // ✅ Redirect to login page after success
    } else {
      alert("internal error");
    }
  }

  return (
    // className="create-container"
    <form onSubmit={handleSubmit} className="create-form">
      <h2 className="create-title">Create Account</h2>
      <input
        type="text"
        className="create-input"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />

      <input
        type="email"
        className="create-input"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />

      <input
        type="password"
        className="create-input"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />

      <input
        type="password"
        className="create-input"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.currentTarget.value);
        }}
      />

      <button type="submit" className="create-btn">
        Create
      </button>
    </form>
  );
}

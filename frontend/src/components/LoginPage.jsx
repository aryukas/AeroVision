import React, { useState } from "react";
import { loginUser } from "../api/api";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles.css";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(username, password);
      if (data.success) {
        onLoginSuccess();
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError(err.message || "Server not reachable");
    }
  };

  return (
    <div className="login-bg flex items-center justify-center min-h-screen px-4">
      <div className="login-card animate-slide-in w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
          AeroVision Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-2 border-blue-200 rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
            <FaUser className="text-blue-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="outline-none w-full text-sm md:text-base"
            />
          </div>

          <div className="flex items-center border-2 border-blue-200 rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
            <FaLock className="text-blue-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="outline-none w-full text-sm md:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105"
          >
            Login
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>

        <p className="text-center text-gray-400 text-xs mt-4">
          &copy; 2025 AeroVision. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

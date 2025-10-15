// src/api/api.js
const API_BASE_URL = "http://127.0.0.1:5000";

// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials or server error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Server not reachable");
  }
};

// File Upload + Predict API
export const predictFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Predict error:", error);
    throw new Error("Server not reachable");
  }
};

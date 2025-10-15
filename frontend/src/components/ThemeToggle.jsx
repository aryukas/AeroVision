// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

const ThemeToggle = ({ onToggle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    onToggle?.(theme);
  }, [theme, onToggle]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={handleToggle} color="inherit">
      {theme === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeToggle;

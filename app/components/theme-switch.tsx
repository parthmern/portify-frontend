"use client";

import { useEffect, useState } from "react";

export default function ThemeComponent() {
  const [theme, setTheme] = useState<string | null>(null); // Start with null to avoid mismatches

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme); // Set the theme after hydration
    document.documentElement.className = storedTheme; // Apply the theme to the document
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Persist the theme
    document.documentElement.className = newTheme; // Update the document
  };

  if (theme === null) return null; // Wait until theme is loaded to render

  return (
    <button onClick={toggleTheme}>
      Toggle to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

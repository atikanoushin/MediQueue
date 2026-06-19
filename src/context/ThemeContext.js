"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("mediqueue-theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("mediqueue-theme", theme);

    document.documentElement.classList.remove("dark", "light");
    document.body.classList.remove("dark", "light");

    document.documentElement.classList.add(theme);
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
"use client";

import { useContext } from "react";
import { ThemeContext } from "../components/context/ThemeContext";

const ThemeSwitch = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, setTheme } = themeContext;

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return (
    <div>
      <button
        onClick={() => handleThemeChange("light")}
        disabled={theme === "light"}
      >
        Light
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        disabled={theme === "dark"}
      >
        Dark
      </button>
      <button
        onClick={() => handleThemeChange("system")}
        disabled={theme === "system"}
      >
        System
      </button>
    </div>
  );
};

export default ThemeSwitch;

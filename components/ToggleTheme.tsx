"use client";
import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import { MdDevices } from "react-icons/md";
import useClickOutside from "@/hooks/useClickOutside";

export function ToggleTheme() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });
  const toggleDropdown = () => setIsOpen(!isOpen);

  const setThemeAndClose = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-md bg-transparent hover:bg-btn-sec hover:text-btn-text focus:outline-none"
        aria-label="Toggle theme"
      >
        {currentTheme === "dark" ? (
          <FaMoon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <FaSun className="h-[1.2rem] w-[1.2rem]" />
        )}
      </button>
      {isOpen && (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => setThemeAndClose("light")}
              className=" flex gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
            >
              <FaSun className="h-[1.2rem] w-[1.2rem]" />
              Light
            </button>
            <button
              onClick={() => setThemeAndClose("dark")}
              className="flex gap-3 px-4 py-2 text-sm text-gray-700 border-y dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
            >
              <FaMoon className="h-[1.2rem] w-[1.2rem]" /> Dark
            </button>
            <button
              onClick={() => setThemeAndClose("system")}
              className="flex gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              role="menuitem"
            >
              <MdDevices className="h-[1.2rem] w-[1.2rem]" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

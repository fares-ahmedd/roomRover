"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useTheme } from "next-themes";
import { useLayoutEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

export function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState<string | undefined>("");
  const { setTheme, theme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([buttonRef, dropdownRef], () => {
    setIsOpen(false);
  });

  const toggleDropdown = (event: any) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const setThemeAndClose = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    setCurrentTheme(theme === "system" ? systemTheme : theme);
  }, [systemTheme, theme]);

  const getButtonClass = (buttonTheme: string) => {
    const baseClass =
      "flex gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left";
    const selectedClass = "bg-gray-200 dark:bg-gray-600";
    return `${baseClass} ${theme === buttonTheme ? selectedClass : ""}`;
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
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
          ref={dropdownRef}
          className="absolute z-50 right-0 mt-2 w-48 rounded-md bg-gray-800 ring-1 ring-black ring-opacity-5"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => setThemeAndClose("light")}
              className={getButtonClass("light")}
              role="menuitem"
            >
              <FaSun className="h-[1.2rem] w-[1.2rem]" />
              Light
            </button>
            <button
              onClick={() => setThemeAndClose("dark")}
              className={`${getButtonClass("dark")} border-y`}
              role="menuitem"
            >
              <FaMoon className="h-[1.2rem] w-[1.2rem]" /> Dark
            </button>
            <button
              onClick={() => setThemeAndClose("system")}
              className={getButtonClass("system")}
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

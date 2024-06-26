"use client";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToggleTheme } from "../ToggleTheme";
import PrimaryButton from "../ui/PrimaryButton";
import NavLinks from "./NavLinks";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <div className="md:hidden overflow-hidden">
      {!isOpen && (
        <FaBars
          className="cursor-pointer text-2xl duration-300 hover:scale-90"
          onClick={handleToggle}
        />
      )}{" "}
      {isOpen && (
        <IoMdClose
          className="cursor-pointer text-2xl duration-300 hover:scale-90"
          onClick={handleToggle}
        />
      )}
      {isOpen && (
        <div className="backdrop-blur-sm bg-black/20 absolute h-screen-78 w-full left-0 top-[78px] animate-slide-left">
          <div className="flex-between p-6 border-b">
            <div className="space-x-2">
              <UserButton afterSignOutUrl="/" />
              <PrimaryButton>SignUp</PrimaryButton>
              <PrimaryButton>Login</PrimaryButton>
            </div>
            <ToggleTheme />
          </div>

          <div className="my-6 w-fit mx-auto" onClick={handleToggle}>
            <NavLinks menu={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;

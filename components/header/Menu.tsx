"use client";
import { useState } from "react";
import { FaBackward, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ToggleTheme } from "../ToggleTheme";
import Auth from "./Auth";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return (
      <Link href={".."} className="md:hidden text-2xl">
        <IoMdArrowRoundBack />
      </Link>
    );
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
        <div className="backdrop-blur-sm bg-black/20 absolute h-screen-78 w-full left-0 top-[78px] animate-slide-left z-50">
          <div className="flex-between p-6 border-b">
            <div className="space-x-2">
              <Auth />
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

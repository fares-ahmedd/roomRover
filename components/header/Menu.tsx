"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { ToggleTheme } from "../layout/ToggleTheme";
import Auth from "./Auth";
import NavLinks from "./NavLinks";
import { useAuth } from "@clerk/nextjs";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { userId } = useAuth();
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

  if (!userId) {
    return (
      <div className="md:hidden max-sm:scale-75">
        <Auth />
      </div>
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
        <div className=" bg-sec-background fixed  w-full left-0 top-[78px] animate-slide-left z-50">
          <div className="flex justify-end gap-5 px-3 container mx-auto my-4">
            <div className="space-x-2">
              <Auth />
            </div>
            <ToggleTheme />
          </div>

          <div onClick={handleToggle}>
            <NavLinks menu={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;

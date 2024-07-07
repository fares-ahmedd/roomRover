import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import Link from "next/link";
function Logo() {
  return (
    <Link className="flex-center gap-2 max-sm:scale-75" href={"/"}>
      <Image src={logo} alt="Logo" width={60} height={60} priority />
      <span className="text-xl font-bold">RoomRover</span>
    </Link>
  );
}

export default Logo;

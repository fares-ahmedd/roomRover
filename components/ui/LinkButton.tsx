"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
};

const LinkButton = ({ children, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href ?? "");

  return (
    <Link
      className={`
        relative flex items-center gap-1 
        text-sm font-extrabold text-sec-text
        transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        hover:text-main-text focus:text-main-text
        ${isActive ? "text-main-text" : ""}
      `}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;

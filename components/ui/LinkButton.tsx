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
        text-sm font-extrabold text-main-text
        transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        hover:text-sec-text focus:text-sec-text
        ${isActive ? "text-sec-text" : ""}
      `}
      href={href}
    >
      {children}
      <span
        className={`
          absolute bottom-[-2px] left-0 h-0.5 bg-sec-text
          transition-[width] duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          ${isActive ? "w-full" : "w-0"}
        `}
      />
    </Link>
  );
};

export default LinkButton;

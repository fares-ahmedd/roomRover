"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";

function Auth() {
  const { userId } = useAuth();

  return (
    <>
      {userId && (
        <div className="w-[32px] h-[32px] ">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
      {!userId && (
        <div className="flex space-x-2">
          <Link href={"sign-up"} className="block w-full h-full">
            <PrimaryButton>SignUp</PrimaryButton>
          </Link>
          <Link href={"sign-in"}>
            <PrimaryButton>Login</PrimaryButton>
          </Link>
        </div>
      )}
    </>
  );
}

export default Auth;

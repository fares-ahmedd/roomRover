"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import Link from "next/link";

function Auth() {
  const { userId } = useAuth();
  const { user, isLoaded } = useUser();
  const userName = user?.username || user?.fullName || "";

  return (
    <div className="flex-center gap-2">
      {!isLoaded && userId && (
        <>
          <div className="w-[32px] h-[32px] rounded-full bg-slate-700 animate-skeleton "></div>
          <span className="h-3 w-16 bg-slate-700 animate-skeleton rounded-lg "></span>
        </>
      )}
      {userId && isLoaded && (
        <>
          <div className="w-[32px] h-[32px]  ">
            <UserButton afterSignOutUrl="/" />{" "}
          </div>
          <span className="text-sm">{userName.split(" ")[0]}</span>
        </>
      )}
      {!userId && (
        <div className="flex space-x-2">
          <Link href={"sign-up"} className="block w-full h-full">
            <PrimaryButton type="button">SignUp</PrimaryButton>
          </Link>
          <Link href={"sign-in"}>
            <PrimaryButton type="button">Login</PrimaryButton>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Auth;

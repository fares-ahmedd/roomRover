"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import errorImg from "@/public/error.png";
interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorComponentProps) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 container container-layout mx-auto">
      <Image
        src={errorImg}
        alt="Error Message"
        priority
        width={300}
        height={300}
      />
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg text-sec-text">{error.message}</p>

      <div className="space-x-4">
        <PrimaryButton onClick={reset}>Try again</PrimaryButton>
        <Link href={"/"}>
          <PrimaryButton>Go Home</PrimaryButton>
        </Link>
      </div>
    </main>
  );
}

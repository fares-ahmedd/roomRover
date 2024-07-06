"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";
import Image from "next/image";
import Success from "@/public/success.png";
function SuccessPayment() {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col gap-4 mt-2">
      <div className="min-h-[350px] w-full max-w-[350px] relative">
        <Image src={Success} alt="Success" fill />
      </div>
      <div className=" text-center text-teal-600   ">
        Congratulations Payment Success ✅
      </div>
      <PrimaryButton type="button" onClick={() => router.push("/my-bookings")}>
        View Bookings
      </PrimaryButton>
    </div>
  );
}

export default SuccessPayment;

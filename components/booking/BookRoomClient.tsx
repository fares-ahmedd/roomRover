"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useDataContext } from "../DataContext";
import RoomCard from "../room/RoomCard";
import { Elements } from "@stripe/react-stripe-js";
import RoomPaymentFrom from "./RoomPaymentFrom";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import PrimaryButton from "../ui/PrimaryButton";
import { useRouter } from "next/navigation";
import SuccessPayment from "../ui/SuccessPayment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function BookRoomClient() {
  const { clientSecret, bookingRoomData } = useDataContext();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: theme === "dark" || theme === "system" ? "night" : "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };

  useEffect(() => {
    if (!clientSecret) {
      setPaymentSuccess(true);
    }
  }, [clientSecret]);
  useEffect(() => {
    setPageLoaded(true);
  }, []);
  if (paymentSuccess) return <SuccessPayment />;
  if (
    pageLoaded &&
    !paymentSuccess &&
    (!bookingRoomData?.totalPrice || !clientSecret)
  ) {
    return (
      <div className="flex items-center flex-col gap-4 mt-2">
        <h3 className="text-rose-500">
          This Page Could not be propery loaded...
        </h3>
        <div className="flex items-center gap-4">
          <PrimaryButton type="button" onClick={() => router.push("/")}>
            Go Home
          </PrimaryButton>
          <PrimaryButton
            type="button"
            onClick={() => router.push("/my-bookings")}
          >
            View My Bookings
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && bookingRoomData && (
        <div>
          <h3 className=" text-lg md:text-2xl font-semibold mb-6 ">
            Complete payment to reserve this room!
          </h3>
          <div className="mb-6 grid justify-center">
            <div className="mb-6">
              <RoomCard room={bookingRoomData.room} isPayment={true} />
            </div>
          </div>
          <Elements stripe={stripePromise} options={options}>
            <RoomPaymentFrom
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default BookRoomClient;

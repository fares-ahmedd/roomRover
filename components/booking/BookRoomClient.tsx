"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useDataContext } from "../DataContext";
import RoomCard from "../room/RoomCard";
import { Elements } from "@stripe/react-stripe-js";
import RoomPaymentFrom from "./RoomPaymentFrom";
import { useState } from "react";
import { useTheme } from "next-themes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function BookRoomClient() {
  const { clientSecret, bookingRoomData } = useDataContext();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { theme } = useTheme();
  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };
  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && bookingRoomData && (
        <div>
          <div className="mb-6 grid justify-center">
            <h3 className=" text-lg md:text-2xl font-semibold mb-6">
              Complete payment to reserve this room!
            </h3>
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

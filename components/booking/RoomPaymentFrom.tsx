"use client";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDataContext } from "../DataContext";
import NoteMessage from "../ui/NoteMessage";
import SecondaryButton from "../ui/SecondaryButton";
import { Booking } from "@/lib/types";

interface RoomPaymentFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

function RoomPaymentFrom({
  clientSecret,
  handleSetPaymentSuccess,
}: RoomPaymentFormProps) {
  const { bookingRoomData, resetData } = useDataContext();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements || !bookingRoomData) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/booking/${bookingRoomData.room.hotelId}`, {
        method: "GET",
      });
      const bookings = await res.json();

      const roomBookingDates = bookings.map((booking: Booking) => ({
        stateDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
      }));

      console.log(roomBookingDates);

      // const overlapFound= hasOverlap(roomBookingDates.)
      // const result = await stripe.confirmPayment({
      //   elements,
      //   redirect: "if_required",
      // });

      // if (result.error) {
      //   toast.error(`Failed , ${result.error.message}`);
      //   throw new Error(result.error.message);
      // }

      // const response = await fetch(`/api/booking/${result.paymentIntent.id}`, {
      //   method: "PATCH",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to update booking status");
      // }

      // toast.success("Room Reserved ! 💸");
      // router.refresh();
      // resetData();
      // handleSetPaymentSuccess(true);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!bookingRoomData?.startDate || !bookingRoomData?.endDate)
    return <div>Error: Missing Reservation Dates...</div>;
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="font-semibold mb-2 text-lg">Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <h2 className="font-semibold mb-2 text-lg mt-4 ">Payment Information</h2>
      <PaymentElement id="payment-form" options={{ layout: "tabs" }} />
      <fieldset className="my-3">
        <legend>Your Booking Summary</legend>
        <p>
          you will check-in on{" "}
          {bookingRoomData?.startDate.toString().split("T")[0]} at 4PM{" "}
        </p>
        <p>
          you will check-out on{" "}
          {bookingRoomData?.endDate.toString().split("T")[0]} at 4PM{" "}
        </p>{" "}
        <p>Total Price : ${bookingRoomData?.totalPrice}</p>
      </fieldset>
      <SecondaryButton
        disabled={isLoading}
        type="submit"
        className="mb-2 ml-auto px-10"
      >
        {isLoading ? "Processing Payment" : "Pay Now"}
      </SecondaryButton>
      {isLoading && (
        <NoteMessage>
          Payment Processing Please Stay on thi page as we process your
        </NoteMessage>
      )}
    </form>
  );
}

export default RoomPaymentFrom;

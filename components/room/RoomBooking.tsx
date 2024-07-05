"use client";
import { calculateDayCount, formatDate, isDateDisabled } from "@/lib/helpers";
import { useEffect, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useDataContext } from "../DataContext";
import SecondaryButton from "../ui/SecondaryButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function RoomBooking({
  room,
  hotel,
  bookings = [],
}: {
  room: any;
  hotel: any;
  bookings: any;
}) {
  const { userId } = useAuth();
  const router = useRouter();

  const {
    setRange,
    range,
    includeBreakfast,
    setIncludeBreakfast,
    setBookingRoomData,
    setClientSecret,
    paymentIntentId,
    setPaymentIntentId,
  } = useDataContext();
  const [totalPrice, setTotalPrice] = useState<number>(room?.roomPrice || 0);
  const [days, setDays] = useState(0);
  // const disabledDates = useMemo(() => {
  //   let dates: Date[] = [];

  //   const roomBookings = bookings.filter((booking:any) => booking.roomId === room.id);
  //   roomBookings.forEach((booking:any) => {
  //     const range =
  //   })
  // }, []);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (range && range?.from && range?.to) {
      const dayCount = calculateDayCount(range.from, range.to);

      setDays(dayCount);

      if (dayCount && room.roomPrice) {
        if (includeBreakfast && room.roomPrice) {
          setTotalPrice(
            dayCount * room.roomPrice + dayCount * room.breakFastPrice
          );
        } else {
          setTotalPrice(dayCount * room.roomPrice);
        }
      } else {
        setTotalPrice(room.roomPrice);
      }
    } else {
      setTotalPrice(room.roomPrice);
      setDays(0);
    }
  }, [range, room.roomPrice, includeBreakfast, room.breakFastPrice]);
  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(
      selectedRange
        ? { from: selectedRange?.from, to: selectedRange?.to }
        : { from: undefined, to: undefined }
    );
  };
  const handleBookingRoom = () => {
    if (!userId) return toast.error("Opps! Make sure you are logged in.");

    if (!hotel?.userId)
      return toast.error(
        "Something went wrong , please refresh the page and try again"
      );
    if (range?.from && range?.to) {
      setIsLoading(true);

      const bookingRoomData = {
        room,
        totalPrice,
        breakFastIncluded: includeBreakfast,
        startDate: range.from,
        endDate: range.to,
      };
      setBookingRoomData(bookingRoomData);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: {
            hotelOwnerId: hotel.userId,
            hotelId: hotel.id,
            roomId: room.id,
            startDate: range.from,
            endDate: range.to,
            breakFastIncluded: includeBreakfast,
            totalPrice: totalPrice,
          },
          payment_intent_id: paymentIntentId,
        }),
      })
        .then((res) => {
          setIsLoading(false);

          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          setPaymentIntentId(data.paymentIntent.id);
          router.push("/book-room");
        })
        .catch((error: any) => {
          console.log("Error: ", error);
          toast.error("Something Went wrong!");
        });
    } else {
      toast.error("please Select a Date");
    }
  };
  return (
    <div className="my-3">
      <h4 className="text-sec-text">
        Select days that you will spend in this room
      </h4>
      <DayPicker
        className="bg-main-background grid justify-center my-custom-day-picker  custom-day-picker"
        mode="range"
        fromDate={new Date()}
        onSelect={handleRangeSelect}
        selected={range}
        disabled={(date) => isDateDisabled(date, bookings)}
      />
      {range?.to && range?.from && (
        <>
          <h6 className="text-sm text-sec-text mt-2">
            Selected date From: {formatDate(range?.from)}
          </h6>
          <h6 className="text-sm text-sec-text">
            Selected date To: {formatDate(range?.to)}
          </h6>
        </>
      )}
      <h4 className=" my-2">Do you want to be served breakfast each day</h4>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="breakfast"
          className="cursor-pointer"
          checked={includeBreakfast}
          onChange={(e) => setIncludeBreakfast(e.target.checked)}
        />
        <label htmlFor="breakfast">Include Breakfast</label>
      </div>

      <p className="mt-4">
        Total Price: <span className="font-extrabold">${totalPrice}</span>
        {days ? (
          <>
            {" "}
            for: <span className="font-extrabold"> {days} days</span>
          </>
        ) : (
          <>
            {" "}
            for: <span className="font-extrabold"> 1 day</span>
          </>
        )}
        {includeBreakfast && range?.from && range?.to && (
          <span className="text-sec-text"> (include breakFast)</span>
        )}
      </p>
      <SecondaryButton
        className="w-full mt-3"
        disabled={isLoading}
        onClick={() => handleBookingRoom()}
      >
        {isLoading ? <LoadingSpinner /> : "Book Now"}
      </SecondaryButton>
    </div>
  );
}

export default RoomBooking;

"use client";
import { calculateDayCount, formatDate } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useDataContext } from "../DataContext";
import SecondaryButton from "../ui/SecondaryButton";
import LoadingSpinner from "../ui/LoadingSpinner";

function RoomBooking({ room }: { room: any }) {
  const { setRange, range, includeBreakfast, setIncludeBreakfast } =
    useDataContext();
  const [totalPrice, setTotalPrice] = useState(room?.roomPrice || 0);
  const [days, setDays] = useState(0);
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
        // disabled={(currentDate) =>
        //   isPast(currentDate) ||
        //   bookedDate.some((date) => isSameDay(date, currentDate))
        // }
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
        disabled={isLoading || !range?.to || !range?.from}
      >
        {isLoading ? <LoadingSpinner /> : "Book Now"}
      </SecondaryButton>
    </div>
  );
}

export default RoomBooking;

"use client";
import { DayPicker } from "react-day-picker";
import { useDataContext } from "../DataContext";
import { useEffect, useState } from "react";
import { calculateDayCount } from "@/lib/helpers";

function RoomBooking({ room }: { room: any }) {
  const { setRange, range, includeBreakfast, setIncludeBreakfast } =
    useDataContext();
  const [totalPrice, setTotalPrice] = useState(room?.roomPrice || 0);

  useEffect(() => {
    if (range?.from && range?.to) {
      const dayCount = calculateDayCount(range.from, range.to);

      setTotalPrice(totalPrice * dayCount);
      if (includeBreakfast) {
        setTotalPrice(
          (prevValue: number) => (prevValue += room.breakFastPrice)
        );
      } else {
        setTotalPrice(
          (prevValue: number) => (prevValue -= room.breakFastPrice)
        );
      }
    }
  }, [
    range,
    room.roomPrice,
    includeBreakfast,
    room.breakFastPrice,
    totalPrice,
  ]);
  return (
    <div className="my-3">
      <h4 className="text-sec-text">
        Select days that you will spend in this room
      </h4>
      <DayPicker
        className="bg-main-background grid justify-center my-custom-day-picker  custom-day-picker"
        mode="range"
        fromDate={new Date()}
        onSelect={setRange}
        selected={range}
        // disabled={(currentDate) =>
        //   isPast(currentDate) ||
        //   bookedDate.some((date) => isSameDay(date, currentDate))
        // }
      />
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
        Total Price: <span className="font-extrabold">{totalPrice}</span>
      </p>
    </div>
  );
}

export default RoomBooking;

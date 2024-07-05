"use client";

import { formatDate } from "@/lib/helpers";
import { useDataContext } from "../DataContext";

function RoomBookingPrice() {
  const { bookingRoomData } = useDataContext();
  return (
    <div className="my-2">
      <h6 className="text-sm text-sec-text mt-2 flex gap-2 items-center">
        Check in from:{" "}
        <span className="text-white">
          {bookingRoomData?.startDate.toString().split("00:00:00")[0]}
        </span>
      </h6>

      <h6 className="text-sm text-sec-text mt-2 flex gap-2 items-center">
        Check out at:{" "}
        <span className="text-white">
          {bookingRoomData?.endDate.toString().split("00:00:00")[0]}
        </span>
      </h6>
      <h6 className="text-sm text-sec-text">
        {/* Check out To: {formatDate(bookingRoomData?.endDate)} */}
      </h6>
      <p className="mt-4">
        Total Price:{" "}
        <span className="font-extrabold">${bookingRoomData?.totalPrice}</span>
        {bookingRoomData?.breakFastIncluded && (
          <span className="text-sec-text"> (include breakFast)</span>
        )}
      </p>
    </div>
  );
}

export default RoomBookingPrice;

function BookingInfo({ booking }: { booking: any }) {
  return (
    <fieldset className="my-2">
      <legend>Details</legend>
      <div className="my-2">
        <h6 className="text-sm text-sec-text mt-2 flex gap-2 items-center">
          Check-in on: <span className="text-white">{booking.startDate}</span>
        </h6>

        <h6 className="text-sm text-sec-text mt-2 flex gap-2 items-center">
          Check-out on: <span className="text-white">{booking.endDate}</span>
        </h6>
        <h6 className="text-sm text-sec-text">
          {/* Check out To: {formatDate(bookingRoomData?.endDate)} */}
        </h6>
        <p className="mt-4 mb-2">
          Total Price:{" "}
          <span className="font-extrabold">${booking.totalPrice}</span>
          {booking.breakFastIncluded && (
            <span className="text-sec-text"> (include breakFast)</span>
          )}
        </p>
        {booking.paymentStatus ? (
          <p className="text-green-700 text-lg font-bold">
            Paid ${booking.totalPrice} - Room Reserved
          </p>
        ) : (
          <p className="text-red-700 text-lg font-bold">
            Not Paid ${booking.totalPrice} - Room Not Reserved
          </p>
        )}
      </div>
    </fieldset>
  );
}

export default BookingInfo;

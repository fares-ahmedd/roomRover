"use client";

import BookRoomClient from "@/components/booking/BookRoomClient";
import { useDataContext } from "@/components/DataContext";

function page() {
  // const { bookingRoomData, paymentIntentId } = useDataContext();
  // console.log(bookingRoomData);
  // console.log(paymentIntentId);

  return (
    <div className="container container-layout mx-auto my-2">
      <BookRoomClient />
    </div>
  );
}

export default page;

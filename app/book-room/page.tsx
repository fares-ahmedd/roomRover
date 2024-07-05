"use client";

import { useDataContext } from "@/components/DataContext";

function page() {
  const { bookingRoomData, paymentIntentId } = useDataContext();
  console.log(bookingRoomData);
  console.log(paymentIntentId);

  return <div>Book Room </div>;
}

export default page;

"use client";

import { useDataContext } from "@/components/DataContext";

function page() {
  const { bookingRoomData } = useDataContext();
  console.log(bookingRoomData);

  return <div>Book Room </div>;
}

export default page;

import { getBookingsByUserId } from "@/lib/dataServices";
import Link from "next/link";
import SecondaryButton from "../ui/SecondaryButton";
import BookingItem from "./BookingItem";

async function MyBookingsList() {
  const myBookings = await getBookingsByUserId();

  if (myBookings.length < 1) {
    return (
      <div>
        <h5 className="text-xl md:text-2xl mb-3 text-red-900">
          You didn&apos;t Book any hotels yet
        </h5>
        <Link href={"/"}>
          <SecondaryButton className="flex items-center gap-2">
            Search For Hotel now
          </SecondaryButton>
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-5">
      {myBookings.map((booking: any) => (
        <BookingItem booking={booking} key={booking.id} />
      ))}
    </ul>
  );
}

export default MyBookingsList;

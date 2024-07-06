import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import RoomInfoList from "../room/RoomInfoList";
import RoomPrices from "../room/RoomPrices";
import BookingButtons from "./BookingButtons";
import BookingInfo from "./BookingInfo";

function BookingItem({ booking }: { booking: any }) {
  const { hotels: hotel, rooms: room } = booking;
  return (
    <li className="border rounded-lg p-2 bg-sec-background text-main-text  ">
      <h5
        className="truncate  text-lg md:text-xl lg:text-2xl font-bold"
        title={hotel.title}
      >
        {hotel.title}
      </h5>
      <span className="truncate  flex gap-1 items-center text-sm ">
        <IoLocation className="text-blue-800 text-base" /> {hotel?.country}
        {hotel?.city && ` , ${hotel.city}`}
      </span>

      <p
        className="text-sm text-sec-text line-clamp-2 "
        title={hotel.description}
      >
        {hotel.description}
      </p>
      <hr className="my-2 opacity-70" />
      <h5 className="font-extrabold text-lg">#{room.title}</h5>
      <section className="w-full min-h-[300px] relative overflow-hidden">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="duration-300 hover:scale-110"
        />
      </section>
      <RoomInfoList room={room} />
      <RoomPrices room={room} />
      <BookingInfo booking={booking} />

      <BookingButtons booking={booking} />
    </li>
  );
}

export default BookingItem;

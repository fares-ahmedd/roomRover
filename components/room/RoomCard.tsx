import Image from "next/image";
import RoomInfoList from "./RoomInfoList";
import RoomPrices from "./RoomPrices";
import RoomBooking from "./RoomBooking";
import RoomBookingPrice from "./RoomBookingPrice";
import { IHotel } from "@/utils/types";

function RoomCard({
  hotel,
  room,
  bookings,
  isPayment = false,
}: {
  hotel?: IHotel;
  room?: any;
  bookings?: any;
  isPayment?: boolean;
}) {
  return (
    <li className="border rounded-lg p-2 bg-sec-background text-main-text ">
      <h3 className="font-extrabold text-lg mb-2">#{room.title}</h3>
      <div className="w-full min-h-[300px] relative overflow-hidden object-cover">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="duration-300 hover:scale-110 object-cover"
        />
      </div>
      <RoomInfoList room={room} />
      <RoomPrices room={room} />
      {!isPayment ? (
        <RoomBooking room={room} hotel={hotel} bookings={bookings} />
      ) : (
        <RoomBookingPrice />
      )}
    </li>
  );
}

export default RoomCard;

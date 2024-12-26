import { getBookingsByHotelId, getHotelById } from "@/services/dataServices";
import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import RoomCard from "../room/RoomCard";
import Activities from "../ui/Activities";
import BackButton from "../ui/BackButton";
import DynamicMap from "../ui/DynamicMap";

async function HotelDetails({ hotelId }: { hotelId: string }) {
  const hotel = await getHotelById(hotelId);
  if (!hotel) return <div>Something Went Wrong</div>;

  const bookings = await getBookingsByHotelId(hotelId);

  return (
    <>
      <div className="flex-between">
        <h1 className="font-extrabold text-xl md:text-3xl mb-2">
          {hotel.title}
        </h1>
        <BackButton />
      </div>
      <p className="text-sec-text flex gap-1 items-center my-2 ">
        <IoLocation className="text-blue-800 text-lg" /> {hotel.country}
        {hotel.city} {hotel.city && ` , ${hotel.city}`}
      </p>
      <div className="grid grid-cols-[75%,25%] max-md:grid-cols-1 mb-3 gap-2">
        <div className="min-h-[350px] relative object-cover rounded-lg ">
          <Image
            src={hotel.image}
            alt={hotel.title}
            fill
            quality={100}
            className="rounded-lg object-cover"
          />
        </div>
        <DynamicMap
          latitude={hotel.latitude}
          longitude={hotel.longitude}
          height="100%"
        />
      </div>
      <h2 className="mb-1 text-lg md:text-xl font-bold">Location Details</h2>
      <p className="text-sec-text tracking-wider">
        {hotel.locationDescription}
      </p>{" "}
      <h3 className="mb-1 text-lg md:text-xl font-bold my-2">
        About this hotel
      </h3>
      <p className="text-sec-text tracking-wider">{hotel.description}</p>
      <Activities hotel={hotel} />
      <h3 className="mb-1 text-lg md:text-xl font-bold my-2">Hotel Rooms</h3>
      {!!hotel?.rooms?.length ? (
        <ul className="grid-layout">
          {hotel.rooms.map((room: any) => (
            <RoomCard
              hotel={hotel}
              room={room}
              key={room.id}
              bookings={bookings}
            />
          ))}
        </ul>
      ) : (
        <p className="text-red-800 font-bold">
          There&apos;s no any room available for this hotel
        </p>
      )}
    </>
  );
}

export default HotelDetails;

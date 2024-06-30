import {
  filterHotelsWithRooms,
  getAllHotelsWithRooms,
} from "@/lib/dataServices";
import HotelItem from "./HotelItem";

async function HotelsList() {
  const hotels = await filterHotelsWithRooms("Disnay hotell");

  if (!hotels || hotels?.length === 0)
    return (
      <main className="text-center mt-8 text-xl">
        <h4>Not Found any hotel </h4>
      </main>
    );
  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {hotels.map((hotel: any) => {
          const features = [
            { isTrue: hotel?.gym, label: "Gym" },
            { isTrue: hotel?.spa, label: "Spa" },
            { isTrue: hotel?.bar, label: "Bar" },
            { isTrue: hotel?.laundry, label: "Laundry" },
            { isTrue: hotel?.freeWifi, label: "FreeWifi" },
            { isTrue: hotel?.swimmingPool, label: "SwimmingPool" },
          ].filter((feature) => feature.isTrue === true);
          return <HotelItem features={features} key={hotel.id} hotel={hotel} />;
        })}
      </ul>
    </main>
  );
}

export default HotelsList;

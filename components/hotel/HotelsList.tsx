import {
  filterHotelsWithRooms,
  getAllHotelsWithRooms,
} from "@/lib/dataServices";
import HotelItem from "./HotelItem";
import {
  FaDumbbell,
  FaSpa,
  FaCocktail,
  FaTshirt,
  FaWifi,
  FaSwimmingPool,
} from "react-icons/fa";

async function HotelsList({ query }: { query: string | undefined }) {
  const hotels = query
    ? await filterHotelsWithRooms(query)
    : await getAllHotelsWithRooms();

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
            { isTrue: hotel?.gym, label: "Gym", icon: <FaDumbbell /> },
            { isTrue: hotel?.spa, label: "Spa", icon: <FaSpa /> },
            { isTrue: hotel?.bar, label: "Bar", icon: <FaCocktail /> },
            { isTrue: hotel?.laundry, label: "Laundry", icon: <FaTshirt /> },
            { isTrue: hotel?.freeWifi, label: "Free Wifi", icon: <FaWifi /> },
            {
              isTrue: hotel?.swimmingPool,
              label: "Swimming Pool",
              icon: <FaSwimmingPool />,
            },
          ].filter((feature) => feature.isTrue === true);
          return <HotelItem features={features} key={hotel.id} hotel={hotel} />;
        })}
      </ul>
    </main>
  );
}

export default HotelsList;

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

async function HotelsList({ searchParams }: { searchParams: any }) {
  const hotels = searchParams.query
    ? await filterHotelsWithRooms(searchParams.query)
    : await getAllHotelsWithRooms();

  let filteredHotels = hotels;

  if (searchParams.country)
    filteredHotels = hotels.filter(
      (hotel: any) => hotel.country === searchParams.country
    );
  if (searchParams.states)
    filteredHotels = hotels.filter(
      (hotel: any) => hotel.state === searchParams.states
    );

  if (searchParams.cities)
    filteredHotels = hotels.filter(
      (hotel: any) => hotel.city === searchParams.cities
    );

  if (searchParams.rating === "lowest")
    filteredHotels.sort((a:any, b:any) => a.starRating - b.starRating);
  if (searchParams.rating === "highest")
    filteredHotels.sort((a:any, b:any) => b.starRating - a.starRating);
  if (!filteredHotels || filteredHotels?.length === 0)
    return (
      <main className="text-center mt-8 text-xl">
        <h4>Not Found any hotel </h4>
      </main>
    );
  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredHotels.map((hotel: any) => {
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

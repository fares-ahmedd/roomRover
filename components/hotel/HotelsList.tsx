import {
  filterHotelsWithRooms,
  getAllHotelsWithRooms,
} from "@/lib/dataServices";
import { PAGE_SIZE } from "@/lib/helpers";
import {
  FaCocktail,
  FaDumbbell,
  FaSpa,
  FaSwimmingPool,
  FaTshirt,
  FaWifi,
} from "react-icons/fa";
import Pagination from "../ui/Pagination";
import HotelItem from "./HotelItem";
import { SearchParamsProps } from "@/lib/types";

async function HotelsList({ searchParams }: SearchParamsProps) {
  const hotels = searchParams.query
    ? await filterHotelsWithRooms(searchParams.query)
    : await getAllHotelsWithRooms();

  let filteredHotels = hotels ?? [];

  // todo : filter

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

  // todo : sort
  if (searchParams.rating === "lowest")
    filteredHotels.sort((a: any, b: any) => a.starRating - b.starRating);
  if (searchParams.rating === "highest")
    filteredHotels.sort((a: any, b: any) => b.starRating - a.starRating);

  // todo : pagination

  let pageCount = 0;
  let currentPage = 0;
  if (!searchParams.query || searchParams.query === " ") {
    currentPage = searchParams.page ? Number(searchParams.page) : 1;

    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    pageCount = Math.ceil(filteredHotels.length / PAGE_SIZE);

    filteredHotels = filteredHotels.slice(from, to);
  }
  if (!filteredHotels || filteredHotels?.length === 0)
    return (
      <main className="text-center mt-8 text-xl">
        <h4>Not Found any hotel </h4>
      </main>
    );
  return (
    <section>
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

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        query={searchParams.query}
      />
    </section>
  );
}

export default HotelsList;

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
import { IHotel, SearchParamsProps } from "@/lib/types";
let PAGE_COUNT = 0;
let CURRENT_PAGE = 0;
async function HotelsList({ searchParams }: SearchParamsProps) {
  const hotels: IHotel[] = searchParams.query
    ? await filterHotelsWithRooms(searchParams.query)
    : await getAllHotelsWithRooms();

  let filteredHotels = hotels ?? [];

  // todo : pagination

  if (!searchParams.query || searchParams.query === " ") {
    CURRENT_PAGE = searchParams.page ? Number(searchParams.page) : 1;

    const from = (CURRENT_PAGE - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    PAGE_COUNT = Math.ceil(filteredHotels.length / PAGE_SIZE);

    filteredHotels = filteredHotels.slice(from, to);
  }

  // todo : filter

  if (searchParams.country)
    filteredHotels = hotels.filter(
      (hotel) => hotel.country === searchParams.country
    );
  if (searchParams.states)
    filteredHotels = hotels.filter(
      (hotel) => hotel.state === searchParams.states
    );

  if (searchParams.cities)
    filteredHotels = hotels.filter(
      (hotel) => hotel.city === searchParams.cities
    );

  // todo : sort
  if (searchParams.rating === "lowest")
    filteredHotels.sort((a, b) => a.starRating - b.starRating);
  if (searchParams.rating === "highest")
    filteredHotels.sort((a, b) => b.starRating - a.starRating);

  if (!filteredHotels || filteredHotels?.length === 0)
    return (
      <main className="text-center mt-8 text-xl">
        <h4>Not Found any hotel </h4>
      </main>
    );
  return (
    <section>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredHotels.map((hotel) => {
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
        currentPage={CURRENT_PAGE}
        pageCount={PAGE_COUNT}
        query={searchParams.query}
      />
    </section>
  );
}

export default HotelsList;

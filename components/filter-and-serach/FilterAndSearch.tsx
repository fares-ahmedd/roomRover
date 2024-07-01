import { getAllHotelsWithRooms } from "@/lib/dataServices";
import Filter from "./Filter";
import SearchInput from "./SearchInput";

async function FilterAndSearch() {
  const hotels = await getAllHotelsWithRooms();

  const hotelTitles = hotels.map((hotel: any) => hotel.title);

  return (
    <>
      <section className="mt-2 mb-4 flex-between">
        <Filter />
        <SearchInput hotelTitles={hotelTitles} />
      </section>
    </>
  );
}

export default FilterAndSearch;

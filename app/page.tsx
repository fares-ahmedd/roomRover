import FilterAndSearch from "@/components/filter-and-serach/FilterAndSearch";
import HotelsList from "@/components/hotel/HotelsList";

export default function Home() {
  return (
    <div className="container-layout container mx-auto">
      <FilterAndSearch />
      <HotelsList />
      {/* <label htmlFor="browser">Choose your browser from the list:</label>
      <input list="browsers" name="browser" id="browser" />

      <datalist id="browsers">
        <option value="Chrome" />
        <option value="Firefox" />
      </datalist> */}
    </div>
  );
}

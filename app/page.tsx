import FilterAndSearch from "@/components/filter-and-serach/FilterAndSearch";
import HotelsList from "@/components/hotel/HotelsList";
import HotelsListSkeleton from "@/components/hotel/HotelsListSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container-layout container mx-auto">
      <FilterAndSearch />
      <Suspense
        fallback={
          <div className="mt-10 text-center">
            <HotelsListSkeleton />
          </div>
        }
      >
        <HotelsList />
      </Suspense>
      {/* <label htmlFor="browser">Choose your browser from the list:</label>
      <input list="browsers" name="browser" id="browser" />

      <datalist id="browsers">
        <option value="Chrome" />
        <option value="Firefox" />
      </datalist> */}
    </div>
  );
}

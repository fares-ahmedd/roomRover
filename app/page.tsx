import FilterAndSearch from "@/components/filter-and-serach/FilterAndSearch";
import HotelsList from "@/components/hotel/HotelsList";
import HotelsListSkeleton from "@/components/hotel/HotelsListSkeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export default function Home({ searchParams }: any) {
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
        <HotelsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

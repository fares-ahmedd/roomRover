import FilterAndSearchSkeleton from "@/components/filter-and-serach/FilterAndSearchSkeleton";
import FilterAndSearch from "@/components/filter-and-serach/Index";
import HotelsList from "@/components/hotel/HotelsList";
import HotelsListSkeleton from "@/components/hotel/HotelsListSkeleton";
import { SearchParamsProps } from "@/utils/types";
import { Suspense } from "react";

export default function HomePage({ searchParams }: SearchParamsProps) {
  return (
    <main className="container mx-auto p-2">
      <Suspense fallback={<FilterAndSearchSkeleton />}>
        <FilterAndSearch />
      </Suspense>
      <Suspense fallback={<HotelsListSkeleton />}>
        <HotelsList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

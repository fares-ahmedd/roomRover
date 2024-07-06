import HotelsListSkeleton from "@/components/hotel/HotelsListSkeleton";
import MyHotels from "@/components/hotel/MyHotels";
import { Suspense } from "react";

function page() {
  return (
    <div className="container container-layout mx-auto my-2">
      <h1 className="text-xl md:text-3xl font-extrabold  mb-3 pb-3 border-b-2">
        My Hotels
      </h1>

      <Suspense
        fallback={
          <div className="mt-10 text-center">
            <HotelsListSkeleton />
          </div>
        }
      >
        <MyHotels />
      </Suspense>
    </div>
  );
}

export default page;

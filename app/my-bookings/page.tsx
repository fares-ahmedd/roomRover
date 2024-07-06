import MyBookingsList from "@/components/booking/MyBookingsList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";

function page() {
  return (
    <div className="container container-layout mx-auto my-2">
      <h1 className="text-xl md:text-3xl font-extrabold  mb-3 pb-3 border-b-2">
        My Bookings
      </h1>
      <Suspense
        fallback={
          <div className="mt-10 text-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MyBookingsList />
      </Suspense>
    </div>
  );
}

export default page;

import HotelDetails from "@/components/hotel/HotelDetails";
import HotelDetailsSkeleton from "@/components/hotel/HotelDetailsSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";
interface HotelPageProps {
  params: {
    hotelId: string;
  };
}
function page({ params }: HotelPageProps) {
  return (
    <div className="container container-layout mx-auto my-2">
      <Suspense fallback={<HotelDetailsSkeleton />}>
        <HotelDetails hotelId={params.hotelId} />
      </Suspense>
    </div>
  );
}

export default page;

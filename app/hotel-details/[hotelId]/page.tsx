import HotelDetails from "@/components/hotel/HotelDetails";
import HotelDetailsSkeleton from "@/components/hotel/HotelDetailsSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Hotel Details",
};
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

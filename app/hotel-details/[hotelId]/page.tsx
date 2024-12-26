import HotelDetails from "@/components/hotel/HotelDetails";
import HotelDetailsSkeleton from "@/components/hotel/HotelDetailsSkeleton";
import { getAllHotelsWithRooms, getHotelById } from "@/services/dataServices";
import { IHotel } from "@/utils/types";
import { Suspense } from "react";

type HotelPageProps = {
  params: {
    hotelId: string;
  };
};

export async function generateMetadata({ params }: HotelPageProps) {
  const hotel: IHotel = await getHotelById(params.hotelId);
  return { title: `${hotel.title} Details` };
}
export async function generateStaticParams() {
  const hotels: IHotel[] = await getAllHotelsWithRooms();

  return hotels.map((hotel) => ({ hotelId: hotel.id }));
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

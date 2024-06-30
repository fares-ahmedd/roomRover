import AddHotelForm from "@/components/hotel/AddHotelForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getHotelById } from "@/lib/dataServices";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}
export const metadata = {
  title: "Hotel Operations",
};

async function HotelPage({ params }: HotelPageProps) {
  const hotel = await getHotelById(params.hotelId);
  const { userId } = auth();

  if (!userId) return <div className="m-8">You&apos;re Not Authenticate!</div>;

  if (hotel && hotel.userId !== userId)
    return <div className="m-8">Access denied!</div>;
  return (
    <div>
      <div className="container container-layout mx-auto my-2">
        <h1 className="text-lg md:text-3xl font-bold mb-4">
          Describe your hotel
        </h1>
        <Suspense
          fallback={
            <div className="mt-10 text-center">
              <LoadingSpinner />
            </div>
          }
        >
          <AddHotelForm hotel={hotel} userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}

export default HotelPage;

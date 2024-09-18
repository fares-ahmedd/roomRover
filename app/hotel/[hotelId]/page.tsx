import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getAllHotelsWithRooms, getHotelById } from "@/lib/dataServices";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
const AddHotelForm = dynamic(() => import("@/components/hotel/AddHotelForm"), {
  loading: () => (
    <div className="mt-10 text-center">
      <LoadingSpinner />
    </div>
  ),
});
interface HotelPageProps {
  params: {
    hotelId: string;
  };
}
export async function generateMetadata({ params }: HotelPageProps) {
  const hotelId = params.hotelId;
  if (hotelId === "new") {
    return {
      title: "New Hotel",
      description: "Create your own hotel name ",
    };
  }
  const { title } = await getHotelById(hotelId, true);

  return {
    title: `Edit ${title}`,
    description: "Edit your own hotel name ",
  };
}

export async function generateStaticParams() {
  const hotels = await getAllHotelsWithRooms();

  return hotels
    .map((hotel: any) => ({ hotelId: hotel.id }))
    .concat({ hotelId: "new" });
}

async function HotelPage({ params }: HotelPageProps) {
  const hotel = await getHotelById(params.hotelId);
  const { userId } = auth();

  if (!userId) return <div className="m-8">You&apos;re Not Authenticate!</div>;

  if (hotel && hotel.userId !== userId)
    return <div className="m-8">Access denied!</div>;
  return (
    <main>
      <div className="container container-layout mx-auto my-2">
        <h1 className="text-lg md:text-3xl font-bold mb-2 border-b pb-2 ">
          Describe your hotel
        </h1>

        <AddHotelForm hotel={hotel} userId={userId} />
      </div>
    </main>
  );
}

export default HotelPage;

import AddHotelForm from "@/components/hotel/AddHotelForm";
import { getHotelById } from "@/lib/dataServices";
import { auth } from "@clerk/nextjs";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}

async function HotelPage({ params }: HotelPageProps) {
  const hotel = await getHotelById(params.hotelId);
  const { userId } = auth();

  if (!userId) return <div className="m-8">You&apos;re Not Authenticate!</div>;

  if (hotel && hotel.userId !== userId)
    return <div className="m-8">Access denied!</div>;
  return (
    <div>
      <AddHotelForm hotel={hotel} />
    </div>
  );
}

export default HotelPage;

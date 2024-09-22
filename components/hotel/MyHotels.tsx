import { getHotelByUserId } from "@/lib/dataServices";
import {
  FaCocktail,
  FaDumbbell,
  FaHotel,
  FaSpa,
  FaSwimmingPool,
  FaTshirt,
  FaWifi,
} from "react-icons/fa";
import HotelItem from "./HotelItem";
import Link from "next/link";
import SecondaryButton from "../ui/SecondaryButton";
import { Hotels } from "@/lib/types";

async function MyHotels() {
  const hotels = await getHotelByUserId();

  if (hotels.length < 1) {
    return (
      <div>
        <h5 className="text-xl md:text-2xl mb-3 text-red-900">
          You didn&apos;t create any hotels yet
        </h5>
        <Link href={"/hotel/new"}>
          <SecondaryButton className="flex items-center gap-2">
            Create Hotel Now <FaHotel />
          </SecondaryButton>
        </Link>
      </div>
    );
  }
  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {hotels.map((hotel: Hotels) => {
          const features = [
            { isTrue: hotel?.gym, label: "Gym", icon: <FaDumbbell /> },
            { isTrue: hotel?.spa, label: "Spa", icon: <FaSpa /> },
            { isTrue: hotel?.bar, label: "Bar", icon: <FaCocktail /> },
            { isTrue: hotel?.laundry, label: "Laundry", icon: <FaTshirt /> },
            { isTrue: hotel?.freeWifi, label: "Free Wifi", icon: <FaWifi /> },
            {
              isTrue: hotel?.swimmingPool,
              label: "Swimming Pool",
              icon: <FaSwimmingPool />,
            },
          ].filter((feature) => feature.isTrue === true);
          return (
            <HotelItem
              features={features}
              key={hotel.id}
              hotel={hotel}
              isEditing={true}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default MyHotels;

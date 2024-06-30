import { getAllHotelsWithRooms } from "@/lib/dataServices";
import Image from "next/image";
import Link from "next/link";

async function HotelsList() {
  const hotels = await getAllHotelsWithRooms();

  if (hotels.length === 0) return;
  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {hotels.map((hotel: any) => (
          <li key={hotel.id}>
            <Link
              href={`hotel-details/${hotel.id}`}
              className="flex rounded-lg "
            >
              <div className="w-1/2  min-h-[200px] md:min-h-[300px]  relative">
                <Image
                  src={hotel.image}
                  alt={hotel.title}
                  fill
                  quality={100}
                  className="rounded-s-lg"
                />
              </div>
              <section></section>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default HotelsList;

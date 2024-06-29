import Image from "next/image";
import RoomInfoList from "./RoomInfoList";
import RoomPrices from "./RoomPrices";
import DeleteRoom from "./DeleteRoom";

function Rooms({ rooms }: { rooms: any }) {
  return (
    <div>
      <h3 className="text-lg md:text-2xl font-bold mb-3">Rooms</h3>
      <ul className="grid-layout">
        {rooms.map((room: any) => (
          <li
            key={room.id}
            className="border rounded-lg p-2 bg-sec-background text-main-text "
          >
            <h5 className="font-extrabold text-lg">#{room.title}</h5>
            <section className="w-full min-h-[300px] relative overflow-hidden">
              <Image
                src={room.image}
                alt={room.title}
                fill
                className="duration-300 hover:scale-110"
              />
            </section>
            <RoomInfoList room={room} />
            <RoomPrices room={room} />
            <div className="mt-4 flex-between">
              <DeleteRoom roomId={room.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;

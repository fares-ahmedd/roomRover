import { FaBed, FaBath, FaWifi, FaCity } from "react-icons/fa";
import { IoPeople, IoBedOutline } from "react-icons/io5";
import { RiToolsLine } from "react-icons/ri";
import { FaCheckDouble } from "react-icons/fa6";
import { PiTelevision } from "react-icons/pi";
import { MdBalcony } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";

function RoomInfoList({ room }: { room: any }) {
  return (
    <ol className="my-2 border-y py-2 flex gap-4 flex-wrap justify-between ">
      <li className="flex items-center gap-2">
        <FaBed /> {room.bedCount} Bed(s)
      </li>
      <li className="flex items-center gap-2">
        <IoPeople /> {room.guestCount} guest(s)
      </li>{" "}
      <li className="flex items-center gap-2">
        <FaBath /> {room.bathroomCount} Bathroom(s)
      </li>{" "}
      <li className="flex items-center gap-2">
        <IoBedOutline /> {room.kingBed} KingBed(s)
      </li>{" "}
      <li className="flex items-center gap-2">
        <IoBedOutline /> {room.queenBed} QueenBed(s)
      </li>{" "}
      {room.roomService && (
        <li className="flex items-center gap-2">
          <RiToolsLine /> RoomService{" "}
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.TV && (
        <li className="flex items-center gap-2">
          <PiTelevision /> TV <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.balcony && (
        <li className="flex items-center gap-2">
          <MdBalcony /> Balcony <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.freeWifi && (
        <li className="flex items-center gap-2">
          <FaWifi /> free Wifi
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.cityView && (
        <li className="flex items-center gap-2">
          <FaCity /> city View
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.oceanView && (
        <li className="flex items-center gap-2">
          <FaCity /> ocean View
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.forestView && (
        <li className="flex items-center gap-2">
          <FaCity /> forest View
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.mountainView && (
        <li className="flex items-center gap-2">
          <FaCity /> mountain View
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}
      {room.airConditions && (
        <li className="flex items-center gap-2">
          <TbAirConditioning /> air Conditions
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}{" "}
      {room.soundProofed && (
        <li className="flex items-center gap-2">
          <TbAirConditioning /> soundProofed
          <FaCheckDouble className="text-btn-prim" />
        </li>
      )}
    </ol>
  );
}

export default RoomInfoList;

import React from "react";

function RoomPrices({ room }: { room: any }) {
  return (
    <div className="flex gap-4 justify-between border-b pb-2">
      <div>
        Room Price: <span className="font-bold">${room.roomPrice}</span>
        <span className="text-xs">/24hrs</span>
      </div>
      {room?.breakFastPrice > 0 && (
        <div>
          BreakFast Price:{" "}
          <span className="font-bold">${room.breakFastPrice}</span>
        </div>
      )}
    </div>
  );
}

export default RoomPrices;

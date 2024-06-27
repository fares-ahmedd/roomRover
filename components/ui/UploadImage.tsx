"use client";
import { HotelWithRooms } from "@/lib/types";
import { useState } from "react";
interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}
function UploadImage({ hotel }: AddHotelFormProps) {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  return (
    <div>
      <span className="block">Upload Image</span>
      <label className="block text-sec-text text-sm mb-3">
        Choose an image that will show-case your hotel nicely
      </label>

      {image ? (
        <></>
      ) : (
        <>
          <div className="flex flex-col items-center max-w-[400px] p-12 border-2 border-dotted border-btn-prim rounded mt-4">
            <button>Hello</button>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default UploadImage;

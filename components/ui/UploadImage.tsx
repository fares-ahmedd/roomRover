"use client";
import { HotelWithRooms } from "@/lib/types";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

function UploadImage({ hotel }: AddHotelFormProps) {
  const image = hotel?.image;
  const [pickedImage, setPickedImage] = useState<
    string | ArrayBuffer | null | undefined
  >(image);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    imageInputRef?.current?.click();
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    toast.success("image uploaded successfully");
  }
  function handleRemoveImage() {
    setPickedImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    toast.error("removed image done!");
  }

  return (
    <div>
      <span className="block">{image ? "Edit Image" : "Upload Image"}</span>
      <label className="block text-sec-text text-sm mb-3">
        Choose an image that will showcase your hotel nicely
      </label>

      <>
        <div className="flex relative w-full bg-sec-background flex-col items-center max-w-[400px] p-12 border-2 border-dotted border-blue-600 rounded mt-4">
          <input
            className={"hidden"}
            type="file"
            accept="image/png, image/jpeg"
            name={"image"}
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          {pickedImage && typeof pickedImage === "string" && (
            <Image
              src={pickedImage}
              alt="The Image Selected by the user"
              fill
            />
          )}

          <button
            className="bg-blue-600 relative text-white p-2 rounded-md"
            type="button"
            onClick={handlePickClick}
          >
            Select Image
          </button>
          <span className="text-[12px] text-sec-text opacity-80 bg-sec-background">
            image size (4MB)
          </span>
          {pickedImage && (
            <button
              className="text-red-800 text-2xl absolute -top-6 right-0 hover:underline hover:text-red-600 "
              type="button"
              onClick={handleRemoveImage}
            >
              <IoClose />
            </button>
          )}
        </div>
      </>
    </div>
  );
}

export default UploadImage;

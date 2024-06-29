"use client";
import { deleteHotelAction } from "@/lib/actions";
import { HotelWithRooms } from "@/lib/types";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import Model from "../ui/Model";
import PrimaryButton from "../ui/PrimaryButton";
import DeleteButton from "./DeleteButton";
import { FaTrash } from "react-icons/fa";
interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}
function DeleteHotel({ hotel }: AddHotelFormProps) {
  const [state, formAction] = useFormState(deleteHotelAction, {
    success: null,
    redirectUrl: "",
  });
  useEffect(() => {
    if (state.success) {
      toast.success("Deleted hotel successfully");
      redirect(state.redirectUrl);
    } else if (state.success === false) {
      toast.error("Failed to delete hotel");
    }
  }, [state, hotel]);
  return (
    <>
      {hotel && (
        <Model>
          <Model.OpenModel id="delete">
            <span className="delete-btn disabled:disabled-btn w-full">
              Delete <FaTrash />
            </span>
          </Model.OpenModel>
          <Model.Content id="delete">
            {({ close }) => (
              <div className="bg-sec-background text-main-text py-6 px-2 w-full h-full rounded-md"></div>
            )}
          </Model.Content>
        </Model>
      )}
    </>
  );
}

export default DeleteHotel;
